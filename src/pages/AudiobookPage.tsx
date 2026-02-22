import { useTranslation } from 'react-i18next';
import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { getAudioBooks } from '@/services/booksAPI';
import { useFetchBooks } from '@/hooks/useFetchBooks';

export const AudiobookPage = () => {
  const { t } = useTranslation();
  const { books, error, isLoading } = useFetchBooks(getAudioBooks);

  if (error) return <div>{error}</div>;

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={t('categories.audiobooks')}
      />
    </Loader>
  );
};
