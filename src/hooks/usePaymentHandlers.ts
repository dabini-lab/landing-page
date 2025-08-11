import { useCallback } from 'react';

import { PaymentService } from '../services/paymentService';

export const usePaymentHandlers = (payment: any) => {
  const paymentService = new PaymentService(payment);

  const handleOneTimePayment = useCallback(async () => {
    try {
      await paymentService.requestOneTimePayment();
    } catch (error: any) {
      if (error.code === 'USER_CANCEL') {
        // eslint-disable-next-line no-console
        console.log('사용자가 결제를 취소했습니다.');
      } else {
        // eslint-disable-next-line no-console
        console.error('결제 요청 실패:', error);
        // UI에서 에러를 표시하도록 에러를 다시 throw
        throw error;
      }
    }
  }, [paymentService]);

  const handleSubscriptionPayment = useCallback(async () => {
    try {
      // eslint-disable-next-line no-console
      console.log('구독 결제 시작...');
      await paymentService.requestSubscriptionPayment();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('구독 결제 오류 상세:', error);
      if (error.code === 'USER_CANCEL') {
        // eslint-disable-next-line no-console
        console.log('사용자가 빌링 키 발급을 취소했습니다.');
      } else {
        // eslint-disable-next-line no-console
        console.error('빌링 키 발급 실패:', error);
        // UI에서 에러를 표시하도록 에러를 다시 throw
        throw error;
      }
    }
  }, [paymentService]);

  return { handleOneTimePayment, handleSubscriptionPayment };
};
