import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  STRIPE_PUBLIC_KEY,
  STRIPE_APPEARANCE,
} from '../constants/stripeConfig';
import { StripePaymentForm } from './StripePaymentForm';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface StripeWrapperProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const StripeWrapper = ({
  clientSecret,
  onSuccess,
  onError,
}: StripeWrapperProps) => {
  if (!clientSecret) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
    >
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};
