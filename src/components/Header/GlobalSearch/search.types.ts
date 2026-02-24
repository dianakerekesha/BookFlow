import type { Book } from '@/types/Book';

export interface GroupedResults {
  authors: Book[];
  publishers: Book[];
  titles: Book[];
}

//export const TEXTS = {placeholder: 'Find a book or author',searching: 'Searching...',noResults: 'No books found',};

//export const UI = {all: 'Усі',addToCart: 'До кошика',sections: {publishers: 'Видавництва',authors: 'Автори',titles: 'Книжки',},};

export const COMMON_STYLES = {
  viewAllBtn:
    'text-[10px] text-foreground hover:text-black cursor-pointer uppercase tracking-widest flex items-center gap-1 group/all transition-colors font-bold',
  arrow: 'transition-transform group-hover/all:translate-x-0.5',
  itemIconBox:
    'w-10 h-10 bg-card rounded-lg flex items-center justify-center flex-shrink-0',
  sectionTitle: 'text-foreground font-bold text-sm',
  gridWrapper: 'grid grid-cols-1 md:grid-cols-3 gap-3 pt-2',
  cardBase:
    'flex items-center gap-3 bg-card p-3 rounded-xl border border-gray-100 shadow-sm transition-all cursor-pointer hover:bg-gray-50 hover:border-gray-200',
  bookCard:
    'flex gap-4 p-3 rounded-2xl bg-card border border-gray-100 shadow-sm transition-all cursor-pointer group hover:bg-gray-50 hover:border-gray-300',
  bookImageWrapper:
    'w-16 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 shadow-sm flex items-center justify-center border border-gray-100',
};
