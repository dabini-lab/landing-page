import Link from 'next/link';

import { usePaymentFail } from '../hooks/usePaymentFail';
import { LoadingSpinner } from './LoadingSpinner';

export const PaymentFailCard: React.FC = () => {
  const failData = usePaymentFail();

  if (failData.isLoading) {
    return <LoadingSpinner />;
  }

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '사용자가 결제를 취소했습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제 진행 중 중단되었습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다.';
      case 'INSUFFICIENT_FUNDS':
        return '잔액이 부족합니다.';
      case 'INVALID_CARD_INFO':
        return '카드 정보가 올바르지 않습니다.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.';
      default:
        return failData.message || '결제 처리 중 오류가 발생했습니다.';
    }
  };

  const getSolutionMessage = (code: string) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '다시 결제를 진행하시려면 아래 버튼을 클릭해주세요.';
      case 'REJECT_CARD_COMPANY':
      case 'INSUFFICIENT_FUNDS':
        return '다른 카드로 시도하거나 카드사에 문의해주세요.';
      case 'INVALID_CARD_INFO':
        return '카드 정보를 다시 확인하고 결제를 시도해주세요.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '내일 다시 시도하거나 다른 결제수단을 이용해주세요.';
      default:
        return '잠시 후 다시 시도하시거나 고객지원에 문의해주세요.';
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      {/* 실패 헤더 */}
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="size-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          결제에 실패했습니다
        </h1>
        <p className="mt-2 text-gray-600">{getErrorMessage(failData.code!)}</p>
      </div>

      {/* 오류 정보 */}
      <div className="mt-8 rounded-md bg-red-50 p-6">
        <h3 className="mb-4 text-lg font-medium text-red-900">오류 정보</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-red-700">오류 코드</span>
            <span className="font-mono text-sm text-red-900">
              {failData.code}
            </span>
          </div>
          {failData.orderId && (
            <div className="flex justify-between">
              <span className="text-red-700">주문 번호</span>
              <span className="font-medium text-red-900">
                {failData.orderId}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-red-700">발생 시간</span>
            <span className="font-medium text-red-900">
              {new Date().toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      </div>

      {/* 해결 방법 안내 */}
      <div className="mt-8 rounded-md bg-yellow-50 p-6">
        <h3 className="mb-2 text-lg font-medium text-yellow-900">해결 방법</h3>
        <p className="text-yellow-800">{getSolutionMessage(failData.code!)}</p>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/pricing"
          className="flex-1 rounded-md bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700"
        >
          다시 결제하기
        </Link>
        <Link
          href="/support"
          className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-center text-gray-700 transition-colors hover:bg-gray-50"
        >
          고객지원 문의
        </Link>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          자주 묻는 질문
        </h3>
        <div className="space-y-4">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 font-medium text-gray-900">
              결제가 실패했는데 돈이 빠져나갔어요
              <svg
                className="size-5 text-gray-500 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-2 p-4 text-sm text-gray-600">
              결제 실패 시 승인된 금액은 자동으로 취소됩니다. 카드사에 따라 취소
              처리까지 1-3영업일이 소요될 수 있습니다.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 font-medium text-gray-900">
              다른 결제 방법은 없나요?
              <svg
                className="size-5 text-gray-500 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="mt-2 p-4 text-sm text-gray-600">
              현재 신용카드 결제만 지원하고 있습니다. 향후 계좌이체, 간편결제 등
              다양한 결제 수단을 추가할 예정입니다.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};
