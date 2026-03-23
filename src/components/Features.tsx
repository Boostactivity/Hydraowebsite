import React from 'react';
import { Shield, Zap, Award, Leaf, Clock, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Instantané',
      description: 'Eau bouillante en 3 secondes, plus besoin d\'attendre la bouilloire'
    },
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Système de sécurité enfants et poignée isolée anti-brûlure'
    },
    {
      icon: Leaf,
      title: 'Écologique',
      description: 'Réduisez votre consommation d\'énergie jusqu\'à 50% et éliminez les bouteilles plastique'
    },
    {
      icon: Award,
      title: 'Qualité premium',
      description: 'Fabriqué en Europe avec les meilleurs matériaux, garantie 5 ans'
    },
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Économisez jusqu\'à 30 minutes par jour en cuisine'
    },
    {
      icon: Wrench,
      title: 'Installation simple',
      description: 'Compatible avec toutes les cuisines, installation par votre plombier habituel'
    }
  ];

  return (
    <section className="py-32 bg-white">
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
            Pourquoi choisir HYDRAL
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Une technologie innovante qui transforme votre quotidien en cuisine
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {/* Icon */}
                <div className="mb-6">
                  <feature.icon className="w-8 h-8 text-gray-900 stroke-[1.5]" />
                </div>

                {/* Content */}
                <h3 className="text-xl mb-3 text-gray-900 font-normal">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}