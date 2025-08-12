import { useEffect, useState } from 'react';

import type { UserPremiumData } from '@/lib/firebase/user';
import { getUserPremiumData } from '@/lib/firebase/user';

import { useAuth } from './useAuth';

export const usePremiumData = () => {
  const { user } = useAuth();
  const [premiumData, setPremiumData] = useState<UserPremiumData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPremiumData = async () => {
      if (!user?.uid) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('🔐 No user UID available for premium data fetch');
        }
        setIsLoading(false);
        return;
      }

      try {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('📊 Fetching premium data for user:', user.uid);
        }
        setIsLoading(true);
        setError(null);
        const data = await getUserPremiumData(user.uid);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('📊 Premium data fetched:', data);
        }
        setPremiumData(data);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('❌ Error fetching premium data:', err);
        }
        setError(
          err instanceof Error
            ? err.message
            : '데이터를 가져오는데 실패했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPremiumData();
  }, [user?.uid]);

  return {
    premiumData,
    isLoading,
    error,
    refetch: async () => {
      if (user?.uid) {
        try {
          setError(null);
          const data = await getUserPremiumData(user.uid);
          setPremiumData(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : '데이터를 가져오는데 실패했습니다.',
          );
        }
      }
    },
  };
};
