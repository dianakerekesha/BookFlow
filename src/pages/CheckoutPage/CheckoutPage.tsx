import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckoutForm,
  LiqPayButton,
  OrderSummary,
  PaymentMethodSelector,
  StripeWrapper,
} from '@/components/Checkout';
import { useCartAndFavorites } from '@/hooks/useCartAndFavourites';
import { TYPOGRAPHY } from '@/constants/typography';
import { useCheckout } from './hooks/useCheckout';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart: cartItems } = useCartAndFavorites();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'liqpay'>(
    'stripe',
  );

  const {
    step,
    setStep,
    currentOrder,
    stripeClientSecret,
    isLoading,
    handleDeliverySubmit,
    handlePaymentSuccess,
    handlePaymentError,
  } = useCheckout(cartItems || [], paymentMethod);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-muted-foreground">
        <p className={TYPOGRAPHY.body}>Your cart is empty.</p>
        <Link
          to="/cart"
          className={`${TYPOGRAPHY.buttons} text-foreground hover:underline`}
        >
          ← Back to cart
        </Link>
      </div>
    );
  }

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
          className={`inline-flex items-center gap-2 ${TYPOGRAPHY.buttons} text-muted-foreground hover:text-foreground mb-7 transition-colors`}
        >
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
          >
            <path
              d="M6 1L1 5.5L6 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-2`}>Checkout</h1>

        <div className="flex items-center gap-2.5 mb-12">
          {stepLabels.map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-2.5"
            >
              {i > 0 && <span className="w-6 h-px bg-border" />}
              <span
                className={
                  i === currentStepIndex ?
                    `${TYPOGRAPHY.small} font-bold text-foreground`
                  : `${TYPOGRAPHY.small} text-muted-foreground/50`
                }
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_380px] gap-12 items-start max-lg:grid-cols-1">
          <div className="flex flex-col gap-8">
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

            {step === 'payment' && currentOrder && (
              <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-6">
                <p className="uppercase text-muted-foreground">
                  Payment details
                </p>

                {paymentMethod === 'stripe' && stripeClientSecret && (
                  <StripeWrapper
                    clientSecret={stripeClientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                )}

                {paymentMethod === 'liqpay' && (
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
