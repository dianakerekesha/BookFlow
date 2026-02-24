import { useParams, Link } from 'react-router-dom';
import type { Order } from '@/types/Order';
import { DownloadInvoiceButton } from '@/components/Invoices';
import { TYPOGRAPHY } from '@/constants/typography';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyContext';
import { useOrder } from '@/hooks/useOrder';

const TELEGRAM_BOT_USERNAME = 'NiceBoookBot';

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

const TelegramConnectButton = ({ orderId }: { orderId: string }) => {
  const deepLink = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${orderId}`;

  return (
    <Button
      asChild
      variant="outline"
      className={`h-14 ${TYPOGRAPHY.buttons}`}
    >
      <a
        href={deepLink}
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2.5"
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
    </Button>
  );
};

const getPrice = (
  item: {
    priceDiscount: number | null;
    priceRegular: number;
  },
  currency: string,
  rate: number,
) => {
  const price = item.priceDiscount ?? item.priceRegular;

  return currency === 'USD' ? price : Math.round(price * rate);
};

const getTotalPrice = (total: number, currency: string, rate: number) => {
  return currency === 'USD' ? total : Math.round(total * rate);
};

const OrderSuccessPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { currency, rate } = useCurrency();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId!),
    enabled: !!orderId,
  });
  const { data: order, isLoading } = useOrder(orderId);

  const total = order && getTotalPrice(order.total, currency, rate);
  const subtotal = order && getTotalPrice(order.total, currency, rate);
  const symbol = currency === 'USD' ? '$' : '₴';

  if (!order)
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-muted-foreground">
        <p className={TYPOGRAPHY.body}>Order not found.</p>
        <Link
          to="/"
          className={`${TYPOGRAPHY.buttons} font-semibold text-foreground hover:underline`}
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
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M6 14L11.5 19.5L22 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
              </svg>
            </div>
            <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-2`}>
              Order placed!
            </h1>
            <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              Thank you. We&#39;ve received your order.
            </p>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
              <div>
                <p
                  className={`${TYPOGRAPHY.uppercase} text-muted-foreground mb-0.5`}
                >
                  Order ID
                </p>
                <p
                  className={`${TYPOGRAPHY.buttons} text-foreground font-mono`}
                >
                  {order.id}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={order.status} />
                <p className={`${TYPOGRAPHY.small} text-muted-foreground`}>
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <ul className="divide-y divide-border">
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
                      className={`${TYPOGRAPHY.buttons} text-foreground truncate`}
                    >
                      {item.name}
                    </p>
                    <p className={`${TYPOGRAPHY.small} text-muted-foreground`}>
                      {item.author}
                    </p>
                    <p
                      className={`${TYPOGRAPHY.small} text-muted-foreground mt-0.5`}
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span
                    className={`${TYPOGRAPHY.buttons} font-bold text-foreground whitespace-nowrap`}
                  >
                    {symbol}
                    {(getPrice(item, currency, rate) * item.quantity).toFixed(
                      2,
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-6 py-4 border-t border-border bg-card flex flex-col gap-2">
              <div className="flex justify-between">
                <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                  Subtotal
                </span>
                <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                  {symbol}
                  {subtotal?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                  Payment
                </span>
                <span
                  className={`${TYPOGRAPHY.body} text-muted-foreground capitalize`}
                >
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span
                  className={`${TYPOGRAPHY.buttons} font-bold text-foreground`}
                >
                  Total
                </span>
                <span
                  className={`${TYPOGRAPHY.h2} text-foreground tracking-tight`}
                >
                  {symbol}
                  {total?.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border">
              <p
                className={`${TYPOGRAPHY.uppercase} text-muted-foreground mb-3`}
              >
                Delivery to
              </p>
              <p className={`${TYPOGRAPHY.buttons} text-foreground`}>
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                {order.customer.address}
              </p>
              <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
                {order.customer.city}, {order.customer.zip},{' '}
                {order.customer.country}
              </p>
              <p className={`${TYPOGRAPHY.body} text-muted-foreground mt-1`}>
                {order.customer.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Button
              asChild
              className={`h-14 ${TYPOGRAPHY.uppercase}`}
            >
              <Link to="/">Continue shopping</Link>
            </Button>

            {orderId && <TelegramConnectButton orderId={orderId} />}

            <DownloadInvoiceButton order={order} />

            <Button
              asChild
              variant="outline"
              className={`h-14 ${TYPOGRAPHY.buttons}`}
            >
              <Link to="/orders">View all orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default OrderSuccessPage;
