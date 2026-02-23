import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { useFetchBooks } from '@/hooks/useFetchBooks';
import { booksQueryKeys, getPaperBooks } from '@/services/booksAPI';

export const PaperPage = () => {
  const { t } = useTranslation();
  const { books, error, isLoading } = useFetchBooks(
    getPaperBooks,
    booksQueryKeys.paper,
  );

  if (error) return <div>{error}</div>;

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.paper')}
      />
    </Loader>
  );
};
