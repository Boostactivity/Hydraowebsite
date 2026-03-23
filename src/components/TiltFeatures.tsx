import React from 'react';
import { Droplets, Zap, Shield, Leaf, Sparkles, Award } from 'lucide-react';
import { TiltCard } from './animations/TiltCard';
import { RevealOnScroll } from './animations/RevealOnScroll';

export function TiltFeatures() {
  const features = [
    {
      icon: <Droplets className="w-12 h-12" />,
      title: '5 Types d\'eau',
      description: 'Bouillante, froide filtrée, pétillante, chaude et froide classique',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Instantané',
      description: 'Eau bouillante en 3 secondes, sans attente ni gaspillage',
      gradient: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Sécurité Max',
      description: 'Double protection enfants + filtration 5 étapes certifiée',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: 'Éco-responsable',
      description: 'Économisez 50% d\'énergie vs bouilloire et réduisez le plastique',
      gradient: 'from-lime-500/20 to-green-500/20',
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Design Premium',
      description: '8 finitions élégantes pour s\'adapter à tous les styles',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Garantie 5 ans',
      description: 'Qualité professionnelle + SAV réactif + pièces disponibles',
      gradient: 'from-red-500/20 to-rose-500/20',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="mb-4 text-gray-900">
            Technologie premium
            <span className="block text-[#6B1E3E]">pour tous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez toutes les innovations qui font d'HYDRAO le robinet du futur
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <RevealOnScroll
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <TiltCard
                className={`h-full bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow`}
                tiltStrength={10}
              >
                <div className="text-[#6B1E3E] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
