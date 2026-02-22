import { useState, useEffect, useMemo } from 'react';
import type { Book } from '@/types/Book';
import type { GroupedResults } from './search.types';
import { searchAllBooks } from '@/components/Header/GlobalSearch/helpers/searchAllBooks.ts';

export const useSearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      return;
    }
    searchAllBooks(searchTerm)
      .then((data) => setResults(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchTerm]);

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
        !authors.some((a) => a.id === book.id) &&
        !publishers.some((p) => p.id === book.id),
    );

    return { authors, publishers, titles };
  }, [results, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    groupedResults,
    loading,
    setResults,
  };
};
