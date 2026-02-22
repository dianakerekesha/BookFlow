import type { Book } from '@/types/Book';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';

type Props = {
  books: Book[];
  isLoading?: boolean;
  itemsPerPage?: number;
};

export const BooksList = ({
  books,
  isLoading = false,
  itemsPerPage = 16,
}: Props) => {
  if (isLoading) {
    return (
      <>
        {Array(itemsPerPage)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="
                col-span-4
                md:col-span-6
                lg:col-span-6
                w-full
                max-w-[288px]
                mb-[24px]
                justify-self-center
                flex justify-center
              "
            >
              <ProductCardSkeleton />
            </div>
          ))}
      </>
    );
  }

  return (
    <>
      {books.map((book) => (
        <div
          key={book.id}
          className="
            col-span-4
            md:col-span-6
            lg:col-span-6
            w-full
            lg:max-w-[288px]
            mb-[24px]
            justify-self-center
            flex justify-center
          "
        >
          <ProductCard book={book} />
        </div>
      ))}
    </>
  );
};
