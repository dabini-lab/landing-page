import type { NextApiRequest, NextApiResponse } from 'next';

// 빌링키 발급 확인 후 즉시 구독 결제 처리
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 개발 모드에서 요청 로그
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('🟡 BILLING-CONFIRM.TS - API called:', {
      method: req.method,
      url: req.url,
      body: req.body,
    });
  }

  if (req.method !== 'POST') {
    // eslint-disable-next-line no-console
    console.log('🔴 BILLING-CONFIRM.TS - Returning 405');
    return res.status(405).json({
      error: 'Method Not Allowed',
      source: 'billing-confirm.ts',
    });
  }

  const { authKey, customerKey, uid, customerEmail, customerName } = req.body;

  if (!authKey || !customerKey || !uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const SECRET_KEY = process.env.TOSS_PAYMENTS_SECRET_KEY;

    if (!SECRET_KEY) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 1. 빌링키 발급
    const BILLING_ISSUE_API_URL =
      'https://api.tosspayments.com/v1/billing/authorizations/issue';

    const billingResponse = await fetch(BILLING_ISSUE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authKey,
        customerKey,
      }),
    });

    const billingData = await billingResponse.json();

    if (!billingResponse.ok) {
      return res.status(billingResponse.status).json({
        ...billingData,
        source: 'toss-billing-api-error',
      });
    }

    // 빌링키가 성공적으로 생성된 경우 즉시 결제 진행
    if (billingData.billingKey) {
      // 2. 구독 결제 실행
      const orderId = `subscription_${Date.now()}_${uid}`;
      const amount = 5900; // Premium 플랜 금액
      const orderName = 'Dabini Premium 구독';

      const BILLING_PAYMENT_API_URL = `https://api.tosspayments.com/v1/billing/${billingData.billingKey}`;

      const paymentResponse = await fetch(BILLING_PAYMENT_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${SECRET_KEY}:`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerKey,
          amount,
          orderId,
          orderName,
          customerEmail: customerEmail || 'customer@example.com',
          customerName: customerName || '사용자',
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        return res.status(paymentResponse.status).json({
          error: 'Payment failed after billing key creation',
          billingKey: billingData.billingKey, // 빌링키는 생성되었으므로 반환
          paymentError: paymentData,
          source: 'toss-payment-api-error',
        });
      }

      // 결제가 성공적으로 완료된 경우
      if (paymentData.status === 'DONE') {
        return res.status(200).json({
          success: true,
          billingKey: billingData.billingKey,
          payment: {
            paymentKey: paymentData.paymentKey,
            orderId: paymentData.orderId,
            amount: paymentData.totalAmount,
            status: paymentData.status,
            approvedAt: paymentData.approvedAt,
            card: paymentData.card,
          },
          uid,
          customerKey: billingData.customerKey,
          message: '구독이 성공적으로 시작되었습니다.',
        });
      }

      return res.status(400).json({
        error: 'Payment processing failed',
        billingKey: billingData.billingKey,
        paymentDetails: paymentData,
      });
    }

    return res.status(400).json({
      error: 'Billing key creation failed',
      details: billingData,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
