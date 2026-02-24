import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Settings, DollarSign, Euro } from 'lucide-react';
import { HryvniaIcon } from '../ui/icons/hryvnia';
import { useCurrency } from '@/context/CurrencyContextType';

export const BookmarkToggle = ({
  isMobile = false,
}: {
  isMobile?: boolean;
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const langMap = {
    en: 'EN',
    uk: 'UA',
  };

  const languageToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uk' : 'en');
    event.stopPropagation();
  };

  const cycleCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (currency === 'UAH') setCurrency('USD');
    else if (currency === 'USD') setCurrency('EUR');
    else setCurrency('UAH');
  };

  return (
    <div
      className={`absolute transition-all duration-500 ease-in-out z-[-1]
        ${isMobile ? 'right-2' : 'left-1/2 -translate-x-1/2'}
        ${isOpen ? 'top-full' : '-top-[70px]'}`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div
        className="relative flex flex-col items-center bg-popover w-10 gap-15"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-1 lg:gap-6 mt-4 z-10">
          <button
            onClick={toggleTheme}
            className="hover:scale-110 transition cursor-pointer"
            title="theme"
          >
            {isDark ?
              <Moon />
            : <Sun />}
          </button>
          <button
            onClick={(event) => languageToggle(event)}
            className="text-md font-bold hover:scale-110 transition cursor-pointer"
            title="language"
          >
            {langMap[i18n.language as 'en' | 'uk']}
          </button>

          <button
            onClick={cycleCurrency}
            className="hover:scale-110 transition cursor-pointer"
            title="currency"
          >
            {currency === 'UAH' && <HryvniaIcon />}
            {currency === 'USD' && <DollarSign />}
            {currency === 'EUR' && <Euro />}
          </button>
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="mb-12 text-sm transition-transform duration-1700 ease-in-out cursor-pointer hover:rotate-360"
          title="settings"
        >
          <Settings />
        </button>
      </div>
    </div>
  );
};
