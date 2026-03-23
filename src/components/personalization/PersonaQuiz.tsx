import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { usePersona, PERSONAS, Persona } from '../../context/PersonaContext';

export function PersonaQuiz() {
  const { showQuiz, setPersona, setShowQuiz } = usePersona();

  const handleSelectPersona = (personaId: Exclude<Persona, null>) => {
    setPersona(personaId);
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'persona_selected', {
        persona: personaId
      });
    }
  };

  const handleSkip = () => {
    setShowQuiz(false);
    localStorage.setItem('hydrao-persona-quiz-completed', 'true');
  };

  return (
    <AnimatePresence>
      {showQuiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Qui êtes-vous ?
                  </h2>
                  <p className="text-gray-600">
                    Aidez-nous à personnaliser votre expérience pour mieux répondre à vos besoins
                  </p>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Personas Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.values(PERSONAS) as Array<typeof PERSONAS[Exclude<Persona, null>]>).map((persona, index) => (
                <motion.button
                  key={persona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectPersona(persona.id)}
                  className="group relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-[#6B1E3E] transition-all text-left shadow-sm hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="text-5xl mb-4">
                    {persona.icon}
                  </div>

                  {/* Label */}
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors">
                    {persona.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {persona.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="space-y-2">
                    {persona.focusAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <Check className="w-3 h-3 text-[#6B1E3E]" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#6B1E3E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Vous pourrez changer ce choix à tout moment
                </p>
                <button
                  onClick={handleSkip}
                  className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Passer cette étape
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Petit badge pour afficher le persona actuel (dans le header par exemple)
export function PersonaBadge() {
  const { personaProfile, resetPersona } = usePersona();

  if (!personaProfile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-3 py-1.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-sm"
    >
      <span>{personaProfile.icon}</span>
      <span className="font-medium">{personaProfile.label}</span>
      <button
        onClick={resetPersona}
        className="ml-1 hover:bg-[#6B1E3E]/20 rounded-full p-0.5 transition-colors"
        title="Changer de profil"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}
