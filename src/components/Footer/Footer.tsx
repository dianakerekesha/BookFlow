import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';

const linkClass = cn(
  TYPOGRAPHY.uppercase,
  'no-underline text-muted-foreground hover:text-foreground transition-colors',
);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative z-10 bg-secondary border-t border-border font-manrope">
      <div className="max-[639px]:hidden w-full">
        <div className="footer-container">
          <Link
            to="/"
            className="flex mr-4 transition-transform hover:scale-105"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/Logo.svg`}
              alt="Codex logo"
              className="w-22.25 h-8"
            />
          </Link>

          <div className="footer-spacer-left" />

          <nav className="shrink-0 flex items-center footer-nav-gap">
            <a
              href="https://github.com/online-store-2026/books-catalog-frontend"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Github
            </a>
            <Link
              to="/contacts"
              className={linkClass}
            >
              {t('navigation.contacts')}
            </Link>
            <Link
              to="/rights"
              className={linkClass}
            >
              {t('navigation.rights')}
            </Link>
          </nav>

          <div className="footer-spacer-right" />

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-4 cursor-pointer shrink-0 border-none bg-transparent p-0"
            aria-label="Scroll to top"
          >
            <span
              className={cn(
                TYPOGRAPHY.small,
                'leading-none whitespace-nowrap text-muted-foreground group-hover:text-foreground transition-colors',
              )}
            >
              {t('navigation.backToTop')}
            </span>
            <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>

      <div className="hidden max-[639px]:flex flex-col px-4 py-8 gap-8">
        <Link
          to="/"
          className="shrink-0 self-start"
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icons/Logo.svg`}
            alt="Nice Boook logo"
            className="w-22.25 h-8 transition-transform hover:scale-105"
          />
        </Link>

        <nav className="shrink-0 flex flex-col items-start gap-4">
          <a
            href="https://github.com/online-store-2026/books-catalog-frontend"
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            Github
          </a>
          <Link
            to="/contacts"
            className={linkClass}
          >
            Contacts
          </Link>
          <Link
            to="/rights"
            className={linkClass}
          >
            Rights
          </Link>
        </nav>

        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center gap-4 cursor-pointer shrink-0 self-center border-none bg-transparent p-0"
          aria-label="Scroll to top"
        >
          <span
            className={cn(
              TYPOGRAPHY.small,
              'leading-none whitespace-nowrap text-muted-foreground group-hover:text-foreground transition-colors',
            )}
          >
            Back to top
          </span>
          <span className="grid h-8 w-8 place-items-center text-muted-foreground group-hover:text-foreground transition-colors">
            <ChevronUp className="h-4 w-4" />
          </span>
        </button>
      </div>
    </footer>
  );
};
