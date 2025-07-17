import { useEffect, useState } from 'react';

interface TossPaymentsHook {
  isScriptLoaded: boolean;
  payment: any;
  isLoading: boolean;
}

const TOSS_PAYMENTS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;

export const useTossPayments = (): TossPaymentsHook => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [payment, setPayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTossPaymentsScript = () => {
      const script = document.createElement('script');
      script.src = 'https://js.tosspayments.com/v2/standard';
      script.async = true;

      script.onload = () => {
        try {
          const clientKey = TOSS_PAYMENTS_CLIENT_KEY; // 환경변수로 관리 권장

          // 클라이언트 키가 설정되지 않은 경우 에러 처리
          if (!clientKey) {
            throw new Error('TOSS_PAYMENTS_CLIENT_KEY가 설정되지 않았습니다.');
          }

          const tossPaymentsInstance = window.TossPayments(clientKey);

          const paymentInstance = tossPaymentsInstance.payment({
            customerKey: window.TossPayments.ANONYMOUS,
          });

          setPayment(paymentInstance);
          setIsScriptLoaded(true);
        } catch (error) {
          console.error('TossPayments 초기화 실패:', error);
        } finally {
          setIsLoading(false);
        }
      };

      script.onerror = () => {
        console.error('TossPayments SDK 로드 실패');
        setIsLoading(false);
      };

      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    return loadTossPaymentsScript();
  }, []);

  return { isScriptLoaded, payment, isLoading };
};

// utility functions for payment handling
export const generateOrderId = (): string => {
  return `ORDER_${new Date().getTime()}`;
};

export const getPaymentUrls = () => {
  const baseUrl = window.location.origin;
  return {
    successUrl: `${baseUrl}/pricing/success`,
    failUrl: `${baseUrl}/pricing/fail`,
    billingSuccessUrl: `${baseUrl}/billing-success`,
    billingFailUrl: `${baseUrl}/billing-fail`,
  };
};

export const PAYMENT_CONFIG = {
  PREMIUM_PRICE: 5990,
  CUSTOMER_INFO: {
    email: 'customer123@gmail.com',
    name: '김망고',
    phone: '01012345678',
  },
  PRODUCT_INFO: {
    name: 'Dabini Premium 구독',
    description: 'Dabini의 모든 기능을 활용하세요.',
  },
} as const;
