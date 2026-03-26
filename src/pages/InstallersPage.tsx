import React from 'react';
import { Page } from '../App';
import { Wrench, Users, BookOpen, Shield, Phone, Mail, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface InstallersPageProps {
  navigate: (page: Page) => void;
}

export function InstallersPage({ navigate }: InstallersPageProps) {
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
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 rounded-full mb-8 border border-[#6B1E3E]/20">
              <Wrench className="w-4 h-4 text-[#6B1E3E]" />
              <span className="text-sm text-[#6B1E3E]">Installation & Compatibilité</span>
            </div>
            <h1 className="mb-8">
              <span className="block text-gray-900">Installation simple</span>
              <span className="block text-[#6B1E3E]">Compatible avec toute plomberie standard</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Le robinet HYDRAL s'installe simplement. Un bricoleur peut le faire en environ 1h. Vous pouvez aussi faire appel au plombier de votre choix.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi travailler avec nous */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Compatibilité universelle</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Le robinet HYDRAL est compatible avec toute plomberie standard. Aucune modification majeure requise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Wrench className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Installation DIY</h3>
              <p className="text-[#8B7E74] mb-6 leading-relaxed">
                80% de nos clients installent leur robinet eux-mêmes. Notre guide vidéo et notre notice détaillée vous accompagnent étape par étape.
              </p>
              <ul className="space-y-2 text-[#8B7E74]">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Guide vidéo étape par étape</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Notice détaillée fournie</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Support technique si besoin</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center mb-8">
                <Users className="w-8 h-8 text-[#6B1E3E]" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Votre plombier</h3>
              <p className="text-[#8B7E74] mb-6 leading-relaxed">
                Vous pouvez faire appel au plombier de votre choix. Le robinet HYDRAL utilise des raccords standards et notre documentation technique est claire.
              </p>
              <ul className="space-y-2 text-[#8B7E74]">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Raccords standards compatibles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Documentation technique complète</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Aucune formation spécifique requise</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-3xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Compatibilité garantie</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Le robinet HYDRAL est compatible avec 95% des cuisines. Raccords standard, perçage Ø 35mm, arrivée d'eau classique.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-sm text-white/70 mb-1">Temps d'installation moyen</p>
                  <p className="text-3xl">environ 1h</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-sm text-white/70 mb-1">Prérequis</p>
                  <p className="text-lg">Arrivée d'eau + prise 230V</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ce dont vous avez besoin */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Ce dont vous avez besoin</h2>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto">
              Vérifiez que votre cuisine est compatible avant de commander.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">Prérequis techniques</h3>
              <ul className="space-y-3 text-[#8B7E74]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Évier avec trou standard (Ø 35-40mm)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Arrivée d'eau froide sous l'évier</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Prise électrique 230V à proximité</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>30cm d'espace sous l'évier pour le module</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200/50">
              <h3 className="text-xl mb-4 text-gray-900">Outils nécessaires</h3>
              <ul className="space-y-3 text-[#8B7E74]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Clé à molette</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Tournevis cruciforme</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Ruban téflon</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                  <span>Bassine + serviettes (pour l'eau résiduelle)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900">Besoin d'aide pour l'installation ?</h2>
            <p className="text-xl text-[#8B7E74]">
              Notre support technique est disponible pour vous guider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-gray-200/50 text-center">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#8B7E74] mb-2">Assistance téléphonique</p>
              <p className="text-lg text-gray-900">+33 6 60 96 85 16</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200/50 text-center">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#8B7E74] mb-2">Email support</p>
              <p className="text-lg text-gray-900">support@hydral.fr</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200/50 text-center">
              <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[#6B1E3E]" />
              </div>
              <p className="text-sm text-[#8B7E74] mb-2">Guide vidéo</p>
              <p className="text-lg text-gray-900">Tutoriel complet</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}