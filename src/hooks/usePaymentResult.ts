import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  const confirmPayment = async (
    paymentKey: string,
    orderId: string,
    amount: string,
  ) => {
    try {
      // 실제로는 백엔드 API를 호출해야 합니다
      // 여기서는 시뮬레이션용 데이터를 사용합니다

      // 실제 토스페이먼츠 결제 승인 API 호출 예시:
      // const response = await fetch('/api/payments/confirm', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ paymentKey, orderId, amount })
      // });

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      setResultData({
        paymentKey,
        orderId,
        amount,
        paymentType: 'CARD',
        orderName: 'Dabini Premium 구독',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        requestedAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        isLoading: false,
      });
    } catch (error) {
      console.error('결제 승인 실패:', error);
      setResultData({
        isLoading: false,
        error: '결제 승인 처리 중 오류가 발생했습니다.',
      });
    }
  };

  useEffect(() => {
    // URL 파라미터에서 결제 정보 추출
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount) {
      // 결제 승인 API 호출 (실제 구현 시 백엔드 API 호출)
      confirmPayment(paymentKey, orderId, amount);
    } else {
      setResultData({
        isLoading: false,
        error: '결제 정보가 올바르지 않습니다.',
      });
    }
  }, [searchParams]);

  return resultData;
};
