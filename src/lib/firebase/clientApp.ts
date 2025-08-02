'use client';

import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  type Firestore,
  getFirestore,
} from 'firebase/firestore';
// import { type FirebaseStorage, getStorage } from 'firebase/storage';

// Firebase configuration for development (emulator)
const firebaseConfig = {
  projectId: 'landing-page-384bf',
  authDomain: '127.0.0.1',
  apiKey: 'demo-api-key', // Valid dummy key for emulator
};

// Initialize Firebase app with proper environment handling
function initializeFirebaseApp(): FirebaseApp {
  // Client-side: initialize Firebase
  if (getApps().length === 0) {
    if (process.env.NODE_ENV === 'development') {
      return initializeApp(firebaseConfig);
    }
    // Production: use automatic initialization for Firebase App Hosting
    return initializeApp();
  }

  return getApps()[0]!;
}

export const firebaseApp: FirebaseApp = initializeFirebaseApp();
export const auth: Auth = getAuth(firebaseApp);
export const userDb: Firestore = getFirestore(firebaseApp, 'user');

// Connect to emulators only in development mode on client-side
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
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
