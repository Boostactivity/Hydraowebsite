import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Bell, Mail, Check, X, Calendar, ArrowRight } from 'lucide-react';

interface RestockNotificationsProps {
  productId: string;
  productName: string;
  productImage?: string;
  expectedRestockDate?: string;
  inStock: boolean;
}

export function RestockNotifications({ 
  productId, 
  productName,
  productImage,
  expectedRestockDate,
  inStock
}: RestockNotificationsProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [notifyMethod, setNotifyMethod] = useState<'email' | 'sms' | 'both'>('email');

  if (inStock) {
    return null; // Ne rien afficher si en stock
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // En production : API call pour sauvegarder l'alerte
    console.log('Restock alert subscribed:', {
      productId,
      email,
      phone,
      notifyMethod
    });

    setSubscribed(true);
    
    setTimeout(() => {
      setShowModal(false);
      setSubscribed(false);
    }, 3000);
  };

  return (
    <>
      {/* Out of stock banner avec CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-6 border-2 border-orange-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <Package className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Temporairement en rupture de stock
              </h3>
              {expectedRestockDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Retour prévu : {new Date(expectedRestockDate).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Bell className="w-5 h-5" />
            <span>Me prévenir</span>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-orange-200 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Check className="w-4 h-4 text-green-600" />
            <span>Notification instantanée</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Check className="w-4 h-4 text-green-600" />
            <span>Réservation prioritaire</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Check className="w-4 h-4 text-green-600" />
            <span>Gratuit et sans engagement</span>
          </div>
        </div>
      </div>

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
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8"
            >
              {!subscribed ? (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Alerte retour en stock</h3>
                        <p className="text-sm text-gray-600">Soyez le premier informé</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {productImage && (
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-4">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">Produit :</div>
                        <div className="font-semibold text-gray-900">{productName}</div>
                        {expectedRestockDate && (
                          <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Retour : {new Date(expectedRestockDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Comment souhaitez-vous être prévenu ?
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#6B1E3E] transition-colors">
                          <input
                            type="radio"
                            name="notify"
                            value="email"
                            checked={notifyMethod === 'email'}
                            onChange={() => setNotifyMethod('email')}
                            className="w-4 h-4 text-[#6B1E3E]"
                          />
                          <Mail className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900">Par email</span>
                          <span className="ml-auto text-xs text-gray-500">(Recommandé)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#6B1E3E] transition-colors">
                          <input
                            type="radio"
                            name="notify"
                            value="sms"
                            checked={notifyMethod === 'sms'}
                            onChange={() => setNotifyMethod('sms')}
                            className="w-4 h-4 text-[#6B1E3E]"
                          />
                          <span className="text-xl">📱</span>
                          <span className="font-medium text-gray-900">Par SMS</span>
                          <span className="ml-auto text-xs text-gray-500">(Instantané)</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#6B1E3E] transition-colors">
                          <input
                            type="radio"
                            name="notify"
                            value="both"
                            checked={notifyMethod === 'both'}
                            onChange={() => setNotifyMethod('both')}
                            className="w-4 h-4 text-[#6B1E3E]"
                          />
                          <Bell className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900">Email + SMS</span>
                          <span className="ml-auto text-xs text-green-600 font-medium">Double sécurité</span>
                        </label>
                      </div>
                    </div>

                    {(notifyMethod === 'email' || notifyMethod === 'both') && (
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
                    )}

                    {(notifyMethod === 'sms' || notifyMethod === 'both') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre téléphone
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="06 12 34 56 78"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
                        />
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-green-900">
                          <strong className="font-semibold">Avantages exclusifs :</strong>
                          <ul className="mt-2 space-y-1.5 text-green-800">
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-3.5 h-3.5" />
                              Notification instantanée du retour en stock
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-3.5 h-3.5" />
                              Réservation prioritaire pendant 48h
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-3.5 h-3.5" />
                              Code promo -5% à la réception
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all"
                    >
                      Activer l'alerte retour en stock
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Vos données sont protégées. Désabonnement en 1 clic.
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
                    Parfait ! Vous êtes inscrit ✨
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Nous vous préviendrons dès que<br />
                    <strong>{productName}</strong> sera de nouveau disponible.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium">
                    <Bell className="w-4 h-4" />
                    <span>
                      {notifyMethod === 'both' ? 'Email + SMS' : notifyMethod === 'email' ? email : phone}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    + Code promo -5% offert 🎁
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

// Compact version pour product cards
export function RestockBadge({ 
  expectedDate,
  onSubscribe 
}: { 
  expectedDate?: string;
  onSubscribe: () => void;
}) {
  return (
    <button
      onClick={onSubscribe}
      className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors border border-orange-200"
    >
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium text-orange-900">
          Rupture de stock
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-orange-700">
        <Bell className="w-3.5 h-3.5" />
        <span>Me prévenir</span>
      </div>
    </button>
  );
}

// Email template pour notification restock
export function RestockEmailTemplate({
  productName,
  productImage,
  productUrl,
  promoCode,
  reservationEndDate
}: {
  productName: string;
  productImage: string;
  productUrl: string;
  promoCode: string;
  reservationEndDate: string;
}) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#10b981', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>📦</div>
        <h1 style={{ color: '#ffffff', fontSize: '28px', margin: 0 }}>
          C'est de retour !
        </h1>
        <p style={{ color: '#ffffff', fontSize: '16px', margin: '10px 0 0 0', opacity: 0.9 }}>
          {productName} est à nouveau disponible
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

        <div style={{ backgroundColor: '#d1fae5', borderRadius: '12px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', color: '#047857', marginBottom: '10px' }}>
            🎁 Code promo exclusif
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', letterSpacing: '2px' }}>
            {promoCode}
          </div>
          <div style={{ fontSize: '14px', color: '#047857', marginTop: '10px' }}>
            -5% sur votre commande
          </div>
        </div>

        <div style={{ backgroundColor: '#fef3c7', borderRadius: '12px', padding: '15px', marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#92400e' }}>
            ⏰ Réservation prioritaire jusqu'au
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#78350f', marginTop: '5px' }}>
            {new Date(reservationEndDate).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}
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
            Commander maintenant
          </a>
        </div>

        <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '30px' }}>
          Vous recevez cet email car vous avez demandé à être prévenu du retour en stock de ce produit.
          <br />
          <a href="#" style={{ color: '#6B1E3E' }}>Se désabonner</a>
        </p>
      </div>
    </div>
  );
}
