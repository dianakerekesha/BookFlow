import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartFavoritesProvider } from '@/context/CartFavoritesContext';
import { AuthProvider } from './context/AuthContext.tsx';
import { BooksProvider } from './context/BooksContext';
import App from './App.tsx';
import './i18n.ts';
import './index.css';

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
