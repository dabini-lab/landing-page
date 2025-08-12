'use client';

import Link from 'next/link';

import { PremiumPlanCard } from '@/components/PremiumPlanCard';

import { Background } from '../background/Background';
import { usePaymentHandlers } from '../hooks/usePaymentHandlers';
import { useTossPayments } from '../hooks/useTossPayments';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

// TossPayments SDK 타입 선언
declare global {
  interface Window {
    TossPayments: any;
  }
}

const Pricing = () => {
  const { isScriptLoaded, payment, isLoading } = useTossPayments();
  const { handleSubscriptionPayment } = usePaymentHandlers(payment);

  return (
    <>
      <Background color="bg-gray-100">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />}>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/pricing">구매</Link>
            </li>
          </NavbarTwoColumns>
        </Section>

        <Section yPadding="pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900">구매</h1>
            <p className="mt-4 text-xl text-gray-600">
              나에게 맞는 플랜을 선택하기.
            </p>
          </div>

          <div className="mt-16 flex justify-center">
            <PremiumPlanCard
              onSubscriptionPayment={handleSubscriptionPayment}
              isPaymentReady={isScriptLoaded}
              isLoading={isLoading}
            />
          </div>
        </Section>
      </Background>
    </>
  );
};

export { Pricing };
