import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { Order } from '@/types/Order';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils.ts';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyContext';
import { useUserOrders } from '@/hooks/useUserOrders';

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const config = {
    paid: {
      label: 'Paid',
      className:
        'bg-green-600/10 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    },
    pending: {
      label: 'Pending',
      className:
        'bg-yellow-600/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    },
    processing: {
      label: 'Processing',
      className:
        'bg-blue-600/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    },
    failed: {
      label: 'Failed',
      className: 'bg-destructive/10 text-destructive',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-muted text-muted-foreground',
    },
  };
  const { label, className } = config[status] ?? config.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded ${TYPOGRAPHY.small} ${className}`}
    >
      {label}
    </span>
  );
};

const getTotalPrice = (total: number, currency: string, rate: number) => {
  return currency === 'USD' ? total : Math.round(total * rate);
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { currency, rate } = useCurrency();

  const { data: orders = [], isLoading } = useUserOrders();

  const symbol = currency === 'USD' ? '$' : '₴';

  return (
    <Loader isLoading={isLoading}>
      <div className="py-10 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className={cn(
              TYPOGRAPHY.small,
              'mb-7 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
            )}
          >
            <ChevronLeft className="size-4" />
            Back
          </button>

          <div className="mb-10">
            <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-1`}>
              My Orders
            </h1>
            <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              {orders.length === 0 ?
                'No orders yet'
              : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
            </p>
          </div>

          {orders.length === 0 && (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 10a4 4 0 01-8 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className={`${TYPOGRAPHY.h5} text-foreground mb-1`}>
                  No orders yet
                </p>
                <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                  Your orders will appear here after checkout
                </p>
              </div>
              <Button
                asChild
                className={`h-12 px-8 ${TYPOGRAPHY.uppercase}`}
              >
                <Link to="/">Start shopping</Link>
              </Button>
            </div>
          )}

          {orders.length > 0 && (
            <ul className="flex flex-col gap-4">
              {orders.map((order) => {
                const total =
                  order && getTotalPrice(order.total, currency, rate);

                return (
                  <li key={order.id}>
                    <Link
                      to={`/order-success/${order.id}`}
                      className="block border border-border rounded-lg overflow-hidden hover:border-ring transition-colors group"
                    >
                      <div className="flex items-center justify-between px-5 py-4 bg-card border-b border-border">
                        <div className="flex flex-col gap-0.5">
                          <p
                            className={`${TYPOGRAPHY.uppercase} text-muted-foreground`}
                          >
                            Order ID
                          </p>
                          <p
                            className={`${TYPOGRAPHY.buttons} text-foreground font-mono`}
                          >
                            {order.id}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <StatusBadge status={order.status} />
                          <p
                            className={`${TYPOGRAPHY.small} text-muted-foreground`}
                          >
                            {new Date(order.createdAt).toLocaleDateString(
                              'en-GB',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 py-4 flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {order.items.slice(0, 3).map((item, i) => (
                            <img
                              key={item.id}
                              src={item.images[0]}
                              alt={item.name}
                              className="w-10 h-14 object-cover rounded-sm border-2 border-background"
                              style={{ zIndex: 10 - i }}
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div
                              className="w-10 h-14 rounded-sm border-2 border-background bg-muted flex items-center justify-center"
                              style={{ zIndex: 7 }}
                            >
                              <span
                                className={`${TYPOGRAPHY.small} text-muted-foreground`}
                              >
                                +{order.items.length - 3}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`${TYPOGRAPHY.body} font-medium text-foreground truncate`}
                          >
                            {order.items.map((item) => item.name).join(', ')}
                          </p>
                          <p
                            className={`${TYPOGRAPHY.small} text-muted-foreground mt-0.5 capitalize`}
                          >
                            {order.paymentMethod} ·{' '}
                            {order.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0,
                            )}{' '}
                            items
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`${TYPOGRAPHY.h5} font-extrabold text-foreground`}
                          >
                            {symbol}
                            {total.toFixed(2)}
                          </span>
                          <svg
                            width="7"
                            height="11"
                            viewBox="0 0 7 11"
                            fill="none"
                            className="rotate-180 text-muted-foreground group-hover:text-foreground transition-colors"
                          >
                            <path
                              d="M6 1L1 5.5L6 10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Loader>
  );
};

export default OrdersPage;
