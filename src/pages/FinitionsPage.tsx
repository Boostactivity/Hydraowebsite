import React from 'react';
import { Page } from '../App';
import { finishes } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface FinitionsPageProps {
  navigate: (page: Page) => void;
}

export function FinitionsPage({ navigate }: FinitionsPageProps) {
  return (
    <div className="bg-white">
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-6">Finitions</h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
            8 finitions élégantes pour s'harmoniser parfaitement avec votre cuisine
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {finishes.map(finish => (
              <div key={finish.id} className="group">
                <div className={`aspect-square rounded-2xl ${finish.color} shadow-2xl mb-6 group-hover:scale-105 transition-transform`}></div>
                <h3 className="text-2xl mb-2">{finish.name}</h3>
                {finish.premium && (
                  <p className="text-[#D4AF37] mb-2">Finition Premium</p>
                )}
                <p className="text-gray-600 mb-4">
                  {finish.id === 'chrome' && 'Brillance éclatante, facile d\'entretien, classique intemporel'}
                  {finish.id === 'brushed' && 'Aspect mat élégant, résistant aux traces, style contemporain'}
                  {finish.id === 'black-matt' && 'Élégance moderne, design audacieux, ultra-tendance'}
                  {finish.id === 'white-matt' && 'Pureté minimaliste, lumière douce, style scandinave'}
                  {finish.id === 'gold' && 'Luxe raffiné, éclat chaleureux, prestige absolu'}
                  {finish.id === 'copper' && 'Chaleur authentique, caractère unique, tendance industrielle'}
                  {finish.id === 'champagne' && 'Élégance discrète, raffinement subtil, chic intemporel'}
                  {finish.id === 'gunmetal' && 'Modernité affirmée, robustesse apparente, style urbain'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">Toutes les finitions sont compatibles</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Quelle que soit la finition choisie, vous bénéficiez de la même qualité premium et des 5 types d'eau.
          </p>
          <button 
            onClick={() => navigate('configurator')}
            className="px-10 py-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-full hover:shadow-lg transition-all inline-flex items-center gap-3"
          >
            Configurer mon robinet
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}