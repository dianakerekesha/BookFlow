import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useSearchParams } from 'react-router-dom';
import { getBooks, type SortOption } from '@/services/bookService';
import { useQuery } from '@tanstack/react-query';
import type { LanguageOption } from '@/types/LanguageOption';

export const KindlePage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const currentLang = i18n.language as LanguageOption;
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books', 'kindle', currentLang, sort],

    queryFn: () => getBooks(currentLang, null, 'kindle', sort),
  });

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.kindle')}
      />
    </Loader>
  );
};
