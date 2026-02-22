import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { FavouritesProps } from './types/Favourites';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { ProductCard } from '../ProductCard';
import { FavouritesEmpty } from './FavouritesEmpty';

export const Favourites = ({
  books = [],
  title = 'Favourites',
}: FavouritesProps) => {
  const booksCount: number = books.length;
  const isEmptyBooks: boolean = booksCount === 0;

  return (
    <div className="container mx-auto w-full max-w-[1280px] p-4 md:p-8">
      <Link
        to="/home"
        className={cn(
          TYPOGRAPHY.small,
          'mb-2 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors',
        )}
      >
        <ChevronLeft className="size-4" />
        Home / Favourites
      </Link>

      {isEmptyBooks ?
        <FavouritesEmpty />
      : <div>
          <h1 className={cn(TYPOGRAPHY.h1, 'mb-8 text-foreground')}>{title}</h1>

          <p className="mb-4 text-gray-400">
            {booksCount} {booksCount === 1 ? 'item' : 'items'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1200px)]:grid-cols-4 gap-4 justify-items-center">
            {books.map((item) => (
              <ProductCard
                key={item.id}
                book={item}
              />
            ))}
          </div>
        </div>
      }
    </div>
  );
};
