import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, Command } from 'lucide-react';

// Hook for keyboard shortcuts
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchesModifiers =
        (options.ctrl ? e.ctrlKey || e.metaKey : true) &&
        (options.shift ? e.shiftKey : !e.shiftKey) &&
        (options.alt ? e.altKey : !e.altKey);

      if (e.key.toLowerCase() === key.toLowerCase() && matchesModifiers) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, options]);
}

// Keyboard shortcuts overlay
export function KeyboardShortcutsOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  // Show shortcuts with ?
  useKeyboardShortcut('?', () => setIsOpen(true), { shift: true });

  const shortcuts = [
    { keys: ['?'], description: 'Afficher les raccourcis clavier' },
    { keys: ['Tab'], description: 'Naviguer vers l\'élément suivant' },
    { keys: ['Shift', 'Tab'], description: 'Naviguer vers l\'élément précédent' },
    { keys: ['Enter'], description: 'Activer l\'élément sélectionné' },
    { keys: ['Esc'], description: 'Fermer les dialogues/menus' },
    { keys: ['Ctrl', 'K'], description: 'Ouvrir la recherche' },
    { keys: ['Ctrl', 'B'], description: 'Ouvrir le panier' },
    { keys: ['Ctrl', 'H'], description: 'Retour à l\'accueil' },
    { keys: ['↑', '↓', '←', '→'], description: 'Naviguer dans les menus' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-8"
            role="dialog"
            aria-labelledby="shortcuts-title"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Keyboard className="w-6 h-6 text-purple-600" />
              </div>
              <h2 id="shortcuts-title" className="text-2xl font-bold text-gray-900">
                Raccourcis clavier
              </h2>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-gray-700">{shortcut.description}</span>
                  <div className="flex items-center gap-2">
                    {shortcut.keys.map((key, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span className="text-gray-400">+</span>}
                        <kbd className="px-3 py-1 bg-white border-2 border-gray-300 rounded-lg font-mono text-sm font-semibold text-gray-900 shadow-sm">
                          {key}
                        </kbd>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full px-6 py-3 bg-[#6B1E3E] text-white rounded-xl font-semibold hover:bg-[#8B2E4E] transition-colors"
            >
              Fermer (Esc)
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Focus trap for modals/dialogs
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [containerRef, isActive]);
}

// Roving tabindex for keyboard navigation in lists
export function useRovingTabIndex(
  itemsCount: number,
  onSelect: (index: number) => void
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setCurrentIndex((prev) => Math.min(prev + 1, itemsCount - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          setCurrentIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentIndex(itemsCount - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelect(currentIndex);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, itemsCount, onSelect]);

  return { currentIndex, setCurrentIndex };
}

// Focus visible styles
export const focusVisibleClasses = `
  focus:outline-none 
  focus-visible:ring-4 
  focus-visible:ring-purple-300 
  focus-visible:ring-offset-2
`;

// Keyboard accessible dropdown
interface KeyboardDropdownProps {
  trigger: React.ReactNode;
  items: Array<{ label: string; onClick: () => void }>;
  ariaLabel: string;
}

export function KeyboardAccessibleDropdown({ 
  trigger, 
  items, 
  ariaLabel 
}: KeyboardDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentIndex, setCurrentIndex } = useRovingTabIndex(
    items.length,
    (index) => {
      items[index].onClick();
      setIsOpen(false);
    }
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
            setCurrentIndex(0);
          }
        }}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={focusVisibleClasses}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50"
        >
          {items.map((item, index) => (
            <button
              key={index}
              role="menuitem"
              tabIndex={currentIndex === index ? 0 : -1}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                currentIndex === index ? 'bg-purple-50' : ''
              } ${focusVisibleClasses}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Skip links component
export function SkipLinks() {
  const links = [
    { href: '#main-content', label: 'Aller au contenu principal' },
    { href: '#navigation', label: 'Aller à la navigation' },
    { href: '#footer', label: 'Aller au pied de page' }
  ];

  return (
    <div className="sr-only focus-within:not-sr-only">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="absolute top-4 left-4 z-50 px-6 py-3 bg-[#6B1E3E] text-white rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

// Visual focus indicator component
export function FocusIndicator() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        .focus-visible *:focus-visible {
          outline: 3px solid #9333ea !important;
          outline-offset: 2px !important;
        }
        
        .focus-visible button:focus-visible,
        .focus-visible a:focus-visible,
        .focus-visible input:focus-visible,
        .focus-visible textarea:focus-visible,
        .focus-visible select:focus-visible {
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.3) !important;
        }

        .reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `
    }} />
  );
}
