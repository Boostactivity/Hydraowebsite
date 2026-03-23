import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Users, Leaf, Heart, TrendingDown, ChevronRight, Zap, Target, Check } from 'lucide-react';
import { Page } from '../App';

interface SmartProductRecommenderProps {
  navigate: (page: Page) => void;
}

type UserProfile = {
  householdSize: number;
  priority: 'savings' | 'health' | 'ecology' | 'convenience';
  budget: 'flexible' | 'conscious';
};

type Recommendation = {
  title: string;
  subtitle: string;
  config: string;
  subscription: string;
  annualSavings: number;
  roi: number;
  highlight: string;
  reasons: string[];
  ctaText: string;
};

export function SmartProductRecommender({ navigate }: SmartProductRecommenderProps) {
  const [step, setStep] = useState<'questions' | 'result'>('questions');
  const [profile, setProfile] = useState<UserProfile>({
    householdSize: 4,
    priority: 'savings',
    budget: 'conscious'
  });
  const [showRecommendation, setShowRecommendation] = useState(false);

  const householdOptions = [
    { size: 1, label: 'Solo', emoji: '👤', desc: '1 personne' },
    { size: 2, label: 'Couple', emoji: '👥', desc: '2 personnes' },
    { size: 4, label: 'Famille', emoji: '👨‍👩‍👧‍👦', desc: '4 personnes' },
    { size: 5, label: 'Famille+', emoji: '👨‍👩‍👧‍👧', desc: '5+ personnes' }
  ];

  const priorities = [
    { 
      id: 'savings' as const, 
      label: 'Économiser', 
      icon: TrendingDown, 
      desc: 'Réduire mes dépenses',
      color: 'from-[#6B1E3E] to-[#8B2E4E]'
    },
    { 
      id: 'health' as const, 
      label: 'Santé', 
      icon: Heart, 
      desc: 'Eau ultra-pure',
      color: 'from-[#6B1E3E] to-[#8B2E4E]'
    },
    { 
      id: 'ecology' as const, 
      label: 'Écologie', 
      icon: Leaf, 
      desc: 'Impact environnemental',
      color: 'from-[#D4AF37] to-[#B8941F]'
    },
    { 
      id: 'convenience' as const, 
      label: 'Praticité', 
      icon: Zap, 
      desc: 'Gain de temps',
      color: 'from-[#6B1E3E] to-[#8B2E4E]'
    }
  ];

  // Algorithme de recommandation intelligent
  const getRecommendation = (): Recommendation => {
    const { householdSize, priority, budget } = profile;

    // Calcul des économies selon taille foyer
    const savingsMap: Record<number, number> = {
      1: 380,
      2: 500,
      4: 1000,
      5: 1200
    };
    const annualSavings = savingsMap[householdSize] || 1000;
    
    // Abonnement selon taille
    const subscriptionPrice = householdSize <= 2 ? 59 : 139;
    const subscriptionName = householdSize <= 2 ? 'Essentiel' : 'Famille';

    // ROI en mois
    const roi = Math.ceil(490 / (annualSavings / 12));

    // Recommandation selon priorité
    const recommendations: Record<typeof priority, Recommendation> = {
      savings: {
        title: 'Configuration Économies Maximales',
        subtitle: 'Optimisée pour votre retour sur investissement',
        config: 'HYDRAO Premium 5-en-1',
        subscription: `Formule ${subscriptionName} - ${subscriptionPrice}€/an`,
        annualSavings,
        roi,
        highlight: `Rentabilisé en ${roi} mois, puis ${annualSavings}€ d'économies nettes par an`,
        reasons: [
          `${annualSavings}€ économisés chaque année`,
          'Eau pétillante incluse (840€/an économisés)',
          'Filtration 5 étapes (pas d\'achat bouteilles)',
          `ROI ultra-rapide : ${roi} mois seulement`
        ],
        ctaText: 'Configurer ma solution économique'
      },
      health: {
        title: 'Configuration Santé Premium',
        subtitle: 'Eau ultra-pure pour toute la famille',
        config: 'HYDRAO Premium 5-en-1',
        subscription: `Formule ${subscriptionName} Pro - ${subscriptionPrice + 20}€/an`,
        annualSavings: annualSavings - 20,
        roi: roi + 1,
        highlight: '240 000 microplastiques évités par bouteille',
        reasons: [
          'Filtration professionnelle 5 étapes',
          'Élimine chlore, calcaire, métaux lourds',
          'Zéro microplastique (vs 240 000/bouteille)',
          'Filtres premium renforcés inclus'
        ],
        ctaText: 'Protéger ma santé maintenant'
      },
      ecology: {
        title: 'Configuration Impact Positif',
        subtitle: 'Maximisez votre contribution environnementale',
        config: 'HYDRAO Premium 5-en-1',
        subscription: `Formule ${subscriptionName} - ${subscriptionPrice}€/an`,
        annualSavings,
        roi,
        highlight: `${householdSize * 600} bouteilles plastique évitées par an`,
        reasons: [
          `${householdSize * 600} bouteilles évitées chaque année`,
          `${householdSize * 39} kg de CO₂ économisés`,
          `${householdSize * 21} kg de plastique non produit`,
          'Contribution écologique immédiate'
        ],
        ctaText: 'Réduire mon empreinte carbone'
      },
      convenience: {
        title: 'Configuration Confort Maximum',
        subtitle: 'Toutes les options pour un quotidien simplifié',
        config: 'HYDRAO Premium 5-en-1',
        subscription: `Formule ${subscriptionName} Confort - ${subscriptionPrice}€/an`,
        annualSavings,
        roi,
        highlight: '5 types d\'eau en 3 secondes',
        reasons: [
          'Eau bouillante instantanée (3 secondes)',
          'Eau pétillante illimitée',
          'Plus de courses d\'eau',
          'Plus d\'attente, plus de stockage'
        ],
        ctaText: 'Simplifier mon quotidien'
      }
    };

    return recommendations[priority];
  };

  const recommendation = getRecommendation();

  const handleGetRecommendation = () => {
    setStep('result');
    setTimeout(() => setShowRecommendation(true), 100);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
      <div className="section-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6 border border-[#6B1E3E]/20"
          >
            <Target className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Recommandation personnalisée</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Quelle configuration HYDRAO
            <span className="block text-[#6B1E3E]">est faite pour vous ?</span>
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            3 questions pour trouver votre solution optimale
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'questions' ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200"
            >
              {/* Question 1: Taille du foyer */}
              <div className="mb-10">
                <label className="flex items-center gap-3 text-gray-900 text-xl mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center">1</div>
                  <span>Combien êtes-vous à la maison ?</span>
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {householdOptions.map((option) => (
                    <motion.button
                      key={option.size}
                      onClick={() => setProfile(p => ({ ...p, householdSize: option.size }))}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative p-6 rounded-2xl border-2 transition-all ${
                        profile.householdSize === option.size
                          ? 'border-[#6B1E3E] bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white shadow-lg'
                          : 'border-gray-200 hover:border-[#6B1E3E]/50 bg-white'
                      }`}
                    >
                      <AnimatePresence>
                        {profile.householdSize === option.size && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Check className="w-4 h-4 text-[#6B1E3E]" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="text-4xl mb-2">{option.emoji}</div>
                      <div className={`font-medium mb-1 ${profile.householdSize === option.size ? 'text-white' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                      <div className={`text-sm ${profile.householdSize === option.size ? 'text-white/80' : 'text-gray-500'}`}>
                        {option.desc}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Question 2: Priorité */}
              <div className="mb-10">
                <label className="flex items-center gap-3 text-gray-900 text-xl mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center">2</div>
                  <span>Quelle est votre priorité ?</span>
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {priorities.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => setProfile(p => ({ ...p, priority: option.id }))}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-2xl border-2 transition-all ${
                          profile.priority === option.id
                            ? `border-[#6B1E3E] bg-gradient-to-br ${option.color} text-white shadow-lg`
                            : 'border-gray-200 hover:border-[#6B1E3E]/50 bg-white'
                        }`}
                      >
                        <AnimatePresence>
                          {profile.priority === option.id && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Check className="w-4 h-4 text-[#6B1E3E]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex items-center gap-4">
                          <Icon className={`w-10 h-10 ${profile.priority === option.id ? 'text-white' : 'text-[#6B1E3E]'}`} />
                          <div className="text-left">
                            <div className={`text-xl mb-1 ${profile.priority === option.id ? 'text-white' : 'text-gray-900'}`}>
                              {option.label}
                            </div>
                            <div className={`text-sm ${profile.priority === option.id ? 'text-white/80' : 'text-gray-600'}`}>
                              {option.desc}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Budget */}
              <div className="mb-10">
                <label className="flex items-center gap-3 text-gray-900 text-xl mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center">3</div>
                  <span>Votre approche budgétaire ?</span>
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => setProfile(p => ({ ...p, budget: 'conscious' }))}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      profile.budget === 'conscious'
                        ? 'border-[#6B1E3E] bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white shadow-lg'
                        : 'border-gray-200 hover:border-[#6B1E3E]/50 bg-white'
                    }`}
                  >
                    <AnimatePresence>
                      {profile.budget === 'conscious' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check className="w-4 h-4 text-[#6B1E3E]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <TrendingDown className={`w-10 h-10 mb-3 ${profile.budget === 'conscious' ? 'text-white' : 'text-[#6B1E3E]'}`} />
                    <div className={`text-xl mb-2 ${profile.budget === 'conscious' ? 'text-white' : 'text-gray-900'}`}>
                      ROI rapide
                    </div>
                    <div className={`text-sm ${profile.budget === 'conscious' ? 'text-white/80' : 'text-gray-600'}`}>
                      Je veux rentabiliser vite
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => setProfile(p => ({ ...p, budget: 'flexible' }))}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      profile.budget === 'flexible'
                        ? 'border-[#6B1E3E] bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white shadow-lg'
                        : 'border-gray-200 hover:border-[#6B1E3E]/50 bg-white'
                    }`}
                  >
                    <AnimatePresence>
                      {profile.budget === 'flexible' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check className="w-4 h-4 text-[#6B1E3E]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Sparkles className={`w-10 h-10 mb-3 ${profile.budget === 'flexible' ? 'text-white' : 'text-[#6B1E3E]'}`} />
                    <div className={`text-xl mb-2 ${profile.budget === 'flexible' ? 'text-white' : 'text-gray-900'}`}>
                      Qualité premium
                    </div>
                    <div className={`text-sm ${profile.budget === 'flexible' ? 'text-white/80' : 'text-gray-600'}`}>
                      Je privilégie l'excellence
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleGetRecommendation}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Voir ma recommandation personnalisée
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: showRecommendation ? 1 : 0, scale: showRecommendation ? 1 : 0.95 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-3xl p-10 lg:p-14 shadow-2xl border-4 border-[#D4AF37] relative overflow-hidden"
            >
              {/* Badge "Fait pour vous" */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -top-4 -right-4 w-32 h-32 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-medium text-sm shadow-2xl"
              >
                <div className="text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-1" />
                  <div>Fait pour<br/>vous</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl lg:text-4xl mb-2">{recommendation.title}</h3>
                <p className="text-xl text-white/80 mb-8">{recommendation.subtitle}</p>

                {/* Highlight principal */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="mb-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                >
                  <div className="text-sm uppercase tracking-wider text-white/70 mb-2">Votre avantage clé</div>
                  <div className="text-2xl">{recommendation.highlight}</div>
                </motion.div>

                {/* Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="text-sm uppercase tracking-wider text-white/70 mb-2">Configuration</div>
                    <div className="text-xl font-medium">{recommendation.config}</div>
                    <div className="text-sm text-white/80 mt-1">490€ TTC</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="text-sm uppercase tracking-wider text-white/70 mb-2">Abonnement recommandé</div>
                    <div className="text-xl font-medium">{recommendation.subscription}</div>
                    <div className="text-sm text-white/80 mt-1">ROI en {recommendation.roi} mois</div>
                  </div>
                </div>

                {/* Raisons */}
                <div className="mb-10">
                  <h4 className="text-xl mb-4">Pourquoi cette configuration ?</h4>
                  <div className="space-y-3">
                    {recommendation.reasons.map((reason, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/95">{reason}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => navigate('configurator')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-5 bg-white text-[#6B1E3E] rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    {recommendation.ctaText}
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    onClick={() => setStep('questions')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-all"
                  >
                    Modifier mes réponses
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
