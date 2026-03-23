import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductShowcaseProps {
  onConfigureClick: () => void;
}

export function ProductShowcase({ onConfigureClick }: ProductShowcaseProps) {
  const products = [
    {
      id: 'boiling',
      title: 'Eau bouillante',
      subtitle: '100°C instantané',
      description: 'Thé, café ou cuisson rapide sans attendre',
      image: 'https://images.unsplash.com/photo-1646592491489-ebdf758b9d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZmF1Y2V0fGVufDF8fHx8MTc2NDQ2MTc5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'filtered',
      title: 'Eau filtrée',
      subtitle: 'Pure & délicieuse',
      description: 'Filtration avancée pour une eau parfaite',
      image: 'https://images.unsplash.com/photo-1761353854551-361b1c804849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjB0YXAlMjB3YXRlcnxlbnwxfHx8fDE3NjQ1MzkyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'chilled',
      title: 'Eau réfrigérée',
      subtitle: '4-8°C constant',
      description: 'Fraîche et pétillante à la demande',
      image: 'https://images.unsplash.com/photo-1620086464194-5127366b51ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0NDY2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'combi',
      title: 'Solution complète',
      subtitle: '5 en 1',
      description: 'Tous les types d\'eau en un seul robinet',
      image: 'https://images.unsplash.com/photo-1646592491489-ebdf758b9d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZmF1Y2V0fGVufDF8fHx8MTc2NDQ2MTc5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    }
  ];

  return (
    <section id="products" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl mb-6 font-light text-gray-900">
            Nos solutions
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Choisissez le système qui correspond à vos besoins
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="text-sm font-light mb-1 opacity-90">{product.subtitle}</div>
                    <h3 className="text-2xl font-light">{product.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 font-light mb-6">
                    {product.description}
                  </p>

                  <button
                    onClick={onConfigureClick}
                    className="inline-flex items-center gap-2 text-sm text-gray-900 hover:gap-3 transition-all group"
                  >
                    <span>Configurer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={onConfigureClick}
            className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Créer votre robinet sur mesure
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
