import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Phone, MessageCircle, ShoppingCart, Menu, X } from 'lucide-react';
import { Page } from '../App';

interface MobileQuickActionsProps {
  navigate: (page: Page) => void;
}

export function MobileQuickActions({ navigate }: MobileQuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Visible après 300px de scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    {
      icon: Calculator,
      label: 'Calculer économies',
      color: 'from-[#6B1E3E] to-[#8B2E4E]',
      action: () => navigate('savings')
    },
    {
      icon: ShoppingCart,
      label: 'Configurer',
      color: 'from-purple-600 to-purple-700',
      action: () => navigate('configurator')
    },
    {
      icon: Phone,
      label: 'Appeler',
      color: 'from-blue-600 to-blue-700',
      action: () => window.open('tel:+33612345678')
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'from-green-600 to-green-700',
      action: () => window.open('https://wa.me/33612345678')
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[45] md:hidden"
          >
            {/* Quick Actions Panel */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute bottom-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t-2 border-gray-200 shadow-2xl pb-2"
                >
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {actions.map((action, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          action.action();
                          setIsOpen(false);
                        }}
                        className={`flex flex-col items-center gap-2 p-4 bg-gradient-to-br ${action.color} text-white rounded-2xl shadow-lg active:scale-95 transition-transform`}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <div className="bg-white/95 backdrop-blur-lg border-t-2 border-gray-200 p-3">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-medium shadow-lg transition-all ${
                  isOpen 
                    ? 'bg-gray-200 text-gray-900' 
                    : 'bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {isOpen ? (
                  <>
                    <X className="w-5 h-5" />
                    <span>Fermer</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-5 h-5" />
                    <span>Actions rapides</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
