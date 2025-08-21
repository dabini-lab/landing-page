import type { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  runTransaction,
  type Timestamp,
  updateDoc,
} from 'firebase/firestore';

import { userDb } from '@/lib/firebase/clientApp';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
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
  card?: any;
  orderName: string;
  customerKey: string;
  billingKey: string;
  createdAt: Timestamp;
}

export const createUserPremiumDocument = async (user: User): Promise<void> => {
  const premiumCollection = collection(userDb, 'premium');

  // Use user.uid as document ID to enforce uniqueness naturally
  const userDocRef = doc(premiumCollection, user.uid);
  const userData: UserPremiumData = {
    isPremium: false,
    subscriptionEndDate: null,
    billingKey: null,
    billingKeyCreatedAt: null,
    subscriptionStartedAt: null,
    subscriptionStatus: SubscriptionStatus.INACTIVE,
  };

  // Use transaction to check if document exists before creating
  await runTransaction(userDb, async (transaction) => {
    const docSnap = await transaction.get(userDocRef);

    if (!docSnap.exists()) {
      transaction.set(userDocRef, userData);
    }
  });
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

export const deleteUserPremiumDocument = async (uid: string): Promise<void> => {
  const premiumCollection = collection(userDb, 'premium');
  const userDocRef = doc(premiumCollection, uid);

  await deleteDoc(userDocRef);
};

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  plan: string;
  paymentInfo?: any;
}

// 결제 정보를 payments collection에 저장
export const savePaymentData = async (
  paymentData: Omit<PaymentData, 'createdAt'>,
): Promise<string> => {
  const paymentsCollection = collection(userDb, 'payments');

  const paymentDoc = {
    ...paymentData,
    // approvedAt을 Date 객체로 변환 (이미 ISO string인 경우)
    approvedAt:
      typeof paymentData.approvedAt === 'string'
        ? new Date(paymentData.approvedAt)
        : paymentData.approvedAt,
    createdAt: new Date(),
  };

  const docRef = await addDoc(paymentsCollection, paymentDoc);
  return docRef.id;
};

export const updateUserSubscription = async (
  uid: string,
  billingKey: string,
  subscriptionInfo?: SubscriptionInfo,
): Promise<void> => {
  const premiumCollection = collection(userDb, 'premium');
  const userDocRef = doc(premiumCollection, uid);

  // 한국 시간으로 구독 종료일 계산
  // 현재 한국 시간 기준으로 다음 달 같은 날 23:59:59로 설정
  const currentTime = new Date();
  const subscriptionEndDate = new Date(currentTime);
  subscriptionEndDate.setUTCMonth(subscriptionEndDate.getUTCMonth() + 1);

  const updateData: any = {
    isPremium: true,
    billingKey,
    billingKeyCreatedAt: currentTime,
    subscriptionStartedAt: currentTime,
    subscriptionEndDate,
    subscriptionStatus: SubscriptionStatus.ACTIVE, // Default to active when subscription is updated
  };

  // 추가 구독 정보가 있으면 포함 (last_payment_info는 제외)
  if (subscriptionInfo) {
    const { status } = subscriptionInfo;
    updateData.subscriptionStatus = status;
    updateData.subscriptionPlan = subscriptionInfo.plan;

    // isPremium은 subscription status에 따라 결정
    updateData.isPremium = status === SubscriptionStatus.ACTIVE;

    // 결제 정보는 별도의 payments collection에 저장
    if (subscriptionInfo.paymentInfo) {
      await savePaymentData({
        userId: uid,
        paymentKey: subscriptionInfo.paymentInfo.paymentKey,
        orderId: subscriptionInfo.paymentInfo.orderId,
        amount: subscriptionInfo.paymentInfo.amount,
        status: subscriptionInfo.paymentInfo.status,
        approvedAt: subscriptionInfo.paymentInfo.approvedAt,
        card: subscriptionInfo.paymentInfo.card,
        orderName: 'Dabini Premium 구독',
        customerKey: uid,
        billingKey,
      });
    }
  }

  await updateDoc(userDocRef, updateData);
};
