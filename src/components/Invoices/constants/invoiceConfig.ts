import { TYPOGRAPHY } from '@/constants/typography';

export const COMPANY_NAME = 'CODEX';
export const COMPANY_WEBSITE = 'codex.com';

export const DATE_LOCALE = 'en-GB';
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  stripe: 'Stripe (Card)',
  liqpay: 'LiqPay',
};

export enum InvoiceButtonLabel {
  Download = 'Download Invoice',
  Preparing = 'Preparing...',
  Generating = 'Generating...',
}

export const DOWNLOAD_BUTTON_CLASS = `h-14 border border-border hover:border-ring text-foreground ${TYPOGRAPHY.buttons} rounded-md flex items-center justify-center gap-2 transition-colors w-full disabled:opacity-50`;
