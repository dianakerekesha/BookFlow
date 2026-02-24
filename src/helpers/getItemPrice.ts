import type { CartItem } from '@/types/Book';

export const getItemPrice = (item: CartItem): number =>
  item.priceDiscount ?? item.priceRegular;
