import { useBooks } from '../context/BooksContext';
import { Loader } from '@/components/ui/Loader.tsx';
import { HomePageContent } from './HomePageContent';

export const HomePage = () => {
  const { isLoading } = useBooks();

  return (
    <Loader isLoading={isLoading}>
      <HomePageContent />
    </Loader>
  );
};
