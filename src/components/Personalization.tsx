import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Minus, Package, Truck, RefreshCw, Lock } from 'lucide-react';

// Types
type PlanType = 'essential' | 'standard' | 'plus';
type PaymentRhythm = 'monthly' | 'quarterly' | 'annual';

interface Color {
  name: string;
  hex: string;
  ring: string;
}

interface PackItem {
  id: string;
  name: string;
  icon: string;
  allowsName: boolean;
  quantity: number;
}

interface ItemCustomization {
  color: string;
  name?: string;
}

// Palette de couleurs
const COLORS: Color[] = [
  { name: 'Bordeaux Hydral', hex: '#6B1E3E', ring: 'ring-[#6B1E3E]' },
  { name: 'Blanc', hex: '#FFFFFF', ring: 'ring-gray-300' },
  { name: 'Noir mat', hex: '#1F1F1F', ring: 'ring-gray-900' },
  { name: 'Or', hex: '#D4AF37', ring: 'ring-yellow-600' },
  { name: 'Vert sauge', hex: '#87AE73', ring: 'ring-green-600' },
  { name: 'Bleu nuit', hex: '#1E3A5F', ring: 'ring-blue-900' },
  { name: 'Rose poudré', hex: '#E8B4BC', ring: 'ring-pink-400' },
  { name: 'Gris anthracite', hex: '#3D3D3D', ring: 'ring-gray-700' }
];

// Packs selon formule
const PACKS: Record<PlanType, PackItem[]> = {
  essential: [
    { id: 'glass-1l', name: 'Bouteille en verre 1L', icon: '🥤', allowsName: false, quantity: 2 },
    { id: 'tritan-1l', name: 'Bouteille Tritan 1L', icon: '🍾', allowsName: true, quantity: 2 },
    { id: 'tritan-50cl', name: 'Bouteille Tritan 50cl', icon: '🍶', allowsName: true, quantity: 2 }
  ],
  standard: [
    { id: 'glass-1l', name: 'Bouteille en verre 1L', icon: '🥤', allowsName: false, quantity: 3 },
    { id: 'tritan-1l', name: 'Bouteille Tritan 1L', icon: '🍾', allowsName: true, quantity: 3 },
    { id: 'tritan-50cl', name: 'Bouteille Tritan 50cl', icon: '🍶', allowsName: true, quantity: 3 },
    { id: 'carafe-open', name: 'Carafe ouverte', icon: '🫗', allowsName: false, quantity: 1 }
  ],
  plus: [
    { id: 'glass-1l', name: 'Bouteille en verre 1L', icon: '🥤', allowsName: false, quantity: 4 },
    { id: 'tritan-1l', name: 'Bouteille Tritan 1L', icon: '🍾', allowsName: true, quantity: 4 },
    { id: 'tritan-50cl', name: 'Bouteille Tritan 50cl', icon: '🍶', allowsName: true, quantity: 4 },
    { id: 'carafe-open', name: 'Carafe ouverte', icon: '🫗', allowsName: false, quantity: 1 },
    { id: 'carafe-closed', name: 'Carafe hermétique', icon: '🫙', allowsName: false, quantity: 1 },
    { id: 'thermos', name: 'Thermos', icon: '🌡️', allowsName: true, quantity: 1 }
  ]
};

// Bouteilles supplémentaires
const EXTRA_ITEMS = [
  { id: 'tritan-1l', name: 'Bouteille Tritan 1L', icon: '🍾', price: 7, allowsName: true },
  { id: 'tritan-50cl', name: 'Bouteille Tritan 50cl', icon: '🍶', price: 5, allowsName: true },
  { id: 'glass-1l', name: 'Bouteille en verre 1L', icon: '🥤', price: 8, allowsName: false },
  { id: 'thermos', name: 'Thermos', icon: '🌡️', price: 10, allowsName: true }
];

interface PersonalizationProps {
  onComplete?: (customization: any) => void;
}

