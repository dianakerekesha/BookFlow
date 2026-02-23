import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { Book } from '@/types/Book';
import { AddButton } from '@/components/ui/Buttons/AddButton';
import { HeartButton } from '@/components/ui/Buttons/HeartButton';
import { useCartFavorites } from '@/context/CartFavoritesContext.tsx';
import { formatListeningLength } from '@/components/ItemCard/helpers/formatListeningLength.ts';
import { TYPOGRAPHY } from '@/constants/typography';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

type Props = {
  book: Book;
  bookVariants: Book[];
  onBookChange: (newBook: Book) => void;
};

export const ItemCardDetails: React.FC<Props> = ({
  book,
  bookVariants,
  onBookChange,
}) => {
  const { t } = useTranslation();
  const bookDetailsData: [string, string | number | null][] = [
    ['Author', book.author],
    ['Cover', book.coverType ?? null],
    [
      'Listening length',
      book.listeningLength !== null && book.listeningLength !== undefined ?
        formatListeningLength(book.listeningLength, t)
      : null,
    ],
    ['Narrator', book.narrator ?? null],
    ['Pages', book.numberOfPages ?? null],
    ['Year', book.publicationYear],
  ];

  const filteredDetails = bookDetailsData.filter(([, value]) => value !== null);

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    toggleFavorite,
    isFavorite,
  } = useCartFavorites();

  const isFavourite = isFavorite(book.id);
  const cartItem = cart.find((item) => item.id === book.id);
  const quantity = cartItem?.quantity || 0;
  const isSelected = quantity > 0;

  const toggleAddToCart = () =>
    isSelected ? removeFromCart(book.id) : addToCart(book);

  const handlePlus = () => {
    if (quantity === 0) addToCart(book);
    else increaseQuantity(book.id);
  };

  const handleMinus = () => {
    if (quantity > 1) decreaseQuantity(book.id);
    else if (quantity === 1) removeFromCart(book.id);
  };

  return (
    <div className="w-full max-w-100 mx-auto lg:mx-0 flex flex-col gap-6 text-foreground">
      <div>
        <p className={`${TYPOGRAPHY.h5} text-muted-foreground mb-2`}>
          Category
        </p>
        {book.category && book.category.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {book.category.slice(0, 6).map((cat, index) => (
              <span
                key={index}
                className={`${TYPOGRAPHY.body} px-3 py-1 border border-border rounded-md text-foreground`}
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <p className={`${TYPOGRAPHY.h5} text-muted-foreground mb-2`}>
          Language
        </p>
        <div className="mb-4">
          <LanguageSelector
            book={book}
            bookVariants={bookVariants}
            onBookChange={onBookChange}
          />
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-2 mb-4">
            <p className={`${TYPOGRAPHY.h2} text-foreground`}>
              ${book.priceDiscount || book.priceRegular}
            </p>
            {book.priceDiscount && (
              <p
                className={`${TYPOGRAPHY.h3} text-muted-foreground line-through`}
              >
                ${book.priceRegular}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 w-full overflow-hidden">
            <AddButton
              onClick={toggleAddToCart}
              isSelected={isSelected}
              className="cursor-pointer"
            />

            <div className="flex items-center border border-border rounded-md px-2">
              <button
                className="text-ring hover:text-foreground w-6 h-10 flex items-center justify-center transition-colors disabled:opacity-40"
                onClick={handleMinus}
                disabled={quantity === 0}
              >
                <Minus size={14} />
              </button>

              <span className={`${TYPOGRAPHY.buttons} px-2 text-foreground`}>
                {quantity}
              </span>

              <button
                className="text-ring hover:text-foreground w-6 h-10 flex items-center justify-center transition-colors"
                onClick={handlePlus}
              >
                <Plus size={14} />
              </button>
            </div>

            <HeartButton
              onClick={() => toggleFavorite(book)}
              isSelected={isFavourite}
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        {filteredDetails.map(([label, value], index) => (
          <div
            key={label}
            className={`flex justify-between py-2 ${
              index > 0 ? 'border-t border-border' : ''
            }`}
          >
            <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              {label}
            </span>
            <span
              className={`${TYPOGRAPHY.body} font-semibold text-foreground`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
