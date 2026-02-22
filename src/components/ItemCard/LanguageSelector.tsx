import React, { useState } from 'react';
import type { Book } from '@/types/Book';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';

type Props = {
  book: Book;
  bookVariants: Book[];
  onBookChange: (newBook: Book) => void;
};

export const LanguageSelector: React.FC<Props> = ({
  book,
  bookVariants,
  onBookChange,
}) => {
  const [selected, setSelected] = useState(book.lang);

  const handleChange = (langCode: string) => {
    if (langCode === selected) return;

    setSelected(langCode);

    const match = bookVariants.find((book) => book.lang === langCode);

    if (match) {
      onBookChange(match);
    }
  };

  return (
    <div className="flex gap-2">
      {book.langAvailable.map((lang: string) => {
        const label = lang.toUpperCase() === 'UK' ? 'УКР' : 'ENG';
        const isSelected = selected === lang;

        return (
          <button
            key={lang}
            onClick={() => handleChange(lang)}
            className={cn(
              TYPOGRAPHY.buttons,
              'w-11.25 h-8.75 px-0 py-0 rounded-md border cursor-pointer transition-colors',
              isSelected ?
                'bg-foreground text-background border-foreground'
              : 'bg-background text-foreground border-border hover:border-foreground',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
