import { useTranslation } from 'react-i18next';
import { useBooks } from '../context/BooksContext';
import { BooksSection } from '@/components/BooksSection';
import { MainSlider } from '@/components/MainSlider';
import { CategoriesSection } from '@/components/CategoriesSection/CategoriesSection.tsx';
import { Loader } from '@/components/ui/Loader.tsx';

export const HomePage = () => {
  const { newBooks, suggestedBooks, isLoading } = useBooks();
  const { t } = useTranslation();

  return (
    <Loader isLoading={isLoading}>
      <main className="flex flex-col w-full gap-[56px] lg:gap-[80px]">
        <MainSlider />
        <BooksSection
          title={t('categories.newBooks')}
          books={newBooks}
        />
        <CategoriesSection />
        <BooksSection
          title={t('categories.youMayLike')}
          books={suggestedBooks}
        />
      </main>
    </Loader>
  );
};
