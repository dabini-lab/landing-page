import type { NextApiRequest, NextApiResponse } from 'next';

import { adminFirestoreService } from '@/services/adminFirestoreService';

// API route for deleting premium subscription document
// This route uses Firebase Admin SDK to write data with elevated privileges
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'Missing required field: userId',
      });
    }

    // Delete premium subscription document
    await adminFirestoreService.deletePremiumSubscription(userId);

    return res.status(200).json({
      success: true,
      message: 'Premium document deleted successfully',
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Premium document deletion error:', error);
    }
    return res.status(500).json({
      error: 'Failed to delete premium document',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
