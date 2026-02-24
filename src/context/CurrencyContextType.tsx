import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type Currency = 'UAH' | 'USD' | 'EUR';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convertPrice: (priceUAH: number) => number;
  formatPrice: (priceUAH: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const rates = {
  UAH: 1,
  USD: 0.026, // можеш поміняти
  EUR: 0.024,
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('currency') as Currency) || 'UAH';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (priceUAH: number) => {
    return priceUAH * rates[currency];
  };

  const formatPrice = (priceUAH: number) => {
    const converted = convertPrice(priceUAH);

    const symbols = {
      UAH: '₴',
      USD: '$',
      EUR: '€',
    };

    return `${converted.toFixed(2)} ${symbols[currency]}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertPrice, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
};
