import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MapPin, Clock, Star } from 'lucide-react';

interface Purchase {
  id: string;
  customer: string;
  location: string;
  product: string;
  time: string;
  rating?: number;
  verified: boolean;
}

interface RecentPurchasesTickerProps {
  className?: string;
  variant?: 'ticker' | 'grid';
}

export function RecentPurchasesTicker({ className = '', variant = 'ticker' }: RecentPurchasesTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const purchases: Purchase[] = [
    {
      id: '1',
      customer: 'Sophie L.',
      location: 'Paris (75)',
      product: 'HYDRAO Chrome + Eau filtrée',
      time: 'Il y a 3 min',
      rating: 5,
      verified: true
    },
    {
      id: '2',
      customer: 'Marc D.',
      location: 'Lyon (69)',
      product: 'HYDRAO Noir Mat + Eau pétillante',
      time: 'Il y a 8 min',
      rating: 5,
      verified: true
    },
    {
      id: '3',
      customer: 'Julie M.',
      location: 'Bordeaux (33)',
      product: 'HYDRAO Or Rose + Pack Complet',
      time: 'Il y a 12 min',
      rating: 5,
      verified: true
    },
    {
      id: '4',
      customer: 'Thomas R.',
      location: 'Marseille (13)',
      product: 'HYDRAO Champagne + Filtration',
      time: 'Il y a 18 min',
      rating: 5,
      verified: true
    },
    {
      id: '5',
      customer: 'Claire B.',
      location: 'Toulouse (31)',
      product: 'HYDRAO Chrome + Eau pétillante',
      time: 'Il y a 25 min',
      rating: 5,
      verified: true
    },
    {
      id: '6',
      customer: 'Antoine P.',
      location: 'Nantes (44)',
      product: 'HYDRAO Laiton + Pack Premium',
      time: 'Il y a 31 min',
      rating: 5,
      verified: true
    },
    {
      id: '7',
      customer: 'Laura S.',
      location: 'Nice (06)',
      product: 'HYDRAO Noir Mat + Filtration',
      time: 'Il y a 38 min',
      rating: 5,
      verified: true
    },
    {
      id: '8',
      customer: 'David K.',
      location: 'Strasbourg (67)',
      product: 'HYDRAO Chrome + Pack Complet',
      time: 'Il y a 42 min',
      rating: 5,
      verified: true
    }
  ];

  useEffect(() => {
    if (variant === 'ticker') {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % purchases.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [variant, purchases.length]);

  if (variant === 'ticker') {
    return (
      <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40 ${className}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-white border-2 border-green-200 rounded-2xl p-4 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {purchases[currentIndex].customer}
                  </p>
                  {purchases[currentIndex].verified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      ✓ Vérifié
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-2 line-clamp-1">
                  {purchases[currentIndex].product}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {purchases[currentIndex].location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {purchases[currentIndex].time}
                  </span>
                </div>

                {purchases[currentIndex].rating && (
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(purchases[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Variant grid
  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="section-container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-700 rounded-full mb-6"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Achats Récents</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Ils ont commandé HYDRAO
            <span className="block text-[#6B1E3E]">ces dernières heures</span>
          </h2>
          <p className="text-lg text-gray-600">
            Rejoignez des centaines de foyers qui ont fait le choix HYDRAO
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((purchase, idx) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-green-50/30 border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{purchase.customer}</p>
                    {purchase.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {purchase.location}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {purchase.product}
              </p>

              {purchase.rating && (
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(purchase.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-200">
                <Clock className="w-3 h-3" />
                {purchase.time}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            Rejoignez-les et transformez votre cuisine dès aujourd'hui
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all">
            Choisir mon HYDRAO
          </button>
        </motion.div>
      </div>
    </section>
  );
}