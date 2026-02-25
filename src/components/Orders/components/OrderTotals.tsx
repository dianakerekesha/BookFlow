import { TYPOGRAPHY } from '@/constants/typography';

interface OrderTotalsProps {
  subtotal: string;
  total: string;
  symbol: string;
  paymentMethod: string;
}

export const OrderTotals = ({
  subtotal,
  total,
  symbol,
  paymentMethod,
}: OrderTotalsProps) => (
  <div className="px-6 py-4 border-t border-border bg-card flex flex-col gap-2">
    <div className="flex justify-between">
      <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
        Subtotal
      </span>
      <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
        {symbol}
        {subtotal}
      </span>
    </div>
    <div className="flex justify-between">
      <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
        Payment
      </span>
      <span className={`${TYPOGRAPHY.body} text-muted-foreground capitalize`}>
        {paymentMethod}
      </span>
    </div>
    <div className="flex justify-between pt-2 border-t border-border">
      <span className={`${TYPOGRAPHY.buttons} font-bold text-foreground`}>
        Total
      </span>
      <span className={`${TYPOGRAPHY.h2} text-foreground tracking-tight`}>
        {symbol}
        {total}
      </span>
    </div>
  </div>
);
