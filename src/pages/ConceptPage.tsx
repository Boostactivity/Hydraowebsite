import React from 'react';
import { Page } from '../App';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Flame, Droplet, Snowflake, Sparkles, Filter, Shield, Zap, Leaf, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { defaultImages } from '../assets/products';

interface ConceptPageProps {
  navigate: (page: Page) => void;
}

export function ConceptPage({ navigate }: ConceptPageProps) {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero - Storytelling du problème avant la solution */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">Repenser la manière dont</span>
              <span className="block text-[#6B1E3E]">un foyer consomme l'eau</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Aujourd'hui, l'eau dans une cuisine est fragmentée, peu optimisée. On achète des bouteilles, on fait chauffer de l'eau, on stocke, on transporte, on jette. Tout cela est accepté comme normal. Mais techniquement, il n'y a plus aucune raison que ce soit ainsi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* L'incohérence actuelle */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">L'incohérence actuelle</h2>
            <p className="text-xl text-[#8B7E74]">
              Dans la majorité des foyers européens, l'eau est gérée de manière archaïque.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "On achète de l'eau",
                desc: "Des packs entiers, transportés, stockés dans le frigo, jetés après usage. Alors que l'eau du robinet existe."
              },
              {
                title: "On fait chauffer",
                desc: "Une bouilloire sur le plan de travail. 3 à 5 minutes d'attente. Plusieurs fois par jour. Depuis des décennies."
              },
              {
                title: "On perd du temps",
                desc: "À acheter, porter, stocker, jeter. Des gestes répétés, acceptés, jamais questionnés."
              },
              {
                title: "On consomme mal",
                desc: "Plastique, énergie, espace. Sans alternative claire, sans autre choix visible."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-[#FAF8F5] rounded-2xl border border-gray-200/50"
              >
                <h3 className="text-xl mb-4 text-gray-900">{item.title}</h3>
                <p className="text-[#8B7E74] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* La solution logique */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="mb-6 text-gray-900">
              Un robinet unique, central,<span className="block text-[#6B1E3E]">capable de tout fournir</span>
            </h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto leading-relaxed">
              Pas comme des options gadget. Mais comme des usages naturels, intégrés, fiables et sécurisés. HYDRAL ne cherche pas à impressionner. Il cherche à corriger une incohérence du quotidien.
            </p>
          </motion.div>

          {/* Les 5 types d'eau - Usage réel */}
          <div className="space-y-20">
            {/* Bouillante */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-[#6B1E3E]" />
                  </div>
                  <div>
                    <h3 className="text-3xl text-gray-900">Eau Bouillante</h3>
                    <p className="text-[#6B1E3E]">100°C • Instantané</p>
                  </div>
                </div>
                <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                  Le thé prêt en 10 secondes. Les pâtes qui démarrent immédiatement. Plus d'attente. Plus de bouilloire qui traîne. Juste l'eau dont vous avez besoin, quand vous en avez besoin.
                </p>
                <ul className="space-y-4">
                  {['Thé, café, infusions instantanés', 'Cuisson rapide (pâtes, légumes)', 'Stérilisation biberons', 'Sécurité enfant intégrée'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                  <ImageWithFallback
                    src={defaultImages.boiling}
                    alt="Eau bouillante instantanée"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Filtrée */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                    <ImageWithFallback
                      src={defaultImages.faucet}
                      alt="Eau filtrée pure"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-[#6B1E3E]" />
                  </div>
                  <div>
                    <h3 className="text-3xl text-gray-900">Eau Filtrée</h3>
                    <p className="text-[#6B1E3E]">Pure • Sans chlore</p>
                  </div>
                </div>
                <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                  L'eau que vous buvez n'a plus le goût du chlore. Elle est filtrée, claire, agréable. Vous ne sentez plus la différence avec l'eau en bouteille. Sauf que vous ne transportez plus rien.
                </p>
                <ul className="space-y-4">
                  {['Filtration 5 étapes (charbon actif + résine)', 'Élimine chlore, calcaire, impuretés', 'Goût neutre et constant', 'Filtre à changer tous les 6 mois'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pétillante */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#6B1E3E]" />
                  </div>
                  <div>
                    <h3 className="text-3xl text-gray-900">Eau Pétillante</h3>
                    <p className="text-[#6B1E3E]">Fraîche • À la demande</p>
                  </div>
                </div>
                <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                  Plus de bouteilles à stocker. Plus de cartons à jeter. L'eau pétillante sort directement du robinet, gazéifiée à la demande, à la température idéale. Vous réglez l'intensité. C'est tout.
                </p>
                <ul className="space-y-4">
                  {['Système CO₂ intégré sous évier', 'Niveau de gazéification réglable', 'Jusqu\'à 60L par cartouche', 'Plus de bouteilles plastique'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                  <ImageWithFallback
                    src={defaultImages.sparkling}
                    alt="Eau pétillante"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Réfrigérée */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                    <ImageWithFallback
                      src={defaultImages.faucet}
                      alt="Eau réfrigérée"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center">
                    <Snowflake className="w-6 h-6 text-[#6B1E3E]" />
                  </div>
                  <div>
                    <h3 className="text-3xl text-gray-900">Eau Réfrigérée</h3>
                    <p className="text-[#6B1E3E]">4-8°C • En continu</p>
                  </div>
                </div>
                <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                  Fraîcheur constante, sans avoir à remplir une carafe. Vous ouvrez le robinet, l'eau est déjà à température. Plus besoin d'encombrer le frigo.
                </p>
                <ul className="space-y-4">
                  {['Système de refroidissement silencieux', 'Température stable 4-8°C', 'Économie d\'énergie A++', 'Débit continu sans attente'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Mitigeur classique */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-[#6B1E3E]" />
                  </div>
                  <div>
                    <h3 className="text-3xl text-gray-900">Mitigeur Classique</h3>
                    <p className="text-[#6B1E3E]">Chaud/Froid • Standard</p>
                  </div>
                </div>
                <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                  L'eau chaude et froide traditionnelle reste évidemment présente. Pour la vaisselle, le nettoyage, tous les usages quotidiens habituels. Vous ne perdez rien. Vous gagnez tout le reste.
                </p>
                <ul className="space-y-4">
                  {['Eau chaude/froide traditionnelle', 'Température réglable manuellement', 'Débit standard pour usage quotidien', 'Compatible lave-vaisselle'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-[#6B1E3E]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                  <ImageWithFallback
                    src={defaultImages.faucet}
                    alt="Mitigeur classique"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Système sous évier */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Sous l'évier, tout est prévu</h2>
            <p className="text-xl text-[#8B7E74]">
              Modules compacts et silencieux. Installation simple et encadrée.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#FAF8F5] to-white p-10 lg:p-16 rounded-3xl shadow-xl border border-gray-200/50">
              <div className="aspect-video bg-gradient-to-br from-[#F5F1ED] to-white rounded-2xl mb-12 flex items-center justify-center border border-gray-200">
                <ImageWithFallback
                  src={defaultImages.faucet}
                  alt="Système sous évier HYDRAL"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: <Flame className="w-8 h-8 text-[#6B1E3E]" />, title: "Boiler", desc: "Réservoir 3L • Eau 100°C" },
                  { icon: <Snowflake className="w-8 h-8 text-[#6B1E3E]" />, title: "Chiller", desc: "Réfrigération 4-8°C" },
                  { icon: <Sparkles className="w-8 h-8 text-[#6B1E3E]" />, title: "CO₂", desc: "Gazéification réglable" },
                  { icon: <Filter className="w-8 h-8 text-[#6B1E3E]" />, title: "Filtre", desc: "Purification 5 étapes" }
                ].map((module, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">{module.icon}</div>
                    <h4 className="text-lg mb-2 text-gray-900">{module.title}</h4>
                    <p className="text-sm text-[#8B7E74]">{module.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Ce qui change vraiment</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Sécurité pensée",
                desc: "Système anti-brûlure, protection enfants, isolation thermique renforcée"
              },
              {
                icon: <Zap className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Économie réelle",
                desc: "Jusqu'à 50% d'énergie économisée vs bouilloire classique"
              },
              {
                icon: <Leaf className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Impact réduit",
                desc: "Zéro bouteille plastique, moins de déchets, moins de transport"
              },
              {
                icon: <Filter className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Eau constante",
                desc: "Goût parfait tous les jours, filtration automatique"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl border border-gray-200/50"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-[#8B7E74] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center"
        >
          <h2 className="mb-6">
            Prêt à simplifier<span className="block">votre quotidien ?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Configurez votre système HYDRAL en quelques clics. Choisissez votre modèle, vos finitions, vos modules.
          </p>
          
          <motion.button 
            onClick={() => navigate('configurator')}
            className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg shadow-2xl hover:bg-[#FAF8F5] transition-colors inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Configurer mon robinet
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}