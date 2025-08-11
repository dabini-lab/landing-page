import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { auth } from '@/lib/firebase/clientApp';
import { updateUserSubscription } from '@/lib/firebase/user';

interface BillingConfirmData {
  authKey: string;
  customerKey: string;
  uid: string;
}

interface BillingResultData {
  billingKey?: string;
  isLoading: boolean;
  error?: string;
  success?: boolean;
}

export const useBillingConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmBilling = useCallback(
    async (
      data: BillingConfirmData,
    ): Promise<{ billingKey?: string; success: boolean }> => {
      setIsLoading(true);
      setError(null);

      // 개발 모드에서 요청 디버그 정보
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Billing API request:', {
          url: '/api/payments/billing',
          method: 'POST',
          data,
        });
      }

      try {
        // eslint-disable-next-line no-console
        console.log('🚀 Sending request to:', '/api/payments/billing');

        const response = await fetch('/api/payments/billing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // eslint-disable-next-line no-console
        console.log('📨 Response received:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });

        const result = await response.json();

        // 개발 모드에서 응답 디버그 정보
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('Billing API response:', {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            result,
          });
        }

        if (!response.ok) {
          // 405 에러인 경우 더 자세한 정보 제공
          if (response.status === 405) {
            throw new Error(
              `API 엔드포인트가 POST 메소드를 지원하지 않습니다. (Status: ${response.status}, URL: /api/payments/billing)`,
            );
          }

          throw new Error(
            result.error ||
              `빌링키 확인 중 오류가 발생했습니다. (${response.status})`,
          );
        }

        // API에서 빌링키를 받은 후 Firebase에 저장
        if (result.success && result.billingKey && result.uid) {
          await updateUserSubscription(result.uid, result.billingKey, 1);
        }

        setIsLoading(false);
        return {
          billingKey: result.billingKey,
          success: true,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        setIsLoading(false);
        throw new Error(errorMessage);
      }
    },
    [],
  );

  return {
    confirmBilling,
    isLoading,
    error,
  };
};

export const useBillingResult = () => {
  const searchParams = useSearchParams();
  const [resultData, setResultData] = useState<BillingResultData>({
    isLoading: true,
  });
  const [authInitialized, setAuthInitialized] = useState(false);

  const { confirmBilling } = useBillingConfirm();

  // Firebase Auth 초기화 상태 확인
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const handleBillingConfirm = useCallback(
    async (authKey: string, customerKey: string) => {
      // Firebase Auth에서 현재 사용자 UID 가져오기
      const { currentUser } = auth;

      // 개발 모드에서 디버그 정보 출력
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Auth state:', {
          currentUser: currentUser
            ? { uid: currentUser.uid, email: currentUser.email }
            : null,
          authKey,
          customerKey,
        });
      }

      if (!currentUser) {
        setResultData({
          isLoading: false,
          error: '로그인이 필요합니다.',
        });
        return;
      }

      try {
        setResultData({ isLoading: true, error: undefined });
        const result = await confirmBilling({
          authKey,
          customerKey,
          uid: currentUser.uid,
        });

        setResultData({
          billingKey: result.billingKey,
          isLoading: false,
          success: true,
          error: undefined,
        });
      } catch (error) {
        setResultData({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : '빌링키 처리 중 오류가 발생했습니다.',
        });
      }
    },
    [confirmBilling],
  );

  useEffect(() => {
    // Firebase Auth가 초기화되지 않았으면 대기
    if (!authInitialized) {
      return;
    }

    // URL 파라미터에서 빌링 인증 정보 추출
    const authKey = searchParams.get('authKey');
    const customerKey = searchParams.get('customerKey');

    if (authKey && customerKey) {
      handleBillingConfirm(authKey, customerKey);
    } else {
      // 일반 결제인 경우는 기존 로직 사용
      const paymentKey = searchParams.get('paymentKey');
      if (!paymentKey) {
        setResultData({
          isLoading: false,
          error: '결제 또는 빌링 정보가 올바르지 않습니다.',
        });
      } else {
        // 일반 결제의 경우는 기존 usePaymentResult 로직을 사용
        setResultData({ isLoading: false, success: false });
      }
    }
  }, [searchParams, handleBillingConfirm, authInitialized]);

  return resultData;
};
