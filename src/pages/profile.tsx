'use client';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Background } from '@/background/Background';
import { ButtonColor } from '@/button/Button';
import { Section } from '@/layout/Section';
import {
  deleteUserAccount,
  onAuthStateChanged,
  signOut,
} from '@/lib/firebase/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleDeleteAccount = async () => {
    setShowConfirmDialog(true);
  };

  const confirmDeleteAccount = async () => {
    setShowConfirmDialog(false);
    setIsLoading(true);
    setError('');

    try {
      await deleteUserAccount();
      await deleteCookie('__session');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await deleteCookie('__session');
    await signOut();
    router.push('/');
  };

  if (!user) {
    return (
      <Background color="bg-gray-100">
        <Section yPadding="py-32">
          <div className="text-center">Loading...</div>
        </Section>
      </Background>
    );
  }

  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-16">
        <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <img
              className="mx-auto size-24 rounded-full object-cover"
              src={user.photoURL || '/profile.svg'}
              alt={`Profile photo of ${user.displayName || 'User'}`}
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              {user.displayName || 'User'}
            </h1>
            <p className="mt-2 text-gray-600">{user.email}</p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              color={ButtonColor.PRIMARY}
              onClick={handleSignOut}
              className="w-full"
            >
              Sign Out
            </button>

            {error && (
              <div className="rounded bg-red-50 p-3 text-red-700">{error}</div>
            )}

            <button
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              {isLoading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 max-w-sm rounded-lg bg-white p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Account
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={confirmDeleteAccount}
                  className="flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>
    </Background>
  );
}
