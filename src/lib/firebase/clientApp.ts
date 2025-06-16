'use client';

import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
// import { type Firestore, getFirestore } from 'firebase/firestore';
// import { type FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: 'landing-page-384bf',
  authDomain: 'localhost',
  apiKey: process.env.FIREBASE_API_KEY || 'PUT_IN_A_DUMMY_API_KEY',
};

// Use automatic initialization
// https://firebase.google.com/docs/app-hosting/firebase-sdks#initialize-with-no-arguments
export const firebaseApp: FirebaseApp =
  process.env.NODE_ENV === 'development'
    ? initializeApp(firebaseConfig)
    : initializeApp();

export const auth: Auth = getAuth(firebaseApp);
// export const db: Firestore = getFirestore(firebaseApp);
// export const storage: FirebaseStorage = getStorage(firebaseApp);

if (process.env.NODE_ENV === 'development') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
  } catch (error) {
    // Emulator already connected
  }
}
