import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Bell, Mail, Check, X, Sparkles } from 'lucide-react';

interface PriceDropAlertsProps {
  productId: string;
  productName: string;
  currentPrice: number;
  originalPrice?: number;
  isOnSale?: boolean;
}

export function PriceDropAlerts({ 
  productId, 
  productName, 
  currentPrice,
  originalPrice,
  isOnSale 
}: PriceDropAlertsProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [priceThreshold, setPriceThreshold] = useState<number>(currentPrice * 0.9);

  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // En production : API call pour sauvegarder l'alerte
    console.log('Price alert subscribed:', {
      productId,
      email,
      priceThreshold
    });

    setSubscribed(true);
    
    setTimeout(() => {
      setShowModal(false);
      setSubscribed(false);
    }, 3000);
  };

  return (
    <>
      {/* Price drop badge si promo active */}
      {isOnSale && originalPrice && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg"
        >
          <TrendingDown className="w-5 h-5" />
          <span>-{discount}% en ce moment !</span>
        </motion.div>
      )}

      {/* Bouton s'abonner aux alertes prix */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors"
      >
        <Bell className="w-4 h-4" />
        <span className="text-sm font-medium">
          M'alerter si baisse de prix
        </span>
      </button>

      {/* Modal subscription */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
            >
              {!subscribed ? (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Alerte baisse de prix</h3>
                        <p className="text-sm text-gray-600">Soyez informé en priorité</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-1">Produit :</div>
                    <div className="font-semibold text-gray-900">{productName}</div>
                    <div className="mt-2 text-sm text-gray-600">Prix actuel :</div>
                    <div className="text-2xl font-bold text-[#6B1E3E]">{currentPrice}€</div>
                  </div>

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        M'alerter si le prix passe sous :
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={priceThreshold}
                          onChange={(e) => setPriceThreshold(Number(e.target.value))}
                          min={0}
                          max={currentPrice}
                          step={10}
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
                        />
                        <span className="text-gray-600 font-medium">€</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Vous serez alerté si le prix descend en dessous de {priceThreshold}€
                        {priceThreshold < currentPrice && (
                          <span className="text-green-600 font-medium">
                            {' '}(soit -{Math.round(((currentPrice - priceThreshold) / currentPrice) * 100)}%)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                          <strong>Avantages :</strong>
                          <ul className="mt-2 space-y-1 text-blue-800">
                            <li>• Email instantané lors d'une baisse de prix</li>
                            <li>• Accès prioritaire aux promotions</li>
                            <li>• Désabonnement en 1 clic</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all"
                    >
                      Activer l'alerte prix
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Vos données sont protégées et ne seront jamais partagées
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    C'est activé ! ✨
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Vous recevrez un email dès que le prix de<br />
                    <strong>{productName}</strong> baisse.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    <span>{email}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Notification email promo (composant pour email template)
export function PriceDropEmailTemplate({
  productName,
  productImage,
  oldPrice,
  newPrice,
  productUrl
}: {
  productName: string;
  productImage: string;
  oldPrice: number;
  newPrice: number;
  productUrl: string;
}) {
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#6B1E3E', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          🎉 Baisse de prix !
        </h1>
        <p style={{ color: '#ffffff', fontSize: '16px', margin: '10px 0 0 0', opacity: 0.9 }}>
          Le produit que vous suivez est en promotion
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src={productImage} 
            alt={productName}
            style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>

        <h2 style={{ fontSize: '24px', color: '#1f2937', textAlign: 'center', marginBottom: '20px' }}>
          {productName}
        </h2>

        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Ancien prix</div>
              <div style={{ fontSize: '20px', color: '#9ca3af', textDecoration: 'line-through' }}>
                {oldPrice}€
              </div>
            </div>
            <div style={{ fontSize: '32px', color: '#10b981' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Nouveau prix</div>
              <div style={{ fontSize: '28px', color: '#6B1E3E', fontWeight: 'bold' }}>
                {newPrice}€
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#d1fae5', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#059669', marginBottom: '10px' }}>
            -{discount}%
          </div>
          <div style={{ fontSize: '16px', color: '#047857' }}>
            Vous économisez {oldPrice - newPrice}€ !
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a 
            href={productUrl}
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
            Profiter de l'offre maintenant
          </a>
        </div>

        <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '30px' }}>
          Cette alerte a été envoyée car vous avez activé les notifications de baisse de prix pour ce produit.
          <br />
          <a href="#" style={{ color: '#6B1E3E' }}>Se désabonner</a>
        </p>
      </div>
    </div>
  );
}

// Widget wishlist avec alertes prix
export function WishlistWithAlerts() {
  const [wishlist, setWishlist] = useState([
    {
      id: '1',
      name: 'HYDRAO Premium',
      currentPrice: 490,
      alertPrice: 450,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'HYDRAO Compact',
      currentPrice: 390,
      alertPrice: 350,
      image: 'https://images.unsplash.com/photo-1585388447446-7d8f94d080da?w=200&h=200&fit=crop'
    }
  ]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Ma wishlist avec alertes prix
      </h3>

      <div className="space-y-4">
        {wishlist.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-[#6B1E3E]">
                  {item.currentPrice}€
                </span>
                <span className="text-xs text-gray-500">
                  Alerte à {item.alertPrice}€
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
              <Bell className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
