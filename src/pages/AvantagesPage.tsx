import React from 'react';
import { Page } from '../App';
import { Clock, Euro, Droplet, Leaf, Smile, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface AvantagesPageProps {
  navigate: (page: Page) => void;
}

export function AvantagesPage({ navigate }: AvantagesPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
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
              <span className="block text-gray-900">Ce que vous gagnez vraiment</span>
              <span className="block text-[#6B1E3E]">Concrètement. Mesurablement.</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Pas de promesses marketing. Juste les bénéfices réels, quantifiés, que nos clients constatent après quelques semaines d'usage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. Temps gagné */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Clock className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h2 className="mb-6 text-gray-900">Le temps, cette ressource invisible</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Chaque jour, vous faites probablement 5 à 10 gestes liés à l'eau : faire bouillir de l'eau, remplir une carafe, aller chercher un pack d'eau, attendre que l'eau refroidisse...
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-gray-200/50">
                  <p className="text-lg text-gray-900 mb-2"><strong>Sans HYDRAL</strong></p>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Bouilloire : 3-5 min d'attente × 3-4 fois/jour = <strong>12-20 min/jour</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Courses eau : 1h/mois (transport + stockage)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Carafe filtrante : remplir, attendre, vider = 5 min/jour</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-900"><strong>Total : ~30 min/jour, soit 182h/an</strong></p>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-2xl">
                  <p className="text-lg mb-2"><strong>Avec HYDRAL</strong></p>
                  <p className="text-white/90 mb-4">
                    Eau bouillante instantanée. Eau filtrée en continu. Eau pétillante à la demande. Zéro course, zéro stockage, zéro attente.
                  </p>
                  <p className="text-xl"><strong>Économie : ~25 min/jour, soit 152h/an</strong></p>
                  <p className="text-sm text-white/70 mt-2">L'équivalent d'une semaine de travail par an.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FAF8F5] to-white p-12 rounded-3xl border border-gray-200/50"
            >
              <h3 className="text-2xl mb-6 text-gray-900">Valorisation du temps gagné</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline pb-4 border-b border-gray-200">
                  <span className="text-[#8B7E74]">152h/an économisées</span>
                  <span className="text-2xl text-gray-900">152h</span>
                </div>
                <div className="flex justify-between items-baseline pb-4 border-b border-gray-200">
                  <span className="text-[#8B7E74]">Valorisé à 15€/h (SMIC)</span>
                  <span className="text-2xl text-gray-900">2 280€</span>
                </div>
                <div className="flex justify-between items-baseline pb-4 border-b border-gray-200">
                  <span className="text-[#8B7E74]">Valorisé à 30€/h (cadre)</span>
                  <span className="text-2xl text-gray-900">4 560€</span>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-[#8B7E74]">
                    Bien sûr, ce temps n'est pas "monnayable". Mais c'est du temps que vous récupérez pour vous, votre famille, vos projets.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Argent économisé */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <Euro className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">
              Économies réelles
              <span className="block text-[#6B1E3E]">par type de foyer</span>
            </h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Basé sur <strong>2L d'eau/personne/jour</strong> et les prix moyens français (0,35€/L pour l'eau embouteillée vs 0,004€/L pour l'eau du robinet)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Personne seule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl text-gray-900 mb-6">Personne seule</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Eau embouteillée</span>
                  <span className="text-gray-900">255€/an</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Avec HYDRAL</span>
                  <span className="text-gray-900">3€/an</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#6B1E3E]/10 to-white rounded-2xl">
                <p className="text-4xl text-[#6B1E3E] mb-2">~250€</p>
                <p className="text-sm text-[#8B7E74]">Économies par an</p>
              </div>
            </motion.div>

            {/* Couple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl text-gray-900 mb-6">Couple</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Eau embouteillée</span>
                  <span className="text-gray-900">510€/an</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Avec HYDRAL</span>
                  <span className="text-gray-900">6€/an</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#6B1E3E]/10 to-white rounded-2xl">
                <p className="text-4xl text-[#6B1E3E] mb-2">~500€</p>
                <p className="text-sm text-[#8B7E74]">Économies par an</p>
              </div>
            </motion.div>

            {/* Famille 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-3xl border-2 border-[#6B1E3E] shadow-xl"
            >
              <div className="inline-block px-3 py-1 bg-[#6B1E3E]/20 rounded-full text-xs text-[#6B1E3E] mb-4">
                Le plus courant
              </div>
              <h3 className="text-xl text-gray-900 mb-6">Famille (4 pers)</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Eau embouteillée</span>
                  <span className="text-gray-900">1 020€/an</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Avec HYDRAL</span>
                  <span className="text-gray-900">12€/an</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-2xl">
                <p className="text-4xl mb-2">~1 000€</p>
                <p className="text-sm text-white/80">Économies par an</p>
              </div>
            </motion.div>

            {/* Famille 5+ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl text-gray-900 mb-6">Famille (5+ pers)</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Eau embouteillée</span>
                  <span className="text-gray-900">1 275€/an</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7E74]">Avec HYDRAL</span>
                  <span className="text-gray-900">15€/an</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#6B1E3E]/10 to-white rounded-2xl">
                <p className="text-4xl text-[#6B1E3E] mb-2">~1 200€</p>
                <p className="text-sm text-[#8B7E74]">Économies par an</p>
              </div>
            </motion.div>
          </div>

          {/* ROI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="p-10 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-3xl">
              <h3 className="text-2xl mb-6">Retour sur investissement</h3>
              <p className="text-lg text-white/90 mb-8">
                HYDRAL coûte <strong>490€ TTC</strong> (prix unique). Avec une famille de 4 économisant ~1000€/an, le robinet est amorti en <strong>6 mois</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div>
                  <p className="text-3xl sm:text-4xl mb-2">1 an</p>
                  <p className="text-sm text-white/70">+510€ d'économies</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl mb-2">3 ans</p>
                  <p className="text-sm text-white/70">+2 510€ d'économies</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl mb-2">10 ans</p>
                  <p className="text-sm text-white/70">+9 510€ d'économies</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Qualité de l'eau */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Droplet className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h2 className="mb-6 text-gray-900">Santé : échappez aux microplastiques</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Une étude scientifique de 2024 a révélé jusqu'à <strong>240 000 fragments de micro et nano-plastiques par litre</strong> dans les eaux embouteillées. 90% sont des nanoplastiques de moins de 1µm, capables de pénétrer dans le sang et les organes.
              </p>
              <div className="space-y-4">
                <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                  <h3 className="text-lg mb-3 text-gray-900">Eau en bouteille plastique</h3>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>240 000 particules/L</strong> de microplastiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>BPA et phtalates</strong> (perturbateurs endocriniens)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Exposition répétée <strong>plusieurs fois par jour</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 border border-green-200 rounded-2xl">
                  <h3 className="text-lg mb-3 text-gray-900">Eau du robinet filtrée (HYDRAL)</h3>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Zéro contact</strong> avec du plastique jetable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Filtre 5 étapes</strong> capture particules {'>'}5µm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>60+ contrôles sanitaires</strong> obligatoires</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-gray-200/50">
                  <p className="text-sm text-[#8B7E74] mb-2">Source : Étude scientifique 2024</p>
                  <p className="text-gray-900 italic text-sm">
                    \"Les nanoplastiques peuvent pénétrer dans la circulation sanguine, le cerveau et les organes reproducteurs. Leurs effets à long terme sont encore méconnus, mais des études montrent des risques d'inflammation et de stress oxydant.\"
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FAF8F5] to-white p-12 rounded-3xl border border-gray-200/50"
            >
              <h3 className="text-2xl mb-6 text-gray-900">Qualité de l'eau : ce que le filtre retire</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-4xl text-[#6B1E3E] mb-2">99%</p>
                  <p className="text-gray-900 mb-1">Chlore éliminé</p>
                  <p className="text-sm text-[#8B7E74]">Plus de goût, plus d'odeur désagréable</p>
                </div>
                <div>
                  <p className="text-4xl text-[#6B1E3E] mb-2">95%</p>
                  <p className="text-gray-900 mb-1">Calcaire réduit</p>
                  <p className="text-sm text-[#8B7E74]">Eau plus douce, meilleure pour vos appareils</p>
                </div>
                <div>
                  <p className="text-4xl text-[#6B1E3E] mb-2">100%</p>
                  <p className="text-gray-900 mb-1">Particules {'>'}5µm</p>
                  <p className="text-sm text-[#8B7E74]">Sédiments, rouille, impuretés visibles</p>
                </div>
                <div>
                  <p className="text-4xl text-[#6B1E3E] mb-2">98%</p>
                  <p className="text-gray-900 mb-1">Métaux lourds</p>
                  <p className="text-sm text-[#8B7E74]">Plomb, cuivre, zinc (selon eau locale)</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-2xl border border-[#6B1E3E]/20">
                <p className="text-sm text-[#8B7E74] mb-2">Résultat concret</p>
                <p className="text-gray-900">
                  Une eau neutre, sans arrière-goût, que vous aimerez boire. +47% de consommation d'eau quotidienne mesurée chez nos clients.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Impact écologique */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white p-12 rounded-3xl border border-gray-200/50">
                <h3 className="text-2xl mb-8 text-gray-900">Votre impact en 1 an</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-[#FAF8F5] rounded-2xl">
                    <p className="text-4xl text-[#6B1E3E] mb-2">1 460</p>
                    <p className="text-gray-900 mb-1">Bouteilles plastique évitées</p>
                    <p className="text-sm text-[#8B7E74]">Pour une famille de 4</p>
                  </div>
                  <div className="p-6 bg-[#FAF8F5] rounded-2xl">
                    <p className="text-4xl text-[#6B1E3E] mb-2">73 kg</p>
                    <p className="text-gray-900 mb-1">CO₂ économisé</p>
                    <p className="text-sm text-[#8B7E74]">Transport + production bouteilles</p>
                  </div>
                  <div className="p-6 bg-[#FAF8F5] rounded-2xl">
                    <p className="text-4xl text-[#6B1E3E] mb-2">0 km</p>
                    <p className="text-gray-900 mb-1">Trajet pour acheter de l'eau</p>
                    <p className="text-sm text-[#8B7E74]">Plus de courses dédiées à l'eau</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Leaf className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h2 className="mb-6 text-gray-900">Un geste écologique concret</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                HYDRAL ne vous sauvera pas la planète. Mais c'est un des gestes les plus simples pour réduire votre empreinte plastique quotidienne.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#6B1E3E] flex-shrink-0 mt-1" />
                  <p className="text-[#8B7E74]">
                    <strong className="text-gray-900">Fin du plastique :</strong> Plus de bouteilles, plus de films, plus de sur-emballages. Zéro déchet lié à l'eau.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#6B1E3E] flex-shrink-0 mt-1" />
                  <p className="text-[#8B7E74]">
                    <strong className="text-gray-900">Transport évité :</strong> L'eau ne traverse plus la France en camion. Elle sort de votre robinet.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#6B1E3E] flex-shrink-0 mt-1" />
                  <p className="text-[#8B7E74]">
                    <strong className="text-gray-900">Produit durable :</strong> Garantie 3 ans, pièces détachées disponibles 10 ans. Pas d'obsolescence programmée.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Confort quotidien */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <Smile className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">Le confort invisible</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto leading-relaxed">
              Le vrai luxe, ce n'est pas d'avoir un robinet cher. C'est de ne plus penser à l'eau. C'est de gagner en fluidité dans vos gestes quotidiens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Plus de stock",
                desc: "Fini les packs qui encombrent le placard, le frigo, le garage. Vous récupérez de l'espace."
              },
              {
                title: "Plus de courses",
                desc: "Vous ne portez plus 12kg d'eau chaque semaine. Votre dos vous remercie."
              },
              {
                title: "Plus d'attente",
                desc: "Thé, café, tisane : instantanés. Pâtes, riz, légumes : démarrage immédiat. Vous gagnez du temps à chaque utilisation."
              },
              {
                title: "Plus de décision",
                desc: "Eau plate ou pétillante ? Chaude ou froide ? Tout est disponible instantanément. Vous choisissez selon l'envie du moment."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
              >
                <h3 className="text-xl mb-4 text-gray-900">{item.title}</h3>
                <p className="text-[#8B7E74] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Prêt à constater par vous-même ?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Ces bénéfices ne sont pas des promesses. Ce sont des constats de nos clients après quelques semaines d'usage. À vous de tester.
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
                onClick={() => navigate('faq')}
                className="px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-full text-lg hover:border-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Lire la FAQ
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}