import React from 'react';
import { motion } from 'motion/react';
import { Home, Package, TrendingUp, Check, ArrowRight, DollarSign, Calendar, Wrench } from 'lucide-react';

interface RenterSectionProps {
  className?: string;
}

export function RenterSection({ className = '' }: RenterSectionProps) {
  return (
    <section className={`section-padding bg-gradient-to-br from-[#FAF8F5] to-white ${className}`}>
      <div className="section-container max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-blue-50 border-2 border-blue-200 rounded-2xl mb-8">
            <Home className="w-6 h-6 text-blue-600" />
            <span className="text-2xl text-blue-700 font-medium">"Je suis locataire..."</span>
          </div>

          <h2 className="mb-6 text-gray-900">
            40% des Français sont locataires
            <span className="block text-[#6B1E3E]">HYDRAO est fait pour vous aussi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Installation réversible, emportable et rentable même sur 2-3 ans
          </p>
        </motion.div>

        {/* Hero Stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white to-[#E8D5DC]/10 border-2 border-[#6B1E3E]/20 rounded-3xl p-10 mb-12 text-center"
        >
          <div className="text-7xl font-light text-[#6B1E3E] mb-4">
            100%
          </div>
          <div className="text-2xl text-gray-900 mb-3">
            Démontable et emportable
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            HYDRAO ne laisse aucune trace. Vous pouvez l'emporter lors de votre déménagement et le réinstaller dans votre nouveau logement.
          </p>
        </motion.div>

        {/* 3 arguments principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Démontable */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-6">
              <Wrench className="w-7 h-7 text-[#6B1E3E]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-4">Installation réversible</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Aucune modification permanente</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Démontage en 1h par notre technicien</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Remise en état de votre ancien robinet</span>
              </li>
            </ul>
          </motion.div>

          {/* Emportable */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-[#6B1E3E]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-4">Suivez-vous partout</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Réinstallation dans votre nouveau logement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Frais de déménagement : 150€ seulement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Compatible 99% des cuisines</span>
              </li>
            </ul>
          </motion.div>

          {/* Rentable court terme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-[#6B1E3E]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-4">Rentable dès 6 mois</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Même sur 2-3 ans de location</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Économies immédiates sur bouteilles</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                <span>Plus de confort au quotidien</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Calcul locataire moyen */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 mb-12">
          <h3 className="text-center text-2xl text-gray-900 mb-10">
            Exemple : Locataire moyen (3 ans dans le logement)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Sans HYDRAO */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h4 className="text-lg font-medium text-red-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Sans HYDRAO (3 ans)
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Eau en bouteille</span>
                  <span className="font-medium text-gray-900">3 600€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Électricité bouilloire</span>
                  <span className="font-medium text-gray-900">150€</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-red-300">
                  <span className="text-red-900 font-medium">Total dépensé</span>
                  <span className="text-2xl font-light text-red-900">3 750€</span>
                </div>
              </div>
            </div>

            {/* Avec HYDRAO */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <h4 className="text-lg font-medium text-green-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Avec HYDRAO (3 ans)
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Robinet</span>
                  <span className="font-medium text-gray-900">490€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Abonnements (3 ans)</span>
                  <span className="font-medium text-gray-900">297€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Déménagement</span>
                  <span className="font-medium text-gray-900">150€</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-green-300">
                  <span className="text-green-900 font-medium">Total investi</span>
                  <span className="text-2xl font-light text-green-900">937€</span>
                </div>
              </div>
            </div>
          </div>

          {/* Résultat */}
          <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-8 text-center">
            <div className="text-5xl font-light mb-3">2 813€</div>
            <div className="text-xl mb-4">économisés sur 3 ans</div>
            <p className="text-white/90">
              Même en changeant de logement, HYDRAO vous fait économiser <strong>75% sur 3 ans</strong>
            </p>
          </div>
        </div>

        {/* Option revente */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#D4AF37]/10 to-white border-2 border-[#D4AF37]/30 rounded-3xl p-8 md:p-10"
        >
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl text-gray-900 mb-4">
                Vous ne déménagez pas ? Revendez-le !
              </h3>
              <p className="text-gray-700 mb-6">
                Si vous ne souhaitez pas emporter HYDRAO, vous pouvez le revendre d'occasion. 
                Un robinet HYDRAO de 2 ans en bon état se revend facilement <strong>250-300€</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-2xl font-light text-[#D4AF37] mb-1">300€</div>
                  <div className="text-xs text-gray-600">Prix de revente moyen</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-2xl font-light text-[#D4AF37] mb-1">60%</div>
                  <div className="text-xs text-gray-600">De la valeur conservée</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-2xl font-light text-[#D4AF37] mb-1">190€</div>
                  <div className="text-xs text-gray-600">Coût réel final</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 bg-white/60 rounded-lg p-4">
                💡 <strong>Astuce :</strong> Certains propriétaires acceptent même de racheter HYDRAO 
                pour le laisser dans le logement et augmenter sa valeur locative.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl text-gray-900 mb-6">
            Locataire ne signifie pas "se priver"
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Profitez dès aujourd'hui du confort HYDRAO. Vous l'emporterez ou le revendrez lors de votre départ.
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium text-lg hover:shadow-xl transition-all inline-flex items-center gap-3">
            <Calendar className="w-5 h-5" />
            Découvrir l'offre locataire
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
