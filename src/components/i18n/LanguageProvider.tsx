import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'es' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations database
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.product': 'Produit',
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'nav.testimonials': 'Témoignages',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.account': 'Mon compte',
    
    // Hero
    'hero.title': 'Le robinet 5-en-1 qui change tout',
    'hero.subtitle': 'Eau plate, gazeuse, filtrée, chaude 100°C et froide glacée',
    'hero.cta': 'Économisez 2340€/an',
    'hero.price': '490€ TTC',
    'hero.trusted': 'Déjà + de 12 000 foyers conquis',
    
    // Features
    'features.title': 'Un système complet',
    'features.sparkling': 'Eau gazeuse',
    'features.sparkling.desc': 'Bulles à la demande',
    'features.filtered': 'Filtration premium',
    'features.filtered.desc': 'Eau pure instantanée',
    'features.boiling': 'Eau bouillante 100°C',
    'features.boiling.desc': 'Thé en 3 secondes',
    'features.chilled': 'Eau glacée 6°C',
    'features.chilled.desc': 'Fraîcheur instantanée',
    'features.smart': 'Intelligence IA',
    'features.smart.desc': 'Apprentissage de vos habitudes',
    
    // Pricing
    'pricing.title': 'Choisissez votre formule',
    'pricing.basic': 'Basic',
    'pricing.premium': 'Premium',
    'pricing.ultimate': 'Ultimate',
    'pricing.per.month': '/mois',
    'pricing.per.year': '/an',
    'pricing.device': 'Appareil HYDRAO',
    'pricing.shipping': 'Livraison offerte',
    'pricing.warranty': 'Garantie',
    'pricing.years': 'ans',
    'pricing.select': 'Choisir',
    
    // Calculator
    'calc.title': 'Calculateur d\'économies',
    'calc.subtitle': 'Découvrez combien vous pouvez économiser',
    'calc.household': 'Taille du foyer',
    'calc.people': 'personnes',
    'calc.consumption': 'Consommation actuelle',
    'calc.coffee': 'Cafés/jour',
    'calc.tea': 'Thés/jour',
    'calc.sparkling': 'L eau gazeuse/semaine',
    'calc.savings.title': 'Vos économies annuelles',
    'calc.roi': 'Retour sur investissement',
    'calc.months': 'mois',
    
    // Testimonials
    'testimonials.title': 'Ce que disent nos clients',
    'testimonials.verified': 'Avis vérifié',
    
    // CTA
    'cta.buy': 'Acheter maintenant',
    'cta.add.cart': 'Ajouter au panier',
    'cta.learn.more': 'En savoir plus',
    'cta.contact': 'Nous contacter',
    'cta.try.free': 'Essayer gratuitement',
    
    // Footer
    'footer.company': 'Entreprise',
    'footer.about': 'À propos',
    'footer.careers': 'Carrières',
    'footer.press': 'Presse',
    'footer.support': 'Support',
    'footer.help': 'Centre d\'aide',
    'footer.shipping': 'Livraison',
    'footer.returns': 'Retours',
    'footer.legal': 'Légal',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.cookies': 'Cookies',
    
    // Common
    'common.currency': '€',
    'common.or': 'ou',
    'common.from': 'à partir de',
    'common.free': 'Gratuit',
    'common.close': 'Fermer',
    'common.save': 'Économiser',
    'common.loading': 'Chargement...',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.product': 'Product',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.account': 'My Account',
    
    // Hero
    'hero.title': 'The 5-in-1 tap that changes everything',
    'hero.subtitle': 'Still, sparkling, filtered, boiling 100°C and chilled water',
    'hero.cta': 'Save $2,550/year',
    'hero.price': '$535',
    'hero.trusted': 'Already 12,000+ homes conquered',
    
    // Features
    'features.title': 'A complete system',
    'features.sparkling': 'Sparkling water',
    'features.sparkling.desc': 'Bubbles on demand',
    'features.filtered': 'Premium filtration',
    'features.filtered.desc': 'Pure water instantly',
    'features.boiling': 'Boiling water 100°C',
    'features.boiling.desc': 'Tea in 3 seconds',
    'features.chilled': 'Chilled water 6°C',
    'features.chilled.desc': 'Instant freshness',
    'features.smart': 'AI Intelligence',
    'features.smart.desc': 'Learns your habits',
    
    // Pricing
    'pricing.title': 'Choose your plan',
    'pricing.basic': 'Basic',
    'pricing.premium': 'Premium',
    'pricing.ultimate': 'Ultimate',
    'pricing.per.month': '/mo',
    'pricing.per.year': '/yr',
    'pricing.device': 'HYDRAO Device',
    'pricing.shipping': 'Free shipping',
    'pricing.warranty': 'Warranty',
    'pricing.years': 'years',
    'pricing.select': 'Select',
    
    // Calculator
    'calc.title': 'Savings Calculator',
    'calc.subtitle': 'Discover how much you can save',
    'calc.household': 'Household size',
    'calc.people': 'people',
    'calc.consumption': 'Current consumption',
    'calc.coffee': 'Coffees/day',
    'calc.tea': 'Teas/day',
    'calc.sparkling': 'L sparkling/week',
    'calc.savings.title': 'Your annual savings',
    'calc.roi': 'Return on investment',
    'calc.months': 'months',
    
    // Testimonials
    'testimonials.title': 'What our customers say',
    'testimonials.verified': 'Verified review',
    
    // CTA
    'cta.buy': 'Buy now',
    'cta.add.cart': 'Add to cart',
    'cta.learn.more': 'Learn more',
    'cta.contact': 'Contact us',
    'cta.try.free': 'Try free',
    
    // Footer
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.support': 'Support',
    'footer.help': 'Help Center',
    'footer.shipping': 'Shipping',
    'footer.returns': 'Returns',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    
    // Common
    'common.currency': '$',
    'common.or': 'or',
    'common.from': 'from',
    'common.free': 'Free',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.loading': 'Loading...',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.product': 'Producto',
    'nav.features': 'Características',
    'nav.pricing': 'Precios',
    'nav.testimonials': 'Testimonios',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contacto',
    'nav.cart': 'Carrito',
    'nav.account': 'Mi Cuenta',
    
    // Hero
    'hero.title': 'El grifo 5 en 1 que lo cambia todo',
    'hero.subtitle': 'Agua natural, con gas, filtrada, hirviendo 100°C y helada',
    'hero.cta': 'Ahorre 2.340€/año',
    'hero.price': '490€',
    'hero.trusted': 'Ya más de 12.000 hogares conquistados',
    
    // Features
    'features.title': 'Un sistema completo',
    'features.sparkling': 'Agua con gas',
    'features.sparkling.desc': 'Burbujas a demanda',
    'features.filtered': 'Filtración premium',
    'features.filtered.desc': 'Agua pura instantánea',
    'features.boiling': 'Agua hirviendo 100°C',
    'features.boiling.desc': 'Té en 3 segundos',
    'features.chilled': 'Agua helada 6°C',
    'features.chilled.desc': 'Frescura instantánea',
    'features.smart': 'Inteligencia IA',
    'features.smart.desc': 'Aprende tus hábitos',
    
    // Pricing
    'pricing.title': 'Elige tu plan',
    'pricing.basic': 'Basic',
    'pricing.premium': 'Premium',
    'pricing.ultimate': 'Ultimate',
    'pricing.per.month': '/mes',
    'pricing.per.year': '/año',
    'pricing.device': 'Dispositivo HYDRAO',
    'pricing.shipping': 'Envío gratuito',
    'pricing.warranty': 'Garantía',
    'pricing.years': 'años',
    'pricing.select': 'Seleccionar',
    
    // Calculator
    'calc.title': 'Calculadora de Ahorros',
    'calc.subtitle': 'Descubre cuánto puedes ahorrar',
    'calc.household': 'Tamaño del hogar',
    'calc.people': 'personas',
    'calc.consumption': 'Consumo actual',
    'calc.coffee': 'Cafés/día',
    'calc.tea': 'Tés/día',
    'calc.sparkling': 'L con gas/semana',
    'calc.savings.title': 'Tus ahorros anuales',
    'calc.roi': 'Retorno de inversión',
    'calc.months': 'meses',
    
    // Testimonials
    'testimonials.title': 'Lo que dicen nuestros clientes',
    'testimonials.verified': 'Opinión verificada',
    
    // CTA
    'cta.buy': 'Comprar ahora',
    'cta.add.cart': 'Añadir al carrito',
    'cta.learn.more': 'Saber más',
    'cta.contact': 'Contáctenos',
    'cta.try.free': 'Prueba gratis',
    
    // Footer
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de',
    'footer.careers': 'Carreras',
    'footer.press': 'Prensa',
    'footer.support': 'Soporte',
    'footer.help': 'Centro de ayuda',
    'footer.shipping': 'Envío',
    'footer.returns': 'Devoluciones',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.cookies': 'Cookies',
    
    // Common
    'common.currency': '€',
    'common.or': 'o',
    'common.from': 'desde',
    'common.free': 'Gratis',
    'common.close': 'Cerrar',
    'common.save': 'Ahorrar',
    'common.loading': 'Cargando...',
  },
  
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.product': 'Prodotto',
    'nav.features': 'Caratteristiche',
    'nav.pricing': 'Prezzi',
    'nav.testimonials': 'Testimonianze',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contatto',
    'nav.cart': 'Carrello',
    'nav.account': 'Il Mio Account',
    
    // Hero
    'hero.title': 'Il rubinetto 5 in 1 che cambia tutto',
    'hero.subtitle': 'Acqua naturale, frizzante, filtrata, bollente 100°C e fredda',
    'hero.cta': 'Risparmia 2.340€/anno',
    'hero.price': '490€',
    'hero.trusted': 'Già oltre 12.000 case conquistate',
    
    // Features
    'features.title': 'Un sistema completo',
    'features.sparkling': 'Acqua frizzante',
    'features.sparkling.desc': 'Bollicine su richiesta',
    'features.filtered': 'Filtrazione premium',
    'features.filtered.desc': 'Acqua pura istantanea',
    'features.boiling': 'Acqua bollente 100°C',
    'features.boiling.desc': 'Tè in 3 secondi',
    'features.chilled': 'Acqua fredda 6°C',
    'features.chilled.desc': 'Freschezza istantanea',
    'features.smart': 'Intelligenza AI',
    'features.smart.desc': 'Impara le tue abitudini',
    
    // Pricing
    'pricing.title': 'Scegli il tuo piano',
    'pricing.basic': 'Basic',
    'pricing.premium': 'Premium',
    'pricing.ultimate': 'Ultimate',
    'pricing.per.month': '/mese',
    'pricing.per.year': '/anno',
    'pricing.device': 'Dispositivo HYDRAO',
    'pricing.shipping': 'Spedizione gratuita',
    'pricing.warranty': 'Garanzia',
    'pricing.years': 'anni',
    'pricing.select': 'Seleziona',
    
    // Calculator
    'calc.title': 'Calcolatore di Risparmi',
    'calc.subtitle': 'Scopri quanto puoi risparmiare',
    'calc.household': 'Dimensione famiglia',
    'calc.people': 'persone',
    'calc.consumption': 'Consumo attuale',
    'calc.coffee': 'Caffè/giorno',
    'calc.tea': 'Tè/giorno',
    'calc.sparkling': 'L frizzante/settimana',
    'calc.savings.title': 'I tuoi risparmi annuali',
    'calc.roi': 'Ritorno sull\'investimento',
    'calc.months': 'mesi',
    
    // Testimonials
    'testimonials.title': 'Cosa dicono i nostri clienti',
    'testimonials.verified': 'Recensione verificata',
    
    // CTA
    'cta.buy': 'Acquista ora',
    'cta.add.cart': 'Aggiungi al carrello',
    'cta.learn.more': 'Scopri di più',
    'cta.contact': 'Contattaci',
    'cta.try.free': 'Prova gratis',
    
    // Footer
    'footer.company': 'Azienda',
    'footer.about': 'Chi siamo',
    'footer.careers': 'Carriere',
    'footer.press': 'Stampa',
    'footer.support': 'Supporto',
    'footer.help': 'Centro assistenza',
    'footer.shipping': 'Spedizione',
    'footer.returns': 'Resi',
    'footer.legal': 'Legale',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Termini',
    'footer.cookies': 'Cookies',
    
    // Common
    'common.currency': '€',
    'common.or': 'o',
    'common.from': 'da',
    'common.free': 'Gratis',
    'common.close': 'Chiudi',
    'common.save': 'Risparmia',
    'common.loading': 'Caricamento...',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  // Detect browser language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fr', 'en', 'es', 'it'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['fr', 'en', 'es', 'it'].includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
