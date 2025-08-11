import {
  generateOrderId,
  getPaymentUrls,
  PAYMENT_CONFIG,
} from '@/hooks/useTossPayments';
import { auth } from '@/lib/firebase/clientApp';

export class PaymentService {
  private payment: any;

  constructor(payment: any) {
    this.payment = payment;
  }

  async requestOneTimePayment(): Promise<void> {
    if (!this.payment) {
      throw new Error('결제 모듈이 초기화되지 않았습니다.');
    }

    const urls = getPaymentUrls();

    await this.payment.requestPayment({
      method: 'CARD',
      amount: {
        currency: 'KRW',
        value: PAYMENT_CONFIG.PREMIUM_PRICE,
      },
      orderId: generateOrderId(),
      orderName: PAYMENT_CONFIG.PRODUCT_INFO.name,
      successUrl: urls.successUrl,
      failUrl: urls.failUrl,
      customerEmail: PAYMENT_CONFIG.CUSTOMER_INFO.email,
      customerName: PAYMENT_CONFIG.CUSTOMER_INFO.name,
      customerMobilePhone: PAYMENT_CONFIG.CUSTOMER_INFO.phone,
    });
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
        successUrl: `${urls.billingSuccessUrl}?uid=${currentUser.uid}`,
        failUrl: urls.billingFailUrl,
        customerEmail: currentUser.email || PAYMENT_CONFIG.CUSTOMER_INFO.email,
        customerName:
          currentUser.displayName || PAYMENT_CONFIG.CUSTOMER_INFO.name,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('빌링 인증 요청 실패:', error);
      throw error;
    }
  }
}
