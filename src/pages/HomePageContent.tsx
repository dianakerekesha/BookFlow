import { useTranslation } from 'react-i18next';
import { useBooks } from '../context/BooksContext';
import { BooksSection } from '@/components/BooksSection';
import { MainSlider } from '@/components/MainSlider';
import { CategoriesSection } from '@/components/CategoriesSection/CategoriesSection.tsx';
import { useHomepageIntroAnimation } from '@/hooks/useHomepageIntroAnimation';

export const HomePageContent = () => {
  const { newBooks, suggestedBooks } = useBooks();
  const { t } = useTranslation();
  const {
    containerRef,
    sliderRef,
    newBooksRef,
    categoriesRef,
    suggestedBooksRef,
  } = useHomepageIntroAnimation();

  return (
    <main
      ref={containerRef}
      className="flex flex-col w-full gap-[56px] lg:gap-[80px] pb-[56px] lg:pb-[80px]"
    >
      <div ref={sliderRef}>
        <MainSlider />
      </div>
      <div ref={newBooksRef}>
        <BooksSection
          title={t('categories.newBooks')}
          books={newBooks}
        />
      </div>
      <div ref={categoriesRef}>
        <CategoriesSection />
      </div>
      <div ref={suggestedBooksRef}>
        <BooksSection
          title={t('categories.youMayLike')}
          books={suggestedBooks}
        />
      </div>
    </main>
  );
};
