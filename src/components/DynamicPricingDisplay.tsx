import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Zap, Check, Star } from 'lucide-react';

export function DynamicPricingDisplay() {
  const [savingsCounter, setSavingsCounter] = useState(0);
  const [activeComparison, setActiveComparison] = useState(0);

  const competitors = [
    { name: 'Grohe Red', price: 1290, features: 'Eau bouillante uniquement' },
    { name: 'Brita Vivreau', price: 890, features: 'Eau filtrée + gazeuse' },
    { name: 'Zip HydroTap', price: 1490, features: 'Eau chaude + froide' }
  ];

  const hydroPrice = 490;

  // Animation du compteur d'économies
  useEffect(() => {
    const interval = setInterval(() => {
      setSavingsCounter((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Rotation des comparaisons
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveComparison((prev) => (prev + 1) % competitors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const competitor = competitors[activeComparison];
  const savingsAmount = competitor.price - hydroPrice;
  const savingsPercent = Math.round((savingsAmount / competitor.price) * 100);

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Prix imbattable</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Le robinet 5-en-1 le plus accessible
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technologie premium, prix révolutionnaire
          </p>
        </motion.div>

        {/* Comparaison animée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* HYDRAO - Notre prix */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-4 -right-4 z-10 px-4 py-2 gradient-bordeaux text-white rounded-full text-sm font-medium shadow-lg">
              ⭐ Meilleur prix
            </div>

            <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-3xl p-8 h-full shadow-2xl border-4 border-[#D4AF37]">
              <div className="mb-6">
                <div className="text-sm text-white/80 mb-2">HYDRAO - Robinet 5-en-1</div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-7xl font-light mb-2"
                >
                  490€
                </motion.div>
                <div className="text-white/80">
                  TTC • Livraison offerte
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'Eau bouillante 100°C',
                  'Eau filtrée 5 étapes',
                  'Eau pétillante illimitée',
                  'Eau chaude réglable',
                  'Robinet classique',
                  'Garantie 5 ans',
                  'SAV en 48h'
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-white/95">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>Note 4.9/5 • 2 347 installations</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Concurrent - Comparaison animée */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComparison}
                initial={{ opacity: 0, rotateY: -20 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 rounded-3xl p-8 h-full border-2 border-gray-300"
              >
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">{competitor.name}</div>
                  <div className="text-7xl font-light mb-2 text-gray-400 line-through">
                    {competitor.price}€
                  </div>
                  <div className="text-gray-600">{competitor.features}</div>
                </div>

                {/* Badge économies */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="mb-6 p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl border-2 border-green-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Vous économisez</div>
                      <div className="text-3xl text-green-600 font-light">{savingsAmount}€</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Soit <span className="font-medium text-green-600">{savingsPercent}% moins cher</span> pour les mêmes fonctionnalités
                  </div>
                </motion.div>

                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                    <span>Fonctionnalités limitées</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                    <span>Installation en supplément</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                    <span>Garantie standard 2 ans</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicateurs de rotation */}
            <div className="flex justify-center gap-2 mt-4">
              {competitors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveComparison(index)}
                  className={`transition-all ${
                    index === activeComparison
                      ? 'w-8 h-2 bg-[#6B1E3E] rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Compteur d'économies en temps réel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-8 text-center shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-2xl">Économies en temps réel</h3>
          </div>
          
          <div className="text-sm text-white/80 mb-4">
            Pendant que vous lisez cette page, les propriétaires HYDRAO économisent :
          </div>

          <motion.div
            key={savingsCounter}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-light mb-2"
          >
            {savingsCounter.toLocaleString()}€
          </motion.div>

          <div className="text-white/70 text-sm">
            Par rapport à l'achat d'eau en bouteille
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-12 py-5 gradient-bordeaux text-white rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-[#6B1E3E]/30 transition-all inline-flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Commander maintenant à 490€
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Paiement en 3× sans frais • Soit 163€/mois
          </p>
        </motion.div>
      </div>
    </section>
  );
}