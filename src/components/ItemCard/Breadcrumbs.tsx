import React from 'react';
import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '@/constants/typography';
import { Icon } from '@/components/ui/icons';

type Props = {
  type: string;
  category?: string;
  bookName: string;
};

export const Breadcrumbs: React.FC<Props> = ({ type, category, bookName }) => {
  return (
    <nav className="flex items-center gap-2 text-muted-foreground mb-6 flex-wrap">
      <Link
        to="/"
        className="hover:text-foreground transition-colors"
      >
        <Icon
          name="home"
          size="sm"
        />
      </Link>

      <Icon
        name="chevronRight"
        size="sm"
        className="text-muted-foreground"
      />

      <Link
        to={`/${type === 'paperback' ? 'paper' : type}`}
        className={`${TYPOGRAPHY.body} capitalize hover:text-foreground transition-colors`}
      >
        {type === 'paperback' ? 'Paper Books' : type}
      </Link>

      {category && (
        <>
          <Icon
            name="chevronRight"
            size="sm"
            className="text-muted-foreground"
          />
          <span className={`${TYPOGRAPHY.body} text-foreground`}>
            {category}
          </span>
        </>
      )}

      <Icon
        name="chevronRight"
        size="sm"
        className="text-muted-foreground"
      />

      <span
        className={`${TYPOGRAPHY.body} font-medium text-foreground truncate max-w-50 sm:max-w-none`}
      >
        {bookName}
      </span>
    </nav>
  );
};
