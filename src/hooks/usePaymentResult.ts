import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      });
    },
    onError: (error) => {
      // 결제 승인 실패 시 처리
      setResultData({
        isLoading: false,
        error: error.message || '결제 승인 처리 중 오류가 발생했습니다.',
      });
    },
  });

  useEffect(() => {
    // URL 파라미터에서 결제 정보 추출
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount) {
      // 결제 승인 API 호출 (실제 구현 시 백엔드 API 호출)
      confirmPayment({ paymentKey, orderId, amount });
    } else {
      setResultData({
        isLoading: false,
        error: '결제 정보가 올바르지 않습니다.',
      });
    }
  }, [searchParams]);

  return resultData;
};
