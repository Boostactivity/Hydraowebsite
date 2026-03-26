import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { Check, ArrowRight, Sparkles, Droplet, Zap, Star, Plus, Minus } from 'lucide-react';
import { HYDRAL_PRICES, subscriptions } from '../data/products';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ProductImageGallery } from '../components/ProductImageGallery';
import { ColorisSelector, ROBINET_COLORIS } from '../components/ColorisSelector';
import { defaultImages } from '../assets/products';

interface ConfiguratorPageProps {
  navigate: (page: Page) => void;
}

// Les 3 vrais modèles HYDRAL avec leurs prix respectifs
const hydroModels = [
  {
    id: 'pure',
    name: 'HYDRAL Pure',
    tagline: 'L\'essentiel',
    description: 'Eau filtrée + bouillante',
    price: HYDRAL_PRICES.pure,
    features: [
      'Eau filtrée pure (chlore éliminé)',
      'Eau bouillante 100°C instantanée',
      'Installation facile',
      'Économies immédiates'
    ],
    waterTypes: ['Eau filtrée', 'Eau bouillante'],
    icon: Droplet,
    color: 'from-blue-500 to-cyan-500',
    popular: false
  },
  {
    id: 'spark',
    name: 'HYDRAL Spark',
    tagline: 'Le préféré des familles',
    description: 'Eau filtrée + gazeuse + froide',
    price: HYDRAL_PRICES.spark,
    features: [
      'Eau filtrée illimitée',
      'Eau gazeuse à la demande',
      'Eau froide réfrigérée (4-8°C)',
      'Niveau de bulles réglable'
    ],
    waterTypes: ['Eau filtrée', 'Eau gazeuse', 'Eau froide'],
    icon: Zap,
    color: 'from-[#6B1E3E] to-[#8B2E4E]',
    popular: false
  },
  {
    id: 'one',
    name: 'HYDRAL One',
    tagline: 'Le plus choisi',
    description: 'Eau filtrée + gazeuse + bouillante + froide',
    price: HYDRAL_PRICES.one,
    features: [
      'Toutes les eaux en un robinet',
      'Eau bouillante instantanée (100°C)',
      'Eau gazeuse + froide (4-8°C)',
      'Le luxe absolu'
    ],
    waterTypes: ['Eau filtrée', 'Eau gazeuse', 'Eau bouillante', 'Eau froide'],
    icon: Star,
    color: 'from-amber-500 to-orange-500',
    popular: true
  }
];

const finishes = [
  { id: 'chrome', name: 'Chrome Brillant', color: 'bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400', colorisId: 'chrome-brillant' },
  { id: 'brushed', name: 'Acier Brossé', color: 'bg-gradient-to-br from-gray-400 to-gray-500', colorisId: 'nickel-brosse' },
  { id: 'black', name: 'Noir Mat', color: 'bg-gradient-to-br from-gray-900 to-black', colorisId: 'noir-mat' },
  { id: 'gold', name: 'Or Brossé', color: 'bg-gradient-to-br from-[#D4AF37] to-[#C59B2A]', premium: true, colorisId: 'or-brosse' },
  { id: 'gray', name: 'Gris métallisé', color: 'bg-gradient-to-br from-gray-500 to-gray-600', colorisId: 'gris-metallise' }
];

// Couleurs de personnalisation
const customColors = [
  { id: 'bordeaux', name: 'Bordeaux', color: '#6B1E3E' },
  { id: 'white', name: 'Blanc', color: '#FFFFFF' },
  { id: 'black', name: 'Noir mat', color: '#1A1A1A' },
  { id: 'gold', name: 'Or', color: '#D4AF37' },
  { id: 'sage', name: 'Vert sauge', color: '#9CAF88' },
  { id: 'navy', name: 'Bleu nuit', color: '#1E3A5F' },
  { id: 'pink', name: 'Rose poudré', color: '#E8B4B8' },
  { id: 'anthracite', name: 'Gris anthracite', color: '#3D3D3D' }
];

