import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import type { FavouritesEmptyProps } from './types/FavouritesEmpty';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { CustomButton } from '../ui/CustomButton';

const DEFAULT_CONTENT = {
  TITLE: 'Your heart is still looking for a match',
  DESCRIPTION:
    "It looks like you haven't found any books to fall in love with yet.",
  BUTTON: 'Explore Catalog',
} as const;

export const FavouritesEmpty = ({
  title = DEFAULT_CONTENT.TITLE,
  description = DEFAULT_CONTENT.DESCRIPTION,
  buttonText = DEFAULT_CONTENT.BUTTON,
  showSuggestions = true,
}: FavouritesEmptyProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
        <div className="relative mb-8">
          <Heart
            className="size-32 text-gray-100 animate-pulse"
            strokeWidth={0.5}
          />
          <Heart
            className="size-12 text-red-500 absolute bottom-2 right-2 animate-bounce"
            fill="currentColor"
          />
        </div>

        <h2 className={cn(TYPOGRAPHY.h2, 'mb-6')}>{title}</h2>

        <div className="flex flex-col items-center gap-6 mb-10">
          <p className="text-gray-500 text-lg">{description}</p>

          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-dashed border-gray-300">
            <p className="text-sm font-medium text-gray-700">
              Just click the{' '}
              <Heart
                className="inline size-4 text-red-500 mx-1"
                fill="currentColor"
              />{' '}
              icon on any product to save it here
            </p>
          </div>
        </div>

        <Link to="/home">
          <CustomButton size="catalog">{buttonText}</CustomButton>
        </Link>
      </div>

      {showSuggestions && <div />}

      <Link
        to="/home"
        className="group mt-8 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        View all{' '}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};
