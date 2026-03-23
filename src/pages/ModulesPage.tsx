import React from 'react';
import { Page } from '../App';
import { modules } from '../data/products';
import { Check, ArrowRight } from 'lucide-react';

interface ModulesPageProps {
  navigate: (page: Page) => void;
}

export function ModulesPage({ navigate }: ModulesPageProps) {
  return (
    <div className="bg-white">
      <section className="py-20 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E54] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-6">Les modules sous évier</h1>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto">
            Compacts, silencieux et ultra-performants. Choisissez les modules adaptés à vos besoins.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {modules.map((module, index) => (
              <div 
                key={module.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-block px-4 py-2 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-sm mb-4">
                    {module.required ? 'Obligatoire' : 'Optionnel'}
                  </div>
                  <h2 className="text-3xl mb-4">{module.name}</h2>
                  <p className="text-xl text-gray-600 mb-6">{module.description}</p>

                  <div className="mb-6">
                    <h3 className="text-lg mb-3">Caractéristiques :</h3>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg mb-3">Spécifications techniques :</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(module.specs).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">{key}</p>
                          <p>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E54] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-6">Configurez votre système complet</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Choisissez les modules dont vous avez besoin
          </p>
          <button 
            onClick={() => navigate('configurator')}
            className="px-10 py-4 bg-white text-[#6B1E3E] rounded-full hover:bg-[#FAF8F5] hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            Configurer
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}