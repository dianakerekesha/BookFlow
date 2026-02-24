import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { DownloadInvoiceButton } from '@/components/Invoices';
import type { Order } from '@/types/Order';
import { ORDER_STATUS_CONFIG } from '../constants/orderStatusConfig';
import { formatDate } from '../helpers/formatDate';

interface OrderItemProps {
  order: Order;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const navigate = useNavigate();

  const statusConfig =
    ORDER_STATUS_CONFIG[order.status] ?? ORDER_STATUS_CONFIG.pending;
  const StatusIcon = statusConfig.icon;

  const handleNavigateToOrder = () => {
    navigate(`/order-success/${order.id}`);
  };

  const handleStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleNavigateToOrder}
      className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            #{order.id.slice(0, 12)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDate(order.createdAt)} · {order.items.length} книг(и)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
            statusConfig.className,
          )}
        >
          <StatusIcon className="w-3 h-3" />
          {statusConfig.label}
        </span>
        <span className="text-sm font-semibold text-foreground min-w-[56px] text-right">
          ${order.total.toFixed(2)}
        </span>
        {order.status === 'paid' && (
          <div
            onClick={handleStopPropagation}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <DownloadInvoiceButton order={order} />
          </div>
        )}
        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
