'use client';

import Link from 'next/link';

import { Background } from '../background/Background';
import { Button, ButtonColor } from '../button/Button';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Pricing = () => {
  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>
            <Link href="/pricing">가격</Link>
          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900">가격</h1>
          <p className="mt-4 text-xl text-gray-600">
            나에게 맞는 플랜을 선택하기.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
                <p className="mt-2 text-gray-600">
                  Dabini의 모든 기능을 활용하세요.
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₩5,990
                  </span>
                  <span className="text-gray-600">/월</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <svg
                    className="size-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700">무제한 AI 응답</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="size-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700">우선 지원</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="size-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700">고급 AI 기능</span>
                </li>
              </ul>

              <div className="mt-8 text-center">
                <Button xl color={ButtonColor.PRIMARY}>
                  프리미엄 구매
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Background>
  );
};

export { Pricing };
