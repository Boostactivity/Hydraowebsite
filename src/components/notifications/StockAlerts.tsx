import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Package, TrendingUp, Clock, Zap, Users } from 'lucide-react';

interface StockLevel {
  inStock: boolean;
  quantity: number;
  lowStockThreshold: number;
  trend: 'high' | 'medium' | 'low' | 'critical';
  nextRestock?: string;
  demandLevel?: 'normal' | 'high' | 'very-high';
}

interface StockAlertsProps {
  productId: string;
  productName: string;
  stockLevel: StockLevel;
  variant?: 'badge' | 'banner' | 'inline';
}

export function StockAlerts({ 
  productId, 
  productName, 
  stockLevel,
  variant = 'banner' 
}: StockAlertsProps) {
  if (variant === 'badge') {
    return <StockBadge stockLevel={stockLevel} />;
  }

  if (variant === 'inline') {
    return <StockInline stockLevel={stockLevel} />;
  }

  return <StockBanner stockLevel={stockLevel} productName={productName} />;
}

// Badge compact pour product cards
function StockBadge({ stockLevel }: { stockLevel: StockLevel }) {
  if (!stockLevel.inStock) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 rounded-full">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-xs font-semibold text-red-700">Rupture de stock</span>
      </div>
    );
  }

  if (stockLevel.trend === 'critical' || stockLevel.quantity <= 3) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 rounded-full"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
        <span className="text-xs font-semibold text-red-700">
          Plus que {stockLevel.quantity} en stock !
        </span>
      </motion.div>
    );
  }

  if (stockLevel.trend === 'low' || stockLevel.quantity <= 10) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 rounded-full">
        <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
        <span className="text-xs font-semibold text-orange-700">
          Stock limité ({stockLevel.quantity})
        </span>
      </div>
    );
  }

  if (stockLevel.demandLevel === 'very-high') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 rounded-full">
        <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
        <span className="text-xs font-semibold text-purple-700">
          Forte demande
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 rounded-full">
      <Package className="w-3.5 h-3.5 text-green-600" />
      <span className="text-xs font-semibold text-green-700">
        En stock
      </span>
    </div>
  );
}

// Inline pour product page (plus d'infos)
function StockInline({ stockLevel }: { stockLevel: StockLevel }) {
  if (!stockLevel.inStock) {
    return (
      <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border-2 border-red-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <div className="font-semibold text-red-900">Rupture de stock</div>
            {stockLevel.nextRestock && (
              <div className="text-sm text-red-700">
                Retour prévu : {new Date(stockLevel.nextRestock).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (stockLevel.trend === 'critical' || stockLevel.quantity <= 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-300"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
          >
            <AlertTriangle className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <div className="font-bold text-red-900">
              ⚠️ Plus que {stockLevel.quantity} unité{stockLevel.quantity > 1 ? 's' : ''} disponible{stockLevel.quantity > 1 ? 's' : ''} !
            </div>
            <div className="text-sm text-red-700">
              Commandez maintenant avant rupture
            </div>
          </div>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold text-sm"
        >
          URGENT
        </motion.div>
      </motion.div>
    );
  }

  if (stockLevel.trend === 'low' || stockLevel.quantity <= 10) {
    return (
      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-orange-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="font-semibold text-orange-900">
              Stock limité : {stockLevel.quantity} unités restantes
            </div>
            <div className="text-sm text-orange-700">
              Prochaine livraison dans {Math.floor(Math.random() * 14 + 7)} jours
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stockLevel.demandLevel === 'very-high') {
    return (
      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <div className="font-semibold text-purple-900">Produit très demandé</div>
          <div className="text-sm text-purple-700">
            {Math.floor(Math.random() * 50 + 20)} personnes consultent ce produit actuellement
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-200">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <Package className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <div className="font-semibold text-green-900">En stock</div>
        <div className="text-sm text-green-700">
          Expédition sous 24-48h
        </div>
      </div>
    </div>
  );
}

// Banner pour product page (full attention)
function StockBanner({ stockLevel, productName }: { stockLevel: StockLevel; productName: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || stockLevel.inStock && stockLevel.quantity > 10) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      >
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-2xl p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {!stockLevel.inStock ? 'Rupture de stock !' : `Plus que ${stockLevel.quantity} ${productName} disponible${stockLevel.quantity > 1 ? 's' : ''} !`}
                </h3>
                <p className="text-white/90 text-sm">
                  {!stockLevel.inStock 
                    ? `Le ${productName} sera de nouveau disponible ${stockLevel.nextRestock ? `le ${new Date(stockLevel.nextRestock).toLocaleDateString('fr-FR')}` : 'prochainement'}.`
                    : 'Commandez maintenant pour garantir votre livraison.'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {stockLevel.demandLevel === 'very-high' && (
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span className="font-medium">
                {Math.floor(Math.random() * 30 + 10)} personnes ont commandé ce produit dans les dernières 24h
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Real-time stock tracker (pour dashboard admin - bonus)
export function StockTracker({ products }: { products: Array<{ id: string; name: string; stock: number }> }) {
  const lowStockProducts = products.filter(p => p.stock <= 10);
  const outOfStock = products.filter(p => p.stock === 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">État des stocks</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-3xl font-bold text-green-600">
            {products.length - lowStockProducts.length}
          </div>
          <div className="text-sm text-gray-600">Stock OK</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl">
          <div className="text-3xl font-bold text-orange-600">
            {lowStockProducts.length - outOfStock.length}
          </div>
          <div className="text-sm text-gray-600">Stock faible</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-xl">
          <div className="text-3xl font-bold text-red-600">
            {outOfStock.length}
          </div>
          <div className="text-sm text-gray-600">Rupture</div>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">Alertes stock :</h4>
          {lowStockProducts.map(product => (
            <div
              key={product.id}
              className={`flex items-center justify-between p-3 rounded-xl ${
                product.stock === 0 ? 'bg-red-100' : 'bg-orange-100'
              }`}
            >
              <span className="font-medium text-gray-900">{product.name}</span>
              <span className={`text-sm font-semibold ${
                product.stock === 0 ? 'text-red-700' : 'text-orange-700'
              }`}>
                {product.stock === 0 ? 'Rupture' : `${product.stock} unités`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Hook pour gérer le stock côté client
export function useStockAlert(productId: string) {
  const [stockLevel, setStockLevel] = useState<StockLevel>({
    inStock: true,
    quantity: 15,
    lowStockThreshold: 10,
    trend: 'medium',
    demandLevel: 'normal'
  });

  useEffect(() => {
    // Simuler récupération stock API
    // En production, remplacer par vraie API call
    const mockStock = Math.floor(Math.random() * 20);
    const mockDemand = Math.random() > 0.7 ? 'very-high' : 'normal';
    
    setStockLevel({
      inStock: mockStock > 0,
      quantity: mockStock,
      lowStockThreshold: 10,
      trend: mockStock === 0 ? 'critical' : mockStock <= 3 ? 'critical' : mockStock <= 10 ? 'low' : 'medium',
      demandLevel: mockDemand as 'normal' | 'high' | 'very-high',
      nextRestock: mockStock === 0 ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() : undefined
    });

    // Real-time updates (WebSocket en production)
    const interval = setInterval(() => {
      setStockLevel(prev => ({
        ...prev,
        quantity: Math.max(0, prev.quantity - Math.floor(Math.random() * 2))
      }));
    }, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, [productId]);

  return stockLevel;
}
