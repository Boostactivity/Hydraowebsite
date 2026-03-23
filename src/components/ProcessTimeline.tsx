import React from 'react';
import { motion } from 'motion/react';
import { MousePointerClick, Calendar, Wrench, CheckCircle2 } from 'lucide-react';

export function ProcessTimeline() {
  const steps = [
    {
      icon: MousePointerClick,
      title: 'Configurez en ligne',
      description: 'Choisissez votre modèle, finition et formule d\'abonnement en 3 minutes',
      duration: '3 min',
      color: 'from-[#6B1E3E] to-[#8B2E4E]'
    },
    {
      icon: Calendar,
      title: 'Recevez votre robinet',
      description: 'Livraison sous 7 jours ouvrés avec suivi complet',
      duration: '7 jours',
      color: 'from-[#8B2E4E] to-[#6B1E3E]'
    },
    {
      icon: Wrench,
      title: 'Installation professionnelle',
      description: 'Un expert certifié installe votre robinet HYDRAO en 2h. Test complet et formation inclus',
      duration: '2h',
      color: 'from-[#6B1E3E] to-[#D4AF37]'
    },
    {
      icon: CheckCircle2,
      title: 'Profitez immédiatement',
      description: 'Eau bouillante, filtrée et pétillante à volonté dès l\'installation terminée',
      duration: 'Instantané',
      color: 'from-[#D4AF37] to-[#B8941F]'
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line - Desktop */}
      <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#6B1E3E] via-[#8B2E4E] to-[#D4AF37] opacity-20"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Step number badge */}
              <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-white border-2 border-[#6B1E3E] flex items-center justify-center font-semibold text-sm text-[#6B1E3E] z-10">
                {idx + 1}
              </div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all group">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Duration badge */}
                <div className="inline-block px-3 py-1 bg-[#6B1E3E]/10 text-[#6B1E3E] text-xs font-medium rounded-full mb-3">
                  {step.duration}
                </div>

                {/* Content */}
                <h3 className="text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow - Desktop only */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-4 text-[#6B1E3E]/30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}