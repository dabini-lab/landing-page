import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useConfirmPayment } from './useConfirmPayment';

interface PaymentResultData {
  paymentKey?: string;
  orderId?: string;
  amount?: string;
  paymentType?: string;
  orderName?: string;
  customerEmail?: string;
  customerName?: string;
  requestedAt?: string;
  approvedAt?: string;
  isLoading: boolean;
  error?: string;
}

export const usePaymentResult = () => {
  const searchParams = useSearchParams();
  const [resultData, setResultData] = useState<PaymentResultData>({
    isLoading: true,
  });

  const { mutate: confirmPayment } = useConfirmPayment({
    onSuccess: (data) => {
      // 결제 승인 성공 시 처리
      setResultData({
        paymentKey: data.paymentKey,
        orderId: data.orderId,
        amount: data.totalAmount.toString(),
        paymentType: data.method,
        orderName: data.orderName,
        customerEmail: 'customer123@gmail.com', // API 응답에 없으면 기본값
        customerName: '김토스', // API 응답에 없으면 기본값
        requestedAt: data.requestedAt,
        approvedAt: data.approvedAt,
        isLoading: false,
        error: undefined, // 성공시 에러 상태 제거
      });
    },
    onError: (error) => {
      // 결제 승인 실패 시 처리
      setResultData({
        isLoading: false,
        error: `결제 승인 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`,
      });
    },
  });

  const handlePaymentConfirm = useCallback(
    (paymentKey: string, orderId: string, amount: string) => {
      // 결제 승인 API 호출 전에 로딩 상태로 설정
      setResultData({ isLoading: true, error: undefined });
      confirmPayment({ paymentKey, orderId, amount });
    },
    [confirmPayment],
  );

  useEffect(() => {
    // URL 파라미터에서 결제 정보 추출
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    const customerKey = searchParams.get('customerKey');
    const authKey = searchParams.get('authKey');

    if (paymentKey && orderId && amount) {
      handlePaymentConfirm(paymentKey, orderId, amount);
    } else if (customerKey && authKey) {
      // 빌링 키 발급 성공 시에는 이 훅에서 처리할 내용이 없으므로 로딩 상태만 false로 변경
      setResultData({ isLoading: false });
    } else {
      // 디버깅을 위해 누락된 파라미터 정보 포함
      const missingParams = [];
      if (!paymentKey) missingParams.push('paymentKey');
      if (!orderId) missingParams.push('orderId');
      if (!amount) missingParams.push('amount');

      setResultData({
        isLoading: false,
        error: `결제 정보가 올바르지 않습니다. 누락된 파라미터: ${missingParams.join(', ')}`,
      });
    }
  }, [searchParams, handlePaymentConfirm]);

  return resultData;
};
