import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { Card } from './Card';
import { OrderItem } from './OrderItem';
import { useUserOrders } from '../hooks/useUserOrders';

export const OrdersSection = () => {
  const {
    orders,
    visibleOrders,
    isLoading,
    isShowingAll,
    hasMoreOrders,
    handleToggleShowAll,
  } = useUserOrders();

  if (isLoading) {
    return (
      <Card>
        <div className="h-6 w-48 bg-muted rounded animate-pulse mb-6" />
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-16 bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className={cn(TYPOGRAPHY.h4, 'text-foreground mb-6')}>
        Історія замовлень
      </h2>

      {orders.length === 0 ?
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
          <Package className="w-12 h-12 opacity-30" />
          <p className="text-sm">Замовлень ще немає</p>
        </div>
      : <div className="flex flex-col gap-3">
          {visibleOrders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
            />
          ))}

          {hasMoreOrders && (
            <button
              onClick={handleToggleShowAll}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors mt-1"
            >
              {isShowingAll ?
                <>
                  <ChevronUp className="w-4 h-4" />
                  Згорнути
                </>
              : <>
                  <ChevronDown className="w-4 h-4" />
                  Показати всі ({orders.length})
                </>
              }
            </button>
          )}
        </div>
      }
    </Card>
  );
};
