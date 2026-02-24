import type { PaymentMethod } from '@/types/Order';
import { PAYMENT_METHODS } from '../constants/paymentMethods';
import { TYPOGRAPHY } from '@/constants/typography';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = ({
  value,
  onChange,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className={`${TYPOGRAPHY.uppercase} text-gray-400`}>Payment method</p>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {PAYMENT_METHODS.map((method) => {
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
