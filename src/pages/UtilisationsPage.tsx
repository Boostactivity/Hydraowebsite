import React from 'react';
import { Page } from '../App';
import { Coffee, Soup, Flame, Droplet, Baby, Sparkles, Clock, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface UtilisationsPageProps {
  navigate: (page: Page) => void;
}

export function UtilisationsPage({ navigate }: UtilisationsPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">Dans quelles situations</span>
              <span className="block text-[#6B1E3E]">vous l'utilisez vraiment ?</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Pas une liste exhaustive de cas d'usage. Juste les moments quotidiens où nos clients nous disent : "Ça, ça change tout."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. Le matin : boissons chaudes */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Coffee className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#6B1E3E] mb-4 tracking-wide">LE MATIN • 7H-9H</p>
              <h2 className="mb-6 text-gray-900">Boissons chaudes instantanées</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Vous vous réveillez. Vous voulez un thé. Vous appuyez sur le bouton eau bouillante. 3 secondes plus tard, votre thé infuse. Pas de bouilloire. Pas d'attente. Pas de geste superflu.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#6B1E3E] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1"><strong>Gain de temps</strong></p>
                    <p className="text-[#8B7E74]">Fini les 3-5 minutes d'attente de la bouilloire. Eau à 100°C instantanée.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-[#6B1E3E] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1"><strong>Qualité de l'eau</strong></p>
                    <p className="text-[#8B7E74]">Eau filtrée, sans chlore. Votre thé a meilleur goût. Vraiment.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FAF8F5] to-white p-12 rounded-3xl border border-gray-200/50"
            >
              <h3 className="text-2xl mb-6 text-gray-900">Ce que disent nos clients</h3>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-200/50">
                  <p className="text-gray-900 italic mb-3">
                    "Avant, je sautais souvent mon thé du matin par flemme d'attendre la bouilloire. Maintenant, je prends 3 thés par jour. C'est devenu un rituel simple."
                  </p>
                  <p className="text-sm text-[#8B7E74]">Claire, Paris 11e</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200/50">
                  <p className="text-gray-900 italic mb-3">
                    "Mon mari boit enfin des infusions le soir. Avant, c'était 'trop long'. Maintenant, c'est instantané."
                  </p>
                  <p className="text-sm text-[#8B7E74]">Mathilde, Lyon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Midi/soir : cuisine quotidienne */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white p-12 rounded-3xl border border-gray-200/50">
                <h3 className="text-2xl mb-8 text-gray-900">Cas d'usage fréquents</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-lg text-gray-900 mb-2"><strong>Pâtes / Riz / Légumes</strong></p>
                    <p className="text-[#8B7E74]">
                      Au lieu de mettre l'eau froide dans la casserole et d'attendre 8-10 min qu'elle bouille, vous remplissez directement avec de l'eau bouillante. Cuisson démarre immédiatement. <strong className="text-gray-900">Gain : 8-10 min par cuisson.</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-900 mb-2"><strong>Bouillons / Soupes</strong></p>
                    <p className="text-[#8B7E74]">
                      Versez l'eau bouillante sur vos cubes de bouillon, légumes, vermicelles. Prêt en 2 minutes au lieu de 12.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-900 mb-2"><strong>Blanchir des légumes</strong></p>
                    <p className="text-[#8B7E74]">
                      Eau bouillante immédiate pour blanchir épinards, haricots, brocolis. Parfait pour préparer des purées bébé ou congeler des légumes.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-900 mb-2"><strong>Dégraisser la vaisselle</strong></p>
                    <p className="text-[#8B7E74]">
                      L'eau bouillante dissout les graisses instantanément. Fini de frotter vos poêles. Un jet d'eau chaude, et c'est propre.
                    </p>
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
                <Flame className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#6B1E3E] mb-4 tracking-wide">MIDI & SOIR • CUISINE</p>
              <h2 className="mb-6 text-gray-900">Cuisson accélérée</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Le scénario classique : vous rentrez du travail, il est 19h30, vous voulez manger rapidement. Vous faites des pâtes. Avec l'eau froide, vous attendez 10 minutes. Avec HYDRAL, vous démarrez la cuisson immédiatement.
              </p>
              <div className="p-6 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-2xl border border-[#6B1E3E]/20">
                <p className="text-sm text-[#8B7E74] mb-2">Témoignage client (Bordeaux)</p>
                <p className="text-gray-900 italic">
                  "Avant, faire des pâtes me prenait 25 minutes (attente ébullition + cuisson). Maintenant, 12 minutes chrono. Sur une semaine, je gagne facile 1h."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Hydratation quotidienne */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Droplet className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#6B1E3E] mb-4 tracking-wide">TOUTE LA JOURNÉE</p>
              <h2 className="mb-6 text-gray-900">Boire plus, mieux</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                L'eau filtrée est disponible en permanence, froide et sans goût de chlore. Résultat : vous buvez plus. Nos clients rapportent en moyenne +47% de consommation d'eau quotidienne.
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-gray-200/50">
                  <h3 className="text-lg mb-3 text-gray-900">Pourquoi on boit plus ?</h3>
                  <ul className="space-y-2 text-[#8B7E74]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>L'eau a meilleur goût (pas de chlore)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>Elle est toujours fraîche (pas besoin d'attendre)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>Pas de bouteille à remplir, stocker, transporter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B1E3E] font-bold">•</span>
                      <span>L'eau pétillante rend l'hydratation ludique</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-2xl">
                  <p className="text-sm text-white/80 mb-2">Constat observé</p>
                  <p className="text-2xl mb-2">Les enfants boivent 2x plus d'eau</p>
                  <p className="text-sm text-white/70">
                    L'eau pétillante remplace les sodas. Les parents rapportent une consommation de soda divisée par 3 en moyenne.
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
              <h3 className="text-2xl mb-6 text-gray-900">3 types d'eau, 3 usages</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Droplet className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg text-gray-900">Eau filtrée froide</h4>
                  </div>
                  <p className="text-[#8B7E74]">
                    Pour boire toute la journée. Neutre, pure, fraîche. Remplace les packs d'eau.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="text-lg text-gray-900">Eau pétillante</h4>
                  </div>
                  <p className="text-[#8B7E74]">
                    Pour les repas, les apéros, les enfants. Remplace Perrier, San Pellegrino, Sodastream.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-red-600" />
                    </div>
                    <h4 className="text-lg text-gray-900">Eau bouillante</h4>
                  </div>
                  <p className="text-[#8B7E74]">
                    Pour thé, café, tisanes, cuisson. Remplace bouilloire + casserole d'eau froide.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Biberons & jeunes enfants */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white p-12 rounded-3xl border border-gray-200/50">
                <h3 className="text-2xl mb-8 text-gray-900">Préparation biberons simplifiée</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-[#FAF8F5] rounded-2xl">
                    <p className="text-lg text-gray-900 mb-3"><strong>Scénario classique (sans HYDRAL)</strong></p>
                    <ol className="space-y-2 text-[#8B7E74] list-decimal list-inside">
                      <li>Faire bouillir de l'eau (5 min)</li>
                      <li>Attendre qu'elle refroidisse à 70°C (15-20 min)</li>
                      <li>Mélanger avec de l'eau froide</li>
                      <li>Tester la température (plusieurs fois)</li>
                    </ol>
                    <p className="mt-4 text-gray-900"><strong>Temps total : 25-30 min</strong></p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-2xl">
                    <p className="text-lg mb-3"><strong>Avec HYDRAL</strong></p>
                    <ol className="space-y-2 text-white/90 list-decimal list-inside">
                      <li>Eau bouillante instantanée dans le biberon</li>
                      <li>Ajouter l'eau froide filtrée pour ajuster</li>
                      <li>Mélanger, c'est prêt</li>
                    </ol>
                    <p className="mt-4 text-xl"><strong>Temps total : 2 min</strong></p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#6B1E3E]/5 border border-[#6B1E3E]/20 rounded-2xl">
                  <p className="text-sm text-[#8B7E74] mb-2">Témoignage (Maman de 2 enfants, Lille)</p>
                  <p className="text-gray-900 italic">
                    "La nuit, quand bébé pleure, préparer un biberon en 2 minutes au lieu de 20, c'est énorme. Je suis moins fatiguée, bébé attend moins."
                  </p>
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
                <Baby className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#6B1E3E] mb-4 tracking-wide">PARENTS • JEUNES ENFANTS</p>
              <h2 className="mb-6 text-gray-900">Biberons, purées, sécurité</h2>
              <p className="text-xl text-[#8B7E74] mb-8 leading-relaxed">
                Si vous avez un bébé ou un jeune enfant, HYDRAL devient rapidement indispensable. Eau stérilisée instantanée, température contrôlable, sécurité renforcée.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#6B1E3E] font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1"><strong>Biberons rapides</strong></p>
                    <p className="text-[#8B7E74]">Eau bouillante + eau froide = température parfaite en 2 minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#6B1E3E] font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1"><strong>Purées maison</strong></p>
                    <p className="text-[#8B7E74]">Blanchir légumes en 3 minutes, mixer, c'est prêt. Pas de robot vapeur.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#6B1E3E] font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1"><strong>Sécurité enfant</strong></p>
                    <p className="text-[#8B7E74]">Verrou double sécurité sur l'eau bouillante. Impossible pour un enfant de l'activer.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Petits usages invisibles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Les usages invisibles</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto leading-relaxed">
              Et puis il y a tous ces petits moments où vous utilisez HYDRAL sans y penser. C'est là qu'on mesure à quel point c'est devenu naturel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Stériliser des bocaux",
                desc: "Eau bouillante pour stériliser vos bocaux de confitures, conserves maison."
              },
              {
                title: "Nettoyer des planches",
                desc: "Un jet d'eau bouillante désinfecte vos planches à découper en 10 secondes."
              },
              {
                title: "Détacher du linge",
                desc: "Eau chaude sur une tache tenace avant lavage. Efficace, simple."
              },
              {
                title: "Faire fondre du beurre",
                desc: "Bol d'eau chaude, beurre dedans, fondu en 30 secondes."
              },
              {
                title: "Décongeler rapidement",
                desc: "Eau chaude filtrée pour décongeler viandes, poissons sous vide."
              },
              {
                title: "Arroser les plantes",
                desc: "Eau filtrée pour vos plantes d'intérieur. Elles poussent mieux."
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
                <h3 className="text-lg mb-3 text-gray-900">{item.title}</h3>
                <p className="text-[#8B7E74]">{item.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="mb-6">Vous vous reconnaissez ?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Si vous faites ne serait-ce que 3 de ces actions quotidiennement, HYDRAL va simplifier votre vie.
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
                Voir les avantages
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