// Packs de bienvenue selon abonnement
const welcomePacks = {
  'filter-only': {
    name: 'Essentiel',
    value: 40, // 2x Verre 1L (16€) + 2x Tritan 1L (14€) + 2x Tritan 50cl (10€) = 40€
    items: [
      { id: 'glass-1l-1', type: 'Verre 1L', qty: 2, canCustomize: true, canName: false },
      { id: 'tritan-1l-1', type: 'Tritan 1L', qty: 2, canCustomize: true, canName: true },
      { id: 'tritan-50cl-1', type: 'Tritan 50cl', qty: 2, canCustomize: true, canName: true }
    ]
  },
  'standard': {
    name: 'Standard',
    value: 76, // 3x Verre 1L (24€) + 3x Tritan 1L (21€) + 3x Tritan 50cl (15€) + 1 carafe (16€) = 76€
    items: [
      { id: 'glass-1l-2', type: 'Verre 1L', qty: 3, canCustomize: true, canName: false },
      { id: 'tritan-1l-2', type: 'Tritan 1L', qty: 3, canCustomize: true, canName: true },
      { id: 'tritan-50cl-2', type: 'Tritan 50cl', qty: 3, canCustomize: true, canName: true },
      { id: 'carafe-open', type: 'Carafe ouverte', qty: 1, canCustomize: true, canName: false }
    ]
  },
  'plus': {
    name: 'Plus',
    value: 120, // 4x Verre 1L (32€) + 4x Tritan 1L (28€) + 4x Tritan 50cl (20€) + 2 carafes (32€) + 1 thermos (10€) = 122€
    items: [
      { id: 'glass-1l-3', type: 'Verre 1L', qty: 4, canCustomize: true, canName: false },
      { id: 'tritan-1l-3', type: 'Tritan 1L', qty: 4, canCustomize: true, canName: true },
      { id: 'tritan-50cl-3', type: 'Tritan 50cl', qty: 4, canCustomize: true, canName: true },
      { id: 'carafe-open-2', type: 'Carafe ouverte', qty: 1, canCustomize: true, canName: false },
      { id: 'carafe-sealed', type: 'Carafe hermétique', qty: 1, canCustomize: true, canName: false },
      { id: 'thermos', type: 'Thermos', qty: 1, canCustomize: true, canName: true }
    ]
  },
  'plus-plus': {
    name: 'Premium',
    value: 120, // Même contenu que Plus
    items: [
      { id: 'glass-1l-4', type: 'Verre 1L', qty: 4, canCustomize: true, canName: false },
      { id: 'tritan-1l-4', type: 'Tritan 1L', qty: 4, canCustomize: true, canName: true },
      { id: 'tritan-50cl-4', type: 'Tritan 50cl', qty: 4, canCustomize: true, canName: true },
      { id: 'carafe-open-3', type: 'Carafe ouverte', qty: 1, canCustomize: true, canName: false },
      { id: 'carafe-sealed-2', type: 'Carafe hermétique', qty: 1, canCustomize: true, canName: false },
      { id: 'thermos-2', type: 'Thermos', qty: 1, canCustomize: true, canName: true }
    ]
  }
};

interface ItemCustomization {
  color: string;
  name?: string;
}

