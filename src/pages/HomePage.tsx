import { memo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Shield, CheckCircle, Wrench, Star, Droplets, Flame, Sparkles, Snowflake, Filter, Clock, Truck, RefreshCw } from 'lucide-react';
import { Page } from '../App';
import { ConversionTunnel } from '../components/ConversionTunnel';

interface HomePageProps {
  navigate: (page: Page) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  return (
    <>
      {/* ========================================
          HERO
         ======================================== */}
      <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm sm:text-base font-medium tracking-widest uppercase text-[#6B1E3E] mb-4"
            >
              L'eau sous toutes ses formes
            </motion.p>

            <h1 className="mb-5">
              <span className="block text-gray-900">Le robinet 5-en-1</span>
              <span className="block text-[#6B1E3E]">qui remplace vos bouteilles.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#8B7E74] mb-8 max-w-2xl mx-auto">
              Eau filtrée, bouillante, gazeuse, froide et mitigeur. Un seul robinet premium pour toute votre eau au quotidien.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => {
                  const tunnelSection = document.querySelector('[data-section="0"]');
                  tunnelSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-12 py-4 sm:py-5 min-h-[48px] bg-[#6B1E3E] text-white rounded-full text-base sm:text-lg font-medium shadow-xl hover:bg-[#6B1E3E]/90 transition-colors inline-flex items-center gap-2"
              >
                Calculer mes économies
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => navigate('concept')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-[#6B1E3E] font-medium hover:bg-[#6B1E3E]/5 rounded-full transition-colors"
              >
                Découvrir HYDRAL
              </motion.button>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-sm text-[#8B7E74]">
              <Shield className="w-4 h-4 text-[#6B1E3E]" />
              <span>Garantie 5 ans</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8B7E74]">
              <Wrench className="w-4 h-4 text-[#6B1E3E]" />
              <span>Installation incluse</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8B7E74]">
              <CheckCircle className="w-4 h-4 text-[#6B1E3E]" />
              <span>Livraison gratuite</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          LES 5 FONCTIONS - Ce que fait le robinet
         ======================================== */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="mb-3">
              <span className="text-gray-900">Un robinet, </span>
              <span className="text-[#6B1E3E]">cinq eaux.</span>
            </h2>
            <p className="text-lg text-[#8B7E74] max-w-2xl mx-auto">
              HYDRAL remplace votre bouilloire, vos bouteilles plastique et votre machine à eau gazeuse. Tout sort d'un seul robinet.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Filter, label: 'Eau filtrée', desc: 'Chlore, calcaire et microplastiques éliminés', color: 'from-blue-50 to-blue-100/50' },
              { icon: Flame, label: 'Eau bouillante', desc: '100°C instantanée, fini la bouilloire', color: 'from-red-50 to-orange-50' },
              { icon: Sparkles, label: 'Eau gazeuse', desc: 'Pétillante à la demande, fini les packs', color: 'from-emerald-50 to-teal-50' },
              { icon: Snowflake, label: 'Eau froide', desc: 'Réfrigérée sans glaçons', color: 'from-cyan-50 to-sky-50' },
              { icon: Droplets, label: 'Mitigeur', desc: 'Eau chaude/froide classique intégrée', color: 'from-gray-50 to-gray-100/50' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${item.color} border border-gray-100 text-center`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#6B1E3E]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-[#8B7E74] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Subtilité marketing */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-[#8B7E74] mt-6"
          >
            Chaque modèle inclut l'eau filtrée. Choisissez les fonctions qui vous correspondent.
          </motion.p>
        </div>
      </section>

      {/* ========================================
          COMMENT ÇA MARCHE - 3 étapes
         ======================================== */}
      <section className="py-10 sm:py-14 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="mb-3">
              <span className="text-gray-900">Simple comme </span>
              <span className="text-[#6B1E3E]">ouvrir un robinet.</span>
            </h2>
            <p className="text-lg text-[#8B7E74]">
              3 étapes, et c'est parti pour des années d'économies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: Wrench,
                title: 'On installe',
                desc: 'Un plombier agréé pose votre robinet en 2h. Il se branche sur votre arrivée d\'eau existante. Aucun travaux.',
                subtle: 'Installation offerte avec le One'
              },
              {
                step: '2',
                icon: Droplets,
                title: 'Vous profitez',
                desc: 'Tournez la poignée : filtrée, bouillante, gazeuse, froide. Eau illimitée, qualité constante, zéro bouteille plastique.',
                subtle: 'Économisez dès le premier jour'
              },
              {
                step: '3',
                icon: RefreshCw,
                title: 'On s\'occupe du reste',
                desc: 'Vos filtres et cartouches CO₂ arrivent automatiquement chez vous. Rien à penser, rien à porter.',
                subtle: 'Sans engagement, résiliable à tout moment'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <Icon className="w-5 h-5 text-[#6B1E3E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{item.desc}</p>
                  <p className="text-xs text-[#6B1E3E] font-medium">{item.subtle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          POURQUOI HYDRAL - Avantages clés
         ======================================== */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="mb-3">
              <span className="text-gray-900">Ce que </span>
              <span className="text-[#6B1E3E]">ça change pour vous.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                value: '1 000€',
                label: 'économisés par an',
                desc: 'Pour une famille de 4, comparé aux bouteilles',
                icon: '💰'
              },
              {
                value: '0',
                label: 'bouteille plastique',
                desc: '600+ bouteilles éliminées par personne et par an',
                icon: '♻️'
              },
              {
                value: '3s',
                label: 'eau bouillante',
                desc: 'Instantanée au robinet, plus besoin de bouilloire',
                icon: '⚡'
              },
              {
                value: '5 ans',
                label: 'de garantie',
                desc: 'SAV français, intervention à domicile incluse',
                icon: '🛡️'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-gray-100 text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl font-bold text-[#6B1E3E] mb-1">{item.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{item.label}</div>
                <p className="text-xs text-[#8B7E74]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          TÉMOIGNAGES - Preuve Sociale
         ======================================== */}
      <section className="py-8 sm:py-10 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-700 font-medium">Nos premiers testeurs</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "J'aurais dû le commander bien avant. En 6 mois, j'ai économisé plus que le prix du robinet.", name: 'Claire M.', loc: 'Paris 16e', detail: 'Hydral One' },
              { text: "Design impeccable, qualité premium. Fini les packs d'eau à porter du supermarché.", name: 'Thomas L.', loc: 'Lyon', detail: 'Hydral Spark' },
              { text: "L'eau gazeuse à volonté pour toute la famille. Les enfants adorent, et moi j'adore les économies.", name: 'Sophie D.', loc: 'Bordeaux', detail: 'Hydral One' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">"{item.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8B7E74] font-medium">{item.name}, {item.loc}</p>
                  <p className="text-xs text-[#6B1E3E] font-medium">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          PRIX TRANSPARENT
         ======================================== */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="mb-3">
              <span className="block text-gray-900">Prix transparent.</span>
              <span className="block text-[#6B1E3E]">Zéro surprise.</span>
            </h2>
            <p className="text-[#8B7E74]">
              Le robinet + un abonnement simple. C'est tout.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#6B1E3E]/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-[#8B7E74] mb-2">Robinet HYDRAL (à partir de)</p>
                <p className="text-4xl font-bold text-gray-900 mb-4">490€</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>3 modèles : Pure, Spark ou One</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Installation par plombier incluse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Garantie 5 ans pièces et main d'oeuvre</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-[#8B7E74] mb-2">Abonnement filtres + CO₂ (dès)</p>
                <p className="text-4xl font-bold text-gray-900 mb-4">59€<span className="text-lg text-gray-600">/an</span></p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Filtres + cartouches CO₂ livrés chez vous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Sans engagement, résiliable à tout moment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Livraison incluse partout en France</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Subtilité commerciale */}
            <div className="mt-6 pt-5 border-t border-[#6B1E3E]/10 text-center">
              <p className="text-sm text-gray-700">
                La plupart des familles économisent <span className="font-semibold text-[#6B1E3E]">entre 300€ et 900€ par an</span> en remplaçant leurs bouteilles.
              </p>
              <p className="text-xs text-[#8B7E74] mt-1">Le robinet se rentabilise en quelques mois seulement.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          TUNNEL DE CONVERSION INTÉGRÉ
         ======================================== */}
      <ConversionTunnel navigate={navigate} />
    </>
  );
}

export default HomePage;
