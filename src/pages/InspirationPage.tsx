import React from 'react';
import { Page } from '../App';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { productImages, defaultImages } from '../assets/products';

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
    <div className="bg-[#FAF8F5]">
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="mb-8">
            <span className="block text-gray-900">Inspiration</span>
            <span className="block text-[#6B1E3E]">dans votre quotidien</span>
          </h1>
          <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
            Découvrez comment HYDRAL s'intègre dans votre quotidien
          </p>
        </div>
      </section>

      {/* Galerie cuisines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center mb-12 text-gray-900">Cuisines équipées HYDRAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { img: productImages['chrome'].faucet, style: 'Moderne' },
              { img: productImages['gold'].faucet, style: 'Classique' },
              { img: productImages['gunmetal'].faucet, style: 'Industriel' },
              { img: productImages['brushed'].faucet, style: 'Scandinave' },
              { img: productImages['black-matt'].faucet, style: 'Minimaliste' },
              { img: productImages['chrome'].sparkling, style: 'Contemporary' },
            ].map((item, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <ImageWithFallback
                  src={item.img}
                  alt={`Cuisine ${item.style}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white">Style {item.style}</p>
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
            Configurez votre HYDRAL et découvrez toutes ses possibilités
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