import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { ReactNode } from 'react';
import type { Book } from './../types/Book';
import { getPaperBooks } from '@/services/booksAPI';

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
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cartIconRef = useRef<HTMLDivElement>(null);
  const favIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPaperBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
