import { Page } from '../App';
import { InstallationSection } from '../components/sections/InstallationSection';
import { InstallationWizard } from '../components/objections/InstallationWizard';

interface InstallationPageProps {
  navigate: (page: Page) => void;
}

export function InstallationPage({ navigate }: InstallationPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="section-container text-center">
          <h1 className="mb-6 text-gray-900">
            Installation ultra-simple
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto font-light">
            Installez votre HYDRAO en 5 minutes, sans aucun outil. Même votre grand-mère peut le faire.
          </p>
        </div>
      </section>

      {/* Installation Section détaillée */}
      <InstallationSection navigate={navigate} />

      {/* Installation Wizard interactif */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900">Simulez votre installation</h2>
            <p className="text-lg text-[#8B7E74] font-light">
              Répondez à quelques questions pour obtenir un guide personnalisé
            </p>
          </div>
          <InstallationWizard />
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-white">
            Prêt à installer votre HYDRAO ?
          </h2>
          <p className="text-xl mb-8 text-white/90 font-light">
            Commandez maintenant et recevez-le chez vous en 48h
          </p>
          <button
            onClick={() => navigate('home')}
            className="bg-white text-[#6B1E3E] px-8 py-4 rounded-full hover:bg-[#FAF8F5] transition-all shadow-xl"
          >
            Commander maintenant
          </button>
        </div>
      </section>
    </div>
  );
}

export default InstallationPage;
