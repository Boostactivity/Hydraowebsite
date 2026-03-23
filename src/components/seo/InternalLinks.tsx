import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Page } from '../../App';

interface InternalLink {
  page: Page;
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface InternalLinksProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  variant?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}

export function InternalLinks({ 
  currentPage, 
  navigate, 
  variant = 'horizontal',
  className = '' 
}: InternalLinksProps) {
  // Maillage interne intelligent selon la page
  const linkStrategy: Record<Page, InternalLink[]> = {
    'home': [
      { page: 'savings', label: 'Calculateur d\'économies', description: 'Estimez vos économies en 2 min' },
      { page: 'concept', label: 'Le Concept 5-en-1', description: 'Découvrez la technologie' },
      { page: 'testimonials', label: 'Témoignages clients', description: '523 avis vérifiés 4.9/5' },
      { page: 'configurator', label: 'Choisir mon HYDRAO', description: 'Personnalisez votre robinet' }
    ],
    'concept': [
      { page: 'gamme', label: 'Voir la gamme', description: 'Tous nos modèles' },
      { page: 'avantages', label: 'Les avantages', description: 'Santé, économies, écologie' },
      { page: 'savings', label: 'Calculez vos économies', description: 'Simulation gratuite' },
      { page: 'configurator', label: 'Configurateur', description: 'Créer mon HYDRAO' }
    ],
    'gamme': [
      { page: 'product', label: 'Robinet 5-en-1', description: 'Le modèle phare' },
      { page: 'finitions', label: 'Finitions premium', description: 'Chrome, Noir, Or' },
      { page: 'modules', label: 'Modules & Options', description: 'Personnalisez' },
      { page: 'configurator', label: 'Configurer', description: 'Créer mon robinet' }
    ],
    'product': [
      { page: 'configurator', label: 'Configurer ce modèle', description: 'Personnalisez maintenant' },
      { page: 'savings', label: 'Simuler mes économies', description: 'Combien vais-je économiser ?' },
      { page: 'installers', label: 'Trouver un installateur', description: 'Installation pro' },
      { page: 'testimonials', label: 'Avis clients', description: '4.9/5 - 523 avis' }
    ],
    'configurator': [
      { page: 'savings', label: 'Calculer mes économies', description: 'ROI garanti' },
      { page: 'installers', label: 'Installation pro', description: 'Trouvez un installateur' },
      { page: 'faq', label: 'Questions fréquentes', description: 'Toutes vos réponses' }
    ],
    'savings': [
      { page: 'configurator', label: 'Choisir mon HYDRAO', description: 'Passer à l\'action' },
      { page: 'ecoresponsable', label: 'Impact écologique', description: '85% CO2 en moins' },
      { page: 'testimonials', label: 'Témoignages ROI', description: 'Retours d\'expérience' },
      { page: 'subscriptions', label: 'Abonnements', description: 'Filtres & CO2 livrés' }
    ],
    'avantages': [
      { page: 'savings', label: 'Calculer les économies', description: 'Combien allez-vous économiser ?' },
      { page: 'ecoresponsable', label: 'Engagement écologique', description: 'Impact environnemental' },
      { page: 'securite', label: 'Sécurité & Certifications', description: 'Normes CE, NSF, ANSI' },
      { page: 'configurator', label: 'Configurer', description: 'Personnaliser mon HYDRAO' }
    ],
    'ecoresponsable': [
      { page: 'savings', label: 'Impact financier', description: 'Économies garanties' },
      { page: 'avantages', label: 'Tous les avantages', description: 'Santé, temps, confort' },
      { page: 'configurator', label: 'Passer au green', description: 'Configurer maintenant' }
    ],
    'securite': [
      { page: 'avantages', label: 'Avantages santé', description: 'Eau pure 99.9%' },
      { page: 'faq', label: 'FAQ Sécurité', description: 'Questions techniques' },
      { page: 'support', label: 'Support technique', description: 'Nous contacter' }
    ],
    'prix': [
      { page: 'savings', label: 'ROI Calculator', description: 'Rentabilisé en 6-12 mois' },
      { page: 'subscriptions', label: 'Abonnements', description: '59-139€/an' },
      { page: 'configurator', label: 'Configurer', description: 'Voir le prix final' },
      { page: 'installers', label: 'Installation', description: 'Devis gratuit' }
    ],
    'faq': [
      { page: 'support', label: 'Support client', description: 'Contactez-nous' },
      { page: 'installers', label: 'Installation', description: 'Trouvez un pro' },
      { page: 'configurator', label: 'Configurer', description: 'Créer mon HYDRAO' }
    ],
    'testimonials': [
      { page: 'savings', label: 'Calculer comme eux', description: 'Vos économies' },
      { page: 'configurator', label: 'Rejoignez-les', description: 'Configurer maintenant' },
      { page: 'objections', label: 'Questions fréquentes', description: 'Vos réponses' }
    ],
    'installers': [
      { page: 'configurator', label: 'Configurer d\'abord', description: 'Puis réserver installation' },
      { page: 'faq', label: 'FAQ Installation', description: 'Toutes vos questions' },
      { page: 'support', label: 'Support', description: 'Assistance technique' }
    ],
    'subscriptions': [
      { page: 'savings', label: 'Économies totales', description: 'Calculez votre ROI' },
      { page: 'configurator', label: 'Configurer + Abonnement', description: 'Pack complet' },
      { page: 'faq', label: 'FAQ Abonnements', description: 'Questions courantes' }
    ],
    'objections': [
      { page: 'savings', label: 'Preuves chiffrées', description: 'Calculateur ROI' },
      { page: 'testimonials', label: 'Témoignages', description: 'Ils ont franchi le pas' },
      { page: 'configurator', label: 'Configurer', description: 'Essayez 60 jours' }
    ],
    // Default pour les autres pages
    'modules': [],
    'finitions': [],
    'utilisations': [],
    'cube': [],
    'inspiration': [],
    'support': [],
    'shop': [],
    'cart': [],
    'checkout': [],
    'legal': [],
    'mobile-demo': []
  };

  const links = linkStrategy[currentPage] || linkStrategy['home'];

  if (links.length === 0) return null;

  const renderLink = (link: InternalLink, index: number) => (
    <motion.button
      key={link.page}
      onClick={() => navigate(link.page)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#6B1E3E] transition-all text-left shadow-sm hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1 group-hover:text-[#6B1E3E] transition-colors">
            {link.label}
          </h4>
          <p className="text-sm text-gray-600">
            {link.description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#6B1E3E] group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </motion.button>
  );

  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-full" />
        <h3 className="text-xl font-medium text-gray-900">
          Découvrez aussi
        </h3>
      </div>

      {variant === 'horizontal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link, index) => renderLink(link, index))}
        </div>
      )}

      {variant === 'vertical' && (
        <div className="space-y-3">
          {links.map((link, index) => renderLink(link, index))}
        </div>
      )}

      {variant === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, index) => renderLink(link, index))}
        </div>
      )}
    </div>
  );
}

// Composant simple de lien interne contextuel (dans le texte)
interface ContextualLinkProps {
  page: Page;
  navigate: (page: Page) => void;
  children: React.ReactNode;
  className?: string;
}

export function ContextualLink({ page, navigate, children, className = '' }: ContextualLinkProps) {
  return (
    <button
      onClick={() => navigate(page)}
      className={`inline-flex items-center gap-1 text-[#6B1E3E] hover:text-[#8B2E4E] font-medium underline underline-offset-4 decoration-[#6B1E3E]/30 hover:decoration-[#6B1E3E] transition-all ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}