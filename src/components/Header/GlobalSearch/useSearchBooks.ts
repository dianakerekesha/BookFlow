import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { GroupedResults } from './search.types';
import { searchAllBooks } from '@/components/Header/GlobalSearch/helpers/searchAllBooks.ts';
import { booksQueryKeys } from '@/services/booksAPI';

export const useSearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: results = [], isLoading: loading } = useQuery({
    queryKey: booksQueryKeys.search(searchTerm),
    queryFn: () => searchAllBooks(searchTerm),
    enabled: !!searchTerm.trim(),
  });

  const groupedResults = useMemo<GroupedResults>(() => {
    if (!searchTerm.trim()) return { authors: [], publishers: [], titles: [] };
    const query = searchTerm.toLowerCase();

    const allMatchedAuthors = results.filter((book) =>
      book.author.toLowerCase().includes(query),
    );
    const authors = Array.from(
      new Map(allMatchedAuthors.map((book) => [book.author, book])).values(),
    );

    const allMatchedPublishers = results.filter(
      (book) =>
        book.publication?.toLowerCase().includes(query) &&
        !authors.some((a) => a.id === book.id),
    );
    const publishers = Array.from(
      new Map(
        allMatchedPublishers.map((book) => [book.publication, book]),
      ).values(),
    );

    const titles = results.filter(
      (book) =>
        book.name.toLowerCase().includes(query) &&
        !authors.some((author) => author.id === book.id) &&
        !publishers.some((publisher) => publisher.id === book.id),
    );

    return { authors, publishers, titles };
  }, [results, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    groupedResults,
    loading,
  };
};
