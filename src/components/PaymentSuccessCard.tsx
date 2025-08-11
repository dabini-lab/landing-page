import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useBillingResult } from '../hooks/useBillingResult';
import { usePaymentResult } from '../hooks/usePaymentResult';
import { LoadingSpinner } from './LoadingSpinner';

export const PaymentSuccessCard: React.FC = () => {
  const searchParams = useSearchParams();
  const resultData = usePaymentResult();
  const billingData = useBillingResult();
  const [showError, setShowError] = useState(false);

  // URL 파라미터를 기반으로 빌링 결제 여부 판단
  const authKey = searchParams.get('authKey');
  const customerKey = searchParams.get('customerKey');
  const isBillingPayment = !!(authKey && customerKey);

  // 에러 발생 시 3초 후에 에러 UI 표시
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const hasError = isBillingPayment ? billingData.error : resultData.error;
    const isLoading = isBillingPayment
      ? billingData.isLoading
      : resultData.isLoading;

    if (hasError && !isLoading) {
      timer = setTimeout(() => {
        setShowError(true);
      }, 3000); // 3초 대기 후 에러 표시
    } else {
      setShowError(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    billingData.error,
    billingData.isLoading,
    resultData.error,
    resultData.isLoading,
    isBillingPayment,
  ]);

  // 로딩 중이거나 에러가 있지만 아직 표시하지 않을 때
  const isCurrentlyLoading = isBillingPayment
    ? billingData.isLoading
    : resultData.isLoading;
  const currentError = isBillingPayment ? billingData.error : resultData.error;

  if (isCurrentlyLoading || (currentError && !showError)) {
    return <LoadingSpinner />;
  }

  // 에러 표시 조건: 에러가 있고 showError가 true일 때
  if (currentError && showError) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="size-6 text-red-600"
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
          <h2 className="mt-4 text-xl font-semibold text-red-600">에러 발생</h2>
          <p className="mt-2 text-gray-600">{currentError}</p>
          <div className="mt-6">
            <Link
              href="/pricing"
              className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              다시 시도하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg">
      {/* 개발용 디버그 정보 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 rounded-md bg-yellow-50 p-4">
          <h4 className="text-sm font-medium text-yellow-800">
            Debug Info (개발 모드)
          </h4>
          <div className="mt-2 text-xs text-yellow-700">
            <p>
              Current URL:{' '}
              {typeof window !== 'undefined' ? window.location.href : 'N/A'}
            </p>
          </div>
          <pre className="mt-2 text-xs text-yellow-700">
            {JSON.stringify(
              {
                urlParams: {
                  authKey: authKey ? 'present' : 'missing',
                  customerKey: customerKey ? 'present' : 'missing',
                  paymentKey: searchParams.get('paymentKey')
                    ? 'present'
                    : 'missing',
                  orderId: searchParams.get('orderId') ? 'present' : 'missing',
                  amount: searchParams.get('amount') ? 'present' : 'missing',
                },
                resultData,
                billingData,
                isBillingPayment,
              },
              null,
              2,
            )}
          </pre>
        </div>
      )}

      {/* 성공 헤더 */}
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="size-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isBillingPayment
            ? '구독이 완료되었습니다!'
            : '결제가 완료되었습니다!'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isBillingPayment
            ? 'Dabini Premium 구독이 시작되었습니다. 모든 프리미엄 기능을 이용하실 수 있습니다.'
            : 'Dabini Premium 구독을 이용해주셔서 감사합니다.'}
        </p>
      </div>

      {/* 결제/구독 정보 */}
      <div className="mt-8 rounded-md bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          {isBillingPayment ? '구독 정보' : '결제 정보'}
        </h3>
        <div className="space-y-3">
          {isBillingPayment ? (
            // 빌링 결제 정보
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">구독 상품</span>
                <span className="font-medium text-gray-900">
                  Dabini Premium 월간 구독
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">구독 시작일</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">다음 결제일</span>
                <span className="font-medium text-gray-900">
                  {(() => {
                    // 한국 시간으로 다음 달 같은 날 23:59:59로 계산
                    const koreaTime = new Date();
                    koreaTime.setHours(koreaTime.getHours() + 9); // UTC to KST
                    const nextPaymentDate = new Date(koreaTime);
                    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                    return nextPaymentDate.toLocaleDateString('ko-KR');
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">월 요금</span>
                <span className="font-medium text-gray-900">₩5,990</span>
              </div>
            </>
          ) : (
            // 일반 결제 정보
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">주문 번호</span>
                <span className="font-medium text-gray-900">
                  {resultData.orderId || '정보 없음'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">상품명</span>
                <span className="font-medium text-gray-900">
                  {resultData.orderName || '정보 없음'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 금액</span>
                <span className="font-medium text-gray-900">
                  {resultData.amount
                    ? `₩${Number(resultData.amount).toLocaleString()}`
                    : '정보 없음'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 방법</span>
                <span className="font-medium text-gray-900">
                  {resultData.paymentType || '신용카드'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 일시</span>
                <span className="font-medium text-gray-900">
                  {resultData.approvedAt
                    ? new Date(resultData.approvedAt).toLocaleString('ko-KR')
                    : '정보 없음'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 다음 단계 안내 */}
      <div className="mt-8 rounded-md bg-blue-50 p-6">
        <h3 className="mb-2 text-lg font-medium text-blue-900">다음 단계</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-center">
            <svg
              className="mr-2 size-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Premium 기능이 즉시 활성화되었습니다
          </li>
          <li className="flex items-center">
            <svg
              className="mr-2 size-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            언제든지 구독 관리가 가능합니다
          </li>
        </ul>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="flex-1 rounded-md bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700"
        >
          서비스 이용하기
        </Link>
        <Link
          href="/account/subscription"
          className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-center text-gray-700 transition-colors hover:bg-gray-50"
        >
          구독 관리
        </Link>
      </div>

      {/* 고객 지원 */}
      <div className="mt-6 text-center text-sm text-gray-500">
        문의사항이 있으시면{' '}
        <Link href="/support" className="text-blue-600 hover:underline">
          고객지원
        </Link>
        으로 연락주세요.
      </div>
    </div>
  );
};
