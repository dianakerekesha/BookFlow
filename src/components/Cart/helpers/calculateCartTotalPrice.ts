import type { CartItem } from '@/types/Book';
import { getItemPrice } from '@/helpers/getItemPrice';
import { roundCurrency } from './roundCurrency';

export const calculateCartTotalPrice = (cart: CartItem[]): number =>
  roundCurrency(
    cart.reduce((sum, book) => sum + getItemPrice(book) * book.quantity, 0),
  );
