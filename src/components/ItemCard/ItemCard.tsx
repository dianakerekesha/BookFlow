import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Book } from '@/types/Book';
import { BooksSection } from '@/components/BooksSection';
import { Loader } from '@/components/ui/Loader.tsx';
import { getBookAndVariants } from '@/components/ItemCard/helpers/getBookAndVariants.ts';
import { useBooks } from '../../context/BooksContext';
import { TYPOGRAPHY } from '@/constants/typography';
import { Breadcrumbs } from './Breadcrumbs';
import { ItemCardAbout } from './ItemCardAbout';
import { ItemCardCharacteristics } from './ItemCardCharacteristics';
import { ItemCardDetails } from './ItemCardDetails';
import { ItemCardGallery } from './ItemCardGallery';

type BookType = 'paperback' | 'kindle' | 'audiobook';

interface Props {
  type: BookType;
}

export const ItemCard: React.FC<Props> = ({ type }) => {
  const { suggestedBooks } = useBooks();
  const [book, setBook] = useState<Book | null>(null);
  const [bookVariants, setBookVariants] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookSlug) return;

    getBookAndVariants(type, bookSlug)
      .then(({ current, variants }) => {
        setBook(current);
        setBookVariants(variants);
      })
      .catch(() => navigate('*', { replace: true }))
      .finally(() => setIsLoading(false));
  }, [type, bookSlug, navigate]);

  const handleBookChange = (newBook: Book) => {
    navigate(`/item/${newBook.type}/${newBook.slug}`);
  };

  const imageUrls = book?.images.map((img) => `${img}`) ?? [];
  const categoryName = book?.category?.[0] || 'General';

  return (
    <Loader isLoading={isLoading || !book}>
      {book && (
        <div className="w-full px-4 pt-14 sm:pt-24 pb-20">
          <article className="mx-auto w-full max-w-287.5 flex flex-col">
            <Breadcrumbs
              type={type}
              category={categoryName}
              bookName={book.name}
            />

            <header className="mb-10">
              <h1 className={`${TYPOGRAPHY.h1} text-foreground mb-2`}>
                {book.name}
              </h1>
              <p
                className={`${TYPOGRAPHY.h4} text-muted-foreground font-medium`}
              >
                {book.author}
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 lg:gap-x-24 mb-20 items-start">
              <ItemCardGallery images={imageUrls} />
              <ItemCardDetails
                book={book}
                bookVariants={bookVariants}
                onBookChange={handleBookChange}
              />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 lg:gap-x-24 mb-20 items-start">
              <ItemCardAbout book={book} />
              <ItemCardCharacteristics book={book} />
            </section>
          </article>

          <BooksSection
            title="You may like"
            books={suggestedBooks}
          />
        </div>
      )}
    </Loader>
  );
};
