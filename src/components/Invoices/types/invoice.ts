import type { Order, CustomerData } from '@/types/Order';
import type { CartItem } from '@/types/Book';

export interface InvoicePDFProps {
  order: Order;
}

export interface DownloadInvoiceButtonProps {
  order: Order;
  className?: string;
}

export interface InvoiceHeaderProps {
  orderId: string;
}

export interface InvoiceMetaSectionProps {
  order: Order;
}

export interface InvoiceAddressesProps {
  customer: CustomerData;
}

export interface InvoiceItemsTableProps {
  items: CartItem[];
}

export interface InvoiceTotalsProps {
  subtotal: number;
  total: number;
}
