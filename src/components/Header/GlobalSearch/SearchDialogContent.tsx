import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Building2, User2, BookOpen, ArrowRight } from 'lucide-react';
import type { Book } from '@/types/Book';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { AddButton, HeartButton } from '@/components/ui/Buttons';
import { SearchInput } from '@/components/ui/input/SearchInput';
import { Icon } from '@/components/ui/icons';
import { useCartFavorites } from '@/context/CartFavoritesContext';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/lib/toast';
import { TextHighlighter } from './TextHighlighter';
import { useSearchBooks } from './useSearchBooks';
import { COMMON_STYLES } from './search.types';

interface Props {
  onClose: () => void;
  onSelect?: () => void;
}

export const SearchDialogContent = ({ onClose, onSelect }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, results, groupedResults, loading } =
    useSearchBooks();

  const TEXTS = {
    placeholder: t('search.placeholder'),
    searching: t('search.searching'),
    noResults: t('search.noResults'),
  };

  const UI = {
    all: t('search.all'),
    sections: {
      publishers: t('search.publishers'),
      authors: t('search.authors'),
      titles: t('search.titles'),
    },
  };

  const handleBookChange = (book: Book) => {
    navigate(`/item/${book.type}/${book.slug}`);
    onClose();
    onSelect?.();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { toggleFavorite, isFavorite, isInCart, addToCart } =
    useCartFavorites();

  const handleToggleFavorite = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!isFavorite(book.id)) {
      toggleFavorite(book);
      showSuccess('Book added to favorites!');
    }
  };

  const handleAddToCart = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    addToCart(book);
    showSuccess('Book added to cart!');
  };

  const handleViewAll = () => {
    onClose();
    onSelect?.();
    navigate('/');
  };

  return (
    <Command
      className="bg-background"
      shouldFilter={false}
    >
      <div className="flex items-center border-b border-gray-100 px-4 py-3">
        <SearchInput
          autoFocus
          value={searchTerm}
          placeholder={TEXTS.placeholder}
          onChange={handleInputChange}
        />
      </div>

      <CommandList className="max-h-[550px] overflow-y-auto p-4 custom-scrollbar bg-background">
        {loading && (
          <div className="p-4 text-sm text-foreground animate-pulse flex items-center gap-2">
            {TEXTS.searching}
          </div>
        )}

        <div className="space-y-6">
          {groupedResults.publishers.length > 0 && (
            <CommandGroup
              heading={
                <div className="flex justify-between items-center w-full">
                  <span className={COMMON_STYLES.sectionTitle}>
                    {UI.sections.publishers}
                  </span>
                  <button
                    className={COMMON_STYLES.viewAllBtn}
                    onClick={() => handleViewAll()}
                  >
                    {UI.all} ({groupedResults.publishers.length}){' '}
                    <ArrowRight
                      size={12}
                      className={COMMON_STYLES.arrow}
                    />
                  </button>
                </div>
              }
            >
              <div className={COMMON_STYLES.gridWrapper}>
                {groupedResults.publishers.slice(0, 3).map((pub) => (
                  <CommandItem
                    key={`pub-${pub.id}`}
                    value={`pub-${pub.publication}-${pub.id}`}
                    onSelect={() => handleBookChange(pub)}
                    className={COMMON_STYLES.cardBase}
                  >
                    <div className={COMMON_STYLES.itemIconBox}>
                      <Building2
                        size={18}
                        className="text-foreground"
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground uppercase truncate">
                      {pub.publication}
                    </span>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          )}

          {groupedResults.authors.length > 0 && (
            <CommandGroup
              heading={
                <div className="flex justify-between items-center w-full">
                  <span className={COMMON_STYLES.sectionTitle}>
                    {UI.sections.authors}
                  </span>
                  <button
                    className={COMMON_STYLES.viewAllBtn}
                    onClick={() => handleViewAll()}
                  >
                    {UI.all} ({groupedResults.authors.length}){' '}
                    <ArrowRight
                      size={12}
                      className={COMMON_STYLES.arrow}
                    />
                  </button>
                </div>
              }
            >
              <div className={COMMON_STYLES.gridWrapper}>
                {groupedResults.authors.slice(0, 3).map((book) => (
                  <CommandItem
                    key={`auth-${book.id}`}
                    value={`auth-${book.author}-${book.id}`}
                    onSelect={() => handleBookChange(book)}
                    className={COMMON_STYLES.cardBase}
                  >
                    <div className={COMMON_STYLES.itemIconBox}>
                      <User2
                        size={18}
                        className="text-foreground"
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground truncate">
                      <TextHighlighter
                        text={book.author}
                        query={searchTerm}
                      />
                    </span>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          )}

          {groupedResults.titles.length > 0 && (
            <CommandGroup
              heading={
                <div className="flex justify-between items-center w-full">
                  <span className={COMMON_STYLES.sectionTitle}>
                    {UI.sections.titles}
                  </span>
                  <button
                    className={COMMON_STYLES.viewAllBtn}
                    onClick={() => handleViewAll()}
                  >
                    {UI.all} ({groupedResults.titles.length}){' '}
                    <ArrowRight
                      size={12}
                      className={COMMON_STYLES.arrow}
                    />
                  </button>
                </div>
              }
            >
              <div className="space-y-3 mt-2">
                {groupedResults.titles.slice(0, 4).map((book) => (
                  <CommandItem
                    key={`title-${book.id}`}
                    value={`title-${book.name}-${book.id}`}
                    onSelect={() => handleBookChange(book)}
                    className={COMMON_STYLES.bookCard}
                  >
                    <div className={COMMON_STYLES.bookImageWrapper}>
                      {book.images ?
                        <img
                          src={book.images[0]}
                          className="w-full h-full object-cover"
                          alt="book-logotype"
                        />
                      : <BookOpen
                          size={20}
                          className="text-foreground"
                        />
                      }
                    </div>
                    <div className="flex flex-col justify-between py-0.5 flex-grow">
                      <div>
                        <p className="text-[10px] text-foreground font-medium mb-0.5 uppercase tracking-tighter">
                          {book.author}
                        </p>
                        <h4 className="text-sm text-foreground font-bold leading-tight line-clamp-2">
                          <TextHighlighter
                            text={book.name}
                            query={searchTerm}
                          />
                        </h4>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-black text-foreground">
                          {book.priceRegular || book.priceDiscount} грн
                        </span>
                        <div
                          onClick={(event) => event.stopPropagation()}
                          className="text-[10px] font-bold text-foreground relative z-10 group-hover:text-popover flex items-center gap-1 transition-colors"
                        >
                          <AddButton
                            isSelected={isInCart(book.id)}
                            className={cn(
                              '!w-8 !h-8 !p-0 !bg-transparent !shadow-none',
                              'flex items-center justify-center rounded-m',
                              'border border-black-800',
                              'hover:border-black',
                              'text-background',
                            )}
                            onClick={() => {
                              handleAddToCart(book);
                            }}
                          >
                            <Icon
                              name={isInCart(book.id) ? 'check' : 'shoppingBag'}
                              size="sm"
                              className="w-5 h-5"
                            />
                          </AddButton>
                          <HeartButton
                            isSelected={isFavorite(book.id)}
                            onClick={() => handleToggleFavorite(book)}
                          />
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          )}
        </div>

        {!loading && results.length === 0 && searchTerm.trim().length > 0 && (
          <CommandEmpty className="p-12 text-center text-foreground font-medium">
            {TEXTS.noResults}
          </CommandEmpty>
        )}
      </CommandList>
    </Command>
  );
};
