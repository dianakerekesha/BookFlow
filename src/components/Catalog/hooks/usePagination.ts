import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type UsePaginationProps = {
  totalItems: number;
  itemsPerPage: number | 'all';
  maxVisible?: number;
};

const MAX_VISIBLE = 5;

export const usePagination = ({
  totalItems,
  itemsPerPage,
}: UsePaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') || 1);

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const safePage = Math.min(Math.max(pageFromUrl, 1), totalPages || 1);

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

  const handleChangeArrow = useCallback(
    (order: 'prev' | 'next') => {
      const targetPage = order === 'prev' ? safePage - 1 : safePage + 1;
      handleChangeNumber(targetPage);
    },
    [safePage, handleChangeNumber],
  );

  useEffect(() => {
    if (totalPages === 0) return;

    if (pageFromUrl < 1) {
      handleChangeNumber(1);
    } else if (pageFromUrl > totalPages) {
      handleChangeNumber(totalPages);
    }
  }, [pageFromUrl, totalPages, handleChangeNumber]);

  return {
    safePage,
    totalPages,
    visiblePages,
    handleChangeNumber,
    handleChangeArrow,
  };
};
