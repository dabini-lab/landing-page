import Link from 'next/link';

import { Logo } from '@/templates/Logo';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';

interface PaymentResultLayoutProps {
  children: React.ReactNode;
}

export const PaymentResultLayout: React.FC<PaymentResultLayoutProps> = ({
  children,
}) => {
  return (
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
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">{children}</div>
        </div>
      </Section>
    </Background>
  );
};
