export const STRIPE_PUBLIC_KEY =
  'pk_test_51T2Z36HgUJaKIiLfmdNyCLzc6JXFYo35LnbrddyrzcA3tyRv9Z73K5x59oPRNCCGBE8Dgdqw83MG8mOIQuKkCi7z00IzaGYL0r';

export const STRIPE_APPEARANCE = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#111111',
    colorBackground: '#ffffff',
    colorText: '#111111',
    colorDanger: '#e53935',
    fontFamily: 'Manrope, sans-serif',
    borderRadius: '4px',
  },
};

export const MOCK_PAYMENT_DELAY_MS = 1000;

export const ORDER_SUCCESS_RETURN_PATH = '/#/order-success/pending';
