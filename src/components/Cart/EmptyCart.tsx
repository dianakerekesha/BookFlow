import { Link } from 'react-router-dom';
import { ShoppingCart, MousePointerClick, ArrowRight } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import { Trans } from 'react-i18next';
import { cn } from '@/lib/utils';
import { CustomButton } from '../ui/CustomButton';
import { Loader } from '@/components/ui/Loader';

const DEFAULT_CONTENT = {
  TITLE: 'Your cart is still sleeping',
  DESCRIPTION: 'Add some books to wake it up',
  BUTTON: 'Back to Shop',
} as const;

interface EmptyCartProps {
  title?: string;
  description?: string;
  buttonText?: string;
  isLoading?: boolean;
}

export const EmptyCart = ({
  title = DEFAULT_CONTENT.TITLE,
  description = DEFAULT_CONTENT.DESCRIPTION,
  buttonText = DEFAULT_CONTENT.BUTTON,
  isLoading = false,
}: EmptyCartProps) => {
  return (
    <Loader isLoading={isLoading}>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
          <div className="relative mb-8">
            <ShoppingCart
              className="size-32 text-gray-100 animate-pulse"
              strokeWidth={0.5}
            />
            <ShoppingCart
              className="size-12 text-foreground absolute bottom-2 right-2 animate-bounce"
              fill="currentColor"
            />
          </div>

          <h2 className={cn(TYPOGRAPHY.h2, 'mb-6')}>{title}</h2>

          <div className="flex flex-col items-center gap-6 mb-10">
            <p className="text-gray-500 text-lg">{description}</p>

            <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-2xl border border-dashed border-gray-300">
              <MousePointerClick className="size-5 text-blue-500" />
              <p className="text-sm font-medium text-gray-700">
                <Trans i18nKey="cart.emptyHint">
                  Click <strong>Add to cart</strong> on any book to get started
                </Trans>
              </p>
            </div>
          </div>

          <Link to="/">
            <CustomButton size="catalog">{buttonText}</CustomButton>
          </Link>
        </div>

        <Link
          to="/"
          className="group mt-8 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          View all{' '}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Loader>
  );
};
