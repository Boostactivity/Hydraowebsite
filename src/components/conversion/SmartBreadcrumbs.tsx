import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Home } from 'lucide-react';
import { Page } from '../../App';

interface Breadcrumb {
  label: string;
  page: Page;
  icon?: any;
}

interface SmartBreadcrumbsProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  className?: string;
}

export function SmartBreadcrumbs({ currentPage, navigate, className = '' }: SmartBreadcrumbsProps) {
  const breadcrumbMap: Record<Page, Breadcrumb[]> = {
    home: [
      { label: 'Accueil', page: 'home', icon: Home }
    ],
    concept: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Comment ça marche', page: 'concept' }
    ],
    savings: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Calculateur d\'économies', page: 'savings' }
    ],
    configurator: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Calculateur', page: 'savings' },
      { label: 'Configurateur', page: 'configurator' }
    ],
    subscriptions: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Abonnements', page: 'subscriptions' }
    ],
    ecoresponsable: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Éco-responsable', page: 'ecoresponsable' }
    ],
    securite: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Sécurité & Santé', page: 'securite' }
    ],
    installation: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Installation', page: 'installation' }
    ],
    guarantees: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Garanties', page: 'guarantees' }
    ],
    support: [
      { label: 'Accueil', page: 'home', icon: Home },
      { label: 'Support', page: 'support' }
    ]
  };

  const breadcrumbs = breadcrumbMap[currentPage] || [{ label: 'Accueil', page: 'home', icon: Home }];
  const isHomePage = currentPage === 'home';

  // Don't show breadcrumbs on homepage
  if (isHomePage) return null;

  return (
    <nav className={`py-4 ${className}`}>
      <div className="section-container max-w-7xl mx-auto">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const Icon = crumb.icon;

            return (
              <li key={crumb.page} className="flex items-center gap-2">
                {idx > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}

                {isLast ? (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-900 font-medium"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {crumb.label}
                  </motion.span>
                ) : (
                  <motion.button
                    onClick={() => navigate(crumb.page)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#6B1E3E] transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {crumb.label}
                  </motion.button>
                )}
              </li>
            );
          })}
        </ol>

        {/* Schema.org BreadcrumbList for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbs.map((crumb, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: crumb.label,
                item: `https://hydral.fr/${crumb.page === 'home' ? '' : crumb.page}`
              }))
            })
          }}
        />
      </div>
    </nav>
  );
}
