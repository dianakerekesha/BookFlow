import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getLiqPayPayload } from '@/services/paymentAPI';
import { TYPOGRAPHY } from '@/constants/typography';
import { LiqPayForm } from './LiqPayForm';

interface LiqPayButtonProps {
  orderId: string;
  amount: number;
  onError: (message: string) => void;
}

export const LiqPayButton = ({
  orderId,
  amount,
  onError,
}: LiqPayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState<{
    data: string;
    signature: string;
  } | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await getLiqPayPayload(orderId, amount);
      setPayload(result);
    } catch (error) {
      const message =
        error instanceof Error && error.message ?
          error.message
        : 'Failed to initialize LiqPay payment. Please try again.';
      onError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {payload && (
        <LiqPayForm
          data={payload.data}
          signature={payload.signature}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded">
          <svg
            width="48"
            height="20"
            viewBox="0 0 48 20"
            fill="none"
          >
            <rect
              width="48"
              height="20"
              rx="3"
              fill="#00AAFF"
            />
            <text
              x="7"
              y="14"
              fontFamily="Arial"
              fontWeight="bold"
              fontSize="9"
              fill="white"
            >
              LiqPay
            </text>
          </svg>
          <p className={`${TYPOGRAPHY.small} text-blue-700`}>
            Visa, Mastercard, Приват24, monobank — захищена оплата через LiqPay
          </p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className={`h-14 bg-[#00AAFF] hover:bg-[#0095e0] disabled:opacity-60 disabled:cursor-not-allowed text-white ${TYPOGRAPHY.uppercase} rounded transition-colors flex items-center justify-center`}
        >
          {isLoading ?
            <Loader2 className="w-5 h-5 animate-spin" />
          : 'Pay with LiqPay'}
        </button>

        <p className={`${TYPOGRAPHY.small} text-gray-400 text-center`}>
          You will be redirected to LiqPay&#39;s secure payment page
        </p>
      </div>
    </>
  );
};
