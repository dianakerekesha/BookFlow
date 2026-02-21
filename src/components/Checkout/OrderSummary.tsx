import type { CartItem } from '@/types/Book.ts';
import { TYPOGRAPHY } from '@/constants/typography';

interface OrderSummaryProps {
  items: CartItem[];
}

const getPrice = (item: CartItem) => item.priceDiscount ?? item.priceRegular;

export const OrderSummary = ({ items }: OrderSummaryProps) => {
  const total = items.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0,
  );

  return (
    <div className="bg-gray-50 rounded p-8 sticky top-24">
      <h2 className={`${TYPOGRAPHY.h4} text-gray-900`}>Order summary</h2>
      <p className={`${TYPOGRAPHY.small} text-gray-400 mt-1 mb-6`}>
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </p>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3"
          >
            <div className="relative shrink-0">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-13 h-17 object-cover rounded-sm"
              />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`${TYPOGRAPHY.buttons} text-gray-900 truncate`}>
                {item.name}
              </p>
              <p className={`${TYPOGRAPHY.small} text-gray-400`}>
                {item.author}
              </p>
            </div>
            <span
              className={`${TYPOGRAPHY.buttons} font-bold text-gray-900 whitespace-nowrap`}
            >
              ${(getPrice(item) * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-gray-200 my-5" />

      <div className="flex justify-between mb-2.5">
        <span className={`${TYPOGRAPHY.body} text-gray-500`}>Subtotal</span>
        <span className={`${TYPOGRAPHY.body} text-gray-500`}>
          ${total.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className={`${TYPOGRAPHY.body} text-gray-500`}>Shipping</span>
        <span className={`${TYPOGRAPHY.body} text-gray-500`}>
          Calculated at next step
        </span>
      </div>

      <div className="h-px bg-gray-200 my-5" />

      <div className="flex justify-between items-baseline">
        <span className={`${TYPOGRAPHY.buttons} font-bold text-gray-900`}>
          Total
        </span>
        <span className={`${TYPOGRAPHY.h2} text-gray-900 tracking-tight`}>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
