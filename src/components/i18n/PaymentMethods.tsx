import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Building, Smartphone, Wallet, Check, Shield } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { useCurrency } from './CurrencyProvider';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  countries: string[];
  description: {
    fr: string;
    en: string;
    es: string;
    it: string;
  };
  processingTime: string;
  fees: number;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Carte bancaire',
    icon: <CreditCard className="w-6 h-6" />,
    countries: ['FR', 'DE', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'AT', 'CH', 'GB', 'US'],
    description: {
      fr: 'Visa, Mastercard, American Express',
      en: 'Visa, Mastercard, American Express',
      es: 'Visa, Mastercard, American Express',
      it: 'Visa, Mastercard, American Express',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'sepa',
    name: 'Virement SEPA',
    icon: <Building className="w-6 h-6" />,
    countries: ['FR', 'DE', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'AT'],
    description: {
      fr: 'Virement bancaire européen',
      en: 'European bank transfer',
      es: 'Transferencia bancaria europea',
      it: 'Bonifico bancario europeo',
    },
    processingTime: '1-3 jours',
    fees: 0,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: (
      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
        P
      </div>
    ),
    countries: ['FR', 'DE', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'AT', 'CH', 'GB', 'US'],
    description: {
      fr: 'Paiement sécurisé PayPal',
      en: 'Secure PayPal payment',
      es: 'Pago seguro PayPal',
      it: 'Pagamento sicuro PayPal',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    icon: <Smartphone className="w-6 h-6" />,
    countries: ['FR', 'DE', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'AT', 'CH', 'GB', 'US'],
    description: {
      fr: 'Paiement rapide Apple Pay',
      en: 'Fast Apple Pay payment',
      es: 'Pago rápido Apple Pay',
      it: 'Pagamento rapido Apple Pay',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'googlepay',
    name: 'Google Pay',
    icon: <Wallet className="w-6 h-6" />,
    countries: ['FR', 'DE', 'BE', 'LU', 'NL', 'ES', 'IT', 'PT', 'AT', 'CH', 'GB', 'US'],
    description: {
      fr: 'Paiement rapide Google Pay',
      en: 'Fast Google Pay payment',
      es: 'Pago rápido Google Pay',
      it: 'Pagamento rapido Google Pay',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'klarna',
    name: 'Klarna',
    icon: (
      <div className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white font-bold text-xs">
        K
      </div>
    ),
    countries: ['FR', 'DE', 'BE', 'NL', 'AT', 'CH', 'GB', 'US'],
    description: {
      fr: 'Payez en 3× sans frais',
      en: 'Pay in 3 interest-free',
      es: 'Paga en 3× sin intereses',
      it: 'Paga in 3× senza interessi',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'ideal',
    name: 'iDEAL',
    icon: (
      <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center text-white font-bold text-xs">
        iD
      </div>
    ),
    countries: ['NL'],
    description: {
      fr: 'Paiement bancaire néerlandais',
      en: 'Dutch bank payment',
      es: 'Pago bancario holandés',
      it: 'Pagamento bancario olandese',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'giropay',
    name: 'Giropay',
    icon: (
      <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
        GP
      </div>
    ),
    countries: ['DE', 'AT'],
    description: {
      fr: 'Paiement bancaire allemand',
      en: 'German bank payment',
      es: 'Pago bancario alemán',
      it: 'Pagamento bancario tedesco',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'sofort',
    name: 'Sofort',
    icon: (
      <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center text-white font-bold text-xs">
        S
      </div>
    ),
    countries: ['DE', 'AT', 'CH', 'BE', 'NL'],
    description: {
      fr: 'Virement instantané',
      en: 'Instant bank transfer',
      es: 'Transferencia instantánea',
      it: 'Bonifico istantaneo',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'bancontact',
    name: 'Bancontact',
    icon: (
      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
        BC
      </div>
    ),
    countries: ['BE'],
    description: {
      fr: 'Carte de débit belge',
      en: 'Belgian debit card',
      es: 'Tarjeta de débito belga',
      it: 'Carta di debito belga',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'swish',
    name: 'Swish',
    icon: (
      <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">
        SW
      </div>
    ),
    countries: ['SE'],
    description: {
      fr: 'Paiement mobile suédois',
      en: 'Swedish mobile payment',
      es: 'Pago móvil sueco',
      it: 'Pagamento mobile svedese',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'vipps',
    name: 'Vipps',
    icon: (
      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
        VP
      </div>
    ),
    countries: ['NO'],
    description: {
      fr: 'Paiement mobile norvégien',
      en: 'Norwegian mobile payment',
      es: 'Pago móvil noruego',
      it: 'Pagamento mobile norvegese',
    },
    processingTime: 'Instant',
    fees: 0,
  },
  {
    id: 'mobilepay',
    name: 'MobilePay',
    icon: (
      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
        MP
      </div>
    ),
    countries: ['DK', 'FI'],
    description: {
      fr: 'Paiement mobile danois/finlandais',
      en: 'Danish/Finnish mobile payment',
      es: 'Pago móvil danés/finlandés',
      it: 'Pagamento mobile danese/finlandese',
    },
    processingTime: 'Instant',
    fees: 0,
  },
];

export function PaymentMethods() {
  const { language, t } = useLanguage();
  const { currency } = useCurrency();
  const [selectedCountry, setSelectedCountry] = useState<string>('FR');
  const [selectedMethod, setSelectedMethod] = useState<string>('card');

  const availableMethods = paymentMethods.filter(method =>
    method.countries.includes(selectedCountry)
  );

  const countries = [
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'GB', name: 'UK', flag: '🇬🇧' },
    { code: 'US', name: 'USA', flag: '🇺🇸' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'fr' && 'Moyens de paiement'}
          {language === 'en' && 'Payment Methods'}
          {language === 'es' && 'Métodos de pago'}
          {language === 'it' && 'Metodi di pagamento'}
        </h2>
      </div>

      {/* Country Selector */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-900 mb-3">
          {language === 'fr' && 'Votre pays'}
          {language === 'en' && 'Your country'}
          {language === 'es' && 'Su país'}
          {language === 'it' && 'Il tuo paese'}
        </label>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                selectedCountry === country.code
                  ? 'border-[#6B1E3E] bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{country.flag}</span>
              <span className="font-semibold text-gray-900">{country.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Available Payment Methods */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            {language === 'fr' && `${availableMethods.length} moyens de paiement disponibles`}
            {language === 'en' && `${availableMethods.length} payment methods available`}
            {language === 'es' && `${availableMethods.length} métodos de pago disponibles`}
            {language === 'it' && `${availableMethods.length} metodi di pagamento disponibili`}
          </h3>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Shield className="w-4 h-4" />
            <span className="font-semibold">
              {language === 'fr' && 'Paiement 100% sécurisé'}
              {language === 'en' && '100% secure payment'}
              {language === 'es' && 'Pago 100% seguro'}
              {language === 'it' && 'Pagamento 100% sicuro'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableMethods.map((method) => (
            <motion.button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedMethod === method.id
                  ? 'border-[#6B1E3E] bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{method.name}</div>
                    <div className="text-sm text-gray-600">
                      {method.description[language]}
                    </div>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <div className="w-6 h-6 bg-[#6B1E3E] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {language === 'fr' && 'Traitement:'}
                  {language === 'en' && 'Processing:'}
                  {language === 'es' && 'Procesamiento:'}
                  {language === 'it' && 'Elaborazione:'}
                  {' '}
                  <span className="font-semibold text-gray-900">{method.processingTime}</span>
                </span>
                {method.fees === 0 ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {language === 'fr' && 'Sans frais'}
                    {language === 'en' && 'No fees'}
                    {language === 'es' && 'Sin cargos'}
                    {language === 'it' && 'Senza commissioni'}
                  </span>
                ) : (
                  <span className="text-gray-600">{method.fees}%</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          {language === 'fr' && 'Paiement sécurisé'}
          {language === 'en' && 'Secure Payment'}
          {language === 'es' && 'Pago Seguro'}
          {language === 'it' && 'Pagamento Sicuro'}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm font-semibold">SSL 256-bit</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="text-sm font-semibold">PCI DSS</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl mb-2">✓</div>
            <div className="text-sm font-semibold">3D Secure</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl mb-2">🔐</div>
            <div className="text-sm font-semibold">
              {language === 'fr' && 'Chiffré'}
              {language === 'en' && 'Encrypted'}
              {language === 'es' && 'Cifrado'}
              {language === 'it' && 'Crittografato'}
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm opacity-90">
          {language === 'fr' && 'Vos données de paiement sont chiffrées et ne sont jamais stockées sur nos serveurs.'}
          {language === 'en' && 'Your payment data is encrypted and never stored on our servers.'}
          {language === 'es' && 'Sus datos de pago están cifrados y nunca se almacenan en nuestros servidores.'}
          {language === 'it' && 'I tuoi dati di pagamento sono crittografati e non vengono mai archiviati sui nostre server.'}
        </div>
      </div>

      {/* Payment in installments highlight */}
      {selectedCountry !== 'US' && (
        <div className="mt-6 p-4 bg-pink-50 border-2 border-pink-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💳</div>
            <div>
              <div className="font-semibold text-pink-900 mb-1">
                {language === 'fr' && 'Payez en 3× sans frais avec Klarna'}
                {language === 'en' && 'Pay in 3 interest-free with Klarna'}
                {language === 'es' && 'Paga en 3× sin intereses con Klarna'}
                {language === 'it' && 'Paga in 3× senza interessi con Klarna'}
              </div>
              <div className="text-sm text-pink-800">
                {language === 'fr' && '3 paiements de 163€ au lieu de 490€'}
                {language === 'en' && '3 payments of $178 instead of $535'}
                {language === 'es' && '3 pagos de 163€ en lugar de 490€'}
                {language === 'it' && '3 pagamenti di 163€ invece di 490€'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}