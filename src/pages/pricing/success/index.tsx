'use client';

import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PaymentResultLayout } from '@/components/PaymentResultLayout';
import { PaymentSuccessCard } from '@/components/PaymentSuccessCard';

const PaymentSuccessContent = () => {
  return (
    <PaymentResultLayout>
      <PaymentSuccessCard />
    </PaymentResultLayout>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <PaymentResultLayout>
          <LoadingSpinner />
        </PaymentResultLayout>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
