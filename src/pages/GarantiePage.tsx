import { Page } from '../App';
import { MoneyBackGuarantee } from '../components/sections/MoneyBackGuarantee';
import { Shield, CheckCircle, Lock, Award } from 'lucide-react';

interface GarantiePageProps {
  navigate: (page: Page) => void;
}

export function GarantiePage({ navigate }: GarantiePageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6B1E3E]/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-[#6B1E3E]" />
          </div>
          <h1 className="mb-6 text-gray-900">
            Votre tranquillité d'esprit
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto font-light">
            Un robinet conçu pour durer. Une garantie pour vous rassurer. Un support pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Money Back Guarantee Section */}
      <MoneyBackGuarantee navigate={navigate} />

      {/* Nos engagements - Subtil et rassurant */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl mx-auto">
          <h2 className="text-center mb-12 text-gray-900">Ce qui est inclus</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F5] p-8 rounded-2xl border-2 border-[#6B1E3E]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#6B1E3E]" />
                </div>
                <h3 className="text-gray-900">Garantie constructeur</h3>
              </div>
              <p className="text-[#8B7E74] font-light">
                2 ans sur l'ensemble du système. Fabrication européenne aux normes les plus strictes.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-2xl border-2 border-[#6B1E3E]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#6B1E3E]" />
                </div>
                <h3 className="text-gray-900">Paiement sécurisé</h3>
              </div>
              <p className="text-[#8B7E74] font-light">
                Toutes vos transactions sont cryptées. Aucune donnée bancaire n'est stockée.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-2xl border-2 border-[#6B1E3E]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#6B1E3E]" />
                </div>
                <h3 className="text-gray-900">Certifications</h3>
              </div>
              <p className="text-[#8B7E74] font-light">
                Conforme aux normes européennes CE. Testé dermatologiquement. Qualité premium garantie.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-2xl border-2 border-[#6B1E3E]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#6B1E3E]" />
                </div>
                <h3 className="text-gray-900">Support dédié</h3>
              </div>
              <p className="text-[#8B7E74] font-light">
                Une équipe à votre écoute pour toutes vos questions. Par email, téléphone ou chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-white">
            Commandez en toute confiance
          </h2>
          <p className="text-xl mb-8 text-white/90 font-light">
            30 jours pour essayer. Satisfait ou remboursé.
          </p>
          <button
            onClick={() => navigate('home')}
            className="bg-white text-[#6B1E3E] px-8 py-4 rounded-full hover:bg-[#FAF8F5] transition-all shadow-xl"
          >
            Découvrir HYDRAO
          </button>
        </div>
      </section>
    </div>
  );
}

export default GarantiePage;