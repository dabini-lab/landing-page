import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { PaymentButton } from './PaymentButton';

interface PremiumPlanCardProps {
  onSubscriptionPayment: () => Promise<void>;
  isPaymentReady: boolean;
  isLoading: boolean;
}

export const PremiumPlanCard: React.FC<PremiumPlanCardProps> = ({
  onSubscriptionPayment,
  isPaymentReady,
  isLoading,
}) => {
  const { user } = useAuth();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handlePaymentClick = async () => {
    if (!user) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000); // 3초 후 메시지 숨김
      return;
    }

    try {
      await onSubscriptionPayment();
    } catch (error) {
      // 에러 처리는 상위 컴포넌트에서 처리
      // eslint-disable-next-line no-console
      console.error('구독 결제 중 오류:', error);
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
          <p className="mt-2 text-gray-600">Dabini의 모든 기능을 활용하세요.</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">₩5,900</span>
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

        <div className="mt-8 space-y-4">
          {showLoginMessage && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-center">
                <svg
                  className="mr-2 size-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-yellow-800">
                  구독을 시작하려면 먼저 로그인해 주세요.
                </p>
              </div>
            </div>
          )}

          <PaymentButton
            onClick={handlePaymentClick}
            disabled={!isPaymentReady || isLoading}
          >
            {isPaymentReady ? '정기 구독 시작' : '결제 모듈 로딩 중...'}
          </PaymentButton>

          <p className="mt-4 text-center text-sm text-gray-500">
            <Link
              href="/refund"
              className="text-blue-600 underline hover:text-blue-800"
            >
              환불 정책
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
