import Link from 'next/link';
import React from 'react';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from '../templates/Logo';
import { PolicyCard } from './PolicyCard';

const RefundPolicy = () => {
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

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                환불 정책
              </h1>
            </div>

            <div className="space-y-8">
              {/* 환불 요청 절차 */}
              <PolicyCard
                title="환불 요청 절차"
                icon={
                  <svg
                    className="size-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                }
                description={
                  <>
                    서비스에 만족하지 않으시는 경우,{' '}
                    <span className="font-semibold text-blue-600">
                      구매일로부터 7일 이내
                    </span>
                    에 환불을 요청하실 수 있습니다. 환불을 원하시는 경우
                    고객지원팀으로 연락해 주시기 바랍니다.
                  </>
                }
              />

              {/* 환불 조건 */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex size-12 items-center justify-center rounded-xl bg-blue-100">
                    <svg
                      className="size-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    환불 조건
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <div className="size-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-lg text-gray-600">
                      구매일로부터 7일 이내 환불 요청
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <div className="size-2 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="text-lg text-gray-600">
                      정당한 환불 사유가 있는 경우
                    </p>
                  </div>
                </div>
              </div>

              {/* 환불 처리 기간 */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex size-12 items-center justify-center rounded-xl bg-purple-100">
                    <svg
                      className="size-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    환불 처리 기간
                  </h2>
                </div>
                <div className="rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                  <p className="text-lg leading-relaxed text-gray-600">
                    환불 요청이 승인된 후{' '}
                    <span className="font-semibold text-purple-600">
                      영업일 기준 3-5일 내
                    </span>
                    에 원래 결제 방법으로 환불이 처리됩니다. 신용카드의 경우
                    카드사 정책에 따라 추가 시간이 소요될 수 있습니다.
                  </p>
                </div>
              </div>

              {/* 환불 불가 사항 */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex size-12 items-center justify-center rounded-xl bg-red-100">
                    <svg
                      className="size-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    환불 불가 사항
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="size-3 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-600">
                      구매일로부터 7일이 경과한 경우
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="size-3 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-600">
                      이용약관을 위반한 경우
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export { RefundPolicy };
