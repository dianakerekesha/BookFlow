import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripePaymentForm } from './StripePaymentForm';

const stripePromise = loadStripe(
  'pk_test_51T2Z36HgUJaKIiLfmdNyCLzc6JXFYo35LnbrddyrzcA3tyRv9Z73K5x59oPRNCCGBE8Dgdqw83MG8mOIQuKkCi7z00IzaGYL0r',
);

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
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#111111',
            colorBackground: '#ffffff',
            colorText: '#111111',
            colorDanger: '#e53935',
            fontFamily: 'Manrope, sans-serif',
            borderRadius: '4px',
          },
        },
      }}
    >
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};
