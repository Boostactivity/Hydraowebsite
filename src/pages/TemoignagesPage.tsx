import { motion } from 'motion/react';
import { Page } from '../App';
import { SocialProofSlider } from '../components/SocialProofSlider';
import { VideoTestimonials } from '../components/VideoTestimonials';
import { ExpertEndorsementsSection } from '../components/social-proof/ExpertEndorsementsSection';
import { MediaSection } from '../components/MediaSection';
import { TrustBadges } from '../components/TrustBadges';

interface TemoignagesPageProps {
  navigate: (page: Page) => void;
}

export function TemoignagesPage({ navigate }: TemoignagesPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="section-container text-center">
          <h1 className="mb-6 text-gray-900">
            Plus de 10 000 familles conquises
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto font-light">
            Découvrez les témoignages authentiques de nos clients qui ont transformé leur quotidien avec HYDRAO
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <TrustBadges />
        </div>
      </section>

      {/* Témoignages Vidéo */}
      <VideoTestimonials />

      {/* Slider de témoignages texte */}
      <section className="section-padding bg-[#FAF8F5]">
        <div className="section-container max-w-6xl mx-auto">
          <SocialProofSlider />
        </div>
      </section>

      {/* Expert Endorsements */}
      <ExpertEndorsementsSection />

      {/* Media Coverage */}
      <MediaSection />

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-white">
            Rejoignez des milliers de foyers satisfaits
          </h2>
          <p className="text-xl mb-8 text-white/90 font-light">
            Transformez votre quotidien dès aujourd'hui
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

export default TemoignagesPage;
