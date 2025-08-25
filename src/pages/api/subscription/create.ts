import type { NextApiRequest, NextApiResponse } from 'next';

import { adminFirestoreService } from '@/services/adminFirestoreService';

// API route for creating initial premium subscription document
// This route uses Firebase Admin SDK to write data with elevated privileges
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'Missing required field: userId',
      });
    }

    // Check if premium document already exists
    const existingDoc =
      await adminFirestoreService.getPremiumSubscription(userId);

    if (existingDoc) {
      return res.status(200).json({
        success: true,
        message: 'Premium document already exists',
        data: existingDoc,
      });
    }

    // Create initial premium document with default values
    const initialPremiumData = {
      userId,
      isPremium: false,
      subscriptionEndDate: null,
      billingKey: null,
      billingKeyCreatedAt: null,
      subscriptionStartedAt: null,
      subscriptionStatus: 'inactive',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await adminFirestoreService.createPremiumSubscription(
      userId,
      initialPremiumData,
    );

    return res.status(201).json({
      success: true,
      message: 'Premium document created successfully',
      data: result,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Premium document creation error:', error);
    }
    return res.status(500).json({
      error: 'Failed to create premium document',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
