'use client';

import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  type Firestore,
  getFirestore,
} from 'firebase/firestore';
// import { type FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: 'landing-page-384bf',
  authDomain: '127.0.0.1',
  apiKey: process.env.FIREBASE_API_KEY || 'PUT_IN_A_DUMMY_API_KEY',
};

// Use automatic initialization
// https://firebase.google.com/docs/app-hosting/firebase-sdks#initialize-with-no-arguments
export const firebaseApp: FirebaseApp =
  process.env.NODE_ENV === 'development'
    ? initializeApp(firebaseConfig)
    : initializeApp();

export const auth: Auth = getAuth(firebaseApp);
export const userDb: Firestore = getFirestore(firebaseApp, 'user');
// export const storage: FirebaseStorage = getStorage(firebaseApp);

// Connect to emulators in development mode
if (process.env.NODE_ENV === 'development') {
  try {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
      disableWarnings: true,
    });
  } catch (error) {
    // Auth emulator already connected or unavailable
  }

  try {
    connectFirestoreEmulator(userDb, '127.0.0.1', 8080);
  } catch (error) {
    // Firestore emulator already connected or unavailable
  }
}
