import { useLocation, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchInput } from '../ui/input/SearchInput';

const CATEGORIES = [
  { label: 'Programming', value: 'programming' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Drama', value: 'drama' },
  { label: 'Detective', value: 'detective' },
];

type Props = {
  isMobile?: boolean;
  onCategorySelect?: () => void;
  onClick?: () => void;
};

export const HeaderSearch = ({
  isMobile,
  onCategorySelect,
  onClick,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentCategory =
    location.pathname.startsWith('/category/') ?
      location.pathname.split('/')[2]
    : '';

  const handleCategoryChange = (value: string) => {
    navigate(`/category/${value}`);
    onCategorySelect?.();
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div
          onClick={onClick}
          className="cursor-pointer"
        >
          <SearchInput
            value=""
            placeholder="Find a book or author"
            readOnly
          />
        </div>

        <Select
          value={currentCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="flex items-center justify-between px-4 h-[40px] w-full border border-border rounded-md bg-background text-sm font-bold text-foreground">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>

          <SelectContent className="bg-background border border-border rounded-md shadow-lg py-2 w-full">
            <SelectGroup>
              {CATEGORIES.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="px-4 py-2 text-sm cursor-pointer"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="hidden lg:flex items-center gap-3 mr-6 h-full"
    >
      <SearchInput
        value=""
        placeholder="Find a book or author"
        readOnly
      />

      <Select
        value={currentCategory}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="flex items-center justify-between gap-3 px-4 h-[40px] w-[176px] border border-border rounded-md bg-background text-sm font-bold text-foreground whitespace-nowrap hover:border-ring">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>

        <SelectContent className="min-w-[180px] bg-background border border-border rounded-md shadow-lg py-2">
          <SelectGroup>
            {CATEGORIES.map((category) => (
              <SelectItem
                key={category.value}
                value={category.value}
                className="px-4 py-2 text-sm cursor-pointer"
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
