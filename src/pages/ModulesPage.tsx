import React from 'react';
import { Page } from '../App';
import { modules } from '../data/products';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ModulesPageProps {
  navigate: (page: Page) => void;
}

export function ModulesPage({ navigate }: ModulesPageProps) {
  return (
    <div className="bg-[#FAF8F5]">
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">Les modules sous évier</span>
              <span className="block text-[#6B1E3E]">Compacts et performants</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Compacts, silencieux et ultra-performants. Choisissez les modules adaptés à vos besoins.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-block px-4 py-2 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-sm mb-4">
                    {module.required ? 'Obligatoire' : 'Optionnel'}
                  </div>
                  <h2 className="mb-4 text-gray-900">{module.name}</h2>
                  <p className="text-xl text-[#8B7E74] mb-6">{module.description}</p>

                  <div className="mb-6">
                    <h3 className="mb-3 text-gray-900">Caractéristiques :</h3>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#6B1E3E] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 text-gray-900">Spécifications techniques :</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(module.specs).map(([key, value]) => (
                        <div key={key} className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200/50">
                          <p className="text-sm text-[#8B7E74] mb-1">{key}</p>
                          <p className="text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-square bg-gradient-to-br from-[#FAF8F5] to-[#E8D5DC]/20 rounded-3xl border border-gray-200/50"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6">Configurez votre système complet</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Choisissez les modules dont vous avez besoin
          </p>
          <motion.button
            onClick={() => navigate('configurator')}
            className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg hover:bg-[#FAF8F5] transition-colors inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Configurer
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}