export function ConfiguratorPage({ navigate }: ConfiguratorPageProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string>('chrome');
  const [selectedSubscription, setSelectedSubscription] = useState<string>('standard');
  const [customizations, setCustomizations] = useState<{ [key: string]: ItemCustomization }>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const { addToCart } = useCart();

  // Tracker le scroll pour ajuster l'opacité
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = Math.min(scrollTop / scrollableHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer l'opacité : transparent au début (0.5), opaque à la fin (1)
  const stickyOpacity = 0.5 + (scrollProgress * 0.5);

  // Calculer le bottom dynamique : remonte légèrement quand on arrive tout en bas
  // En haut de page: bottom-6 (24px)
  // En bas de page: remonte légèrement pour ne pas coller au bord
  const stickyBottom = scrollProgress > 0.9 
    ? 24 + ((scrollProgress - 0.9) / 0.1) * 50 // Remonte progressivement de 24px à 74px seulement
    : 24; // Position normale

  // Initialiser les couleurs par défaut (bordeaux)
  useEffect(() => {
    if (selectedSubscription) {
      const pack = welcomePacks[selectedSubscription as keyof typeof welcomePacks];
      if (pack) {
        const defaultCustomizations: { [key: string]: ItemCustomization } = {};
        pack.items.forEach((item) => {
          for (let i = 0; i < item.qty; i++) {
            const key = `${item.id}-${i}`;
            if (!customizations[key]) {
              defaultCustomizations[key] = { color: 'bordeaux' };
            }
          }
        });
        setCustomizations(prev => ({ ...defaultCustomizations, ...prev }));
      }
    }
  }, [selectedSubscription]);

  const handleColorChange = (itemKey: string, color: string) => {
    setCustomizations(prev => ({
      ...prev,
      [itemKey]: { ...prev[itemKey], color }
    }));
  };

  const handleNameChange = (itemKey: string, name: string) => {
    setCustomizations(prev => ({
      ...prev,
      [itemKey]: { ...prev[itemKey], name: name.slice(0, 12) }
    }));
  };

  const handleAddToCart = () => {
    if (!selectedModel) return;
    
    const model = hydroModels.find(m => m.id === selectedModel);
    const finish = finishes.find(f => f.id === selectedFinish);
    const subscription = subscriptions.find(s => s.id === selectedSubscription);
    
    if (model && finish && subscription) {
      addToCart({
        id: `config-${Date.now()}`,
        name: `${model.name} - ${finish.name}`,
        price: model.price,
        quantity: 1,
        type: 'Configuration personnalisée',
        image: defaultImages.faucet
      });
      navigate('cart');
    }
  };

  const selectedPack = selectedSubscription ? welcomePacks[selectedSubscription as keyof typeof welcomePacks] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="pb-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16 pt-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider font-medium">Choisissez votre modèle</span>
            </div>

            <h1 className="mb-6 text-gray-900">
              Choisissez votre HYDRAL
            </h1>
          </div>

          {/* Étape 1 : Choix du modèle */}
          <div className="mb-20">
            <h2 className="text-3xl text-gray-900 mb-8 text-center">Quel robinet correspond à vos besoins ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hydroModels.map((model, index) => {
                const isSelected = selectedModel === model.id;
                const Icon = model.icon;
                
                return (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`relative cursor-pointer rounded-3xl p-8 border-2 transition-all ${
                      isSelected
                        ? 'border-[#6B1E3E] bg-white shadow-2xl scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                    } ${model.popular ? 'ring-2 ring-[#6B1E3E]/20' : ''}`}
                  >
                    {model.popular && (
                      <div className="absolute -top-3 -right-3 px-4 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white text-xs rounded-full shadow-lg">
                        {model.tagline}
                      </div>
                    )}

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-4 -left-4 w-12 h-12 bg-[#6B1E3E] rounded-full flex items-center justify-center shadow-xl"
                        >
                          <Check className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${model.color} flex items-center justify-center mx-auto mb-6`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl text-gray-900 mb-2">{model.name}</h3>
                      <p className="text-sm text-[#6B1E3E] mb-3 font-medium">{model.tagline}</p>
                      <p className="text-[#8B7E74] mb-4 font-light">{model.description}</p>
                    </div>

                    <div className="mb-6 space-y-2">
                      {model.waterTypes.map((type, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[#8B7E74]">
                          <div className="w-2 h-2 rounded-full bg-[#6B1E3E]"></div>
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm text-left mb-6">
                      {model.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#6B1E3E] mt-0.5 flex-shrink-0" />
                          <span className="text-[#8B7E74]">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <div className="text-3xl text-[#6B1E3E] font-light text-center">
                        {model.price}€
                      </div>
                      <div className="text-sm text-[#8B7E74] mt-1 text-center">TTC, toutes finitions</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Étape 2 : Finition */}
          <AnimatePresence>
            {selectedModel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-20"
              >
                {/* Titre et description */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6B1E3E]/10 border border-[#6B1E3E]/20 rounded-full text-sm text-[#6B1E3E] font-medium mb-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    Votre sélection
                  </motion.div>
                  <h3 className="text-3xl text-gray-900 mb-3">
                    {hydroModels.find(m => m.id === selectedModel)?.name}
                  </h3>
                  <p className="text-lg text-[#8B7E74]">
                    Choisissez votre finition — 5 coloris exclusifs
                  </p>
                </div>

                {/* Sélecteur de coloris avec label */}
                <div className="mb-12 max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-700">Finition sélectionnée</p>
                    <p className="text-sm text-[#6B1E3E] font-semibold">
                      {ROBINET_COLORIS.find(c => c.id === (finishes.find(f => f.id === selectedFinish)?.colorisId))?.name || 'Chrome brillant'}
                    </p>
                  </div>
                  <ColorisSelector
                    selectedColoris={finishes.find(f => f.id === selectedFinish)?.colorisId || 'chrome-brillant'}
                    onSelectColoris={(colorisId) => {
                      const finish = finishes.find(f => f.colorisId === colorisId);
                      if (finish) setSelectedFinish(finish.id);
                    }}
                    colorisOptions={ROBINET_COLORIS}
                  />
                </div>

                {/* Galerie d'images + Informations côte à côte */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  {/* Galerie avec effet premium */}
                  <motion.div
                    key={`${selectedModel}-${selectedFinish}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#6B1E3E]/5 to-transparent rounded-3xl blur-2xl" />
                    <div className="relative">
                      <ProductImageGallery
                        productName={hydroModels.find(m => m.id === selectedModel)?.name || ''}
                        colorName={finishes.find(f => f.id === selectedFinish)?.name || ''}
                        modelSKU={selectedModel}
                        colorId={finishes.find(f => f.id === selectedFinish)?.colorisId || 'chrome-brillant'}
                      />
                    </div>
                  </motion.div>

                  {/* Informations avec USP */}
                  <div className="space-y-5">
                    {/* Badge premium */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6B1E3E]/10 to-[#6B1E3E]/5 border border-[#6B1E3E]/20 rounded-full">
                      <Check className="w-4 h-4 text-[#6B1E3E]" />
                      <span className="text-sm font-medium text-gray-900">Qualité premium garantie 3 ans</span>
                    </div>

                    {/* Avantages finition */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#6B1E3E]" />
                        Finition {ROBINET_COLORIS.find(c => c.id === (finishes.find(f => f.id === selectedFinish)?.colorisId))?.name}
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                          <span>Revêtement anti-traces PVD — reste impeccable sans effort</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                          <span>Résistance extrême aux rayures, corrosion et oxydation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                          <span>Garantie constructeur 3 ans sur toutes les finitions</span>
                        </li>
                      </ul>
                    </div>

                    {/* Installation */}
                    <div className="bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-2xl p-6 border border-[#6B1E3E]/20">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-[#6B1E3E]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Installation facile, par un bricoleur ou un professionnel</h4>
                          <p className="text-sm text-gray-700">
                            Guide technique détaillé fourni. Installation possible par vous-même ou un professionnel.
                          </p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[#6B1E3E]/10">
                        <p className="text-xs text-[#8B7E74] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6B1E3E]" />
                          Dimensions : H 40cm × L 22cm × P 12cm
                        </p>
                      </div>
                    </div>

                    {/* Social proof subtil */}
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B1E3E] to-[#8B2E5E] border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B2E5E] to-[#6B1E3E] border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B1E3E]/70 to-[#8B2E5E]/70 border-2 border-white" />
                      </div>
                      <p className="text-sm text-[#8B7E74]">
                        <span className="font-semibold text-gray-900">350+ familles</span> équipées
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Étape 3 : Abonnement */}
          <AnimatePresence>
            {selectedModel && selectedFinish && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-20"
              >
                <h2 className="text-3xl text-gray-900 mb-8 text-center">Choisissez votre abonnement</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {subscriptions.map((sub, index) => {
                    const isSelected = selectedSubscription === sub.id;
                    
                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedSubscription(sub.id)}
                        className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                          isSelected
                            ? 'border-[#6B1E3E] bg-white shadow-xl'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        } ${sub.popular ? 'ring-2 ring-[#6B1E3E]/20' : ''}`}
                      >
                        {sub.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white text-xs rounded-full">
                            Populaire
                          </div>
                        )}

                        <div className="text-center mb-4">
                          <h3 className="text-xl text-gray-900 mb-2">{sub.name}</h3>
                          <div className="text-3xl text-[#6B1E3E] font-light mb-1">
                            {sub.priceYear}€<span className="text-lg">/an</span>
                          </div>
                          <div className="text-sm text-[#8B7E74]">
                            soit {sub.priceMonth}€/mois
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          {sub.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#6B1E3E] mt-0.5 flex-shrink-0" />
                              <span className="text-[#8B7E74]">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {isSelected && (
                          <div className="flex justify-center mt-4">
                            <div className="w-8 h-8 bg-[#6B1E3E] rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pack de bienvenue */}
                {selectedPack && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 p-8 bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-3xl border border-[#6B1E3E]/20"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl text-gray-900 mb-2">Et avec votre formule, vous recevez aussi...</h3>
                      <p className="text-[#8B7E74]">Valeur ~{selectedPack.value}€ offerts</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedPack.items.map((item) => (
                        <div key={item.id} className="text-center p-4 bg-white rounded-xl">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Droplet className="w-8 h-8 text-[#6B1E3E]" />
                          </div>
                          <div className="text-sm text-gray-900 font-medium">{item.qty}x {item.type}</div>
                        </div>
                      ))}
                    </div>

                    <p className="text-center text-sm text-[#8B7E74] mt-6">
                      Tous vos accessoires sont personnalisables à l'étape suivante — couleurs et prénoms.
                    </p>

                    {/* Réassurance */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-xs text-[#8B7E74]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                        <span>Résiliable à tout moment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                        <span>Livraison incluse</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                        <span>Rappel automatique</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                        <span>Prix fixe garanti</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Étape 4 : Personnalisation */}
          <AnimatePresence>
            {selectedModel && selectedFinish && selectedSubscription && selectedPack && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-20"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl text-gray-900 mb-3">Votre pack, à votre image</h2>
                  <p className="text-xl text-[#8B7E74] font-light">Choisissez vos couleurs. Ajoutez un prénom si vous le souhaitez.</p>
                </div>

                <div className="space-y-6">
                  {selectedPack.items.map((item) => {
                    const hasMultiple = item.qty > 1;
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200"
                      >
                        {/* En-tête avec titre et quantité */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex-shrink-0">
                            <div 
                              className="w-16 h-16 rounded-xl flex items-center justify-center"
                              style={{ 
                                backgroundColor: customColors.find(c => c.id === (customizations[`${item.id}-0`]?.color || 'bordeaux'))?.color || '#6B1E3E' 
                              }}
                            >
                              <Droplet className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-xl text-gray-900 font-medium">
                              {item.qty}x {item.type}
                            </h4>
                            <p className="text-sm text-[#8B7E74]">
                              {item.canName ? 'Couleur et prénom personnalisables individuellement' : 'Couleur personnalisable individuellement'}
                            </p>
                          </div>
                        </div>

                        {/* Grille de personnalisation individuelle par item */}
                        <div className={`grid gap-4 ${item.qty === 1 ? 'grid-cols-1' : item.qty === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                          {Array.from({ length: item.qty }).map((_, idx) => {
                            const itemKey = `${item.id}-${idx}`;
                            const customization = customizations[itemKey] || { color: 'bordeaux' };
                            const selectedColor = customColors.find(c => c.id === customization.color);
                            
                            return (
                              <div key={itemKey} className="p-4 bg-[#FAF8F5] rounded-xl border border-gray-200">
                                {/* Numéro si multiple */}
                                {hasMultiple && (
                                  <div className="text-xs text-[#8B7E74] mb-3 font-medium">
                                    {item.type} #{idx + 1}
                                  </div>
                                )}

                                {/* Aperçu mini */}
                                <div className="flex items-center gap-3 mb-3">
                                  <div 
                                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: selectedColor?.color || '#6B1E3E' }}
                                  >
                                    <Droplet className="w-6 h-6 text-white" />
                                  </div>
                                  {customization.name && (
                                    <div className="text-sm text-[#6B1E3E] font-medium truncate">
                                      {customization.name}
                                    </div>
                                  )}
                                </div>

                                {/* Palette couleurs compacte */}
                                <div className="mb-3">
                                  <label className="text-xs text-[#8B7E74] mb-2 block">Couleur du liseré</label>
                                  <div className="flex flex-wrap gap-1.5">
                                    {customColors.map((color) => {
                                      const isSelected = customization.color === color.id;
                                      return (
                                        <button
                                          key={color.id}
                                          onClick={() => handleColorChange(itemKey, color.id)}
                                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            isSelected
                                              ? 'border-[#6B1E3E] scale-110 shadow-md'
                                              : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                                          }`}
                                          style={{ backgroundColor: color.color }}
                                          title={color.name}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Champ prénom (si éligible) */}
                                {item.canName && (
                                  <div>
                                    <label className="text-xs text-[#8B7E74] mb-2 block">
                                      Prénom (optionnel)
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={12}
                                      value={customization.name || ''}
                                      onChange={(e) => handleNameChange(itemKey, e.target.value)}
                                      placeholder="Max 12 caractères"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1E3E] focus:border-transparent text-sm"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Aperçu récapitulatif */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
                >
                  <h4 className="text-lg text-gray-900 font-medium mb-4 text-center">Récapitulatif de votre personnalisation</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {selectedPack.items.map((item) => {
                      return Array.from({ length: item.qty }).map((_, idx) => {
                        const itemKey = `${item.id}-${idx}`;
                        const customization = customizations[itemKey] || { color: 'bordeaux' };
                        const selectedColor = customColors.find(c => c.id === customization.color);
                        
                        return (
                          <div 
                            key={itemKey}
                            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-200"
                          >
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: selectedColor?.color || '#6B1E3E' }}
                            >
                              <Droplet className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-xs text-center">
                              <div className="text-gray-900 font-medium">{item.type}</div>
                              {customization.name && (
                                <div className="text-[#6B1E3E] font-medium mt-1">{customization.name}</div>
                              )}
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message si aucun choix */}
          {!selectedModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[#8B7E74] text-lg">
                👆 Sélectionnez un modèle pour commencer
              </p>
            </motion.div>
          )}
        </div>

        {/* Sticky bottom : Résumé et CTA - TOUJOURS VISIBLE */}
        <AnimatePresence>
          {selectedModel && selectedFinish && selectedSubscription && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
              style={{ bottom: `${stickyBottom}px`, opacity: stickyOpacity }}
            >
              <div 
                className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-6 shadow-2xl transition-opacity duration-300"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Résumé */}
                  <div className="flex items-center gap-6">
                    <div className="text-left">
                      <div className="text-sm text-white/80 mb-1">Votre configuration</div>
                      <div className="text-xl font-light">
                        {hydroModels.find(m => m.id === selectedModel)?.name} - {' '}
                        {finishes.find(f => f.id === selectedFinish)?.name}
                      </div>
                      <div className="text-sm text-white/70 mt-1">
                        Abonnement {subscriptions.find(s => s.id === selectedSubscription)?.name}
                      </div>
                    </div>
                  </div>

                  {/* Prix et CTA */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-white/80">Robinet</div>
                      <div className="text-4xl font-light">{hydroModels.find(m => m.id === selectedModel)?.price}€</div>
                      <div className="text-xs text-white/70">+ abonnement dès {subscriptions.find(s => s.id === selectedSubscription)?.priceMonth}€/mois</div>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-medium hover:bg-[#FAF8F5] transition-colors whitespace-nowrap shadow-xl flex items-center gap-2"
                    >
                      <span>Confirmer ma commande</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}