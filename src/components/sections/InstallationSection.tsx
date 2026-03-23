import React from 'react';
import { motion } from 'motion/react';
import { Clock, Wrench, Check, Shield, PhoneCall, MapPin } from 'lucide-react';
import { Page } from '../../App';
import { Button } from '../ui/Button';

interface InstallationSectionProps {
  navigate: (page: Page) => void;
}

export function InstallationSection({ navigate }: InstallationSectionProps) {
  const steps = [
    {
      number: 1,
      title: 'Prise de rendez-vous',
      description: 'Choisissez votre créneau parmi notre réseau de 230+ installateurs agréés',
      icon: PhoneCall,
      duration: '5 min'
    },
    {
      number: 2,
      title: 'Visite technique',
      description: 'Vérification de la compatibilité et préparation du chantier',
      icon: MapPin,
      duration: '30 min'
    },
    {
      number: 3,
      title: 'Installation',
      description: 'Pose du robinet + modules sous-évier + raccordements',
      icon: Wrench,
      duration: '2h'
    },
    {
      number: 4,
      title: 'Formation & garantie',
      description: 'Démonstration complète + remise des documents de garantie 5 ans',
      icon: Shield,
      duration: '30 min'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 rounded-full mb-6 border border-[#6B1E3E]/20">
            <Wrench className="w-4 h-4 text-[#6B1E3E]" />
            <span className="text-sm text-[#6B1E3E] font-medium">Installation professionnelle</span>
          </div>

          <h2 className="mb-6 text-gray-900">
            Installation simple et rapide
          </h2>
          
          <p className="text-xl text-[#6B5E54] max-w-3xl mx-auto leading-relaxed">
            Notre réseau d'installateurs certifiés s'occupe de tout. De la prise de rendez-vous à la mise en service, 
            <span className="block mt-2 text-gray-900 font-medium">vous n'avez rien à faire.</span>
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#6B1E3E]/30 to-transparent"></div>
              )}

              <div className="relative bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#6B1E3E]/30 transition-all hover:shadow-xl">
                {/* Step number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-bordeaux text-white flex items-center justify-center text-xl font-light shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center mb-4 mt-2">
                  <step.icon className="w-6 h-6 text-[#6B1E3E]" />
                </div>

                {/* Content */}
                <h3 className="text-xl mb-2 text-gray-900">{step.title}</h3>
                <p className="text-sm text-[#6B5E54] mb-3 leading-relaxed">{step.description}</p>
                
                {/* Duration */}
                <div className="flex items-center gap-2 text-xs text-[#6B1E3E] font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{step.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 rounded-3xl border-2 border-gray-200 shadow-xl mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="mb-2 text-gray-900">Installation comprise</h4>
                <p className="text-sm text-[#6B5E54]">Main d'œuvre et déplacement inclus dans le prix</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="mb-2 text-gray-900">Garantie 5 ans</h4>
                <p className="text-sm text-[#6B5E54]">Pièces, main d'œuvre et déplacement couverts</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="mb-2 text-gray-900">Partout en France</h4>
                <p className="text-sm text-[#6B5E54]">230+ installateurs certifiés dans toute la France</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('installers')}
          >
            Trouver un installateur près de chez moi
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
