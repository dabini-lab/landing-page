import type { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  runTransaction,
  type Timestamp,
  updateDoc,
} from 'firebase/firestore';

import { userDb } from '@/lib/firebase/clientApp';

export interface UserPremiumData {
  is_premium: boolean;
  is_subscribing: boolean;
  subscription_end_date: Timestamp | null;
  billing_key?: string | null;
  billing_key_created_at?: Timestamp | null;
  subscription_started_at?: Timestamp | null;
}

export const createUserPremiumDocument = async (user: User): Promise<void> => {
  const premiumCollection = collection(userDb, 'premium');

  // Use user.uid as document ID to enforce uniqueness naturally
  const userDocRef = doc(premiumCollection, user.uid);
  const userData: UserPremiumData = {
    is_premium: false,
    is_subscribing: false,
    subscription_end_date: null,
    billing_key: null,
    billing_key_created_at: null,
    subscription_started_at: null,
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

export const updateUserSubscription = async (
  uid: string,
  billingKey: string,
  subscriptionMonths: number = 1,
): Promise<void> => {
  const premiumCollection = collection(userDb, 'premium');
  const userDocRef = doc(premiumCollection, uid);

  // 한국 시간으로 구독 종료일 계산
  // 현재 한국 시간 기준으로 다음 달 같은 날 23:59:59로 설정
  const currentTime = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  // eslint-disable-next-line no-console
  console.log('🕐 현재 시간 (KST):', currentTime.toISOString());

  const subscriptionEndDate = new Date(currentTime);
  subscriptionEndDate.setMonth(
    subscriptionEndDate.getMonth() + subscriptionMonths,
  );
  subscriptionEndDate.setHours(23, 59, 59, 999); // 23:59:59.999로 설정
  // eslint-disable-next-line no-console
  console.log(
    '📅 구독 종료일 (23:59:59 설정):',
    subscriptionEndDate.toISOString(),
  );

  // eslint-disable-next-line no-console
  console.log('📅 구독 종료일 (UTC):', subscriptionEndDate.toISOString());
  // eslint-disable-next-line no-console
  console.log(
    '📅 구독 종료일 (KST):',
    subscriptionEndDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  );

  await updateDoc(userDocRef, {
    is_premium: true,
    is_subscribing: true,
    billing_key: billingKey,
    billing_key_created_at: currentTime,
    subscription_started_at: currentTime,
    subscription_end_date: subscriptionEndDate,
  });
};
