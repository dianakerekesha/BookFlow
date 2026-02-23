import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '@/services/paymentAPI';
import type { Order } from '@/types/Order';
import { DownloadInvoiceButton } from '@/components/Invoices';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { showError } from '@/lib/toast';
import {
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Package,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

// ─── Config ───────────────────────────────────────────────────────────────────

const ORDERS_PREVIEW = 3;

const STATUS_CONFIG = {
  paid: {
    label: 'Оплачено',
    icon: CheckCircle,
    cls: 'text-[#27ae60] bg-[#27ae60]/10',
  },
  processing: {
    label: 'Обробляється',
    icon: Clock,
    cls: 'text-amber-500 bg-amber-500/10',
  },
  pending: {
    label: 'Очікує',
    icon: Clock,
    cls: 'text-amber-500 bg-amber-500/10',
  },
  failed: {
    label: 'Помилка',
    icon: XCircle,
    cls: 'text-[#eb5757] bg-[#eb5757]/10',
  },
  cancelled: {
    label: 'Скасовано',
    icon: XCircle,
    cls: 'text-[#eb5757] bg-[#eb5757]/10',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'bg-card rounded-2xl border border-border p-6 md:p-8',
      className,
    )}
  >
    {children}
  </div>
);

export const OrdersSection = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOrders()
      .then(setOrders)
      .catch(() => showError('Не вдалося завантажити замовлення'))
      .finally(() => setLoading(false));
  }, []);

  const visibleOrders = showAll ? orders : orders.slice(0, ORDERS_PREVIEW);

  if (loading) {
    return (
      <Card>
        <div className="h-6 w-48 bg-muted rounded animate-pulse mb-6" />
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
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
          {visibleOrders.map((order) => {
            const cfg =
              STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ??
              STATUS_CONFIG.pending;
            const Icon = cfg.icon;

            return (
              <div
                key={order.id}
                onClick={() => navigate(`/order-success/${order.id}`)}
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
                      {formatDate(order.createdAt)} · {order.items.length}{' '}
                      книг(и)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                      cfg.cls,
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground min-w-[56px] text-right">
                    ${order.total.toFixed(2)}
                  </span>
                  {order.status === 'paid' && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <DownloadInvoiceButton order={order} />
                    </div>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}

          {orders.length > ORDERS_PREVIEW && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors mt-1"
            >
              {showAll ?
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
