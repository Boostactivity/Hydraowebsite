import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, Package, MapPin, Clock, Check, Info } from 'lucide-react';
import { useCurrency } from './CurrencyProvider';
import { useLanguage } from './LanguageProvider';

interface Country {
  code: string;
  name: string;
  nameEN: string;
  nameES: string;
  nameIT: string;
  zone: 'france' | 'europe' | 'nordic' | 'uk' | 'us' | 'world';
  shippingCost: number;
  freeShippingThreshold: number;
  deliveryDays: { min: number; max: number };
  flag: string;
}

const countries: Country[] = [
  // France
  { 
    code: 'FR', 
    name: 'France', 
    nameEN: 'France', 
    nameES: 'Francia', 
    nameIT: 'Francia',
    zone: 'france', 
    shippingCost: 0, 
    freeShippingThreshold: 0, 
    deliveryDays: { min: 2, max: 4 },
    flag: '🇫🇷'
  },
  
  // Europe Zone 1 (Allemagne, Belgique, Luxembourg, Pays-Bas)
  { 
    code: 'DE', 
    name: 'Allemagne', 
    nameEN: 'Germany', 
    nameES: 'Alemania', 
    nameIT: 'Germania',
    zone: 'europe', 
    shippingCost: 15, 
    freeShippingThreshold: 500, 
    deliveryDays: { min: 3, max: 6 },
    flag: '🇩🇪'
  },
  { 
    code: 'BE', 
    name: 'Belgique', 
    nameEN: 'Belgium', 
    nameES: 'Bélgica', 
    nameIT: 'Belgio',
    zone: 'europe', 
    shippingCost: 15, 
    freeShippingThreshold: 500, 
    deliveryDays: { min: 3, max: 5 },
    flag: '🇧🇪'
  },
  { 
    code: 'LU', 
    name: 'Luxembourg', 
    nameEN: 'Luxembourg', 
    nameES: 'Luxemburgo', 
    nameIT: 'Lussemburgo',
    zone: 'europe', 
    shippingCost: 15, 
    freeShippingThreshold: 500, 
    deliveryDays: { min: 3, max: 5 },
    flag: '🇱🇺'
  },
  { 
    code: 'NL', 
    name: 'Pays-Bas', 
    nameEN: 'Netherlands', 
    nameES: 'Países Bajos', 
    nameIT: 'Paesi Bassi',
    zone: 'europe', 
    shippingCost: 15, 
    freeShippingThreshold: 500, 
    deliveryDays: { min: 3, max: 6 },
    flag: '🇳🇱'
  },
  
  // Europe Zone 2 (Espagne, Italie, Portugal, Autriche, Suisse)
  { 
    code: 'ES', 
    name: 'Espagne', 
    nameEN: 'Spain', 
    nameES: 'España', 
    nameIT: 'Spagna',
    zone: 'europe', 
    shippingCost: 20, 
    freeShippingThreshold: 600, 
    deliveryDays: { min: 4, max: 7 },
    flag: '🇪🇸'
  },
  { 
    code: 'IT', 
    name: 'Italie', 
    nameEN: 'Italy', 
    nameES: 'Italia', 
    nameIT: 'Italia',
    zone: 'europe', 
    shippingCost: 20, 
    freeShippingThreshold: 600, 
    deliveryDays: { min: 4, max: 7 },
    flag: '🇮🇹'
  },
  { 
    code: 'PT', 
    name: 'Portugal', 
    nameEN: 'Portugal', 
    nameES: 'Portugal', 
    nameIT: 'Portogallo',
    zone: 'europe', 
    shippingCost: 20, 
    freeShippingThreshold: 600, 
    deliveryDays: { min: 5, max: 8 },
    flag: '🇵🇹'
  },
  { 
    code: 'AT', 
    name: 'Autriche', 
    nameEN: 'Austria', 
    nameES: 'Austria', 
    nameIT: 'Austria',
    zone: 'europe', 
    shippingCost: 20, 
    freeShippingThreshold: 600, 
    deliveryDays: { min: 4, max: 7 },
    flag: '🇦🇹'
  },
  { 
    code: 'CH', 
    name: 'Suisse', 
    nameEN: 'Switzerland', 
    nameES: 'Suiza', 
    nameIT: 'Svizzera',
    zone: 'europe', 
    shippingCost: 25, 
    freeShippingThreshold: 700, 
    deliveryDays: { min: 4, max: 8 },
    flag: '🇨🇭'
  },
  
  // Nordic Countries (Scandinavie)
  { 
    code: 'SE', 
    name: 'Suède', 
    nameEN: 'Sweden', 
    nameES: 'Suecia', 
    nameIT: 'Svezia',
    zone: 'nordic', 
    shippingCost: 25, 
    freeShippingThreshold: 700, 
    deliveryDays: { min: 4, max: 8 },
    flag: '🇸🇪'
  },
  { 
    code: 'NO', 
    name: 'Norvège', 
    nameEN: 'Norway', 
    nameES: 'Noruega', 
    nameIT: 'Norvegia',
    zone: 'nordic', 
    shippingCost: 30, 
    freeShippingThreshold: 750, 
    deliveryDays: { min: 5, max: 9 },
    flag: '🇳🇴'
  },
  { 
    code: 'DK', 
    name: 'Danemark', 
    nameEN: 'Denmark', 
    nameES: 'Dinamarca', 
    nameIT: 'Danimarca',
    zone: 'nordic', 
    shippingCost: 25, 
    freeShippingThreshold: 700, 
    deliveryDays: { min: 4, max: 8 },
    flag: '🇩🇰'
  },
  { 
    code: 'FI', 
    name: 'Finlande', 
    nameEN: 'Finland', 
    nameES: 'Finlandia', 
    nameIT: 'Finlandia',
    zone: 'nordic', 
    shippingCost: 30, 
    freeShippingThreshold: 750, 
    deliveryDays: { min: 5, max: 9 },
    flag: '🇫🇮'
  },
  { 
    code: 'IS', 
    name: 'Islande', 
    nameEN: 'Iceland', 
    nameES: 'Islandia', 
    nameIT: 'Islanda',
    zone: 'nordic', 
    shippingCost: 35, 
    freeShippingThreshold: 800, 
    deliveryDays: { min: 6, max: 10 },
    flag: '🇮🇸'
  },
  
  // UK
  { 
    code: 'GB', 
    name: 'Royaume-Uni', 
    nameEN: 'United Kingdom', 
    nameES: 'Reino Unido', 
    nameIT: 'Regno Unito',
    zone: 'uk', 
    shippingCost: 30, 
    freeShippingThreshold: 800, 
    deliveryDays: { min: 5, max: 9 },
    flag: '🇬🇧'
  },
  
  // US
  { 
    code: 'US', 
    name: 'États-Unis', 
    nameEN: 'United States', 
    nameES: 'Estados Unidos', 
    nameIT: 'Stati Uniti',
    zone: 'us', 
    shippingCost: 50, 
    freeShippingThreshold: 1000, 
    deliveryDays: { min: 7, max: 14 },
    flag: '🇺🇸'
  },
];

