import type { SetURLSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  sort: string;
  itemsPerPage: number | 'all';
  setSearchParams: SetURLSearchParams;
  onChangeItemsPerPage: (value: number | 'all') => void;
  handleChangeNumber: (value: number) => void;
};

export const CatalogControls = ({
  sort,
  itemsPerPage,
  setSearchParams,
  onChangeItemsPerPage,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-span-2 md:col-span-4 lg:col-span-4 text-left mb-[24px]">
        <label className="text-[#89939A] text-[12px] font-manrope font-medium mb-[3px]">
          {t('ui.sortBy')}
        </label>
        <Select
          value={sort}
          onValueChange={(value) => {
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);

              if (value) {
                params.set('sort', value);
                params.set('page', '1');
              } else {
                params.delete('sort');
              }

              return params;
            });
          }}
        >
          <SelectTrigger className="w-full h-[40px] rounded-[8px] border-[#E2E6E9] bg-white font-manrope text-[#313237] text-[14px] font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">{t('ui.date')}</SelectItem>
              <SelectItem value="alphabetically">{t('ui.name')}</SelectItem>
              <SelectItem value="cheapest">{t('ui.price')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 md:col-span-3 lg:col-span-3 text-left mb-[24px]">
        <label className="text-[#89939A] text-[12px] font-manrope font-medium mb-[3px]">
          {t('ui.itemsOnPage')}
        </label>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            onChangeItemsPerPage(value === 'all' ? 'all' : Number(value));
          }}
        >
          <SelectTrigger className="w-full h-[40px] rounded-[8px] border-[#E2E6E9] bg-white font-manrope text-[#313237] text-[14px] font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">{t('ui.all')}</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="16">16</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
