import type { NextApiRequest, NextApiResponse } from 'next';

// This is a proxy API route for payment confirmation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // eslint-disable-next-line no-console
  console.log('🟠 CONFIRM.TS - API called:', {
    method: req.method,
    url: req.url,
  });

  if (req.method !== 'POST') {
    // eslint-disable-next-line no-console
    console.log('🔴 CONFIRM.TS - Returning 405');
    return res.status(405).json({
      error: 'Method Not Allowed',
      source: 'confirm.ts',
    });
  }

  const { paymentKey, orderId, amount } = req.body;

  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Replace with your actual payment provider API endpoint and secret key
    const PAYMENT_API_URL = 'https://api.tosspayments.com/v1/payments/confirm';
    const SECRET_KEY = process.env.TOSS_PAYMENTS_SECRET_KEY; // NEXT_PUBLIC_ 제거

    if (!SECRET_KEY) {
      return res.status(500).json({
        error: 'Payment configuration error',
        message: 'Secret key is not configured',
      });
    }

    const response = await fetch(PAYMENT_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      // 상세한 에러 정보를 포함하여 반환
      return res.status(response.status).json({
        ...data,
        debugInfo: {
          status: response.status,
          statusText: response.statusText,
          url: PAYMENT_API_URL,
        },
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Payment confirmation failed',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
