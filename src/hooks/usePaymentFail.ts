import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PaymentFailData {
  code?: string;
  message?: string;
  orderId?: string;
  isLoading: boolean;
}

export const usePaymentFail = () => {
  const searchParams = useSearchParams();
  const [failData, setFailData] = useState<PaymentFailData>({
    isLoading: true,
  });

  useEffect(() => {
    const code = searchParams.get('code');
    const message = searchParams.get('message');
    const orderId = searchParams.get('orderId');

    setFailData({
      code: code || 'UNKNOWN_ERROR',
      message: message || '알 수 없는 오류가 발생했습니다.',
      orderId: orderId || undefined,
      isLoading: false,
    });
  }, [searchParams]);

  return failData;
};
