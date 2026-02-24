import { PDFDownloadLink } from '@react-pdf/renderer';
import { Loader2 } from 'lucide-react';
import type { DownloadInvoiceButtonProps } from '../types/invoice';
import {
  DOWNLOAD_BUTTON_CLASS,
  InvoiceButtonLabel,
} from '../constants/invoiceConfig';
import { useInvoicePreparation } from '../hooks/useInvoicePreparation';
import { InvoicePDF } from './InvoicePDF';
import { DownloadIcon } from './DownloadIcon';

export const DownloadInvoiceButton = ({
  order,
  className,
}: DownloadInvoiceButtonProps) => {
  const { isReady, convertedOrder, isConverting, handlePrepareInvoice } =
    useInvoicePreparation(order);

  const buttonClassName = className ?? DOWNLOAD_BUTTON_CLASS;

  if (!isReady || !convertedOrder) {
    return (
      <button
        type="button"
        onClick={handlePrepareInvoice}
        disabled={isConverting}
        className={buttonClassName}
      >
        {isConverting ?
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {InvoiceButtonLabel.Preparing}
          </>
        : <>
            <DownloadIcon />
            {InvoiceButtonLabel.Download}
          </>
        }
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<InvoicePDF order={convertedOrder} />}
      fileName={`invoice-${order.id}.pdf`}
    >
      {({ loading }) => (
        <button
          type="button"
          disabled={loading}
          className={buttonClassName}
        >
          {loading ?
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {InvoiceButtonLabel.Generating}
            </>
          : <>
              <DownloadIcon />
              {InvoiceButtonLabel.Download}
            </>
          }
        </button>
      )}
    </PDFDownloadLink>
  );
};
