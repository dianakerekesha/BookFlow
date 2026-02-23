import { Catalog } from '@/components/Catalog/Catalog';
import { Loader } from '@/components/ui/Loader';
import { getBooks, type SortOption } from '@/services/bookService';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

export const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const lang = 'uk';

  const formattedCategory =
    categoryName ?
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : null;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books', categoryName, lang, sort],
    queryFn: () => {
      return getBooks(lang, formattedCategory, null, sort);
    },
  });

  return (
    <Loader isLoading={isLoading}>
      <Catalog
        products={books}
        title={formattedCategory}
      />
    </Loader>
  );
};
