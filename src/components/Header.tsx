import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';

interface HeaderProps {
  navigate: (page: Page, params?: any) => void;
  currentPage: Page;
}

export function Header({ navigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MENU ULTRA-SIMPLIFIÉ 5 ÉLÉMENTS - OPTION B
  const menuStructure = {
    decouvrir: {
      label: 'Découvrir HYDRAL',
      sections: [
        {
          title: 'COMPRENDRE',
          items: [
            { label: 'Le concept 5-en-1', page: 'concept' as Page },
            { label: 'Utilisations quotidiennes', page: 'utilisations' as Page },
          ]
        },
        {
          title: 'BÉNÉFICES',
          items: [
            { label: 'Santé & eau pure', page: 'securite' as Page },
            { label: 'Impact environnemental', page: 'ecoresponsable' as Page },
            { label: 'Garantie & SAV', page: 'warranty' as Page },
          ]
        },
        {
          title: 'VALIDATION',
          items: [
            { label: 'Témoignages clients', page: 'testimonials' as Page },
            { label: 'Questions fréquentes', page: 'faq' as Page },
          ]
        }
      ]
    }
  };

  return (
    <>
      {/* Bandeau supérieur */}
      <div className="bg-[#6B1E3E] text-white text-center py-2 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-6">
          <span className="hidden md:inline">💰 Rentabilisé en 6 mois</span>
          <span className="hidden sm:inline">•</span>
          <span>Livraison sous 5 à 7 jours</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Noté 4,9/5 par nos clients</span>
        </div>
      </div>

      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => navigate('home')}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl tracking-[0.3em] font-light text-gray-900">
                HYDRAL
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-[1px] bg-[#6B1E3E]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Desktop Navigation - 5 ÉLÉMENTS */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* 1. Calculez vos économies - PRIORITÉ #1 */}
              <button
                onClick={() => navigate('savings')}
                className="px-4 py-2 text-sm font-medium text-[#6B1E3E] hover:text-[#6B1E3E]/80 transition-colors"
              >
                Calculez vos économies
              </button>

              {/* 2. Choisissez votre HYDRAL */}
              <button
                onClick={() => navigate('configurator')}
                className="px-4 py-2 text-sm font-medium text-[#6B1E3E] hover:text-[#6B1E3E]/80 transition-colors"
              >
                Choisissez votre HYDRAL
              </button>

              {/* 3. Pourquoi HYDRAL ? - Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('decouvrir')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="group flex items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  {menuStructure.decouvrir.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                
                <AnimatePresence>
                  {openDropdown === 'decouvrir' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-[280px]"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-2 overflow-hidden">
                        {menuStructure.decouvrir.sections.map((section, sectionIdx) => (
                          <div key={section.title} className={sectionIdx > 0 ? 'mt-2 pt-2 border-t border-gray-100' : ''}>
                            <div className="px-2 mb-1 text-[9px] font-bold tracking-wider text-gray-400">{section.title}</div>
                            {section.items.map((item, idx) => (
                              <motion.button
                                key={item.page}
                                onClick={() => {
                                  navigate(item.page);
                                  setOpenDropdown(null);
                                }}
                                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700 hover:text-gray-900"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03 }}
                              >
                                {item.label}
                              </motion.button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Prix & Abonnements */}
              <button
                onClick={() => navigate('subscriptions')}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Prix & Abonnements
              </button>

              {/* 5. Boutique */}
              <button
                onClick={() => navigate('shop')}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Boutique
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <motion.button
                onClick={() => setCartDrawerOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B1E3E] text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[calc(theme(spacing.20)+2.5rem)] left-0 right-0 bg-white border-b border-gray-200 z-40 lg:hidden overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              {/* Calculez vos économies - PRIORITÉ #1 MOBILE */}
              <motion.button
                onClick={() => {
                  navigate('savings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-5 py-4 rounded-xl gradient-bordeaux text-white shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="font-medium text-lg">💰 Calculez vos économies</div>
                <div className="text-sm text-white/90">Combien allez-vous économiser ?</div>
              </motion.button>

              {/* Configurator CTA */}
              <motion.button
                onClick={() => {
                  navigate('configurator');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-[#6B1E3E]/10 border border-[#6B1E3E]/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 }}
              >
                <div className="font-medium text-[#6B1E3E]">Choisissez votre HYDRAL</div>
                <div className="text-xs text-[#6B1E3E]/70">Configurez votre robinet sur mesure</div>
              </motion.button>

              {/* Pourquoi HYDRAL items */}
              {menuStructure.decouvrir.sections.map((section, sectionIdx) => (
                <div key={section.title} className="mt-3">
                  <div className="px-3 mb-1 text-[10px] font-bold tracking-wider text-gray-400">{section.title}</div>
                  {section.items.map((link, itemIdx) => (
                    <motion.button
                      key={link.page}
                      onClick={() => {
                        navigate(link.page);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIdx * 3 + itemIdx + 2) * 0.03 }}
                    >
                      <div className="font-medium text-gray-900">{link.label}</div>
                    </motion.button>
                  ))}
                </div>
              ))}

              {/* Prix & Abonnements */}
              <motion.button
                onClick={() => {
                  navigate('subscriptions');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (menuStructure.decouvrir.sections.reduce((acc, section) => acc + section.items.length, 0) + 2) * 0.03 }}
              >
                <div className="font-medium text-gray-900">Prix & Abonnements</div>
                <div className="text-xs text-gray-500">490€ + 59-139€/an sans engagement</div>
              </motion.button>

              {/* Boutique */}
              <motion.button
                onClick={() => {
                  navigate('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (menuStructure.decouvrir.sections.reduce((acc, section) => acc + section.items.length, 0) + 2) * 0.03 }}
              >
                <div className="font-medium text-gray-900">Boutique</div>
                <div className="text-xs text-gray-500">Filtres, CO₂ et accessoires</div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        navigate={navigate}
      />
    </>
  );
}