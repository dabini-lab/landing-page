import { useCallback } from 'react';

import { PaymentService } from '../services/paymentService';

export const usePaymentHandlers = (payment: any) => {
  const paymentService = new PaymentService(payment);

  const handleOneTimePayment = useCallback(async () => {
    try {
      await paymentService.requestOneTimePayment();
    } catch (error: any) {
      if (error.code === 'USER_CANCEL') {
        console.log('사용자가 결제를 취소했습니다.');
      } else {
        console.error('결제 요청 실패:', error);
        alert(`결제 요청 중 오류가 발생했습니다: ${error.message}`);
      }
    }
  }, [paymentService]);

  const handleSubscriptionPayment = useCallback(async () => {
    try {
      await paymentService.requestSubscriptionPayment();
    } catch (error: any) {
      if (error.code === 'USER_CANCEL') {
        console.log('사용자가 빌링 키 발급을 취소했습니다.');
      } else {
        console.error('빌링 키 발급 실패:', error);
        alert(`빌링 키 발급 중 오류가 발생했습니다: ${error.message}`);
      }
    }
  }, [paymentService]);

  return { handleOneTimePayment, handleSubscriptionPayment };
};
