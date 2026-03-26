import React from 'react';
import { Page } from '../App';
import { Check, TrendingDown, Users, Truck, Building2, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BASE_PRICE } from '../data/products';

interface PrixTransparentPageProps {
  navigate: (page: Page) => void;
}

export function PrixTransparentPage({ navigate }: PrixTransparentPageProps) {
  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">Pourquoi {BASE_PRICE}€ ?</span>
              <span className="block text-[#6B1E3E]">Parce que c'est un prix juste</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Pas un prix bas. Pas un prix d'appel. Un prix cohérent avec la valeur réelle du produit, rendu accessible par un modèle économique différent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Le contexte du marché */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Le marché actuel</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Les robinets 5-en-1 existent déjà. Ils fonctionnent. Les clients sont satisfaits. Mais ils sont volontairement maintenus dans un positionnement de luxe extrême.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                brand: "Marché Premium",
                price: "1 500 - 3 000€",
                desc: "Robinets haut de gamme 5-en-1 traditionnels, qualité reconnue mais prix élevés qui excluent la majorité des foyers"
              },
              {
                brand: "HYDRAL",
                price: `${BASE_PRICE}€`,
                desc: "Même technologie, même qualité, modèle économique repensé pour la classe moyenne",
                highlight: true
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-3xl border ${
                  item.highlight
                    ? 'bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white border-[#6B1E3E]'
                    : 'bg-[#FAF8F5] border-gray-200'
                }`}
              >
                <h3 className={`text-2xl mb-3 ${item.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {item.brand}
                </h3>
                <p className={`text-4xl mb-6 ${item.highlight ? 'text-white' : 'text-[#6B1E3E]'}`}>
                  {item.price}
                </p>
                <p className={`leading-relaxed ${item.highlight ? 'text-white/90' : 'text-[#8B7E74]'}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-[#6B1E3E]/5 border border-[#6B1E3E]/20 rounded-2xl"
          >
            <p className="text-lg text-gray-900">
              <strong>Notre position :</strong> Ces marques ont fait un choix stratégique cohérent avec leur histoire. Nous en avons fait un autre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comment nous arrivons à 490€ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Comment nous y arrivons</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Pas de miracle. Pas de compromis qualité. Juste un modèle économique repensé de A à Z.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Vente directe",
                traditional: "Réseau de revendeurs avec marges étagées (40-60%)",
                hydral: "Site officiel uniquement. Pas d'intermédiaire. La marge sert la qualité et le prix."
              },
              {
                icon: <Building2 className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Structure légère",
                traditional: "Showrooms, force de vente, marketing massif",
                hydral: "Équipe réduite, site performant, bouche-à-oreille et satisfaction client."
              },
              {
                icon: <Truck className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Logistique optimisée",
                traditional: "Stock local, logistique complexe, surcoûts",
                hydral: "Partenariat industriel direct, livraison efficace, volumes maîtrisés."
              },
              {
                icon: <TrendingDown className="w-10 h-10 text-[#6B1E3E]" />,
                title: "Modèle récurrent",
                traditional: "Tout le profit sur la vente initiale",
                hydral: "Marge réduite à l'achat, récurrence saine sur les consommables (filtres/CO₂)."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-gray-200/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  {item.icon}
                  <h3 className="text-xl text-gray-900">{item.title}</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-[#FAF8F5] rounded-xl">
                    <p className="text-sm text-[#8B7E74] mb-1">Modèle traditionnel :</p>
                    <p className="text-gray-700">{item.traditional}</p>
                  </div>
                  <div className="p-4 bg-[#6B1E3E]/5 border border-[#6B1E3E]/10 rounded-xl">
                    <p className="text-sm text-[#6B1E3E] mb-1">HYDRAL :</p>
                    <p className="text-gray-900">{item.hydral}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Ce que contient {BASE_PRICE}€</h2>
            <p className="text-xl text-[#8B7E74]">
              Transparence totale. Aucun coût caché.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
            >
              <h3 className="text-2xl mb-6 text-gray-900">Inclus</h3>
              <ul className="space-y-4">
                {[
                  'Robinet 5-en-1 (modèle au choix)',
                  'Boiler 3L eau bouillante instantanée',
                  'Système de filtration 5 étapes',
                  'Module de refroidissement (optionnel)',
                  'Système CO₂ pour eau pétillante (optionnel)',
                  'Guide d\'installation complet',
                  'Garantie 3 ans pièces et main d\'œuvre',
                  'Support technique à vie'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-4 h-4 text-[#6B1E3E]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
            >
              <h3 className="text-2xl mb-6 text-gray-900">En supplément (optionnel)</h3>
              <ul className="space-y-4">
                {[
                  'Installation par professionnel partenaire (280€ TTC)',
                  'Toutes finitions incluses dans le prix de base',
                  'Extension de garantie à 10 ans : prix à définir',
                  'Abonnement filtres + CO₂ : dès 59€/an'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8B7E74]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-4 h-4 text-[#8B7E74]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-[#6B1E3E]/5 border border-[#6B1E3E]/20 rounded-2xl text-center"
          >
            <p className="text-lg text-gray-900">
              <strong>Prix final :</strong> A partir de {BASE_PRICE}€ TTC pour le robinet complet (Pure), 890€ (Spark), 990€ (One). Toutes les finitions sont incluses. Toujours 40-60% moins cher que la concurrence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Les garanties */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Nos garanties</h2>
            <p className="text-xl text-[#8B7E74]">
              Un prix juste ne signifie pas moins de sérieux. Au contraire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-[#6B1E3E]" />,
                title: "Certifications européennes",
                desc: "CE, ACS (contact alimentaire), conformité électrique. Contrôles qualité stricts."
              },
              {
                icon: <Shield className="w-12 h-12 text-[#6B1E3E]" />,
                title: "Garantie 3 ans",
                desc: "Pièces et main d'œuvre. Extensible à 10 ans. Pas de petites lignes."
              },
              {
                icon: <Shield className="w-12 h-12 text-[#6B1E3E]" />,
                title: "Satisfaction ou remboursé",
                desc: "30 jours pour tester. Si vous n'êtes pas convaincu, nous reprenons le produit."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-white rounded-3xl border border-gray-200/50"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-xl mb-4 text-gray-900">{item.title}</h3>
                <p className="text-[#8B7E74] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="mb-6">
            Prêt à faire le choix<span className="block">d'un prix juste ?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Configurez votre robinet HYDRAL et découvrez le prix exact selon vos choix.
          </p>

          <motion.button
            onClick={() => navigate('configurator')}
            className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg shadow-2xl hover:bg-[#FAF8F5] transition-colors inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Configurer maintenant
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}