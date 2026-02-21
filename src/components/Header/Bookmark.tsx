import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Sun, Moon, Settings } from 'lucide-react';

export const BookmarkToggle = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const langMap = {
    en: 'EN',
    uk: 'UA',
  };

  const languageToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(i18n.language === 'en' ? 'uk' : 'en');
    e.stopPropagation();
  };

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out z-[-1] ${
        isOpen ? 'top-full' : '-top-[70px]'
      }`}
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
            onClick={(e) => languageToggle(e)}
            className="text-md font-bold hover:scale-110 transition cursor-pointer"
            title="language"
          >
            {langMap[i18n.language as 'en' | 'uk']}
          </button>

          <button
            className="hover:scale-110 transition cursor-pointer"
            title="theme"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8c0-3 4-4 5-4s5 1 5 4c0 3-3 4-5 5-2 1-5 2-5 5 0 3 4 4 5 4s5-1 5-2" />

              <path d="M3 12h12" />

              <path d="M3 16h12" />
            </svg>
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
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
