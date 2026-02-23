import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useFetchBooks } from '@/hooks/useFetchBooks';
import { booksQueryKeys, getKindleBooks } from '@/services/booksAPI';

export const KindlePage = () => {
  const { t } = useTranslation();
  const { books, error, isLoading } = useFetchBooks(
    getKindleBooks,
    booksQueryKeys.kindle,
  );

  if (error) return <div>{error}</div>;

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.kindle')}
      />
    </Loader>
  );
};
