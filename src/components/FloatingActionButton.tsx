import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Calculator, ShoppingCart, Phone, Mail, HelpCircle } from 'lucide-react';
import { Page } from '../App';

interface FloatingActionButtonProps {
  navigate: (page: Page) => void;
  onOpenChat?: () => void;
}

export function FloatingActionButton({ navigate, onOpenChat }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const actions = [
    {
      icon: Calculator,
      label: 'Calculer mes économies',
      color: 'from-[#6B1E3E] to-[#8B2E4E]',
      textColor: 'text-white',
      action: () => {
        navigate('savings');
        setIsOpen(false);
      }
    },
    {
      icon: MessageCircle,
      label: 'Chat en direct',
      color: 'from-green-600 to-green-700',
      textColor: 'text-white',
      action: () => {
        if (onOpenChat) {
          onOpenChat();
        }
        setIsOpen(false);
      }
    },
    {
      icon: ShoppingCart,
      label: 'Configurer mon robinet',
      color: 'from-purple-600 to-purple-700',
      textColor: 'text-white',
      action: () => {
        navigate('configurator');
        setIsOpen(false);
      }
    },
    {
      icon: Phone,
      label: 'Appeler un conseiller',
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-white',
      action: () => {
        window.location.href = 'tel:+33612345678';
        setIsOpen(false);
      }
    },
    {
      icon: Mail,
      label: 'Envoyer un email',
      color: 'from-gray-600 to-gray-700',
      textColor: 'text-white',
      action: () => {
        window.location.href = 'mailto:contact@hydral.fr';
        setIsOpen(false);
      }
    },
    {
      icon: HelpCircle,
      label: 'Aide & FAQ',
      color: 'from-orange-600 to-orange-700',
      textColor: 'text-white',
      action: () => {
        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[60] hidden md:block">
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 items-end mb-2 pointer-events-none"
          >
            {actions.map((action, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ 
                  delay: idx * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
                className="flex items-center gap-3 group pointer-events-auto"
              >
                {/* Label */}
                <motion.div
                  whileHover={{ scale: 1.05, x: -5 }}
                  className="px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    {action.label}
                  </span>
                </motion.div>

                {/* Button */}
                <motion.button
                  onClick={action.action}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${action.color} ${action.textColor} shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow`}
                >
                  <action.icon className="w-6 h-6" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-5 right-20 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          >
            Aide
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB - TOUJOURS CLIQUABLE */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative z-10 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isOpen
            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white'
            : 'bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </motion.div>
      </motion.button>

      {/* Pulse effect when closed */}
      {!isOpen && (
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#6B1E3E] -z-10 pointer-events-none"
        />
      )}
    </div>
  );
}