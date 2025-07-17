import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PaymentFailCard } from '@/components/PaymentFailCard';
import { PaymentResultLayout } from '@/components/PaymentResultLayout';

const PaymentFailContent = () => {
  return (
    <PaymentResultLayout>
      <PaymentFailCard />
    </PaymentResultLayout>
  );
};

const PaymentFailPage = () => {
  return (
    <Suspense
      fallback={
        <PaymentResultLayout>
          <LoadingSpinner />
        </PaymentResultLayout>
      }
    >
      <PaymentFailContent />
    </Suspense>
  );
};

export default PaymentFailPage;
