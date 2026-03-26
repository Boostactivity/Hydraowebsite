import React, { useState } from 'react';
import { Page } from '../App';
import { faucetModels, finishes, BASE_PRICE } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Check, ChevronRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { UnderSinkChecker } from '../components/tools/UnderSinkChecker';
import { ExpressCheckoutBadges } from '../components/ExpressCheckoutBadges';
import { productImages, defaultImages } from '../assets/products';

interface ProductPageProps {
  navigate: (page: Page) => void;
  productId: string;
}

export function ProductPage({ navigate, productId }: ProductPageProps) {
  const product = faucetModels.find(m => m.id === productId) || faucetModels[0];
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]);

  // Storytelling personnalisé par modèle
  const getProductStory = () => {
    switch (product.id) {
      case 'flex':
        return {
          forWho: "Pour les cuisines vivantes",
          usage: "Le FLEX est pensé pour ceux qui bougent dans leur cuisine. Qui ont besoin d'espace, de flexibilité, qui passent du plan de travail à l'évier sans contrainte. Le bec extractible vous suit, la douchette intégrée s'adapte. Vous ne vous pliez plus au robinet. C'est lui qui s'adapte à votre usage.",
          ideal: ["Familles actives", "Cuisines ouvertes", "Multi-usages quotidien"]
        };
      case 'square':
        return {
          forWho: "Pour les espaces architecturés",
          usage: "Le SQUARE assume ses lignes. Carrées, nettes, sans compromis. Il s'intègre naturellement dans les cuisines contemporaines qui refusent le superflu. Le bec haut fixe libère l'espace sous-évier. La commande tactile élimine les gestes inutiles. Un robinet qui respire la maîtrise.",
          ideal: ["Cuisines modernes", "Design architectural", "Esthètes du minimalisme"]
        };
      case 'fusion':
        return {
          forWho: "Pour les épurés exigeants",
          usage: "Le FUSION disparaît presque. Ses lignes sont si épurées qu'il s'efface au profit de l'essentiel : l'eau. Compact sans être petit, élégant sans être ostentatoire. Il traverse les modes parce qu'il ne leur appartient pas. C'est le robinet de ceux qui cherchent l'intemporel.",
          ideal: ["Petits espaces optimisés", "Amateurs de design sobre", "Cuisines scandinaves"]
        };
      case 'classic':
        return {
          forWho: "Pour les classiques modernes",
          usage: "Le CLASSIC refuse l'opposition entre tradition et innovation. Son col de cygne élégant rappelle les codes de la robinetterie haut de gamme, mais l'eau qui en sort est résolument contemporaine : bouillante, filtrée, pétillante. C'est le mariage parfait entre ce qui rassure et ce qui libère.",
          ideal: ["Cuisines bourgeoises", "Rénovations patrimoniales", "Amateurs d'élégance intemporelle"]
        };
      case 'pro':
        return {
          forWho: "Pour les passionnés de cuisine",
          usage: "Le PRO ne cherche pas à plaire. Il cherche à fonctionner, intensément. Inspiré des cuisines de restaurant, son bec extra-haut accueille les grandes casseroles, la douchette puissante rince sans effort, le ressort apparent assume sa robustesse. Vous cuisinez sérieusement ? Ce robinet aussi.",
          ideal: ["Cuisiniers passionnés", "Cuisines industrielles", "Usages intensifs quotidiens"]
        };
      default:
        return {
          forWho: "Pour votre cuisine",
          usage: "Un robinet pensé pour simplifier votre quotidien.",
          ideal: ["Usage polyvalent"]
        };
    }
  };

  const story = getProductStory();

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero avec storytelling */}
      <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image du produit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-[#6B1E3E]/10 to-[#D4AF37]/10 rounded-3xl blur-3xl opacity-50"></div>
                
                <div className="relative aspect-square bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <ImageWithFallback
                    src={(productImages[selectedFinish as keyof typeof productImages] || defaultImages).faucet}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Miniatures */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {(['faucet', 'sparkling', 'boiling'] as const).map(view => (
                  <div key={view} className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#6B1E3E]/40 transition-all cursor-pointer">
                    <ImageWithFallback
                      src={(productImages[selectedFinish as keyof typeof productImages] || defaultImages)[view]}
                      alt={`${product.name} - ${view}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Storytelling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-4 py-2 bg-[#6B1E3E]/10 border border-[#6B1E3E]/20 rounded-full mb-6">
                <span className="text-sm text-[#6B1E3E]">{story.forWho}</span>
              </div>

              <h1 className="mb-6">
                <span className="block text-gray-900">{product.name}</span>
                <span className="block text-[#6B1E3E] mt-2">{product.shortDesc}</span>
              </h1>

              <p className="text-xl text-[#8B7E74] mb-10 leading-relaxed">
                {story.usage}
              </p>

              {/* Prix */}
              <div className="mb-10 p-8 bg-white border border-gray-200/60 rounded-2xl">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg text-[#8B7E74]">À partir de</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl text-gray-900">{BASE_PRICE}€</span>
                  <span className="text-xl text-[#8B7E74]">TTC</span>
                </div>
                <p className="text-sm text-[#8B7E74]">Installation et garantie 3 ans incluses</p>
              </div>

              {/* Idéal pour */}
              <div className="mb-10">
                <p className="text-sm text-[#8B7E74] mb-4">Idéal pour :</p>
                <div className="flex flex-wrap gap-3">
                  {story.ideal.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#FAF8F5] border border-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => navigate('configurator')}
                  className="group flex-1 px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-full shadow-lg shadow-[#6B1E3E]/25 hover:shadow-xl hover:shadow-[#6B1E3E]/35 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Configurer ce modèle
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  className="px-6 py-4 bg-white border border-[#6B1E3E]/30 rounded-full hover:border-[#6B1E3E] hover:bg-[#6B1E3E]/5 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5 text-[#6B1E3E]" />
                </motion.button>
              </div>

              <div className="mt-8 p-6 bg-[#6B1E3E]/5 border border-[#6B1E3E]/10 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-900">Besoin de conseils ?</strong> Notre équipe est disponible pour vous accompagner dans votre choix.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Under-Sink Checker + Payment Options */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="mb-4 text-gray-900">Vérifiez la compatibilité</h2>
            <p className="text-xl text-[#8B7E74]">
              Assurez-vous que HYDRAL s'intègre parfaitement dans votre cuisine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-12"
          >
            <UnderSinkChecker />
          </motion.div>

          {/* Payment Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-2xl text-gray-900 mb-6 text-center">Options de paiement</h3>
            <ExpressCheckoutBadges variant="default" showPaymentSplit totalAmount={BASE_PRICE} />
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
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
            Prêt à configurer<span className="block">votre {product.name} ?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Choisissez vos finitions, modules et accessoires. Recevez votre robinet sous 7 jours.
          </p>

          <motion.button
            onClick={() => navigate('configurator')}
            className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg shadow-2xl hover:bg-[#FAF8F5] transition-colors"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Commencer la configuration
            <ChevronRight className="inline w-6 h-6 ml-2" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}