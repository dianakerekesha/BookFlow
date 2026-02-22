import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Loader2 } from 'lucide-react';
import type { Order } from '@/types/Order';
import { imageToBase64 } from '@/components/Invoices/helpers/imageToBase64.ts';
import { TYPOGRAPHY } from '@/constants/typography';
import { InvoicePDF } from './InvoicePDF';

interface DownloadInvoiceButtonProps {
  order: Order;
  className?: string;
}

const defaultClassName = `h-14 border border-gray-200 hover:border-gray-400 text-gray-900 ${TYPOGRAPHY.buttons} rounded flex items-center justify-center gap-2 transition-colors w-full disabled:opacity-50`;

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8 1v9M8 10l-3-3M8 10l3-3"
      stroke="#111"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1"
      stroke="#111"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const DownloadInvoiceButton = ({
  order,
  className,
}: DownloadInvoiceButtonProps) => {
  const [ready, setReady] = useState(false);
  const [convertedOrder, setConvertedOrder] = useState<Order | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handlePrepare = async () => {
    if (ready) return;
    setIsConverting(true);

    const convertedItems = await Promise.all(
      order.items.map(async (item) => {
        const base64Images = await Promise.all(item.images.map(imageToBase64));
        return { ...item, images: base64Images.filter(Boolean) };
      }),
    );

    setConvertedOrder({ ...order, items: convertedItems });
    setReady(true);
    setIsConverting(false);
  };

  if (!ready || !convertedOrder) {
    return (
      <button
        type="button"
        onClick={handlePrepare}
        disabled={isConverting}
        className={className ?? defaultClassName}
      >
        {isConverting ?
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing...
          </>
        : <>
            <DownloadIcon />
            Download Invoice
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
          className={className ?? defaultClassName}
        >
          {loading ?
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          : <>
              <DownloadIcon />
              Download Invoice
            </>
          }
        </button>
      )}
    </PDFDownloadLink>
  );
};
