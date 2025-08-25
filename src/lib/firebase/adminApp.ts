import {
  cert,
  getApps,
  initializeApp as initializeAdminApp,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK for server-side operations
// This provides admin privileges to bypass Firestore security rules

let adminApp: any;

function getAdminApp() {
  if (!adminApp) {
    // Check if admin app is already initialized
    const existingApps = getApps();
    if (existingApps.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      adminApp = existingApps[0];
    } else if (process.env.NODE_ENV !== 'development') {
      if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error(
          'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required for production',
        );
      }

      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      );

      adminApp = initializeAdminApp({
        credential: cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } else {
      // For development/emulator, initialize without credentials
      adminApp = initializeAdminApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dabini-stg',
      });
    }
  }
  return adminApp;
}

export function getAdminFirestore() {
  const app = getAdminApp();
  const firestore = getFirestore(app, 'user'); // Use default database

  // Use emulator in development
  if (process.env.NODE_ENV === 'development') {
    // Set emulator settings if not already set
    try {
      firestore.settings({
        host: 'localhost:8080',
        ssl: false,
      });
    } catch (error) {
      // Settings may already be configured, ignore error
    }
  }

  return firestore;
}

export default getAdminApp;
