export const LoadingSpinner: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-12 text-center shadow-lg">
      <div className="mx-auto size-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <h2 className="mt-6 text-xl font-semibold text-gray-900">
        결제 정보를 확인하고 있습니다...
      </h2>
      <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
    </div>
  );
};
