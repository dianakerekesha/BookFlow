import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { CategoriesSectionSkeleton } from './CategoriesSectionSkeleton';
import bookImg from './book.png';
import kindleImg from './kindel.png';
import tabletImg from './tablet2.png';

//const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
  {
    label: 'categories.paperBooks',
    path: '/paper',
    //image: `${BASE}img/categories/Paper-books.png`,
    image: bookImg,
  },
  {
    label: 'categories.audioBooks',
    path: '/audiobook',
    //image: `${BASE}img/categories/Audiobooks.png`,
    image: tabletImg,
  },
  {
    label: 'categories.kindleBooks',
    path: '/kindle',
    //image: `${BASE}img/categories/Kindle-books.png`,
    image: kindleImg,
  },
];

export const CategoriesSection = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeGrab, setActiveGrab] = useState(null);
  const [rotation, setRotation] = useState(0);

  const lastX = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging.current || activeGrab === null) return;

      if (lastX.current === null) {
        lastX.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - lastX.current;
      lastX.current = e.clientX;

      const sensitivity = 3;

      setRotation((prev) => {
        const next = prev + deltaX / sensitivity;

        if (next > 65) return 65;
        if (next < -65) return -65;

        return next;
      });
    };

    const handleUp = () => {
      isDragging.current = false;
      lastX.current = null;
      setActiveGrab(null);
      setRotation(0);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [activeGrab]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <CategoriesSectionSkeleton />;

  return (
    <section className="flex flex-col mt-[56px] px-4 gap-6 sm:px-6 lg:mt-[80px] lg:w-[1136px] lg:mx-auto lg:px-0 select-none">
      <h2 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
        {t('categories.shopByCategory')}
      </h2>

      <div className="flex flex-col sm:flex-row mt-[56px] items-center sm:items-baseline">
        {CATEGORIES.map((cat, index) => (
          <Link
            key={cat.path}
            to={cat.path}
            className={cn(
              'group relative transition-all duration-300',
              index !== 0 && 'ml-[-310px]',
              activeGrab === index ? 'cursor-grabbing' : 'cursor-grab',
            )}
            style={{
              zIndex: activeGrab === index ? 50 : CATEGORIES.length - index,
            }}
          >
            <div
              className="overflow-hidden rounded-2xl "
              id={`img-box-${index}`}
              onMouseDown={(e) => {
                e.preventDefault();
                setActiveGrab(index);
                isDragging.current = true;
                lastX.current = e.clientX;
              }}
              style={{
                transformOrigin: 'bottom left',
                transform:
                  activeGrab === index ?
                    `rotate(${rotation}deg)`
                  : 'rotate(0deg)',
                transition:
                  activeGrab === null ? 'transform 0.5s ease-out' : 'none',
                zIndex: activeGrab === index ? 50 : 10,
                cursor: activeGrab === index ? 'grabbing' : 'grab',
              }}
            >
              <img
                src={cat.image}
                alt={t(cat.label)}
                draggable={false}
                className="min-[640x]:w-[80px] min-[640xp]:h-[180px] aspect-[4/3] object-contain transition duration-500 group-hover:scale-105"
              />
            </div>

            <h3 className={cn(TYPOGRAPHY.h4, 'mt-4 text-foreground')}>
              {t(cat.label)}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
