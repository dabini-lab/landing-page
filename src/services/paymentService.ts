import { getPaymentUrls } from '@/hooks/useTossPayments';
import { auth } from '@/lib/firebase/clientApp';

export class PaymentService {
  private payment: any;

  constructor(payment: any) {
    this.payment = payment;
  }

  async requestSubscriptionPayment(): Promise<void> {
    if (!this.payment) {
      throw new Error('결제 모듈이 초기화되지 않았습니다.');
    }

    // 현재 로그인된 사용자 확인
    const { currentUser } = auth;
    if (!currentUser) {
      throw new Error('구독 결제를 위해서는 로그인이 필요합니다.');
    }

    const urls = getPaymentUrls();

    try {
      await this.payment.requestBillingAuth({
        method: 'CARD',
        successUrl: `${urls.billingSuccessUrl}?uid=${currentUser.uid}&customerEmail=${encodeURIComponent(currentUser.email || '')}&customerName=${encodeURIComponent(currentUser.displayName || '')}`,
        failUrl: urls.billingFailUrl,
        customerEmail: currentUser.email || 'customer@example.com',
        customerName: currentUser.displayName || '사용자',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('빌링 인증 요청 실패:', error);
      throw error;
    }
  }
}
