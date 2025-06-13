// Returns an authenticated client SDK instance for use in Server Side Rendering
// and Static Site Generation
//
// ⚠️ SERVER-SIDE ONLY: This function should only be called from server components

import type { FirebaseApp } from 'firebase/app';
import { initializeApp, initializeServerApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { cookies } from 'next/headers';

// or API routes. Do not use in client components.
export default async function getAuthenticatedAppForUser(): Promise<{
  firebaseServerApp: FirebaseApp;
  currentUser: User | null;
}> {
  const authIdToken: string | undefined = (await cookies()).get(
    '__session',
  )?.value;

  // Firebase Server App is a new feature in the JS SDK that allows you to
  // instantiate the SDK with credentials retrieved from the client & has
  // other affordances for use in server environments.
  const firebaseServerApp: FirebaseApp = initializeServerApp(
    // https://github.com/firebase/firebase-js-sdk/issues/8863#issuecomment-2751401913
    initializeApp(),
    {
      authIdToken,
    },
  );

  const auth: Auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}
