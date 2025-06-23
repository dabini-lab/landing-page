import { RefundPolicy } from '../components/RefundPolicy';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';

const RefundPage = () => {
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={`환불 정책 - ${AppConfig.title}`}
        description="다비니 서비스의 환불 정책 및 절차에 대한 안내"
      />

      <RefundPolicy />
    </div>
  );
};

export default RefundPage;
