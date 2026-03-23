import { Page } from '../App';
import { SmartProductRecommender } from '../components/SmartProductRecommender';
import { TooExpensiveSection } from '../components/objections/TooExpensiveSection';

interface ProduitsPageProps {
  navigate: (page: Page) => void;
}

export function ProduitsPage({ navigate }: ProduitsPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="section-container text-center">
          <h1 className="mb-6 text-gray-900">
            Nos robinets 5-en-1
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto font-light">
            Trouvez le robinet HYDRAO parfaitement adapté à vos besoins
          </p>
        </div>
      </section>

      {/* Smart Product Recommender */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-6xl mx-auto">
          <SmartProductRecommender />
        </div>
      </section>

      {/* Section "Trop cher ?" */}
      <TooExpensiveSection />

      {/* Comparaison avec la concurrence */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">
            Pourquoi choisir HYDRAO ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="mb-3 text-gray-900">Technologie unique</h3>
              <p className="text-[#8B7E74] font-light">
                Seul robinet 5-en-1 du marché : eau gazeuse, filtrée, chaude, froide, tempérée
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="mb-3 text-gray-900">Design premium</h3>
              <p className="text-[#8B7E74] font-light">
                Design minimaliste italien, disponible en chrome, noir mat, or rosé
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🇫🇷</div>
              <h3 className="mb-3 text-gray-900">Fabrication européenne</h3>
              <p className="text-[#8B7E74] font-light">
                Conçu et assemblé en Europe, garantie 2 ans, SAV en France
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-white">
            Prêt à équiper votre cuisine ?
          </h2>
          <p className="text-xl mb-8 text-white/90 font-light">
            Calculez vos économies et découvrez votre retour sur investissement
          </p>
          <button
            onClick={() => navigate('home')}
            className="bg-white text-[#6B1E3E] px-8 py-4 rounded-full hover:bg-[#FAF8F5] transition-all shadow-xl"
          >
            Calculer mes économies
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProduitsPage;
