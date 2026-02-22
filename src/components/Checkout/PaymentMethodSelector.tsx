import type { JSX } from 'react';
import type { PaymentMethod } from '@/types/Order';
import { TYPOGRAPHY } from '@/constants/typography';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const METHODS: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: JSX.Element;
}[] = [
  {
    id: 'stripe',
    label: 'Card',
    description: 'Visa, Mastercard, Apple Pay',
    icon: (
      <svg
        width="38"
        height="24"
        viewBox="0 0 38 24"
        fill="none"
      >
        <rect
          width="38"
          height="24"
          rx="4"
          fill="#635BFF"
        />
        <path
          d="M17.5 9.3c0-.8.7-1.1 1.7-1.1 1.5 0 3.5.5 4.8 1.2V6.2C22.7 5.5 21 5 19.2 5 16 5 14 6.6 14 9.5c0 4.5 6.2 3.8 6.2 5.7 0 .9-.8 1.2-1.9 1.2-1.6 0-3.7-.7-5.3-1.6v3.3c1.8.8 3.6 1.1 5.3 1.1 3.3 0 5.5-1.6 5.5-4.5-.1-4.8-6.3-4-6.3-5.4z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: 'liqpay',
    label: 'LiqPay',
    description: 'Приват24, monobank, картка',
    icon: (
      <svg
        width="38"
        height="24"
        viewBox="0 0 38 24"
        fill="none"
      >
        <rect
          width="38"
          height="24"
          rx="4"
          fill="#00AAFF"
        />
        <text
          x="6"
          y="16"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="10"
          fill="white"
        >
          LiqPay
        </text>
      </svg>
    ),
  },
];

export const PaymentMethodSelector = ({
  value,
  onChange,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className={`${TYPOGRAPHY.uppercase} text-gray-400`}>Payment method</p>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {METHODS.map((method) => {
          const isSelected = value === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={[
                'flex items-center gap-4 p-4 rounded border-2 text-left transition-all duration-150 cursor-pointer',
                isSelected ?
                  'border-gray-900 bg-gray-50'
                : 'border-gray-200 bg-white hover:border-gray-400',
              ].join(' ')}
            >
              <span
                className={[
                  'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
                  isSelected ? 'border-gray-900' : 'border-gray-300',
                ].join(' ')}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-gray-900" />
                )}
              </span>

              {method.icon}

              <div className="flex flex-col min-w-0">
                <span className={`${TYPOGRAPHY.buttons} text-gray-900`}>
                  {method.label}
                </span>
                <span className={`${TYPOGRAPHY.small} text-gray-400 truncate`}>
                  {method.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
