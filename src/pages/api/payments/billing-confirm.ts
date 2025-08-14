import type { NextApiRequest, NextApiResponse } from 'next';

// 서버에서 직접 updateUserSubscription을 호출하는 대신
// 클라이언트에서 처리하도록 빌링키만 반환

// API route for billing key confirmation and subscription setup
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

  const { authKey, customerKey, uid } = req.body;

  if (!authKey || !customerKey || !uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // TossPayments 빌링키 확인 API 호출
    const BILLING_API_URL = `https://api.tosspayments.com/v1/billing/authorizations/${authKey}`;
    const SECRET_KEY = process.env.TOSS_PAYMENTS_SECRET_KEY;

    if (!SECRET_KEY) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch(BILLING_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    const billingData = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(billingData);
    }

    // 빌링키가 성공적으로 생성된 경우
    if (billingData.status === 'DONE' && billingData.billingKey) {
      // 클라이언트에서 Firebase 업데이트를 처리하도록 빌링키와 UID를 반환
      return res.status(200).json({
        success: true,
        billingKey: billingData.billingKey,
        uid,
        message: '빌링키가 성공적으로 생성되었습니다.',
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
