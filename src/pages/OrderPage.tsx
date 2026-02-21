import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import type { Order } from '@/types/Order';
import { getUserOrders } from '@/services/paymentAPI';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils.ts';

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const config = {
    paid: { label: 'Paid', className: 'bg-green-100 text-green-700' },
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
    processing: { label: 'Processing', className: 'bg-blue-100 text-blue-700' },
    failed: { label: 'Failed', className: 'bg-red-100 text-red-700' },
    cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-500' },
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

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUserOrders()
      .then(setOrders)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="py-10 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className={cn(
              TYPOGRAPHY.small,
              'mb-2 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
            )}
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
          <h1 className={`${TYPOGRAPHY.h1} text-gray-900 mb-1`}>My Orders</h1>
          <p className={`${TYPOGRAPHY.body} text-gray-400`}>
            {orders.length === 0 ?
              'No orders yet'
            : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
          </p>
        </div>

        {orders.length === 0 && (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 10a4 4 0 01-8 0"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className={`${TYPOGRAPHY.h5} text-gray-900 mb-1`}>
                No orders yet
              </p>
              <p className={`${TYPOGRAPHY.body} text-gray-400`}>
                Your orders will appear here after checkout
              </p>
            </div>
            <Link
              to="/"
              className={`h-12 px-8 bg-gray-900 hover:bg-gray-700 text-white ${TYPOGRAPHY.uppercase} rounded flex items-center justify-center transition-colors`}
            >
              Start shopping
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <ul className="flex flex-col gap-4">
            {orders.map((order) => (
              <li key={order.id}>
                <Link
                  to={`/order-success/${order.id}`}
                  className="block border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors group"
                >
                  <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-col gap-0.5">
                      <p className={`${TYPOGRAPHY.uppercase} text-gray-400`}>
                        Order ID
                      </p>
                      <p
                        className={`${TYPOGRAPHY.buttons} text-gray-900 font-mono`}
                      >
                        {order.id}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <StatusBadge status={order.status} />
                      <p className={`${TYPOGRAPHY.small} text-gray-400`}>
                        {new Date(order.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
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
                          className="w-10 h-14 object-cover rounded-sm border-2 border-white"
                          style={{ zIndex: 10 - i }}
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div
                          className="w-10 h-14 rounded-sm border-2 border-white bg-gray-100 flex items-center justify-center"
                          style={{ zIndex: 7 }}
                        >
                          <span className={`${TYPOGRAPHY.small} text-gray-500`}>
                            +{order.items.length - 3}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`${TYPOGRAPHY.body} font-medium text-gray-900 truncate`}
                      >
                        {order.items.map((item) => item.name).join(', ')}
                      </p>
                      <p
                        className={`${TYPOGRAPHY.small} text-gray-400 mt-0.5 capitalize`}
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
                        className={`${TYPOGRAPHY.h5} font-extrabold text-gray-900`}
                      >
                        ${order.total.toFixed(2)}
                      </span>
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        fill="none"
                        className="rotate-180 text-gray-400 group-hover:text-gray-900 transition-colors"
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
