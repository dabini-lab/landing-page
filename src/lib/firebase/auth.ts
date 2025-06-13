import {
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

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
}

export async function signOut(): Promise<void> {
  try {
    return await auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
    throw error;
  }
}
