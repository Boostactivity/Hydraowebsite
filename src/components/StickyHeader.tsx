import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Page } from '../App';

interface StickyHeaderProps {
  navigate: (page: Page) => void;
  cartItemCount: number;
}

export function StickyHeader({ navigate, cartItemCount }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Concept', page: 'concept' as Page },
    { label: 'Prix', page: 'subscriptions' as Page },
    { label: 'Installation', page: 'installation' as Page },
    { label: 'FAQ', page: 'faq' as Page }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => navigate('home')}
                className="text-2xl text-[#6B1E3E] hover:text-[#8B2E4E] transition-colors"
              >
                HYDRAO
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    className="text-sm text-gray-700 hover:text-[#6B1E3E] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* CTA + Cart */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('configurator')}
                  className="hidden sm:block px-6 py-2 gradient-bordeaux text-white rounded-full text-sm hover:shadow-lg transition-all"
                >
                  Commander
                </button>

                <button
                  onClick={() => navigate('cart')}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B1E3E] text-white text-xs rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden border-t border-gray-200 mt-3 pt-3"
                >
                  <div className="flex flex-col gap-3">
                    {navItems.map((item) => (
                      <button
                        key={item.page}
                        onClick={() => {
                          navigate(item.page);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 text-gray-700 hover:text-[#6B1E3E] transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        navigate('configurator');
                        setIsMobileMenuOpen(false);
                      }}
                      className="mt-2 px-6 py-3 gradient-bordeaux text-white rounded-full text-center"
                    >
                      Commander maintenant
                    </button>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
