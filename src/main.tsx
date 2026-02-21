import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n.ts';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CartFavoritesProvider } from '@/context/CartFavoritesContext';
import { AuthProvider } from './context/authContext.tsx';
import { BooksProvider } from './context/BooksContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/books-catalog-frontend/">
    <AuthProvider>
      <CartFavoritesProvider>
        <BooksProvider>
          <App />
        </BooksProvider>
      </CartFavoritesProvider>
    </AuthProvider>
  </BrowserRouter>,
);
