import {
  generateOrderId,
  getPaymentUrls,
  PAYMENT_CONFIG,
} from '@/hooks/useTossPayments';

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

    const urls = getPaymentUrls();

    await this.payment.requestBillingAuth({
      method: 'CARD',
      successUrl: urls.billingSuccessUrl,
      failUrl: urls.billingFailUrl,
      customerEmail: PAYMENT_CONFIG.CUSTOMER_INFO.email,
      customerName: PAYMENT_CONFIG.CUSTOMER_INFO.name,
    });
  }
}
