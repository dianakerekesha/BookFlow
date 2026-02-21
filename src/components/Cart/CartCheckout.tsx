import React from 'react';
import { Button } from '@/components/ui/button';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';

type Props = {
  total: number;
  totalItems: number;
  onCheckout: () => void;
};

export const CartCheckout: React.FC<Props> = ({
  total,
  totalItems,
  onCheckout,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6">
      <p className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
        ₴{total.toLocaleString()}
      </p>

      <p className={cn(TYPOGRAPHY.body, 'text-muted-foreground')}>
        Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
      </p>

      <div className="w-full border-t border-border" />

      <Button
        onClick={onCheckout}
        className="w-full bg-foreground text-background hover:bg-foreground/90"
        size="lg"
      >
        Checkout
      </Button>
    </div>
  );
};
