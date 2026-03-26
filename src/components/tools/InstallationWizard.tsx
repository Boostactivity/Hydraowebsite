import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, Wrench, Droplet, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallationWizardProps {
  onComplete?: (recommendation: string) => void;
  onClose?: () => void;
}

export function InstallationWizard({ onComplete, onClose }: InstallationWizardProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    housingType: '',
    skills: '',
    currentSetup: '',
    urgency: '',
    budget: ''
  });

  const totalSteps = 5;

  const questions = [
    {
      id: 'housingType',
      question: 'Quel type de logement avez-vous ?',
      icon: <Home className="w-8 h-8" />,
      options: [
        { value: 'owner', label: 'Propriétaire', desc: 'Maison ou appartement dont vous êtes propriétaire' },
        { value: 'tenant', label: 'Locataire', desc: 'Appartement loué (autorisation propriétaire nécessaire)' },
        { value: 'new', label: 'Construction neuve', desc: 'Maison en construction ou rénovation complète' }
      ]
    },
    {
      id: 'skills',
      question: 'Quel est votre niveau en bricolage ?',
      icon: <Wrench className="w-8 h-8" />,
      options: [
        { value: 'expert', label: 'Expert', desc: 'J\'ai déjà installé des équipements sanitaires' },
        { value: 'intermediate', label: 'Intermédiaire', desc: 'Je bricole régulièrement (meubles, électricité simple)' },
        { value: 'beginner', label: 'Débutant', desc: 'Je préfère faire appel à un professionnel' }
      ]
    },
    {
      id: 'currentSetup',
      question: 'Quelle est votre installation actuelle ?',
      icon: <Droplet className="w-8 h-8" />,
      options: [
        { value: 'standard', label: 'Robinet standard', desc: 'Mitigeur classique avec eau chaude/froide' },
        { value: 'filtered', label: 'Robinet avec filtre', desc: 'Système de filtration déjà installé' },
        { value: 'none', label: 'Pas encore installé', desc: 'Cuisine neuve ou rénovation' }
      ]
    },
    {
      id: 'urgency',
      question: 'Dans quel délai souhaitez-vous l\'installation ?',
      icon: <Clock className="w-8 h-8" />,
      options: [
        { value: 'urgent', label: 'Cette semaine', desc: 'Installation urgente' },
        { value: 'soon', label: 'D\'ici 2 semaines', desc: 'Délai standard' },
        { value: 'flexible', label: 'Je suis flexible', desc: 'Pas de contrainte de temps' }
      ]
    },
    {
      id: 'budget',
      question: 'Budget installation souhaité ?',
      icon: <User className="w-8 h-8" />,
      options: [
        { value: 'diy', label: 'Je le fais moi-même', desc: 'Installation DIY avec notre guide vidéo' },
        { value: 'standard', label: 'Faites appel à votre plombier', desc: 'Votre plombier habituel peut l\'installer facilement' },
        { value: 'premium', label: 'Je ne sais pas encore', desc: 'Je verrai selon la difficulté' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    if (step < totalSteps) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const getRecommendation = () => {
    const { housingType, skills, currentSetup, urgency, budget } = answers;

    // Logic pour recommandation
    if (budget === 'diy' && (skills === 'expert' || skills === 'intermediate')) {
      return {
        type: 'diy',
        title: 'Installation DIY recommandée',
        desc: 'Vous avez les compétences nécessaires pour installer HYDRAL vous-même.',
        time: 'environ 1h',
        difficulty: 'Intermédiaire',
        cost: 'Gratuit',
        steps: [
          'Couper l\'arrivée d\'eau principale',
          'Démonter l\'ancien robinet',
          'Installer le module sous évier (COMBI/CUBE)',
          'Poser le robinet HYDRAL',
          'Raccorder les flexibles',
          'Tester et régler'
        ],
        warning: 'Assurez-vous d\'avoir les outils nécessaires : clé à molette, tournevis, téflon.'
      };
    } else if (skills === 'beginner' || budget === 'standard') {
      return {
        type: 'pro',
        title: 'Faites appel à un plombier de votre choix',
        desc: 'Le robinet HYDRAL est compatible avec toute plomberie standard. Votre plombier habituel peut l\'installer facilement.',
        time: 'environ 1h',
        difficulty: 'Standard',
        cost: 'Selon votre plombier',
        steps: [
          'Contactez votre plombier habituel',
          'Transmettez-lui notre guide d\'installation (fourni)',
          'Installation complète (environ 1h)',
          'Testez toutes les fonctions ensemble'
        ],
        warning: 'Notre guide d\'installation détaillé est fourni avec chaque robinet. Votre plombier n\'a pas besoin de formation spécifique.'
      };
    } else {
      return {
        type: 'diy',
        title: 'Installation simple à votre rythme',
        desc: 'Le robinet HYDRAL s\'installe simplement. Un bricoleur peut le faire en environ 1h.',
        time: 'environ 1h',
        difficulty: 'Accessible',
        cost: 'Gratuit',
        steps: [
          'Suivez notre guide vidéo étape par étape',
          'Couper l\'arrivée d\'eau',
          'Démonter l\'ancien robinet',
          'Installer le module + robinet HYDRAL',
          'Tester et profiter'
        ],
        warning: 'Vous pouvez aussi faire appel au plombier de votre choix si vous préférez.'
      };
    }
  };

  const recommendation = step > totalSteps ? getRecommendation() : null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Étape {Math.min(step, totalSteps)} sur {totalSteps}</span>
          <span className="text-sm text-[#6B1E3E]">{Math.round((Math.min(step, totalSteps) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90"
            initial={{ width: 0 }}
            animate={{ width: `${(Math.min(step, totalSteps) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step <= totalSteps ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6B1E3E]/10 text-[#6B1E3E] mb-6">
                {questions[step - 1].icon}
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">
                {questions[step - 1].question}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[step - 1].options.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(questions[step - 1].id, option.value)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    answers[questions[step - 1].id as keyof typeof answers] === option.value
                      ? 'border-[#6B1E3E] bg-[#6B1E3E]/5'
                      : 'border-gray-200 hover:border-[#6B1E3E]/40 hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg text-gray-900 mb-1">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.button>
              ))}
            </div>

            {step > 1 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour
                </button>
              </div>
            )}
          </motion.div>
        ) : recommendation ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">{recommendation.title}</h3>
              <p className="text-lg text-[#8B7E74]">{recommendation.desc}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-[#FAF8F5] rounded-xl">
                <div className="text-2xl text-[#6B1E3E] mb-1">{recommendation.time}</div>
                <div className="text-xs text-gray-600">Durée</div>
              </div>
              <div className="text-center p-4 bg-[#FAF8F5] rounded-xl">
                <div className="text-2xl text-[#6B1E3E] mb-1">{recommendation.difficulty}</div>
                <div className="text-xs text-gray-600">Niveau</div>
              </div>
              <div className="text-center p-4 bg-[#FAF8F5] rounded-xl">
                <div className="text-2xl text-[#6B1E3E] mb-1">{recommendation.cost}</div>
                <div className="text-xs text-gray-600">Coût</div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg text-gray-900 mb-4">Étapes d'installation</h4>
              <div className="space-y-3">
                {recommendation.steps.map((stepText, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{stepText}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">{recommendation.warning}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                onClick={() => {
                  setStep(1);
                  setAnswers({
                    housingType: '',
                    skills: '',
                    currentSetup: '',
                    urgency: '',
                    budget: ''
                  });
                }}
                className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-full hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Recommencer
              </motion.button>
              <motion.button
                onClick={() => onComplete && onComplete(recommendation.type)}
                className="flex-1 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-full shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir le guide d'installation
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
