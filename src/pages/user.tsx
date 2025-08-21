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
import { getUserPremiumData, type UserPremiumData } from '@/lib/firebase/user';

// Helper function to format timestamp to readable date
type TimestampLike = { toDate: () => Date };
const formatDate = (
  timestamp: TimestampLike | Date | string | null | undefined,
): string => {
  if (!timestamp) return '없음';

  // Handle Firestore Timestamp
  const date =
    typeof timestamp === 'object' && timestamp !== null && 'toDate' in timestamp
      ? (timestamp as TimestampLike).toDate()
      : new Date(timestamp as Date | string);

  // Use UTC methods to get UTC date components
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  // Create a new date with UTC components to format in UTC
  const utcDate = new Date(Date.UTC(year, month, day));

  return utcDate.toLocaleDateString('ko-KR', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function UserPage() {
  const [user, setUser] = useState<any>(null);
  const [premiumData, setPremiumData] = useState<UserPremiumData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Fetch premium data for the user
        try {
          const premium = await getUserPremiumData(authUser.uid);
          setPremiumData(premium);
        } catch (err) {
          setError('프리미엄 데이터를 불러오는데 실패했습니다');
        }
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
      setError(err instanceof Error ? err.message : '계정 삭제에 실패했습니다');
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
          <div className="text-center">로딩 중...</div>
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

          {/* Premium Status Section */}
          <div className="mt-6 rounded-lg border bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              프리미엄 상태
            </h2>
            {premiumData ? (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">프리미엄 사용자:</span>
                  <span
                    className={`font-medium ${premiumData.isPremium ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {premiumData.isPremium ? '✓ 예' : '✗ 아니오'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">구독 상태:</span>
                  <span
                    className={`font-medium ${
                      premiumData.subscriptionStatus === 'active'
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {(() => {
                      switch (premiumData.subscriptionStatus) {
                        case 'active':
                          return '✓ 활성';
                        case 'cancelled':
                          return '✗ 취소됨';
                        case 'expired':
                          return '✗ 만료됨';
                        default:
                          return '✗ 비활성';
                      }
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">구독 만료일:</span>
                  <span className="font-medium text-gray-900">
                    {premiumData.subscriptionEndDate
                      ? formatDate(premiumData.subscriptionEndDate)
                      : '없음'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-gray-500">
                프리미엄 정보를 불러오는 중...
              </p>
            )}
          </div>

          <div className="mt-8 space-y-4">
            {error && (
              <div className="rounded bg-red-50 p-3 text-red-700">{error}</div>
            )}

            <button
              color={ButtonColor.PRIMARY}
              onClick={handleSignOut}
              className="w-full"
            >
              로그아웃
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              {isLoading ? '삭제 중...' : '계정 삭제'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 홈으로 돌아가기
            </button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 max-w-sm rounded-lg bg-white p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900">계정 삭제</h3>
              <p className="mt-2 text-sm text-gray-600">
                정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={confirmDeleteAccount}
                  className="flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                >
                  삭제
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>
    </Background>
  );
}
