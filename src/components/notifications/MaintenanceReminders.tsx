import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Calendar, Bell, Check, X, Package, AlertCircle, ShoppingCart } from 'lucide-react';

interface MaintenanceItem {
  id: string;
  name: string;
  type: 'filter' | 'cartridge' | 'cleaning';
  lastChanged: string;
  recommendedInterval: number; // in days
  price: number;
  inStock: boolean;
}

export function MaintenanceReminders({ purchaseDate }: { purchaseDate: string }) {
  const [showReminder, setShowReminder] = useState(false);
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Calculer les maintenances nécessaires
    const daysSincePurchase = Math.floor(
      (Date.now() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    const items: MaintenanceItem[] = [];

    // Filtre tous les 6 mois (180 jours)
    if (daysSincePurchase >= 180) {
      items.push({
        id: 'filter',
        name: 'Filtre à eau',
        type: 'filter',
        lastChanged: purchaseDate,
        recommendedInterval: 180,
        price: 49,
        inStock: true
      });
    }

    // Cartouche CO2 tous les 3 mois (90 jours) - simulé
    if (daysSincePurchase >= 90) {
      items.push({
        id: 'co2',
        name: 'Cartouche CO2',
        type: 'cartridge',
        lastChanged: purchaseDate,
        recommendedInterval: 90,
        price: 29,
        inStock: true
      });
    }

    // Nettoyage recommandé tous les mois (30 jours)
    if (daysSincePurchase >= 30) {
      items.push({
        id: 'cleaning',
        name: 'Nettoyage complet',
        type: 'cleaning',
        lastChanged: purchaseDate,
        recommendedInterval: 30,
        price: 0, // gratuit, DIY
        inStock: true
      });
    }

    if (items.length > 0 && !dismissed) {
      setMaintenanceItems(items);
      setShowReminder(true);
    }
  }, [purchaseDate, dismissed]);

  if (!showReminder || maintenanceItems.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 right-6 z-[80] w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Wrench className="w-5 h-5" />
              </motion.div>
              <div>
                <div className="font-bold">Temps de l'entretien !</div>
                <div className="text-xs text-white/80">Maintenez votre HYDRAO au top</div>
              </div>
            </div>
            <button
              onClick={() => {
                setDismissed(true);
                setShowReminder(false);
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {maintenanceItems.map(item => (
              <MaintenanceItemCard key={item.id} item={item} />
            ))}
          </div>

          <button
            onClick={() => setShowReminder(false)}
            className="w-full px-4 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Commander les pièces</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function MaintenanceItemCard({ item }: { item: MaintenanceItem }) {
  const getIcon = () => {
    switch (item.type) {
      case 'filter':
        return <Package className="w-4 h-4" />;
      case 'cartridge':
        return <Package className="w-4 h-4" />;
      case 'cleaning':
        return <Wrench className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    const daysSince = Math.floor(
      (Date.now() - new Date(item.lastChanged).getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysOverdue = daysSince - item.recommendedInterval;

    if (daysOverdue > 0) {
      return `En retard de ${daysOverdue} jours`;
    }
    return 'À faire maintenant';
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <div className="text-sm font-semibold">{item.name}</div>
          <div className="text-xs text-white/80">{getLabel()}</div>
        </div>
      </div>
      {item.price > 0 && (
        <div className="text-sm font-semibold">{item.price}€</div>
      )}
    </div>
  );
}

// Email template pour rappel maintenance
export function MaintenanceReminderEmailTemplate({
  customerName,
  items,
  productName,
  shopUrl
}: {
  customerName: string;
  items: MaintenanceItem[];
  productName: string;
  shopUrl: string;
}) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#f97316', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔧</div>
        <h1 style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          Temps de l'entretien !
        </h1>
        <p style={{ color: '#ffffff', fontSize: '16px', margin: '10px 0 0 0', opacity: 0.9 }}>
          Votre {productName} mérite un peu d'attention
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 20px' }}>
        <p style={{ fontSize: '16px', color: '#1f2937', marginBottom: '30px' }}>
          Bonjour {customerName},
        </p>

        <p style={{ fontSize: '16px', color: '#1f2937', lineHeight: '1.6', marginBottom: '30px' }}>
          Pour garantir <strong>performance optimale</strong> et <strong>longévité maximale</strong> de votre {productName}, 
          il est temps d'effectuer quelques petites maintenances :
        </p>

        {/* Items list */}
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
          {items.map((item, index) => (
            <div key={item.id} style={{ 
              padding: '15px', 
              borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>
                    {item.type === 'filter' && '🔵'} 
                    {item.type === 'cartridge' && '💨'}
                    {item.type === 'cleaning' && '🧽'}
                    {' '}{item.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Recommandé tous les {Math.floor(item.recommendedInterval / 30)} mois
                  </div>
                </div>
                {item.price > 0 && (
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6B1E3E' }}>
                    {item.price}€
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total if applicable */}
        {totalPrice > 0 && (
          <div style={{ backgroundColor: '#dbeafe', borderRadius: '12px', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#1e40af', marginBottom: '5px' }}>
              Total pour tout remplacer
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a' }}>
              {totalPrice}€
            </div>
          </div>
        )}

        {/* Benefits */}
        <div style={{ backgroundColor: '#d1fae5', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#047857', marginBottom: '15px' }}>
            ✅ Pourquoi c'est important ?
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#065f46' }}>
            <li style={{ marginBottom: '8px' }}>Maintient la qualité de l'eau</li>
            <li style={{ marginBottom: '8px' }}>Prolonge la durée de vie de votre appareil</li>
            <li style={{ marginBottom: '8px' }}>Évite les pannes coûteuses</li>
            <li style={{ marginBottom: '8px' }}>Garantit une carbonatation optimale</li>
          </ul>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a 
            href={shopUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#6B1E3E',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Commander les pièces maintenant
          </a>
        </div>

        {/* Footer note */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '12px', border: '1px solid #fcd34d' }}>
          <div style={{ fontSize: '14px', color: '#92400e' }}>
            <strong>💡 Astuce :</strong> Abonnez-vous à notre service de livraison automatique des consommables 
            et ne vous souciez plus jamais de la maintenance ! <a href="#" style={{ color: '#92400e', textDecoration: 'underline' }}>En savoir plus</a>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '30px' }}>
          Vous recevez cet email car vous avez acheté un {productName}.
          <br />
          <a href="#" style={{ color: '#6B1E3E' }}>Gérer mes préférences</a> | <a href="#" style={{ color: '#6B1E3E' }}>Se désabonner</a>
        </p>
      </div>
    </div>
  );
}

// Dashboard maintenance pour compte client
export function MaintenanceDashboard({ purchaseDate }: { purchaseDate: string }) {
  const [items] = useState<MaintenanceItem[]>([
    {
      id: 'filter',
      name: 'Filtre à eau',
      type: 'filter',
      lastChanged: purchaseDate,
      recommendedInterval: 180,
      price: 49,
      inStock: true
    },
    {
      id: 'co2',
      name: 'Cartouche CO2',
      type: 'cartridge',
      lastChanged: purchaseDate,
      recommendedInterval: 90,
      price: 29,
      inStock: true
    }
  ]);

  const getMaintenanceStatus = (item: MaintenanceItem) => {
    const daysSince = Math.floor(
      (Date.now() - new Date(item.lastChanged).getTime()) / (1000 * 60 * 60 * 24)
    );
    const progress = (daysSince / item.recommendedInterval) * 100;

    if (progress >= 100) return { status: 'urgent', color: 'red', label: 'À remplacer maintenant' };
    if (progress >= 80) return { status: 'soon', color: 'orange', label: 'À remplacer bientôt' };
    return { status: 'ok', color: 'green', label: 'OK' };
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Calendrier de maintenance
        </h3>
        <Bell className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {items.map(item => {
          const status = getMaintenanceStatus(item);
          const daysSince = Math.floor(
            (Date.now() - new Date(item.lastChanged).getTime()) / (1000 * 60 * 60 * 24)
          );
          const daysRemaining = Math.max(0, item.recommendedInterval - daysSince);
          const progress = Math.min(100, (daysSince / item.recommendedInterval) * 100);

          return (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <div className="text-sm text-gray-600">
                    Dernier changement : {new Date(item.lastChanged).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  status.color === 'red' ? 'bg-red-100 text-red-700' :
                  status.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {status.label}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Prochain remplacement</span>
                  <span className="font-medium text-gray-900">
                    {daysRemaining > 0 ? `Dans ${daysRemaining} jours` : 'Maintenant'}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      status.color === 'red' ? 'bg-red-500' :
                      status.color === 'orange' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {status.color !== 'green' && (
                <button className="w-full px-4 py-2 bg-[#6B1E3E] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Commander ({item.price}€)</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <strong>Abonnement maintenance :</strong>
            <p className="mt-1 text-blue-800">
              Recevez automatiquement vos consommables avant qu'ils ne soient vides. 
              -10% sur tous les produits + livraison gratuite.
            </p>
            <button className="mt-3 text-blue-600 font-semibold hover:underline">
              Découvrir →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
