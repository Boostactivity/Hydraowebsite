import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, ArrowLeft, Home, Wrench, Clock, Shield, CheckCircle2, HelpCircle } from 'lucide-react';

interface InstallationWizardProps {
  className?: string;
  onComplete?: (result: InstallationResult) => void;
}

interface InstallationResult {
  compatible: boolean;
  installationType: 'simple' | 'standard' | 'complex';
  estimatedTime: string;
  estimatedCost: number;
  requirements: string[];
}

export function InstallationWizard({ className = '', onComplete }: InstallationWizardProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<InstallationResult | null>(null);

  const questions = [
    {
      id: 'kitchen_type',
      question: 'Quel type de cuisine avez-vous ?',
      icon: Home,
      options: [
        { value: 'modern', label: 'Cuisine moderne (moins de 10 ans)', image: '🏠' },
        { value: 'standard', label: 'Cuisine standard (10-20 ans)', image: '🏡' },
        { value: 'old', label: 'Cuisine ancienne (plus de 20 ans)', image: '🏚️' }
      ]
    },
    {
      id: 'sink_holes',
      question: 'Combien de trous a votre évier ?',
      icon: Wrench,
      options: [
        { value: '1', label: '1 trou (robinet actuel)', image: '⚫' },
        { value: '2', label: '2 trous (robinet + douchette)', image: '⚫⚫' },
        { value: '3+', label: '3 trous ou plus', image: '⚫⚫⚫' },
        { value: 'none', label: 'Pas de trou libre', image: '❓' }
      ]
    },
    {
      id: 'space_under_sink',
      question: 'Avez-vous de l\'espace sous l\'évier ?',
      icon: Home,
      options: [
        { value: 'large', label: 'Beaucoup d\'espace (> 60cm largeur)', image: '📦📦📦' },
        { value: 'medium', label: 'Espace moyen (40-60cm)', image: '📦📦' },
        { value: 'small', label: 'Peu d\'espace (< 40cm)', image: '📦' }
      ]
    },
    {
      id: 'water_pressure',
      question: 'Votre pression d\'eau est-elle correcte ?',
      icon: Wrench,
      options: [
        { value: 'good', label: 'Oui, pression normale', image: '💧💧💧' },
        { value: 'low', label: 'Pression faible', image: '💧' },
        { value: 'unknown', label: 'Je ne sais pas', image: '❓' }
      ]
    },
    {
      id: 'electrical_outlet',
      question: 'Y a-t-il une prise électrique sous l\'évier ?',
      icon: Shield,
      options: [
        { value: 'yes', label: 'Oui, prise disponible', image: '🔌' },
        { value: 'nearby', label: 'Prise à proximité (< 2m)', image: '🔌➡️' },
        { value: 'no', label: 'Pas de prise', image: '❌' }
      ]
    }
  ];

  const calculateResult = (finalAnswers: Record<string, any>): InstallationResult => {
    let complexity = 0;
    let requirements: string[] = [];

    // Calcul complexité
    if (finalAnswers.kitchen_type === 'old') complexity += 2;
    if (finalAnswers.sink_holes === 'none') {
      complexity += 3;
      requirements.push('Perçage d\'un trou dans l\'évier');
    }
    if (finalAnswers.space_under_sink === 'small') {
      complexity += 1;
      requirements.push('Installation compacte requise');
    }
    if (finalAnswers.water_pressure === 'low') {
      complexity += 1;
      requirements.push('Vérification pression d\'eau');
    }
    if (finalAnswers.electrical_outlet === 'no') {
      complexity += 2;
      requirements.push('Installation prise électrique');
    }

    let installationType: 'simple' | 'standard' | 'complex';
    let estimatedTime: string;
    let estimatedCost: number;

    if (complexity <= 2) {
      installationType = 'simple';
      estimatedTime = '1-2 heures';
      estimatedCost = 0; // Inclus
    } else if (complexity <= 5) {
      installationType = 'standard';
      estimatedTime = '2-3 heures';
      estimatedCost = 0; // Inclus
    } else {
      installationType = 'complex';
      estimatedTime = '3-4 heures';
      estimatedCost = 150; // Travaux supplémentaires
    }

    if (requirements.length === 0) {
      requirements.push('Installation standard incluse');
    }

    return {
      compatible: true, // 99% des cuisines compatibles
      installationType,
      estimatedTime,
      estimatedCost,
      requirements
    };
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Dernière question - calculer résultat
      const finalResult = calculateResult(newAnswers);
      setResult(finalResult);
      onComplete?.(finalResult);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const resetWizard = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const currentQuestion = questions[step];
  const Icon = currentQuestion?.icon;

  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="section-container max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-orange-50 border-2 border-orange-200 rounded-2xl mb-8">
            <HelpCircle className="w-6 h-6 text-orange-600" />
            <span className="text-2xl text-orange-700 font-medium">"L'installation est compliquée ?"</span>
          </div>

          <h2 className="mb-6 text-gray-900">
            Vérifiez votre compatibilité
            <span className="block text-[#6B1E3E]">en 30 secondes</span>
          </h2>
          <p className="text-xl text-gray-600">
            99% des cuisines sont compatibles HYDRAL
          </p>
        </motion.div>

        {!result ? (
          /* Quiz en cours */
          <div className="bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border-2 border-gray-200 p-8 md:p-12">
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Question {step + 1} sur {questions.length}</span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E]"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <div className="text-center mb-10">
                  {Icon && (
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#6B1E3E]" />
                    </div>
                  )}
                  <h3 className="text-2xl text-gray-900 mb-2">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#6B1E3E]/50 hover:shadow-lg transition-all text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{option.image}</div>
                        <div className="flex-1">
                          <div className="text-lg font-medium text-gray-900 group-hover:text-[#6B1E3E] transition-colors">
                            {option.label}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#6B1E3E] group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                {step > 0 && (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#6B1E3E] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Question précédente
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Résultat */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 md:p-12">
              {/* Success badge */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl text-gray-900 mb-4">
                  ✅ Votre cuisine est compatible !
                </h3>
                <p className="text-xl text-gray-700">
                  HYDRAL peut être installé chez vous
                </p>
              </div>

              {/* Détails installation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <Clock className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
                  <div className="text-2xl font-light text-gray-900 mb-1">
                    {result.estimatedTime}
                  </div>
                  <div className="text-sm text-gray-600">Durée d'installation</div>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <Shield className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
                  <div className="text-2xl font-light text-gray-900 mb-1">
                    {result.installationType === 'simple' ? 'Simple' : result.installationType === 'standard' ? 'Standard' : 'Personnalisée'}
                  </div>
                  <div className="text-sm text-gray-600">Type d'installation</div>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <Wrench className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
                  <div className="text-2xl font-light text-gray-900 mb-1">
                    {result.estimatedCost === 0 ? 'Inclus' : `+${result.estimatedCost}€`}
                  </div>
                  <div className="text-sm text-gray-600">Coût installation</div>
                </div>
              </div>

              {/* Requis */}
              <div className="bg-white rounded-2xl p-6 mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Ce qui sera fait :</h4>
                <ul className="space-y-3">
                  {result.requirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: result.requirements.length * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Test complet après installation</span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (result.requirements.length + 1) * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Formation à l'utilisation</span>
                  </motion.li>
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all">
                  Réserver mon installation
                  <ArrowRight className="inline w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={resetWizard}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-all"
                >
                  Recommencer le test
                </button>
              </div>

              {/* Garantie */}
              <div className="mt-8 pt-8 border-t border-green-200 text-center">
                <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Installation garantie</span>
                </div>
                <p className="text-sm text-gray-600">
                  Si notre technicien constate une incompatibilité lors du rendez-vous, annulation gratuite et remboursement intégral
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trust badges */}
        {!result && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>99% de cuisines compatibles</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Installation par professionnel certifié</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Garantie 5 ans</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
