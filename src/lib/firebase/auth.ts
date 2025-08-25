import {
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  signInWithPopup,
  type Unsubscribe,
  type User,
} from 'firebase/auth';

import { auth } from '@/lib/firebase/clientApp';
import PremiumSubscriptionService from '@/services/premiumSubscriptionService';

export function onAuthStateChanged(
  cb: (user: User | null) => void,
): Unsubscribe {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: (user: User | null) => void): Unsubscribe {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  // Create user premium document if it's a new user
  if (result.user) {
    try {
      await PremiumSubscriptionService.createPremiumDocument(result.user.uid);
    } catch (error) {
      // Log error but don't prevent sign in
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error creating premium document:', error);
      }
    }
  }
}

export async function signOut(): Promise<void> {
  return auth.signOut();
}

export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user is currently signed in');
  }

  try {
    await deleteUser(user);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete account: ${error.message}`);
    }
    throw new Error('Failed to delete account');
  }
};
