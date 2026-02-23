import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import {
  getAudioBooks,
  getKindleBooks,
  getPaperBooks,
  booksQueryKeys,
} from '@/services/booksAPI';
import type { Book } from '@/types/Book';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function filterBooks(incomingBooks: Book[], category: string | undefined) {
  let result = [...incomingBooks];

  if (category) {
    result = result.filter((book) =>
      book.category?.some(
        (bookCategory) => bookCategory.toLowerCase() === category,
      ),
    );
  }

  return result;
}

export const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const title =
    categoryName ?
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : '';

  const results = useQueries({
    queries: [
      { queryKey: booksQueryKeys.paper, queryFn: getPaperBooks },
      { queryKey: booksQueryKeys.kindle, queryFn: getKindleBooks },
      { queryKey: booksQueryKeys.audio, queryFn: getAudioBooks },
    ],
  });

  const books = results.flatMap((result) => result.data ?? []);
  const isLoading = results.some((result) => result.isLoading);
  const visibleBooks = filterBooks(books, categoryName);

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={visibleBooks}
        title={title}
      />
    </Loader>
  );
};
