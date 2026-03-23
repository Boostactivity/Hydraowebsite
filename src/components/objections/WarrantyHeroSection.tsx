import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Wrench, Phone, CheckCircle2, Star, Package, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface WarrantyHeroSectionProps {
  className?: string;
}

export function WarrantyHeroSection({ className = '' }: WarrantyHeroSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const warrantyFeatures = [
    {
      icon: Shield,
      title: '5 ans pièces et main d\'œuvre',
      description: 'Couverture intégrale pendant 5 ans',
      details: ['Toutes les pièces incluses', 'Main d\'œuvre gratuite', 'Déplacement technicien inclus']
    },
    {
      icon: Clock,
      title: 'SAV sous 48h',
      description: 'Intervention rapide garantie',
      details: ['Diagnostic par téléphone', 'Rendez-vous sous 48h', 'Pièces en stock permanent']
    },
    {
      icon: Wrench,
      title: 'Technicien certifié à domicile',
      description: 'Réparation chez vous',
      details: ['Expert HYDRAO formé', 'Outils professionnels', 'Réparation sur place']
    },
    {
      icon: Package,
      title: 'Pièces détachées 10 ans',
      description: 'Disponibilité garantie',
      details: ['Stock France', 'Compatibilité assurée', 'Prix fixes']
    }
  ];

  const faqs = [
    {
      question: 'Que faire en cas de panne ?',
      answer: 'Appelez notre SAV au 01 XX XX XX XX. Un technicien vous guidera par téléphone pour un diagnostic. Si besoin, rendez-vous sous 48h à votre domicile.'
    },
    {
      question: 'Combien coûte une intervention après garantie ?',
      answer: 'Après 5 ans : déplacement 50€ + pièces au prix coûtant. Mais 95% des appareils fonctionnent sans problème après 5 ans.'
    },
    {
      question: 'Puis-je prolonger la garantie ?',
      answer: 'Oui, extension de garantie 3 ans supplémentaires disponible pour 99€ au moment de l\'achat.'
    },
    {
      question: 'Que se passe-t-il si HYDRAO arrête la production ?',
      answer: 'Nous garantissons la disponibilité des pièces détachées pendant 10 ans minimum, même en cas d\'arrêt de production.'
    }
  ];

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
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-8">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <span className="text-2xl text-red-700 font-medium">"Et si ça tombe en panne ?"</span>
          </div>

          <h2 className="mb-6 text-gray-900">
            La garantie la plus complète
            <span className="block text-[#6B1E3E]">du marché</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            5 ans de tranquillité absolue, SAV réactif et pièces disponibles 10 ans
          </p>
        </motion.div>

        {/* Hero stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-3xl p-12 mb-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <Shield className="w-20 h-20 mx-auto mb-6 text-white" />
            <div className="text-7xl font-light mb-4">5 ans</div>
            <div className="text-2xl mb-6">de garantie pièces et main d'œuvre</div>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Nous assumons 100% des risques. Si un problème survient, nous le réglons. Gratuitement.
            </p>
          </div>
        </motion.div>

        {/* 4 piliers garantie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {warrantyFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-[#6B1E3E]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Process SAV */}
        <div className="bg-gradient-to-br from-white to-[#E8D5DC]/10 border-2 border-gray-200 rounded-3xl p-8 md:p-10 mb-16">
          <h3 className="text-2xl text-gray-900 text-center mb-10">
            Comment fonctionne le SAV ?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                icon: Phone,
                title: 'Vous appelez',
                description: 'Contactez le SAV par téléphone ou email'
              },
              {
                step: '2',
                icon: Wrench,
                title: 'Diagnostic',
                description: 'Technicien identifie le problème à distance'
              },
              {
                step: '3',
                icon: Clock,
                title: 'Rendez-vous',
                description: 'Intervention sous 48h à votre domicile'
              },
              {
                step: '4',
                icon: CheckCircle2,
                title: 'Réparation',
                description: 'Réparation sur place, gratuitement'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#6B1E3E]/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#6B1E3E]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center font-medium text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats fiabilité */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-6 text-center"
          >
            <div className="text-5xl font-light text-[#6B1E3E] mb-2">98.5%</div>
            <div className="text-sm text-gray-600">Taux de satisfaction SAV</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-6 text-center"
          >
            <div className="text-5xl font-light text-[#6B1E3E] mb-2">36h</div>
            <div className="text-sm text-gray-600">Délai moyen d'intervention</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-6 text-center"
          >
            <div className="text-5xl font-light text-[#6B1E3E] mb-2">2.3%</div>
            <div className="text-sm text-gray-600">Taux de panne sur 5 ans</div>
          </motion.div>
        </div>

        {/* FAQ Garantie */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10">
          <h3 className="text-2xl text-gray-900 mb-8 text-center">
            Questions fréquentes sur la garantie
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#6B1E3E]/30 transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#6B1E3E] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-gray-700"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <blockquote className="text-xl text-gray-800 mb-4 italic">
            "Un souci 3 ans après l'installation. J'ai appelé le SAV, technicien chez moi le lendemain. 
            Pièce changée gratuitement en 20 minutes. Service irréprochable."
          </blockquote>
          <div className="text-gray-600">
            — Marie D., cliente depuis 2021
          </div>
        </motion.div>
      </div>
    </section>
  );
}
