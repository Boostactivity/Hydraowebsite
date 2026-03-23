import React from 'react';
import { Page } from '../App';
import { Leaf, Trash2, Zap, Droplet, Package, Recycle } from 'lucide-react';
import { motion } from 'motion/react';

interface EcoresponsablePageProps {
  navigate: (page: Page) => void;
}

export function EcoresponsablePage({ navigate }: EcoresponsablePageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B1E3E]/10 rounded-full mb-8">
              <Leaf className="w-4 h-4 text-[#6B1E3E]" />
              <span className="text-sm text-[#6B1E3E]">Impact écologique mesuré</span>
            </div>
            <h1 className="mb-8">
              <span className="block text-gray-900">L'eau embouteillée,</span>
              <span className="block text-[#6B1E3E]">un non-sens écologique</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              En France, <strong>7 à 9 milliards de bouteilles plastique</strong> sont consommées chaque année pour l'eau. 
              HYDRAO transforme cette aberration en opportunité : <strong>zéro bouteille, zéro transport, zéro déchet</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Les chiffres qui font réfléchir */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">
              L'ampleur du problème
              <span className="block text-[#6B1E3E]">en France</span>
            </h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Des chiffres officiels qui démontrent l'urgence d'adopter l'eau du robinet filtrée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200 text-center"
            >
              <div className="text-5xl text-[#6B1E3E] mb-4">7-9 Mds</div>
              <h3 className="text-lg text-gray-900 mb-2">Bouteilles/an</h3>
              <p className="text-sm text-[#8B7E74]">Consommées en France chaque année</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200 text-center"
            >
              <div className="text-5xl text-[#6B1E3E] mb-4">150 000 t</div>
              <h3 className="text-lg text-gray-900 mb-2">Déchets plastique</h3>
              <p className="text-sm text-[#8B7E74]">Soit 10 kg par personne et par an</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200 text-center"
            >
              <div className="text-5xl text-[#6B1E3E] mb-4">50%</div>
              <h3 className="text-lg text-gray-900 mb-2">Non recyclées</h3>
              <p className="text-sm text-[#8B7E74]">1 bouteille sur 2 finit incinérée ou dans la nature</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200 text-center"
            >
              <div className="text-5xl text-[#6B1E3E] mb-4">300 km</div>
              <h3 className="text-lg text-gray-900 mb-2">Distance moyenne</h3>
              <p className="text-sm text-[#8B7E74]">Parcourue par une bouteille avant consommation</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Le problème du plastique */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Trash2 className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h2 className="mb-6 text-gray-900">Impact pour votre foyer</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Voici ce que consomme <strong>en moyenne</strong> un foyer français qui achète de l'eau embouteillée :
              </p>
              
              <div className="space-y-6">
                {/* Personne seule */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg text-gray-900 mb-4">Personne seule</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~365</p>
                      <p className="text-xs text-[#8B7E74]">bouteilles/an</p>
                    </div>
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~13 kg</p>
                      <p className="text-xs text-[#8B7E74]">plastique/an</p>
                    </div>
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~146 kg</p>
                      <p className="text-xs text-[#8B7E74]">CO₂/an</p>
                    </div>
                  </div>
                </div>

                {/* Couple */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg text-gray-900 mb-4">Couple (2 personnes)</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~730</p>
                      <p className="text-xs text-[#8B7E74]">bouteilles/an</p>
                    </div>
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~26 kg</p>
                      <p className="text-xs text-[#8B7E74]">plastique/an</p>
                    </div>
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~292 kg</p>
                      <p className="text-xs text-[#8B7E74]">CO₂/an</p>
                    </div>
                  </div>
                </div>

                {/* Famille 4 */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg text-gray-900 mb-4">Famille (4 personnes)</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~1460</p>
                      <p className="text-xs text-[#8B7E74]">bouteilles/an</p>
                    </div>
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~51 kg</p>
                      <p className="text-xs text-[#8B7E74]">plastique/an</p>
                    </div>
                    <div>
                      <p className="text-3xl text-[#6B1E3E] mb-1">~584 kg</p>
                      <p className="text-xs text-[#8B7E74]">CO₂/an</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white p-12 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl">Avec HYDRAO</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-7xl mb-3">0</p>
                  <p className="text-2xl mb-3">Bouteille plastique</p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    L'eau coule directement du robinet : filtrée, fraîche, pétillante si vous le souhaitez. Aucun emballage.
                  </p>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-xl mb-4">Votre impact sur 10 ans :</p>
                  <ul className="space-y-3 text-lg text-white/90">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">•</span>
                      <span><strong>14 600 bouteilles</strong> évitées (pour une famille de 4)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">•</span>
                      <span><strong>510 kg de plastique</strong> non produit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">•</span>
                      <span><strong>5 840 kg de CO₂</strong> économisés</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport et CO₂ */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <Package className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">L'absurdité du transport de l'eau</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Votre eau du robinet parcourt quelques kilomètres. L'eau en bouteille parcourt en moyenne 300 km avant d'arriver chez vous. En camion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-2xl mb-6 text-gray-900">Eau en bouteille (1 an)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-200">
                  <span className="text-[#8B7E74]">Distance moyenne parcourue</span>
                  <span className="text-xl text-gray-900">300 km</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-200">
                  <span className="text-[#8B7E74]">Poids transporté (104 packs)</span>
                  <span className="text-xl text-gray-900">1 248 kg</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-200">
                  <span className="text-[#8B7E74]">CO₂ émis (transport seul)</span>
                  <span className="text-xl text-gray-900">~73 kg</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-200">
                  <span className="text-[#8B7E74]">Production plastique (CO₂)</span>
                  <span className="text-xl text-gray-900">~58 kg</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t-2 border-gray-300">
                  <span className="text-lg text-gray-900"><strong>Total CO₂</strong></span>
                  <span className="text-3xl text-gray-900"><strong>~131 kg</strong></span>
                </div>
              </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-3xl">
              <h3 className="text-2xl mb-6">Avec HYDRAO (1 an)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline pb-3 border-b border-white/20">
                  <span className="text-white/80">Distance parcourue (eau du robinet)</span>
                  <span className="text-xl">~5 km</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-white/20">
                  <span className="text-white/80">Poids transporté</span>
                  <span className="text-xl">0 kg</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-white/20">
                  <span className="text-white/80">CO₂ émis (transport)</span>
                  <span className="text-xl">0 kg</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-white/20">
                  <span className="text-white/80">Production plastique (CO₂)</span>
                  <span className="text-xl">0 kg</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t-2 border-white/30">
                  <span className="text-lg"><strong>Total CO₂</strong></span>
                  <span className="text-3xl"><strong>~12 kg</strong></span>
                </div>
                <p className="text-sm text-white/70 mt-4">
                  Uniquement l'électricité du boiler (optimisée)
                </p>
              </div>

              <div className="mt-8 p-6 bg-white/10 border border-white/20 rounded-2xl">
                <p className="text-2xl text-[#D4AF37] mb-2">Économie : ~119 kg CO₂/an</p>
                <p className="text-sm text-white/70">Équivalent de 650 km en voiture thermique</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consommation d'énergie */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Zap className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h2 className="mb-6 text-gray-900">Électricité optimisée</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Le boiler HYDRAO consomme environ 10W en veille (maintien à température). C'est 50% moins qu'une bouilloire électrique qui chauffe à la demande.
              </p>
              <div className="space-y-4">
                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-gray-200/50">
                  <h3 className="text-lg mb-3 text-gray-900">Pourquoi c'est plus efficace ?</h3>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>Isolation thermique renforcée (perte de chaleur minimale)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>Pas de chauffe répétée (l'eau reste chaude)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>Système de chauffe optimisé (résistance haute efficacité)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-2xl border border-[#6B1E3E]/20">
                  <p className="text-gray-900 mb-2"><strong>Consommation annuelle</strong></p>
                  <p className="text-4xl text-[#6B1E3E] mb-2">~45€</p>
                  <p className="text-sm text-[#8B7E74]">vs ~85€/an avec bouilloire classique</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FAF8F5] to-white p-12 rounded-3xl border border-gray-200/50"
            >
              <h3 className="text-2xl mb-8 text-gray-900">Comparatif énergétique</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-[#8B7E74] mb-2">Bouilloire électrique</p>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">~85€/an</p>
                </div>
                <div>
                  <p className="text-sm text-[#8B7E74] mb-2">Machine à café (avec chauffe eau)</p>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">~60€/an</p>
                </div>
                <div>
                  <p className="text-sm text-[#8B7E74] mb-2">HYDRAO (boiler optimisé)</p>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600" style={{ width: '53%' }}></div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">~45€/an</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Durabilité */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <Recycle className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">Un produit durable</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              HYDRAO n'est pas un gadget qu'on jette au bout de 2 ans. C'est un investissement pensé pour durer minimum 10 ans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-gray-200/50"
            >
              <p className="text-4xl text-[#6B1E3E] mb-4">5 ans</p>
              <p className="text-xl text-gray-900 mb-2">Garantie complète</p>
              <p className="text-[#8B7E74]">
                Tous les défauts de fabrication, fuites, pannes électroniques couverts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white rounded-3xl border border-gray-200/50"
            >
              <p className="text-4xl text-[#6B1E3E] mb-4">10 ans</p>
              <p className="text-xl text-gray-900 mb-2">Pièces détachées</p>
              <p className="text-[#8B7E74]">
                Disponibilité garantie de toutes les pièces de rechange pendant 10 ans.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-white rounded-3xl border border-gray-200/50"
            >
              <p className="text-4xl text-[#6B1E3E] mb-4">100%</p>
              <p className="text-xl text-gray-900 mb-2">Réparable</p>
              <p className="text-[#8B7E74]">
                Aucune pièce collée. Tout peut être démonté, remplacé, réparé.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Soyons honnêtes */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="p-12 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-3xl border border-[#6B1E3E]/20">
            <h2 className="mb-6 text-gray-900">Soyons honnêtes</h2>
            <div className="space-y-4 text-lg text-[#8B7E74]">
              <p>
                <strong className="text-gray-900">HYDRAO n'est pas neutre en carbone.</strong> Sa fabrication émet du CO₂. Les composants électroniques viennent d'Asie. Le boiler est fabriqué en Europe, mais avec de l'acier dont la production émet du CO₂.
              </p>
              <p>
                <strong className="text-gray-900">Mais.</strong> Sur sa durée de vie (10 ans minimum), il compense largement son empreinte initiale en évitant 1 460 bouteilles plastique par an, 104 packs transportés, 85€ d'électricité gaspillée.
              </p>
              <p>
                <strong className="text-gray-900">L'écologie,</strong> ce n'est pas acheter des produits "verts". C'est acheter moins, mais mieux. Et garder plus longtemps. HYDRAO s'inscrit dans cette logique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Prêt à réduire votre empreinte ?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Chaque petit geste compte. Celui-ci est simple, efficace, et vous fait gagner de l'argent en prime.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('configurator')}
                className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg hover:bg-[#FAF8F5] transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Configurer mon robinet
              </motion.button>
              <motion.button
                onClick={() => navigate('avantages')}
                className="px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-full text-lg hover:border-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir tous les avantages
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}