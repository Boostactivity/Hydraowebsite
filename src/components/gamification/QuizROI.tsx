import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, TrendingUp, Award, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: number;
    feedback: string;
  }[];
}

interface QuizROIProps {
  onComplete?: (result: QuizResult) => void;
  className?: string;
}

interface QuizResult {
  profile: string;
  score: number;
  wastageLevel: 'low' | 'medium' | 'high';
  potentialSavings: number;
  recommendation: string;
}

export function QuizROI({ onComplete, className = '' }: QuizROIProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Combien de bouteilles d\'eau achetez-vous par semaine ?',
      options: [
        { text: '0-2 bouteilles', points: 0, feedback: 'Vous êtes déjà économe !' },
        { text: '3-5 bouteilles', points: 1, feedback: 'Impact modéré sur votre budget' },
        { text: '6-10 bouteilles', points: 2, feedback: 'Budget eau élevé !' },
        { text: 'Plus de 10 bouteilles', points: 3, feedback: 'Potentiel d\'économies énorme !' },
      ],
    },
    {
      id: 2,
      question: 'À quelle fréquence utilisez-vous une bouilloire ?',
      options: [
        { text: 'Rarement (moins de 1x/jour)', points: 0, feedback: 'Utilisation minimale' },
        { text: '1-2 fois par jour', points: 1, feedback: 'Usage modéré' },
        { text: '3-5 fois par jour', points: 2, feedback: 'Usage intensif' },
        { text: 'Plus de 5 fois par jour', points: 3, feedback: 'HYDRAO va changer votre vie !' },
      ],
    },
    {
      id: 3,
      question: 'Combien de personnes dans votre foyer ?',
      options: [
        { text: '1 personne', points: 0, feedback: 'Foyer individuel' },
        { text: '2 personnes', points: 1, feedback: 'Couple' },
        { text: '3-4 personnes', points: 2, feedback: 'Famille moyenne' },
        { text: '5 personnes ou plus', points: 3, feedback: 'Grande famille = grandes économies !' },
      ],
    },
    {
      id: 4,
      question: 'Quelle est votre priorité principale ?',
      options: [
        { text: 'Économies financières', points: 3, feedback: 'HYDRAO = 800€/an économisés' },
        { text: 'Protection environnement', points: 2, feedback: 'Évitez 2000+ bouteilles/an' },
        { text: 'Gain de temps', points: 2, feedback: 'Eau chaude en 3 secondes' },
        { text: 'Qualité de l\'eau', points: 1, feedback: 'Filtration premium 5 microns' },
      ],
    },
    {
      id: 5,
      question: 'Combien dépensez-vous mensuellement en eau/boissons ?',
      options: [
        { text: 'Moins de 30€', points: 0, feedback: 'Budget bas' },
        { text: '30-60€', points: 1, feedback: 'Budget moyen' },
        { text: '60-100€', points: 2, feedback: 'Budget élevé' },
        { text: 'Plus de 100€', points: 3, feedback: 'ROI HYDRAO ultra-rapide !' },
      ],
    },
  ];

  const calculateResult = (): QuizResult => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.reduce((sum, q) => sum + 3, 0);
    const percentage = (totalScore / maxScore) * 100;

    let profile = '';
    let wastageLevel: 'low' | 'medium' | 'high' = 'low';
    let potentialSavings = 0;
    let recommendation = '';

    if (percentage >= 75) {
      profile = 'Gaspilleur Avéré';
      wastageLevel = 'high';
      potentialSavings = 950;
      recommendation = 'HYDRAO est PARFAIT pour vous ! Vous économiserez 950€/an minimum. ROI en 6 mois.';
    } else if (percentage >= 50) {
      profile = 'Consommateur Modéré';
      wastageLevel = 'medium';
      potentialSavings = 650;
      recommendation = 'HYDRAO vous permettra d\'économiser 650€/an. ROI en 9 mois.';
    } else if (percentage >= 25) {
      profile = 'Économe Conscient';
      wastageLevel = 'medium';
      potentialSavings = 450;
      recommendation = 'Même économe, HYDRAO vous fera gagner 450€/an + confort maximal.';
    } else {
      profile = 'Minimaliste';
      wastageLevel = 'low';
      potentialSavings = 300;
      recommendation = 'HYDRAO améliorera votre qualité de vie et vous fera économiser 300€/an.';
    }

    return { profile, score: totalScore, wastageLevel, potentialSavings, recommendation };
  };

  const handleAnswer = (points: number, optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      const newAnswers = [...answers, points];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        if (onComplete) {
          onComplete(calculateResult());
        }
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const result = showResult ? calculateResult() : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={`bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 ${className}`}>
      {!showResult ? (
        <>
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="w-16 h-16 bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <HelpCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Quel est votre profil gaspillage ?
            </h2>
            <p className="text-gray-600">
              Découvrez combien vous pourriez économiser avec HYDRAO
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-3 rounded-full bg-gradient-to-r from-[#6B1E3E] to-purple-600"
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.points, index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedOption === index
                        ? 'border-[#6B1E3E] bg-gradient-to-r from-[#6B1E3E]/10 to-purple-100'
                        : 'border-gray-200 hover:border-[#6B1E3E]/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{option.text}</span>
                      {selectedOption === index && (
                        <CheckCircle2 className="w-6 h-6 text-[#6B1E3E]" />
                      )}
                    </div>
                    {selectedOption === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 text-sm text-gray-600"
                      >
                        {option.feedback}
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        /* RESULTS */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                result!.wastageLevel === 'high'
                  ? 'bg-gradient-to-br from-red-500 to-orange-500'
                  : result!.wastageLevel === 'medium'
                  ? 'bg-gradient-to-br from-yellow-500 to-amber-500'
                  : 'bg-gradient-to-br from-green-500 to-emerald-500'
              }`}
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Votre profil : {result!.profile}
            </h2>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Score gaspillage</div>
                <div className="text-5xl font-bold text-gray-900 mb-1">
                  {result!.score}/{questions.length * 3}
                </div>
                <div className="text-sm text-gray-600">
                  {result!.wastageLevel === 'high' && 'Niveau élevé'}
                  {result!.wastageLevel === 'medium' && 'Niveau modéré'}
                  {result!.wastageLevel === 'low' && 'Niveau faible'}
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Économies potentielles</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                  {result!.potentialSavings}€
                </div>
                <div className="text-sm text-gray-600">par an avec HYDRAO</div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-6 text-white mb-6">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Notre recommandation
            </h3>
            <p className="text-lg opacity-95 mb-4">
              {result!.recommendation}
            </p>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-4 bg-white/10 rounded-lg p-4">
              <div>
                <div className="text-sm opacity-75">Économies mensuelles</div>
                <div className="font-bold text-xl">{Math.round(result!.potentialSavings / 12)}€</div>
              </div>
              <div>
                <div className="text-sm opacity-75">ROI HYDRAO</div>
                <div className="font-bold text-xl">
                  {Math.ceil((490 / result!.potentialSavings) * 12)} mois
                </div>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Ce que HYDRAO vous apporte aussi :
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Gain de temps</div>
                  <div className="text-sm text-gray-600">Eau chaude instantanée en 3 secondes</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Impact écologique</div>
                  <div className="text-sm text-gray-600">Évitez 2000+ bouteilles plastique/an</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Qualité premium</div>
                  <div className="text-sm text-gray-600">Filtration 5 microns + eau pétillante</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Refaire le quiz
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Choisir mon HYDRAO
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}