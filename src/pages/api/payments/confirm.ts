import type { NextApiRequest, NextApiResponse } from 'next';

// This is a proxy API route for payment confirmation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentKey, orderId, amount } = req.body;

  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Replace with your actual payment provider API endpoint and secret key
    const PAYMENT_API_URL = 'https://api.tosspayments.com/v1/payments/confirm';
    const SECRET_KEY = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY;

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
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
