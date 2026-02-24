import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import type { CartSummaryProps } from '../types';

export const CartSummary = ({
  totalPrice,
  totalQuantity,
}: CartSummaryProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div
      className={cn(
        'w-full lg:max-w-92 rounded-2xl border border-border bg-card p-6',
        'flex flex-col lg:flex-shrink-0 gap-4 items-center text-center',
      )}
    >
      <p className={cn(TYPOGRAPHY.h2, 'text-foreground')}>${totalPrice}</p>
      <p className={cn(TYPOGRAPHY.body, 'text-muted-foreground')}>
        {t('cart.totalFor')} {t('items.count', { count: totalQuantity })}
      </p>
      <div className="w-full border-t border-border" />
      <Button
        onClick={handleCheckout}
        className="w-full bg-foreground text-background hover:bg-popover-foreground"
        size="lg"
      >
        {t('cart.checkout')}
      </Button>
    </div>
  );
};
