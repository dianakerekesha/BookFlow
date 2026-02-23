import { useQuery } from '@tanstack/react-query';
import { booksQueryKeys } from '@/services/booksAPI';
import type { Book } from '@/types/Book';

export const useFetchBooks = (
  fetchFn: () => Promise<Book[]>,
  queryKey: (typeof booksQueryKeys)[keyof typeof booksQueryKeys],
) => {
  const { data, error, isLoading } = useQuery<Book[]>({
    queryKey: queryKey as readonly unknown[],
    queryFn: fetchFn,
  });

  return {
    books: data ?? [],
    error: error ? String(error) : null,
    isLoading,
  };
};