export default function Personalization({ onComplete }: PersonalizationProps) {
  // Récupérer les données du tunnel
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standard');
  const [selectedRhythm, setSelectedRhythm] = useState<PaymentRhythm>('annual');
  const [selectedSKU, setSelectedSKU] = useState<string>('SKU2');
  
  // État de personnalisation : { "itemId-index": { color, name } }
  const [customizations, setCustomizations] = useState<Record<string, ItemCustomization>>({});
  
  // Bouteilles supplémentaires : { "itemId": quantity }
  const [extraItems, setExtraItems] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const calcData = sessionStorage.getItem('calculatorData');
      const planData = sessionStorage.getItem('subscriptionData');
      
      let plan: PlanType = 'standard'; // Default
      
      if (calcData) {
        const parsed = JSON.parse(calcData);
        setSelectedSKU(parsed.selectedSKU || 'SKU2');
      }
      
      if (planData) {
        const parsed = JSON.parse(planData);
        plan = parsed.plan || 'standard';
        setSelectedPlan(plan);
        setSelectedRhythm(parsed.rhythm || 'annual');
      }
      
      // Initialiser toutes les couleurs par défaut (Bordeaux) AVEC le bon plan
      const packItems = PACKS[plan];
      const initialCustomizations: Record<string, ItemCustomization> = {};
      
      packItems.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          initialCustomizations[`${item.id}-${i}`] = {
            color: COLORS[0].hex // Bordeaux par défaut
          };
        }
      });
      
      setCustomizations(initialCustomizations);
    }
  }, []);

  const updateItemColor = (itemKey: string, colorHex: string) => {
    setCustomizations(prev => ({
      ...prev,
      [itemKey]: {
        ...prev[itemKey],
        color: colorHex
      }
    }));
  };

  const updateItemName = (itemKey: string, name: string) => {
    setCustomizations(prev => ({
      ...prev,
      [itemKey]: {
        ...prev[itemKey],
        name: name.slice(0, 12) // Max 12 caractères
      }
    }));
  };

  const updateExtraItem = (itemId: string, delta: number) => {
    setExtraItems(prev => {
      const current = prev[itemId] || 0;
      const newValue = Math.max(0, current + delta);
      if (newValue === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newValue };
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const packItems = PACKS[selectedPlan];

  return (
    <div className="bg-gradient-to-b from-white to-[#F5E6ED]/20 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3">
            Votre pack, <span className="text-[#6B1E3E] font-medium">à votre image</span>
          </h1>
          <p className="text-lg text-gray-600">
            Choisissez vos couleurs. Ajoutez votre prénom si vous le souhaitez. On s'occupe du reste.
          </p>
        </motion.div>

        {/* Pack items */}
        <div className="space-y-8 mb-16">
          {packItems.map((item) => {
            // Créer un array pour gérer les quantités multiples
            const itemsArray = Array.from({ length: item.quantity }, (_, i) => i);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="text-xl font-medium text-gray-900">{item.name}</h3>
                    {item.quantity > 1 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        × {item.quantity}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 ml-12">
                    Logo Hydral inclus • Liserés personnalisables
                  </p>
                </div>

                <div className="space-y-6">
                  {itemsArray.map((index) => {
                    const itemKey = `${item.id}-${index}`;
                    const customization = customizations[itemKey] || { color: COLORS[0].hex };
                    
                    return (
                      <div key={itemKey} className="pl-12 border-l-2 border-gray-100">
                        {item.quantity > 1 && (
                          <div className="text-sm font-medium text-gray-700 mb-3">
                            {item.name} {index + 1}
                          </div>
                        )}
                        
                        {/* Aperçu couleur */}
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-16 h-16 rounded-lg border-2 transition-all duration-200"
                            style={{ 
                              borderColor: customization.color,
                              backgroundColor: customization.color === '#FFFFFF' ? '#F9FAFB' : `${customization.color}10`
                            }}
                          />
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-2">Couleur des liserés</div>
                            <div className="flex flex-wrap gap-2">
                              {COLORS.map((color) => (
                                <button
                                  key={color.hex}
                                  onClick={() => updateItemColor(itemKey, color.hex)}
                                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                    customization.color === color.hex
                                      ? 'ring-2 ring-offset-2 ' + color.ring
                                      : 'border-gray-300'
                                  }`}
                                  style={{ 
                                    backgroundColor: color.hex,
                                    borderColor: color.hex === '#FFFFFF' ? '#E5E7EB' : color.hex
                                  }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Prénom optionnel */}
                        {item.allowsName && (
                          <div className="mt-4">
                            <label className="block text-xs text-gray-500 mb-2">
                              Ajouter un prénom (optionnel)
                            </label>
                            <input
                              type="text"
                              maxLength={12}
                              value={customization.name || ''}
                              onChange={(e) => updateItemName(itemKey, e.target.value)}
                              placeholder="Ex : Sophie"
                              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B1E3E] focus:border-transparent"
                            />
                            {customization.name && (
                              <div className="mt-2 text-xs text-gray-400">
                                {customization.name.length}/12 caractères
                              </div>
                            )}
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

        {/* Bouteilles supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-16"
        >
          <h3 className="text-xl font-light text-gray-900 mb-6">
            Besoin de <span className="text-[#6B1E3E] font-medium">bouteilles supplémentaires</span> ?
          </h3>
          <div className="space-y-4">
            {EXTRA_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{formatPrice(item.price)} pièce</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateExtraItem(item.id, -1)}
                    disabled={!extraItems[item.id]}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-gray-900">
                    {extraItems[item.id] || 0}
                  </span>
                  <button
                    onClick={() => updateExtraItem(item.id, 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Récapitulatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#6B1E3E]/5 rounded-2xl border border-[#6B1E3E]/20 p-8 mb-12"
        >
          <h3 className="text-xl font-light text-gray-900 mb-6">
            Votre <span className="text-[#6B1E3E] font-medium">commande</span>
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Robinet HYDRAL {selectedSKU}</span>
              <span className="font-medium text-gray-900">490€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Abonnement {selectedPlan === 'essential' ? 'Essentiel' : selectedPlan === 'standard' ? 'Standard' : 'Plus'}</span>
              <span className="font-medium text-gray-900">
                {selectedRhythm === 'monthly' ? 'Mensuel' : selectedRhythm === 'quarterly' ? 'Trimestriel' : 'Annuel'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pack de bienvenue personnalisé</span>
              <span className="text-green-600 font-medium">Offert</span>
            </div>
            
            {Object.entries(extraItems).map(([itemId, quantity]) => {
              const item = EXTRA_ITEMS.find(i => i.id === itemId);
              if (!item || quantity === 0) return null;
              return (
                <div key={itemId} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {quantity}</span>
                  <span className="font-medium text-gray-900">{formatPrice(item.price * quantity)}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-light text-[#6B1E3E]">
                {formatPrice(490 + Object.entries(extraItems).reduce((sum, [id, qty]) => {
                  const item = EXTRA_ITEMS.find(i => i.id === id);
                  return sum + (item?.price || 0) * qty;
                }, 0))}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button 
            onClick={() => onComplete?.({ customizations, extraItems })}
            className="group px-12 py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E5E] text-white rounded-full shadow-2xl shadow-[#6B1E3E]/30 hover:shadow-3xl hover:shadow-[#6B1E3E]/40 font-medium text-lg transition-all hover:scale-105"
          >
            Confirmer ma commande
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Réassurance */}
          <div className="flex items-center justify-center gap-8 mt-8 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#6B1E3E]" />
              <span>Livraison 5–7 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#6B1E3E]" />
              <span>Satisfait ou remboursé 30j</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#6B1E3E]" />
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}