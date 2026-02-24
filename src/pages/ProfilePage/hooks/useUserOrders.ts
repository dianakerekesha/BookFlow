import { useState, useEffect } from 'react';
import { getUserOrders } from '@/services/paymentAPI';
import type { Order } from '@/types/Order';
import { showError } from '@/lib/toast';
import { ORDERS_PREVIEW_COUNT } from '../constants/orderStatusConfig';

export const useUserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingAll, setIsShowingAll] = useState(false);

  useEffect(() => {
    getUserOrders()
      .then(setOrders)
      .catch(() => showError('Не вдалося завантажити замовлення'))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleOrders =
    isShowingAll ? orders : orders.slice(0, ORDERS_PREVIEW_COUNT);

  const hasMoreOrders = orders.length > ORDERS_PREVIEW_COUNT;

  const handleToggleShowAll = () => {
    setIsShowingAll((previous) => !previous);
  };

  return {
    orders,
    visibleOrders,
    isLoading,
    isShowingAll,
    hasMoreOrders,
    handleToggleShowAll,
  };
};
