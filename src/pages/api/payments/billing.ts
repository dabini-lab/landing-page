import type { NextApiRequest, NextApiResponse } from 'next';

// API route for billing key confirmation and subscription setup
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 개발 모드에서 요청 로그
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('🔵 BILLING.TS - API called:', {
      method: req.method,
      url: req.url,
      body: req.body,
      headers: req.headers,
    });
  }

  // 메소드 체크 전에 추가 로깅
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('🔵 BILLING.TS - Method check:', {
      'req.method': req.method,
      'typeof req.method': typeof req.method,
      'req.method === "POST"': req.method === 'POST',
      'req.method !== "POST"': req.method !== 'POST',
    });
  }

  const { authKey, customerKey, uid } = req.body;

  if (!authKey || !customerKey || !uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // TossPayments v2 빌링키 발급 API 호출
    const BILLING_API_URL =
      'https://api.tosspayments.com/v1/billing/authorizations/issue';
    const SECRET_KEY = process.env.TOSS_PAYMENTS_SECRET_KEY;

    if (!SECRET_KEY) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch(BILLING_API_URL, {
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

    const billingData = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ...billingData,
        source: 'toss-api-error',
      });
    }

    // 빌링키가 성공적으로 생성된 경우
    if (billingData.billingKey) {
      // 클라이언트에서 Firebase 업데이트를 처리하도록 빌링키와 UID를 반환
      return res.status(200).json({
        success: true,
        billingKey: billingData.billingKey,
        uid,
        customerKey: billingData.customerKey,
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
