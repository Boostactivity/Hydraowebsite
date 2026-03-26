import React from 'react';
import { Page } from '../App';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  navigate: (page: Page, params?: { legalType: 'mentions' | 'privacy' | 'cookies' | 'cgv' }) => void;
}

export function Footer({ navigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Produits',
      links: [
        { label: '3 modèles', page: 'gamme' as Page },
        { label: 'Finitions', page: 'finitions' as Page },
        { label: 'CUBE eau pétillante', page: 'cube' as Page },
        { label: 'Modules', page: 'modules' as Page },
        { label: 'Boutique', page: 'shop' as Page }
      ]
    },
    {
      title: 'Pourquoi HYDRAL ?',
      links: [
        { label: 'Le concept', page: 'concept' as Page },
        { label: 'Avantages', page: 'avantages' as Page },
        { label: 'Utilisations', page: 'utilisations' as Page },
        { label: 'Sécurité', page: 'securite' as Page },
        { label: 'Écoresponsable', page: 'ecoresponsable' as Page }
      ]
    },
    {
      title: 'Prix & Formules',
      links: [
        { label: 'Pourquoi 490€ ?', page: 'prix' as Page },
        { label: 'Formules d\'entretien', page: 'subscriptions' as Page },
        { label: 'FAQ', page: 'faq' as Page },
        { label: 'Configurateur', page: 'configurator' as Page }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Centre d\'aide', page: 'support' as Page },
        { label: 'Installateurs pro', page: 'installers' as Page },
        { label: 'Témoignages', page: 'testimonials' as Page },
        { label: 'Mentions légales', page: 'legal' as Page }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/hydral.fr' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/hydral.fr' },
    { icon: Twitter, label: 'Twitter', href: 'https://x.com/hydral_fr' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@hydral' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter */}
      <div className="border-b border-gray-100">
        <div className="section-container section-padding-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="mb-4">
              Restez informé
            </h3>
            <p className="text-[#8B7E74] mb-8 font-light">
              Recevez nos dernières actualités et offres exclusives
            </p>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-6 py-3.5 min-h-[48px] bg-[#FAF8F5] border-2 border-gray-200 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#6B1E3E] transition-colors"
                />
                <motion.button
                  className="px-8 py-3.5 min-h-[48px] gradient-bordeaux text-white rounded-full hover:shadow-lg hover:shadow-[#6B1E3E]/20 transition-all flex items-center justify-center gap-2 font-medium"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>S'inscrire</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* RGPD Checkbox - OBLIGATOIRE */}
              <label className="flex items-start gap-3 text-xs text-[#8B7E74] text-left cursor-pointer group">
                <input 
                  type="checkbox" 
                  required
                  className="mt-0.5 w-4 h-4 rounded border-2 border-gray-300 text-[#6B1E3E] focus:ring-2 focus:ring-[#6B1E3E]/20 cursor-pointer"
                />
                <span className="leading-relaxed">
                  J'accepte de recevoir des emails marketing de HYDRAL et confirme avoir lu la{' '}
                  <button 
                    onClick={() => navigate('legal', { legalType: 'privacy' })}
                    className="underline hover:text-[#6B1E3E] transition-colors"
                  >
                    politique de confidentialité
                  </button>.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Logo */}
          <div className="col-span-2">
            <h2 className="text-2xl tracking-[0.3em] mb-6 text-gray-900 font-light">
              HYDRAL
            </h2>
            <p className="text-[#8B7E74] font-light leading-relaxed mb-6">
              La révolution de l'eau dans votre cuisine
            </p>

            <div className="space-y-3 text-sm text-[#8B7E74]">
              <a href="tel:+33660968516" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+33 6 60 96 85 16</span>
              </a>
              <a href="mailto:contact@hydral.fr" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@hydral.fr</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>1 Square Maurice Thorez, 93200 Saint-Denis</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-sm mb-4 text-gray-900 font-medium">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      onClick={() => navigate(link.page)}
                      className="text-sm text-[#8B7E74] hover:text-gray-900 transition-colors font-light"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="flex justify-center gap-3 mb-12">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-[#8B7E74] hover:text-gray-900 hover:border-gray-900 transition-colors"
              whileHover={{ y: -2 }}
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8B7E74]">
            <p className="font-light">
              © {currentYear} HYDRAL. Tous droits réservés.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 font-light justify-center md:justify-end">
              <button onClick={() => navigate('legal', { legalType: 'mentions' })} className="hover:text-gray-900 transition-colors">
                Mentions légales
              </button>
              <button onClick={() => navigate('legal', { legalType: 'privacy' })} className="hover:text-gray-900 transition-colors">
                Confidentialité
              </button>
              <button onClick={() => navigate('legal', { legalType: 'cgv' })} className="hover:text-gray-900 transition-colors">
                CGV
              </button>
              <button onClick={() => navigate('legal', { legalType: 'cookies' })} className="hover:text-gray-900 transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}