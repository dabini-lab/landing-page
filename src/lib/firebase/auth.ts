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

  await signInWithPopup(auth, provider);
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
