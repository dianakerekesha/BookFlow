import { Document, Page } from '@react-pdf/renderer';
import '../constants/invoiceFontConfig';
import { invoiceStyles } from '../constants/invoiceStyles';
import type { InvoicePDFProps } from '../types/invoice';
import { InvoiceHeader } from './InvoiceHeader';
import { InvoiceMetaSection } from './InvoiceMetaSection';
import { InvoiceAddresses } from './InvoiceAddresses';
import { InvoiceItemsTable } from './InvoiceItemsTable';
import { InvoiceTotals } from './InvoiceTotals';
import { InvoiceFooter } from './InvoiceFooter';

export const InvoicePDF = ({ order }: InvoicePDFProps) => (
  <Document>
    <Page
      size="A4"
      style={invoiceStyles.page}
    >
      <InvoiceHeader orderId={order.id} />
      <InvoiceMetaSection order={order} />
      <InvoiceAddresses customer={order.customer} />
      <InvoiceItemsTable items={order.items} />
      <InvoiceTotals
        subtotal={order.subtotal}
        total={order.total}
      />
      <InvoiceFooter />
    </Page>
  </Document>
);
