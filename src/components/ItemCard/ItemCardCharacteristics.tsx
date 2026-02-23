import React from 'react';
import type { Book } from '@/types/Book';
import { formatListeningLength } from '@/components/ItemCard/helpers/formatListeningLength.ts';
import { TYPOGRAPHY } from '@/constants/typography';

type Props = { book: Book };
type Spec = { label: string; value: string | number | null | undefined };

export const ItemCardCharacteristics: React.FC<Props> = ({ book }) => {
  const specs: Spec[] = [
    { label: 'Author', value: book.author },
    { label: 'Cover type', value: book.coverType },
    { label: 'Number of pages', value: book.numberOfPages },
    { label: 'Year of publication', value: book.publicationYear },
    { label: 'Publication', value: book.publication },
    { label: 'Format', value: book.format },
    {
      label: 'Duration',
      value:
        book.listeningLength ?
          formatListeningLength(book.listeningLength)
        : null,
    },
    { label: 'Narrator', value: book.narrator },
    { label: 'Language', value: book.lang === 'uk' ? 'Ukrainian' : 'English' },
  ];

  const filtered = specs.filter((spec) => spec.value != null);

  return (
    <section className="w-full max-w-160 mx-auto lg:mx-0">
      <h2 className={`${TYPOGRAPHY.h2} text-foreground dark:text-white mb-4`}>
        Characteristics
      </h2>

      <div className="border-t border-border">
        {filtered.map((spec, index) => (
          <div
            key={spec.label}
            className={`flex justify-between py-3 ${index !== filtered.length - 1 ? 'border-b border-border' : ''}`}
          >
            <span className={`${TYPOGRAPHY.body} text-muted-foreground`}>
              {spec.label}
            </span>
            <span
              className={`${TYPOGRAPHY.body} font-medium text-foreground text-right`}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
