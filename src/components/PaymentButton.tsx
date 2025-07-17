import { Button, ButtonColor } from '@/button/Button';

interface PaymentButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Button xl color={ButtonColor.PRIMARY}>
          {children}
        </Button>
      </button>
    </div>
  );
};
