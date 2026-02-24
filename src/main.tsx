import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartFavoritesProvider } from '@/context/CartFavoritesContext';
import { AuthProvider } from './context/AuthContext.tsx';
import { BooksProvider } from './context/BooksContext';
import { LanguageProvider } from './context/Language.Context.tsx';
import { CurrencyProvider } from './context/CurrencyContextType.tsx';
import App from './App.tsx';
import './i18n.ts';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

const params = new URLSearchParams(window.location.search);
const redirectPath = params.get('p');
if (redirectPath) {
  window.history.replaceState(
    null,
    '',
    '/books-catalog-frontend' + redirectPath,
  );
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/books-catalog-frontend/">
      <AuthProvider>
        <CartFavoritesProvider>
          <BooksProvider>
            <LanguageProvider>
              <CurrencyProvider>
                <App />
              </CurrencyProvider>
            </LanguageProvider>
          </BooksProvider>
        </CartFavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
