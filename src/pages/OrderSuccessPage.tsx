import { useParams, Link } from 'react-router-dom';
import { getOrder } from '@/services/paymentAPI';
import type { Order } from '@/types/Order';
import { DownloadInvoiceButton } from '@/components/Invoices';
import { TYPOGRAPHY } from '@/constants/typography';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/Loader';

const TELEGRAM_BOT_USERNAME = 'NiceBoookBot';

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

const TelegramConnectButton = ({ orderId }: { orderId: string }) => {
  const deepLink = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${orderId}`;

  return (
    <a
      href={deepLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-14 border border-gray-200 hover:border-gray-400 text-gray-900 ${TYPOGRAPHY.buttons} rounded flex items-center justify-center gap-2.5 transition-colors`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.779l-1.695 7.989c-.127.561-.46.698-.932.435l-2.57-1.893-1.24 1.194c-.137.137-.252.252-.517.252l.185-2.619 4.772-4.31c.208-.184-.045-.287-.32-.103L7.638 14.6l-2.523-.787c-.548-.172-.56-.548.115-.811l9.875-3.808c.457-.165.857.112.825.585z"
          fill="#229ED9"
        />
      </svg>
      Track order in Telegram
    </a>
  );
};

const getPrice = (item: {
  priceDiscount: number | null;
  priceRegular: number;
}) => item.priceDiscount ?? item.priceRegular;

const OrderSuccessPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId!),
    enabled: !!orderId,
  });

  if (!order)
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-gray-500">
        <p className={TYPOGRAPHY.body}>Order not found.</p>
        <Link
          to="/"
          className={`${TYPOGRAPHY.buttons} font-semibold text-gray-900 hover:underline`}
        >
          Go to home
        </Link>
      </div>
    );

  return (
    <Loader isLoading={isLoading}>
      <div className="py-12 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M6 14L11.5 19.5L22 9"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className={`${TYPOGRAPHY.h1} text-gray-900 mb-2`}>
              Order placed!
            </h1>
            <p className={`${TYPOGRAPHY.body} text-gray-500`}>
              Thank you. We&#39;ve received your order.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div>
                <p className={`${TYPOGRAPHY.uppercase} text-gray-400 mb-0.5`}>
                  Order ID
                </p>
                <p className={`${TYPOGRAPHY.buttons} text-gray-900 font-mono`}>
                  {order.id}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
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

            <ul className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-16 object-cover rounded-sm flex-shrink-0"
                    onError={(event) => {
                      (event.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${TYPOGRAPHY.buttons} text-gray-900 truncate`}
                    >
                      {item.name}
                    </p>
                    <p className={`${TYPOGRAPHY.small} text-gray-400`}>
                      {item.author}
                    </p>
                    <p className={`${TYPOGRAPHY.small} text-gray-400 mt-0.5`}>
                      Qty: {item.quantity}
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

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className={`${TYPOGRAPHY.body} text-gray-500`}>
                  Subtotal
                </span>
                <span className={`${TYPOGRAPHY.body} text-gray-500`}>
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`${TYPOGRAPHY.body} text-gray-500`}>
                  Payment
                </span>
                <span className={`${TYPOGRAPHY.body} text-gray-500 capitalize`}>
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span
                  className={`${TYPOGRAPHY.buttons} font-bold text-gray-900`}
                >
                  Total
                </span>
                <span
                  className={`${TYPOGRAPHY.h2} text-gray-900 tracking-tight`}
                >
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <p className={`${TYPOGRAPHY.uppercase} text-gray-400 mb-3`}>
                Delivery to
              </p>
              <p className={`${TYPOGRAPHY.buttons} text-gray-900`}>
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className={`${TYPOGRAPHY.body} text-gray-500`}>
                {order.customer.address}
              </p>
              <p className={`${TYPOGRAPHY.body} text-gray-500`}>
                {order.customer.city}, {order.customer.zip},{' '}
                {order.customer.country}
              </p>
              <p className={`${TYPOGRAPHY.body} text-gray-500 mt-1`}>
                {order.customer.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Link
              to="/"
              className={`h-14 bg-gray-900 hover:bg-gray-700 text-white ${TYPOGRAPHY.uppercase} rounded flex items-center justify-center transition-colors`}
            >
              Continue shopping
            </Link>

            {orderId && <TelegramConnectButton orderId={orderId} />}

            <DownloadInvoiceButton order={order} />

            <Link
              to="/orders"
              className={`h-14 border border-gray-200 hover:border-gray-400 text-gray-900 ${TYPOGRAPHY.buttons} rounded flex items-center justify-center transition-colors`}
            >
              View all orders
            </Link>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default OrderSuccessPage;
