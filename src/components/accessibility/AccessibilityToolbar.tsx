import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Accessibility,
  Type,
  Contrast,
  Eye,
  Keyboard,
  Volume2,
  X,
  Check,
  Settings
} from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useAccessibility();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 w-14 h-14 bg-[#6B1E3E] text-white rounded-full shadow-lg hover:bg-[#8B2E4E] transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Ouvrir les options d'accessibilité"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Toolbar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed right-6 bottom-24 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200"
              role="dialog"
              aria-label="Options d'accessibilité"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Accessibilité
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Font Size */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="w-5 h-5 text-[#6B1E3E]" />
                    <label className="font-semibold text-gray-900">
                      Taille du texte
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'normal', label: 'Normal', size: 'text-base' },
                      { value: 'large', label: 'Grand', size: 'text-lg' },
                      { value: 'xlarge', label: 'Très grand', size: 'text-xl' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSettings({ fontSize: option.value as any })}
                        className={`p-3 rounded-lg border-2 transition-all ${option.size} ${
                          settings.fontSize === option.value
                            ? 'border-[#6B1E3E] bg-purple-50 text-[#6B1E3E]'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                        aria-pressed={settings.fontSize === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Contrast className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Contraste élevé</div>
                      <div className="text-sm text-gray-600">Améliore la lisibilité</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.highContrast ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={settings.highContrast}
                    aria-label="Activer le contraste élevé"
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.highContrast ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Réduire les animations</div>
                      <div className="text-sm text-gray-600">Moins de mouvement</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.reducedMotion ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={settings.reducedMotion}
                    aria-label="Réduire les animations"
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.reducedMotion ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Focus Indicator */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Keyboard className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Indicateur de focus</div>
                      <div className="text-sm text-gray-600">Navigation clavier</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSettings({ focusIndicator: !settings.focusIndicator })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.focusIndicator ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={settings.focusIndicator}
                    aria-label="Afficher l'indicateur de focus"
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.focusIndicator ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Screen Reader Announcements */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Annonces lecteur d'écran</div>
                      <div className="text-sm text-gray-600">NVDA, JAWS, VoiceOver</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSettings({ 
                      screenReaderAnnouncements: !settings.screenReaderAnnouncements 
                    })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.screenReaderAnnouncements ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    role="switch"
                    aria-checked={settings.screenReaderAnnouncements}
                    aria-label="Activer les annonces lecteur d'écran"
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.screenReaderAnnouncements ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Conforme WCAG 2.1 niveau AA</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Skip to main content link
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#6B1E3E] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
    >
      Aller au contenu principal
    </a>
  );
}
