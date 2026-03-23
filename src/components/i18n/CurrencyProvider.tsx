import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

export type Currency = 'EUR' | 'USD' | 'GBP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (priceEUR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (in real app, fetch from API)
const exchangeRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
};

// Currency symbols and formatting
const currencyConfig: Record<Currency, { symbol: string; position: 'before' | 'after'; locale: string }> = {
  EUR: { symbol: '€', position: 'after', locale: 'fr-FR' },
  USD: { symbol: '$', position: 'before', locale: 'en-US' },
  GBP: { symbol: '£', position: 'before', locale: 'en-GB' },
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [currency, setCurrencyState] = useState<Currency>('EUR');

  // Auto-detect currency based on language
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency;
    if (savedCurrency && ['EUR', 'USD', 'GBP'].includes(savedCurrency)) {
      setCurrencyState(savedCurrency);
    } else {
      const defaultCurrency = language === 'en' ? 'USD' : 'EUR';
      setCurrencyState(defaultCurrency);
    }
  }, [language]);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('currency', curr);
  };

  const convertPrice = (priceEUR: number): number => {
    return Math.round(priceEUR * exchangeRates[currency]);
  };

  const formatPrice = (priceEUR: number): string => {
    const convertedPrice = convertPrice(priceEUR);
    const config = currencyConfig[currency];
    
    const formatted = new Intl.NumberFormat(config.locale, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedPrice);

    if (config.position === 'before') {
      return `${config.symbol}${formatted}`;
    } else {
      return `${formatted}${config.symbol}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
