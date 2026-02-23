import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Book } from '@/types/Book';
import { GridContainer } from '../GridContainer/GridContainer';
import { BooksList } from './BooksList';
import { CatalogControls } from './CatalogControls';
import { PaginationBlock } from './PaginationBlock';

type Props = {
  products: Book[];
  title: string | null;
  isLoading?: boolean;
};

export const Catalog = ({ products, title, isLoading = false }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') || 1);
  const sort = searchParams.get('sort') || 'newest';
  const itemsParam = searchParams.get('items') || '16';
  const itemsPerPage: number | 'all' =
    itemsParam === 'all' ? 'all' : Number(itemsParam);

  const MAX_VISIBLE = 5;

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(products.length / itemsPerPage);

  const safePage = Math.min(pageFromUrl, totalPages || 1);

  const currentProducts: Book[] =
    itemsPerPage === 'all' ? products : (
      products.slice(
        (safePage - 1) * Number(itemsPerPage),
        safePage * Number(itemsPerPage),
      )
    );

  let startPage = Math.max(safePage - Math.floor(MAX_VISIBLE / 2), 1);
  let endPage = startPage + MAX_VISIBLE - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - MAX_VISIBLE + 1, 1);
  }

  const visiblePages = [];

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handleChangeNumber = useCallback(
    (targetPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      newSearchParams.set('page', targetPage.toString());

      navigate({
        pathname: location.pathname,
        search: `?${newSearchParams.toString()}`,
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [searchParams, navigate, location.pathname],
  );

  const handleChangeArrow = (order: 'prev' | 'next') => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const targetPage = order === 'prev' ? safePage - 1 : safePage + 1;

    newSearchParams.set('page', targetPage.toString());

    navigate({
      pathname: location.pathname,
      search: `?${newSearchParams.toString()}`,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeItemsPerPage = (value: number | 'all') => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('items', value.toString());
      params.set('page', '1');

      return params;
    });
  };

  useEffect(() => {
    if (totalPages === 0) return;

    if (pageFromUrl < 1) {
      handleChangeNumber(1);

      return;
    }

    if (pageFromUrl > totalPages) {
      handleChangeNumber(totalPages);
    }
  }, [pageFromUrl, totalPages, handleChangeNumber]);

  return (
    <GridContainer className="overflow-hidden">
      <div className="col-span-full flex flex-col items-start mt-8 mb-8 md:mt-16-mb-10">
        <h1 className="text-[#313237] text-[32px] md:text-[48px] font-manrope font-bold leading-tight tracking-[-0.01em] md:tracking-[-0.02em] mb-2">
          {title}
        </h1>
        <p className="text-[#89939A] text-[14px] font-manrope font-medium">
          {`${products.length} ${t('books.books')}`}
          {isLoading ? '...' : `${products.length} books`}
        </p>
      </div>

      <CatalogControls
        sort={sort}
        itemsPerPage={itemsPerPage}
        setSearchParams={setSearchParams}
        onChangeItemsPerPage={handleChangeItemsPerPage}
        handleChangeNumber={handleChangeNumber}
      />

      <div className="col-span-full h-0" />

      <BooksList
        books={currentProducts}
        isLoading={isLoading}
        itemsPerPage={itemsPerPage === 'all' ? 16 : itemsPerPage}
      />

      {!isLoading && (
        <PaginationBlock
          safePage={safePage}
          handleChangeArrow={handleChangeArrow}
          visiblePages={visiblePages}
          handleChangeNumber={handleChangeNumber}
          totalPages={totalPages}
        />
      )}
    </GridContainer>
  );
};
