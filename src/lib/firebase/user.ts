import type { User } from 'firebase/auth';
import { collection, doc, getDoc, type Timestamp } from 'firebase/firestore';

import { userDb } from '@/lib/firebase/clientApp';
import PremiumSubscriptionService from '@/services/premiumSubscriptionService';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

// Card information interface
export interface CardInfo {
  issuerCode?: string;
  acquirerCode?: string;
  number?: string;
  installmentPlanMonths?: number;
  isInterestFree?: boolean;
  interestPayer?: string | null;
  approveNo?: string;
  useCardPoint?: boolean;
  cardType?: string;
  ownerType?: string;
  acquireStatus?: string;
  amount?: number;
}

export interface UserPremiumData {
  isPremium: boolean;
  subscriptionEndDate: Timestamp | null;
  billingKey?: string | null;
  billingKeyCreatedAt?: Timestamp | null;
  subscriptionStartedAt?: Timestamp | null;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionPlan?: string;
}

export interface PaymentData {
  userId: string;
  paymentKey: string;
  orderId: string;
  amount: number;
  status: string;
  approvedAt: Timestamp;
  card?: CardInfo;
  orderName: string;
  customerKey: string;
  billingKey: string;
  createdAt: Timestamp;
}

// Input type for savePaymentData function that accepts flexible date formats
export interface PaymentDataInput {
  userId: string;
  paymentKey: string;
  orderId: string;
  amount: number;
  status: string;
  approvedAt: string | Date | Timestamp;
  card?: CardInfo;
  orderName: string;
  customerKey: string;
  billingKey: string;
}

/**
 * Create user premium document - migrated to use API
 */
export const createUserPremiumDocument = async (user: User): Promise<void> => {
  try {
    await PremiumSubscriptionService.createPremiumDocument(user.uid);
  } catch (error) {
    throw new Error(
      `Failed to create premium document: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const getUserPremiumData = async (
  uid: string,
): Promise<UserPremiumData | null> => {
  const premiumCollection = collection(userDb, 'premium');
  const userDocRef = doc(premiumCollection, uid);

  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserPremiumData;
  }

  return null;
};

/**
 * Delete user premium document - migrated to use API
 */
export const deleteUserPremiumDocument = async (uid: string): Promise<void> => {
  try {
    await PremiumSubscriptionService.deletePremiumDocument(uid);
  } catch (error) {
    throw new Error(
      `Failed to delete premium document: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

// Payment info interface for subscription
export interface SubscriptionPaymentInfo {
  paymentKey: string;
  orderId: string;
  amount: number;
  status: string;
  approvedAt: string | Date | Timestamp;
  card?: CardInfo;
}

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  plan: string;
  paymentInfo?: SubscriptionPaymentInfo;
}

/**
 * Save payment data - migrated to use API
 */
export const savePaymentData = async (
  paymentData: PaymentDataInput,
): Promise<string> => {
  try {
    // Generate a unique payment ID
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await PremiumSubscriptionService.createPaymentRecord(
      paymentId,
      paymentData.userId,
      paymentData,
    );

    return paymentId;
  } catch (error) {
    throw new Error(
      `Failed to save payment data: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * Update user subscription - migrated to use API
 */
export const updateUserSubscription = async (
  uid: string,
  billingKey: string,
  subscriptionInfo?: SubscriptionInfo,
): Promise<void> => {
  try {
    await PremiumSubscriptionService.updateUserSubscription(
      uid,
      billingKey,
      subscriptionInfo,
    );
  } catch (error) {
    throw new Error(
      `Failed to update subscription: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
