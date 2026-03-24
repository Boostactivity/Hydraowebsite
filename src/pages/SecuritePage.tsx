import React from 'react';
import { Page } from '../App';
import { Shield, Lock, AlertTriangle, Baby, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SecuritePageProps {
  navigate: (page: Page) => void;
}

export function SecuritePage({ navigate }: SecuritePageProps) {
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
              <span className="block text-gray-900">Sécurité</span>
              <span className="block text-[#6B1E3E]">Oui, l'eau bouillante est dangereuse</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Nous ne vendons pas un robinet "sans danger". Nous vendons un robinet avec de l'eau à 100°C. Donc potentiellement dangereux. Voici comment nous avons tout fait pour minimiser les risques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* La réalité */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <AlertTriangle className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">Soyons clairs</h2>
            <p className="text-xl text-[#8B7E74] leading-relaxed">
              L'eau à 100°C peut provoquer des brûlures graves. Comme une casserole sur le feu, comme une bouilloire électrique, comme votre four. Ce n'est pas un jouet. C'est un appareil domestique sérieux.
            </p>
          </motion.div>

          <div className="p-8 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-3xl border border-[#6B1E3E]/20">
            <h3 className="text-2xl mb-6 text-gray-900">Ce que nous avons fait</h3>
            <p className="text-lg text-[#8B7E74] mb-6">
              HYDRAL intègre 4 niveaux de sécurité pour éviter que l'eau bouillante ne coule par accident. Pas de promesse miracle. Juste du bon sens et de l'ingénierie.
            </p>
          </div>
        </div>
      </section>

      {/* Les 4 niveaux de sécurité */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900">4 niveaux de protection</h2>
            <p className="text-xl text-[#8B7E74]">Empiler les sécurités pour rendre l'accident quasi-impossible.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Niveau 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-white rounded-3xl border border-gray-200/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-[#6B1E3E]">1</span>
                </div>
                <h3 className="text-2xl text-gray-900">Bouton séparé</h3>
              </div>
              <p className="text-lg text-[#8B7E74] mb-4">
                L'eau bouillante ne sort JAMAIS par le mitigeur principal. Elle a son propre bouton poussoir dédié, clairement identifié.
              </p>
              <p className="text-gray-900">
                <strong>Pourquoi c'est important :</strong> Vous ne pouvez pas ouvrir l'eau bouillante par erreur en manipulant le mitigeur classique.
              </p>
            </motion.div>

            {/* Niveau 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-white rounded-3xl border border-gray-200/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-[#6B1E3E]">2</span>
                </div>
                <h3 className="text-2xl text-gray-900">Double action</h3>
              </div>
              <p className="text-lg text-[#8B7E74] mb-4">
                Pour ouvrir l'eau bouillante, il faut : (1) pousser le bouton ET (2) le tourner en même temps. Impossible de le faire d'une seule main par accident.
              </p>
              <p className="text-gray-900">
                <strong>Pourquoi c'est important :</strong> Même si vous touchez le bouton par inadvertance, rien ne coule.
              </p>
            </motion.div>

            {/* Niveau 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-white rounded-3xl border border-gray-200/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-[#6B1E3E]">3</span>
                </div>
                <h3 className="text-2xl text-gray-900">Verrou enfant</h3>
              </div>
              <p className="text-lg text-[#8B7E74] mb-4">
                Le geste requis (pousser + tourner) demande une force et une coordination qu'un enfant de moins de 6-7 ans ne peut pas exercer.
              </p>
              <p className="text-gray-900">
                <strong>Pourquoi c'est important :</strong> Même un enfant curieux ne peut pas activer l'eau bouillante seul.
              </p>
            </motion.div>

            {/* Niveau 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-10 bg-white rounded-3xl border border-gray-200/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-[#6B1E3E]">4</span>
                </div>
                <h3 className="text-2xl text-gray-900">Bec isolé</h3>
              </div>
              <p className="text-lg text-[#8B7E74] mb-4">
                Le robinet est isolé thermiquement. Même quand l'eau bouillante coule, vous pouvez toucher le bec sans vous brûler.
              </p>
              <p className="text-gray-900">
                <strong>Pourquoi c'est important :</strong> Si un enfant touche le robinet pendant que l'eau coule, il ne se brûle pas au contact du métal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparaison bouilloire */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900">Plus sûr qu'une bouilloire ?</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Oui. Et voici pourquoi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bouilloire classique */}
            <div className="p-10 bg-[#FAF8F5] rounded-3xl border border-gray-200">
              <h3 className="text-2xl mb-6 text-gray-900">Bouilloire électrique</h3>
              <ul className="space-y-4 text-[#8B7E74]">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Mobile : peut tomber, être renversée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Fil électrique : risque de trébucher, tirer</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Paroi brûlante : impossible de toucher pendant/après usage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Couvercle : vapeur qui s'échappe, risque de brûlure main</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>Accessible : un enfant peut la mettre en marche</span>
                </li>
              </ul>
            </div>

            {/* HYDRAL */}
            <div className="p-10 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-3xl">
              <h3 className="text-2xl mb-6">HYDRAL</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Fixe : impossible à renverser, solidement ancré</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Câblage caché : sous l'évier, aucun fil apparent</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Bec isolé : robinet reste tiède au toucher</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Pas de vapeur : l'eau coule, ne stagne pas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Verrou enfant : double action impossible pour enfant de moins de 7 ans</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <Shield className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">Certifications et normes</h2>
            <p className="text-xl text-[#8B7E74]">
              Tous les modèles HYDRAL respectent les normes européennes les plus strictes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">CE (conformité européenne)</h3>
              <p className="text-[#8B7E74]">
                Conforme aux directives européennes sur les équipements électriques et la sécurité des produits.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">ACS (contact alimentaire)</h3>
              <p className="text-[#8B7E74]">
                Attestation de Conformité Sanitaire pour tout contact avec l'eau potable en France.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">Tests de résistance</h3>
              <p className="text-[#8B7E74]">
                50 000 cycles d'ouverture/fermeture testés. Résistance à la pression jusqu'à 10 bars.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">Garantie 5 ans</h3>
              <p className="text-[#8B7E74]">
                Couverture complète sur tous les défauts de fabrication, fuites, dysfonctionnements électroniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils d'usage */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8 mx-auto">
              <Baby className="w-8 h-8 text-[#6B1E3E]" />
            </div>
            <h2 className="mb-6 text-gray-900">Nos recommandations si vous avez des enfants</h2>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-gray-200/50">
              <h3 className="text-lg mb-3 text-gray-900">Expliquer le danger</h3>
              <p className="text-[#8B7E74]">
                Comme pour le four ou la plaque de cuisson, expliquez à vos enfants que l'eau qui sort de ce bouton est très chaude et peut brûler. Éducation avant interdiction.
              </p>
            </div>
            <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-gray-200/50">
              <h3 className="text-lg mb-3 text-gray-900">Montrer le geste correct</h3>
              <p className="text-[#8B7E74]">
                Montrez-leur comment vous utilisez le robinet. Le fait de voir le geste volontaire (pousser + tourner) renforce la prise de conscience que ce n'est pas un jeu.
              </p>
            </div>
            <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-gray-200/50">
              <h3 className="text-lg mb-3 text-gray-900">Superviser les premières fois</h3>
              <p className="text-[#8B7E74]">
                Si un enfant de 8-10 ans veut se servir un thé, restez présent les premières fois. Ensuite, faites confiance. HYDRAL est conçu pour être utilisable par un adolescent responsable.
              </p>
            </div>
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
            <h2 className="mb-6">Des questions sur la sécurité ?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Nous répondons à toutes vos interrogations sans langue de bois. Consultez notre FAQ ou contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('faq')}
                className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg hover:bg-[#FAF8F5] transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Lire la FAQ
              </motion.button>
              <motion.button
                onClick={() => navigate('support')}
                className="px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-full text-lg hover:border-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Nous contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}