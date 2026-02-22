import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Book } from './../types/Book';
import { getPaperBooks, booksQueryKeys } from '@/services/booksAPI';

interface BooksContextType {
  books: Book[];
  newBooks: Book[];
  suggestedBooks: Book[];
  isLoading: boolean;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  favIconRef: React.RefObject<HTMLDivElement | null>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const cartIconRef = useRef<HTMLDivElement>(null);
  const favIconRef = useRef<HTMLDivElement>(null);

  const { data: books = [], isLoading } = useQuery({
    queryKey: booksQueryKeys.paper,
    queryFn: getPaperBooks,
  });

  const newBooks = useMemo(() => {
    return [...books].sort((a, b) => b.publicationYear - a.publicationYear);
  }, [books]);

  const suggestedBooks = useMemo(() => {
    return [...books].sort((a, b) => a.author.localeCompare(b.author));
  }, [books]);

  return (
    <BooksContext.Provider
      value={{
        books,
        newBooks,
        suggestedBooks,
        isLoading,
        cartIconRef,
        favIconRef,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('useBooks must be used within BooksProvider');
  return context;
};
