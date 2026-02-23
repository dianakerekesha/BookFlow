import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useSearchParams } from 'react-router-dom';
import { getBooks, type SortOption } from '@/services/bookService';
import { useQuery } from '@tanstack/react-query';

export const KindlePage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const lang = 'uk';
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books', 'kindle', lang, sort],

    queryFn: () => getBooks(lang, null, 'kindle', sort),
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
