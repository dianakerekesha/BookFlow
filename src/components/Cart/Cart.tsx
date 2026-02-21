import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { useCartFavorites } from '@/context/CartFavoritesContext.tsx';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { CartItem } from './CartItem';
import { CartItemSkeleton } from './CartItemSkeleton';
import { CartSummary } from './CartSummary';
import { CartSummarySkeleton } from './CartSummarySkeleton';
import { EmptyCart } from './EmptyCart';

export const Cart = () => {
  const { cart } = useCartFavorites();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timeout);
  }, []);

  const totalPrice = useMemo(
    () =>
      Math.round(
        cart.reduce(
          (sum, book) =>
            sum + (book.priceDiscount ?? book.priceRegular) * book.quantity,
          0,
        ) * 100,
      ) / 100,
    [cart],
  );

  const totalQuantity = useMemo(
    () => cart.reduce((sum, book) => sum + book.quantity, 0),
    [cart],
  );
  const { t } = useTranslation();

  const skeletonCount = cart.length;

  return (
    <div className="mx-auto max-w-312 px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <button
        onClick={() => {
          if (
            document.referrer &&
            new URL(document.referrer).origin === window.location.origin
          ) {
            navigate(-1);
          } else {
            navigate('/');
          }
        }}
        className={cn(
          TYPOGRAPHY.small,
          'mb-2 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
        )}
      >
        <ChevronLeft className="size-4" />
        {t('ui.back')}
      </button>

      <div className="mb-8 sm:mb-10 pt-2">
        <h1 className={cn(TYPOGRAPHY.h1, 'text-foreground')}>Cart</h1>
        <p className={cn(TYPOGRAPHY.body, 'text-muted-foreground')}>
          {totalQuantity}{' '}
          {totalQuantity === 1 ?
            t('books.item')
          : totalQuantity >= 2 && totalQuantity <= 4 ?
            t('books.items2-4')
          : t('books.items')}
          {isLoading ?
            `${skeletonCount} ${skeletonCount === 1 ? 'item' : 'items'}`
          : `${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`}
        </p>
      </div>

      {!isLoading && cart.length === 0 && <EmptyCart />}

      {(isLoading ? skeletonCount > 0 : cart.length > 0) && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:justify-center">
          <div className="flex flex-col gap-4 flex-1 min-w-75 lg:max-w-188">
            {isLoading ?
              Array(skeletonCount)
                .fill(null)
                .map((_, i) => <CartItemSkeleton key={i} />)
            : cart.map((book) => (
                <CartItem
                  key={book.slug}
                  book={book}
                />
              ))
            }
          </div>

          {isLoading ?
            <CartSummarySkeleton />
          : <CartSummary
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          }
        </div>
      )}
    </div>
  );
};
