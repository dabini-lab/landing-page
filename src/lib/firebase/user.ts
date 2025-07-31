import type { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  runTransaction,
  type Timestamp,
} from 'firebase/firestore';

import { userDb } from '@/lib/firebase/clientApp';

export interface UserPremiumData {
  is_premium: boolean;
  is_subscribing: boolean;
  subscription_end_date: Timestamp | null;
}

export const createUserPremiumDocument = async (user: User): Promise<void> => {
  const premiumCollection = collection(userDb, 'premium');

  // Use user.uid as document ID to enforce uniqueness naturally
  const userDocRef = doc(premiumCollection, user.uid);
  const userData: UserPremiumData = {
    is_premium: false,
    is_subscribing: false,
    subscription_end_date: null,
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
