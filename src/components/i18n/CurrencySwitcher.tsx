import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Check } from 'lucide-react';
import { useCurrency, Currency } from './CurrencyProvider';

const currencies = [
  { code: 'EUR' as Currency, name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD' as Currency, name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP' as Currency, name: 'British Pound', symbol: '£', flag: '🇬🇧' },
];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrency = currencies.find(c => c.code === currency);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Changer de devise"
        aria-expanded={isOpen}
      >
        <DollarSign className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-900">{currentCurrency?.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-40 min-w-[220px]"
            >
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                    currency === curr.code ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{curr.flag}</span>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{curr.code}</div>
                      <div className="text-sm text-gray-600">{curr.name}</div>
                    </div>
                  </div>
                  {currency === curr.code && (
                    <Check className="w-5 h-5 text-[#6B1E3E]" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Price display component with currency conversion
interface PriceProps {
  value: number;
  className?: string;
  showCurrency?: boolean;
}

export function Price({ value, className = '', showCurrency = true }: PriceProps) {
  const { formatPrice } = useCurrency();

  return (
    <span className={className}>
      {formatPrice(value)}
    </span>
  );
}

// Compact currency switcher (inline)
export function CompactCurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {currencies.map((curr) => (
        <button
          key={curr.code}
          onClick={() => setCurrency(curr.code)}
          className={`px-3 py-1 rounded-lg font-semibold transition-all ${
            currency === curr.code
              ? 'bg-[#6B1E3E] text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          title={curr.name}
        >
          {curr.symbol}
        </button>
      ))}
    </div>
  );
}
