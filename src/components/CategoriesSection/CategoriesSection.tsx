import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { CategoriesSectionSkeleton } from './CategoriesSectionSkeleton';

const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
  {
    label: 'categories.paperBooks',
    path: '/paper',
    image: `${BASE}img/categories/Paper-books.png`,
  },
  {
    label: 'categories.audioBooks',
    path: '/audiobook',
    image: `${BASE}img/categories/Audiobooks.png`,
  },
  {
    label: 'categories.kindleBooks',
    path: '/kindle',
    image: `${BASE}img/categories/Kindle-books.png`,
  },
];

export const CategoriesSection = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <CategoriesSectionSkeleton />;

  return (
    <section className="flex flex-col mt-[56px] px-4 gap-6 min-[640px]:mt-[56px] min-[640px]:px-6 min-[1200px]:mt-[80px] min-[1200px]:w-[1136px] min-[1200px]:mx-auto min-[1200px]:px-0">
      <h2 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
        {t('categories.shopByCategory')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={category.image}
                alt={t(category.label)}
                className="w-full aspect-[4/3] object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className={cn(TYPOGRAPHY.h4, 'mt-4 text-foreground')}>
              {t(category.label)}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
