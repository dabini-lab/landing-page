import type { NextApiRequest, NextApiResponse } from 'next';

import { adminFirestoreService } from '@/services/adminFirestoreService';

// API route for creating payment records
// This route uses Firebase Admin SDK to write data with elevated privileges
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId, userId, paymentData } = req.body;

    if (!paymentId || !userId || !paymentData) {
      return res.status(400).json({
        error: 'Missing required fields: paymentId, userId, and paymentData',
      });
    }

    // Use admin service to create payment record
    // This bypasses Firestore security rules using admin privileges
    const result = await adminFirestoreService.createPayment(paymentId, {
      ...paymentData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      message: 'Payment record created successfully',
      data: result,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Payment creation error:', error);
    }
    return res.status(500).json({
      error: 'Failed to create payment record',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
