import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { CheckoutFormValues } from '@/components/Checkout/helpers/checkoutSchema.ts';
import type { PaymentMethod, Order } from '@/types/Order';
import { CheckoutForm } from '@/components/Checkout/CheckoutForm';
import { LiqPayButton } from '@/components/Checkout/LiqPayButton';
import { OrderSummary } from '@/components/Checkout/OrderSummary';
import { PaymentMethodSelector } from '@/components/Checkout/PaymentMethodSelector';
import { StripeWrapper } from '@/components/Checkout/StripeWrapper';
import { useCartAndFavorites } from '@/hooks/useCartAndFavourites';
import { auth } from '@/firebase/firebase';
import { createOrder, createStripeIntent } from '@/services/paymentAPI';
import { TYPOGRAPHY } from '@/constants/typography';

type Step = 'delivery' | 'payment';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart: cartItems } = useCartAndFavorites();

  const [step, setStep] = useState<Step>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null,
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-gray-500">
        <p className={TYPOGRAPHY.body}>Your cart is empty.</p>
        <Link
          to="/cart"
          className={`${TYPOGRAPHY.buttons} text-gray-900 hover:underline`}
        >
          ← Back to cart
        </Link>
      </div>
    );
  }

  const handleDeliverySubmit = async (data: CheckoutFormValues) => {
    if (!auth.currentUser) {
      setError('Please log in to continue');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const order = await createOrder({
        customer: data,
        items: cartItems,
        paymentMethod,
        userId: auth.currentUser.uid,
      });
      setCurrentOrder(order);

      if (paymentMethod === 'stripe') {
        const { clientSecret } = await createStripeIntent(
          order.id,
          order.total,
        );
        setStripeClientSecret(clientSecret);
      }

      setStep('payment');
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message ?
          error.message
        : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    navigate(`/order-success/${currentOrder?.id}`);
  };

  const handlePaymentError = (message: string) => {
    setError(message);
  };

  const stepLabels = ['1. Delivery', '2. Payment', '3. Confirmation'];
  const currentStepIndex = step === 'delivery' ? 0 : 1;

  return (
    <div className="py-10 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <button
          type="button"
          onClick={() =>
            step === 'payment' ? setStep('delivery') : navigate('/cart')
          }
          className={`inline-flex items-center gap-2 ${TYPOGRAPHY.buttons} text-gray-900 mb-7 hover:opacity-60 transition-opacity`}
        >
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
          >
            <path
              d="M6 1L1 5.5L6 10"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        <h1 className={`${TYPOGRAPHY.h1} text-gray-900 mb-2`}>Checkout</h1>

        <div className="flex items-center gap-2.5 mb-12">
          {stepLabels.map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-2.5"
            >
              {i > 0 && <span className="w-6 h-px bg-gray-300" />}
              <span
                className={
                  i === currentStepIndex ?
                    `${TYPOGRAPHY.small} font-bold text-gray-900`
                  : `${TYPOGRAPHY.small} text-gray-300`
                }
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_380px] gap-12 items-start max-lg:grid-cols-1">
          <div className="flex flex-col gap-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            {step === 'delivery' && (
              <>
                <PaymentMethodSelector
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
                <CheckoutForm
                  onSubmit={handleDeliverySubmit}
                  isLoading={isLoading}
                />
              </>
            )}

            {step === 'payment' && (
              <div className="flex flex-col gap-6">
                <p className={`${TYPOGRAPHY.uppercase} text-gray-400`}>
                  Payment details
                </p>

                {paymentMethod === 'stripe' && stripeClientSecret && (
                  <StripeWrapper
                    clientSecret={stripeClientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                )}

                {paymentMethod === 'liqpay' && currentOrder && (
                  <LiqPayButton
                    orderId={currentOrder.id}
                    amount={currentOrder.total}
                    onError={handlePaymentError}
                  />
                )}
              </div>
            )}
          </div>

          <aside className="max-lg:order-first">
            <OrderSummary items={cartItems} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
