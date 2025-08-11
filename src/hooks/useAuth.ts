import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/lib/firebase/clientApp';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};
