import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

// 결제 확인 요청 파라미터
interface ConfirmPaymentParams {
  paymentKey: string;
  orderId: string;
  amount: string;
}

// 카드 정보 타입
interface CardInfo {
  issuerCode: string;
  acquirerCode: string;
  number: string;
  installmentPlanMonths: number;
  isInterestFree: boolean;
  interestPayer: string | null;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus: string;
  amount: number;
}

// 영수증 정보 타입
interface ReceiptInfo {
  url: string;
}

// 체크아웃 정보 타입
interface CheckoutInfo {
  url: string;
}

// 결제 확인 응답 타입
interface ConfirmPaymentResult {
  mId: string;
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  taxExemptionAmount: number;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean;
  card: CardInfo | null;
  virtualAccount: unknown;
  transfer: unknown;
  mobilePhone: unknown;
  giftCertificate: unknown;
  cashReceipt: unknown;
  cashReceipts: unknown;
  discount: unknown;
  cancels: unknown;
  secret: string;
  type: string;
  easyPay: unknown;
  country: string;
  failure: unknown;
  isPartialCancelable: boolean;
  receipt: ReceiptInfo;
  checkout: CheckoutInfo;
  currency: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  method: string;
  version: string;
  metadata: unknown;
}

// 에러 응답 타입
interface ApiErrorResponse {
  error?: string;
  message?: string;
  code?: string;
}

// 커스텀 에러 클래스
class PaymentConfirmError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'PaymentConfirmError';
  }
}

// 결제 확인 API 함수
async function confirmPaymentApi(
  params: ConfirmPaymentParams,
): Promise<ConfirmPaymentResult> {
  try {
    const response = await fetch('/api/payments/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data: ConfirmPaymentResult | ApiErrorResponse = await response.json();

    if (!response.ok) {
      const errorData = data as ApiErrorResponse;
      throw new PaymentConfirmError(
        errorData.error || errorData.message || '결제 승인 실패',
        errorData.code,
        response.status,
      );
    }

    return data as ConfirmPaymentResult;
  } catch (error) {
    // 네트워크 오류 또는 JSON 파싱 오류 처리
    if (error instanceof PaymentConfirmError) {
      throw error;
    }

    throw new PaymentConfirmError(
      '결제 승인 요청 중 오류가 발생했습니다.',
      'NETWORK_ERROR',
    );
  }
}

// 결제 확인 훅 옵션 타입
type UseConfirmPaymentOptions = Omit<
  UseMutationOptions<
    ConfirmPaymentResult,
    PaymentConfirmError,
    ConfirmPaymentParams
  >,
  'mutationFn'
>;

// 결제 확인 훅
export function useConfirmPayment(options?: UseConfirmPaymentOptions) {
  return useMutation<
    ConfirmPaymentResult,
    PaymentConfirmError,
    ConfirmPaymentParams
  >({
    mutationFn: confirmPaymentApi,
    // 기본 옵션 설정
    retry: (failureCount, error) => {
      // 클라이언트 에러(4xx)는 재시도하지 않음
      if (error.status && error.status >= 400 && error.status < 500) {
        return false;
      }
      // 최대 3번까지 재시도 (더 많은 재시도)
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => {
      // 더 긴 대기 시간: 1초, 2초, 4초
      return Math.min(1000 * 2 ** attemptIndex, 10000);
    },
    ...options, // 사용자 정의 옵션으로 덮어씌움
  });
}

// 사용 예시:
/*
const paymentMutation = useConfirmPayment({
  onSuccess: (data) => {
    console.log('결제 성공:', data);
    // 성공 시 처리 로직
  },
  onError: (error) => {
    console.error('결제 실패:', error.message);
    // 에러 처리 로직
  },
});

// 결제 확인 실행
const handlePayment = () => {
  paymentMutation.mutate({
    paymentKey: 'payment_key_123',
    orderId: 'order_123',
    amount: '10000',
  });
};
*/

// useQuery 버전 (결제 정보를 조회할 때 사용)
type UseConfirmPaymentQueryOptions = Omit<
  UseQueryOptions<ConfirmPaymentResult, PaymentConfirmError>,
  'queryKey' | 'queryFn'
>;

export function useConfirmPaymentQuery(
  params: ConfirmPaymentParams,
  options?: UseConfirmPaymentQueryOptions,
) {
  return useQuery<ConfirmPaymentResult, PaymentConfirmError>({
    queryKey: ['confirmPayment', params],
    queryFn: () => confirmPaymentApi(params),
    enabled: !!params.paymentKey && !!params.orderId && !!params.amount,
    retry: (failureCount, error) => {
      // 클라이언트 에러(4xx)는 재시도하지 않음
      if (error.status && error.status >= 400 && error.status < 500) {
        return false;
      }
      // 최대 3번까지 재시도
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    ...options,
  });
}

/*
// useQuery 사용 예시:
const { data, error, isLoading, refetch } = useConfirmPaymentQuery({
  paymentKey: 'payment_key_123',
  orderId: 'order_123',
  amount: '10000',
}, {
  enabled: true, // 즉시 실행
  staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
});
*/
