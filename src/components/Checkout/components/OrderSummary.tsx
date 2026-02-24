import type { CartItem } from '@/types/Book';
import { getItemPrice } from '@/helpers/getItemPrice';
import { OrderSummaryItem } from './OrderSummaryItem';
import { TYPOGRAPHY } from '@/constants/typography';

interface OrderSummaryProps {
  items: CartItem[];
}

export const OrderSummary = ({ items }: OrderSummaryProps) => {
  const total = items.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0,
  );

  const itemCountLabel = items.length === 1 ? 'item' : 'items';

  return (
    <div className="bg-card rounded p-8 sticky top-24">
      <h2 className={`${TYPOGRAPHY.h4} text-foreground`}>Order summary</h2>
      <p className={`${TYPOGRAPHY.small} text-muted-foreground mt-1 mb-6`}>
        {items.length} {itemCountLabel}
      </p>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <OrderSummaryItem
            key={item.id}
            item={item}
          />
        ))}
      </ul>

      <div className="h-px bg-chart-5 my-5" />

      <div className="flex justify-between mb-2.5">
        <span className={`${TYPOGRAPHY.body} text-foreground`}>Subtotal</span>
        <span className={`${TYPOGRAPHY.body} text-foreground`}>
          ${total.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className={`${TYPOGRAPHY.body} text-foreground`}>Shipping</span>
        <span className={`${TYPOGRAPHY.body} text-foreground`}>
          Calculated at next step
        </span>
      </div>

      <div className="h-px bg-chart-5 my-5" />

      <div className="flex justify-between items-baseline">
        <span className={`${TYPOGRAPHY.buttons} font-bold text-foreground`}>
          Total
        </span>
        <span className={`${TYPOGRAPHY.h2} text-foreground tracking-tight`}>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