export function ShippingCalculator() {
  const { formatPrice } = useCurrency();
  const { language, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [cartTotal, setCartTotal] = useState(490);

  const getCountryName = (country: Country) => {
    switch (language) {
      case 'en': return country.nameEN;
      case 'es': return country.nameES;
      case 'it': return country.nameIT;
      default: return country.name;
    }
  };

  const shippingCost = cartTotal >= selectedCountry.freeShippingThreshold 
    ? 0 
    : selectedCountry.shippingCost;

  const isFreeShipping = shippingCost === 0;
  const amountForFreeShipping = selectedCountry.freeShippingThreshold - cartTotal;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Truck className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'fr' && 'Livraison internationale'}
          {language === 'en' && 'International Shipping'}
          {language === 'es' && 'Envío internacional'}
          {language === 'it' && 'Spedizione internazionale'}
        </h2>
      </div>

      {/* Country Selector */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-900 mb-3">
          {language === 'fr' && 'Sélectionnez votre pays'}
          {language === 'en' && 'Select your country'}
          {language === 'es' && 'Seleccione su país'}
          {language === 'it' && 'Seleziona il tuo paese'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedCountry.code === country.code
                  ? 'border-[#6B1E3E] bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{country.flag}</div>
              <div className="text-sm font-semibold text-gray-900">
                {getCountryName(country)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shipping Info Card */}
      <motion.div
        key={selectedCountry.code}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white mb-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">
              {language === 'fr' && 'Livraison vers'}
              {language === 'en' && 'Shipping to'}
              {language === 'es' && 'Envío a'}
              {language === 'it' && 'Spedizione a'}
            </div>
            <div className="text-2xl font-bold flex items-center gap-2">
              <span>{selectedCountry.flag}</span>
              <span>{getCountryName(selectedCountry)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90 mb-1">
              {language === 'fr' && 'Frais de port'}
              {language === 'en' && 'Shipping cost'}
              {language === 'es' && 'Gastos de envío'}
              {language === 'it' && 'Costi di spedizione'}
            </div>
            <div className="text-3xl font-bold">
              {isFreeShipping ? (
                <span className="text-green-300">
                  {language === 'fr' && 'GRATUIT'}
                  {language === 'en' && 'FREE'}
                  {language === 'es' && 'GRATIS'}
                  {language === 'it' && 'GRATIS'}
                </span>
              ) : (
                formatPrice(shippingCost)
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {selectedCountry.deliveryDays.min}-{selectedCountry.deliveryDays.max}{' '}
              {language === 'fr' && 'jours'}
              {language === 'en' && 'days'}
              {language === 'es' && 'días'}
              {language === 'it' && 'giorni'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>
              {language === 'fr' && 'Suivi inclus'}
              {language === 'en' && 'Tracking included'}
              {language === 'es' && 'Seguimiento incluido'}
              {language === 'it' && 'Tracciamento incluso'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Free Shipping Progress */}
      {!isFreeShipping && selectedCountry.freeShippingThreshold > 0 && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-900">
              {language === 'fr' && `Plus que ${formatPrice(amountForFreeShipping)} pour la livraison gratuite !`}
              {language === 'en' && `Only ${formatPrice(amountForFreeShipping)} more for free shipping!`}
              {language === 'es' && `¡Solo ${formatPrice(amountForFreeShipping)} más para envío gratis!`}
              {language === 'it' && `Solo ${formatPrice(amountForFreeShipping)} in più per la spedizione gratuita!`}
            </span>
          </div>
          <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${Math.min((cartTotal / selectedCountry.freeShippingThreshold) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              {language === 'fr' && 'Douane incluse'}
              {language === 'en' && 'Customs included'}
              {language === 'es' && 'Aduanas incluidas'}
              {language === 'it' && 'Dogana inclusa'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' && 'Pas de frais cachés'}
              {language === 'en' && 'No hidden fees'}
              {language === 'es' && 'Sin costes ocultos'}
              {language === 'it' && 'Nessun costo nascosto'}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
          <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              {language === 'fr' && 'Assurance incluse'}
              {language === 'en' && 'Insurance included'}
              {language === 'es' && 'Seguro incluido'}
              {language === 'it' && 'Assicurazione inclusa'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' && 'Colis sécurisé'}
              {language === 'en' && 'Secured parcel'}
              {language === 'es' && 'Paquete seguro'}
              {language === 'it' && 'Pacco sicuro'}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
          <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              {language === 'fr' && 'Suivi temps réel'}
              {language === 'en' && 'Real-time tracking'}
              {language === 'es' && 'Seguimiento en tiempo real'}
              {language === 'it' && 'Tracciamento in tempo reale'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' && 'Notifications SMS/Email'}
              {language === 'en' && 'SMS/Email notifications'}
              {language === 'es' && 'Notificaciones SMS/Email'}
              {language === 'it' && 'Notifiche SMS/Email'}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
          <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              {language === 'fr' && 'Retour gratuit 30j'}
              {language === 'en' && 'Free 30-day return'}
              {language === 'es' && 'Devolución gratis 30d'}
              {language === 'it' && 'Reso gratuito 30g'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' && 'Satisfait ou remboursé'}
              {language === 'en' && 'Money-back guarantee'}
              {language === 'es' && 'Garantía de devolución'}
              {language === 'it' && 'Garanzia soddisfatti'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}