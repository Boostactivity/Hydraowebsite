import React from 'react';
import { Page } from '../App';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

interface InspirationPageProps {
  navigate: (page: Page) => void;
}

export function InspirationPage({ navigate }: InspirationPageProps) {
  const useCases = [
    { title: 'Thé instantané', desc: 'Eau bouillante en 3 secondes pour votre thé parfait' },
    { title: 'Eau pétillante', desc: 'Fraîche et gazeuse à volonté, fini les bouteilles' },
    { title: 'Repas bébé', desc: 'Eau chaude sécurisée pour biberons et préparations' },
    { title: 'Cuisine rapide', desc: 'Pâtes, riz, soupes : gain de temps énorme' },
    { title: 'Cocktails', desc: 'Eau filtrée pour des boissons au goût parfait' },
    { title: 'Sport & hydratation', desc: 'Eau fraîche ou pétillante après l\'effort' }
  ];

  return (
    <div className="bg-white">
      <section className="py-20 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E54] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-6">Inspiration</h1>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto">
            Découvrez comment AQUAFUSION s'intègre dans votre quotidien
          </p>
        </div>
      </section>

      {/* Galerie cuisines */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Cuisines équipées AQUAFUSION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?w=800"
                  alt={`Cuisine ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white">Style {i === 1 ? 'Moderne' : i === 2 ? 'Classique' : i === 3 ? 'Industriel' : i === 4 ? 'Scandinave' : i === 5 ? 'Minimaliste' : 'Contemporary'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Cas d'usage quotidiens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-2xl mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E54] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-6">Et vous, comment l'utiliserez-vous ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Configurez votre AQUAFUSION et découvrez toutes ses possibilités
          </p>
          <button 
            onClick={() => navigate('configurator')}
            className="px-10 py-4 bg-white text-[#6B1E3E] rounded-full hover:bg-[#FAF8F5] hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            Configurer
          </button>
        </div>
      </section>
    </div>
  );
}