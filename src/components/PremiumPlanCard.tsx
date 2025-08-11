import Link from 'next/link';

import { PaymentButton } from './PaymentButton';

interface PremiumPlanCardProps {
  onOneTimePayment: () => void;
  onSubscriptionPayment: () => void;
  isPaymentReady: boolean;
  isLoading: boolean;
}

export const PremiumPlanCard: React.FC<PremiumPlanCardProps> = ({
  onOneTimePayment,
  onSubscriptionPayment,
  isPaymentReady,
  isLoading,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
          <p className="mt-2 text-gray-600">Dabini의 모든 기능을 활용하세요.</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">₩5,990</span>
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
          <PaymentButton onClick={onOneTimePayment} disabled>
            일회성 결제 (₩5,990)
          </PaymentButton>

          <PaymentButton
            onClick={onSubscriptionPayment}
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
