import { useState } from 'react';
import type { Order } from '@/types/Order';
import { imageToBase64 } from '../helpers/imageToBase64';

export const useInvoicePreparation = (order: Order) => {
  const [isReady, setIsReady] = useState(false);
  const [convertedOrder, setConvertedOrder] = useState<Order | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handlePrepareInvoice = async () => {
    if (isReady) return;
    setIsConverting(true);

    const convertedItems = await Promise.all(
      order.items.map(async (item) => {
        const base64Images = await Promise.all(item.images.map(imageToBase64));
        return { ...item, images: base64Images.filter(Boolean) };
      }),
    );

    setConvertedOrder({ ...order, items: convertedItems });
    setIsReady(true);
    setIsConverting(false);
  };

  return { isReady, convertedOrder, isConverting, handlePrepareInvoice };
};
