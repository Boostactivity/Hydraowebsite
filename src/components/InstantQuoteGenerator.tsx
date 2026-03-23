import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Mail, Share2, Check, ChevronRight, Sparkles, TrendingDown, Clock, Shield } from 'lucide-react';
import { Page } from '../App';

interface InstantQuoteGeneratorProps {
  navigate: (page: Page) => void;
}

type Configuration = {
  model: string;
  finish: string;
  subscription: string;
};

type QuoteData = {
  config: Configuration;
  pricing: {
    faucet: number;
    installation: number;
    subscription: number;
    total: number;
  };
  savings: {
    year1: number;
    year5: number;
    year10: number;
    roi: number;
  };
};

export function InstantQuoteGenerator({ navigate }: InstantQuoteGeneratorProps) {
  const [step, setStep] = useState<'form' | 'preview' | 'sent'>('form');
  const [email, setEmail] = useState('');
  const [householdSize, setHouseholdSize] = useState(4);
  const [showQuote, setShowQuote] = useState(false);

  // Configuration par défaut
  const defaultConfig: Configuration = {
    model: 'HYDRAO Premium 5-en-1',
    finish: 'Noir Mat',
    subscription: 'Formule Famille'
  };

  // Calculs
  const getQuoteData = (): QuoteData => {
    const savingsMap: Record<number, number> = {
      1: 380,
      2: 500,
      3: 750,
      4: 1000,
      5: 1200
    };
    
    const annualSavings = savingsMap[householdSize] || 1000;
    const faucetPrice = 490;
    const subscriptionPrice = householdSize <= 2 ? 59 : 139;
    const roi = Math.ceil(faucetPrice / (annualSavings / 12));

    return {
      config: defaultConfig,
      pricing: {
        faucet: faucetPrice,
        installation: 0, // Offerte
        subscription: subscriptionPrice,
        total: faucetPrice + subscriptionPrice
      },
      savings: {
        year1: Math.round(annualSavings - faucetPrice - subscriptionPrice),
        year5: Math.round((annualSavings * 5) - faucetPrice - (subscriptionPrice * 5)),
        year10: Math.round((annualSavings * 10) - faucetPrice - (subscriptionPrice * 10)),
        roi
      }
    };
  };

  const quoteData = getQuoteData();

  const handleGenerateQuote = () => {
    setStep('preview');
    setTimeout(() => setShowQuote(true), 100);
  };

  const handleSendEmail = () => {
    // Simulation envoi email
    setTimeout(() => {
      setStep('sent');
    }, 1000);
  };

  const handleDownloadPDF = () => {
    // Simulation download PDF
    alert('Téléchargement du devis en cours...');
  };

  const householdOptions = [
    { size: 1, label: 'Solo', emoji: '👤' },
    { size: 2, label: 'Couple', emoji: '👥' },
    { size: 4, label: 'Famille', emoji: '👨‍👩‍👧‍👦' },
    { size: 5, label: 'Famille+', emoji: '👨‍👩‍👧‍👧' }
  ];

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
            <FileText className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Devis instantané</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Votre devis personnalisé
            <span className="block text-[#6B1E3E]">en 30 secondes</span>
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Configuration, prix et économies détaillées • Export PDF professionnel
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border-2 border-gray-200"
            >
              {/* Sélection taille foyer */}
              <div className="mb-8">
                <label className="block text-lg text-gray-900 mb-4">
                  Votre foyer
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {householdOptions.map((option) => (
                    <motion.button
                      key={option.size}
                      onClick={() => setHouseholdSize(option.size)}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        householdSize === option.size
                          ? 'border-[#6B1E3E] bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white shadow-lg'
                          : 'border-gray-200 hover:border-[#6B1E3E]/50 bg-white'
                      }`}
                    >
                      <div className="text-4xl mb-2">{option.emoji}</div>
                      <div className={`font-medium ${householdSize === option.size ? 'text-white' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="mb-8">
                <label className="block text-lg text-gray-900 mb-4">
                  Votre email (optionnel)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.fr"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#6B1E3E] focus:outline-none transition-colors text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Pour recevoir votre devis par email
                </p>
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleGenerateQuote}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Générer mon devis personnalisé
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: showQuote ? 1 : 0, scale: showQuote ? 1 : 0.95 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden"
            >
              {/* Header Devis */}
              <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-3xl mb-2">HYDRAO</h3>
                    <p className="text-white/80">Devis personnalisé</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/70 mb-1">N° Devis</div>
                    <div className="text-lg font-mono">HYD-2024-{Math.floor(Math.random() * 10000)}</div>
                  </div>
                </div>
                <div className="text-sm text-white/70">
                  Valide 30 jours • {new Date().toLocaleDateString('fr-FR')}
                </div>
              </div>

              {/* Contenu Devis */}
              <div className="p-8 lg:p-12">
                {/* Configuration */}
                <div className="mb-8">
                  <h4 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#6B1E3E]" />
                    Votre configuration
                  </h4>
                  <div className="bg-[#FAF8F5] rounded-2xl p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modèle</span>
                      <span className="text-gray-900 font-medium">{quoteData.config.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finition</span>
                      <span className="text-gray-900 font-medium">{quoteData.config.finish}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Abonnement</span>
                      <span className="text-gray-900 font-medium">{quoteData.config.subscription}</span>
                    </div>
                  </div>
                </div>

                {/* Tarification */}
                <div className="mb-8">
                  <h4 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-[#6B1E3E]" />
                    Tarification
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Robinet HYDRAO 5-en-1</span>
                      <span className="text-xl text-gray-900">{quoteData.pricing.faucet}€</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Installation professionnelle</span>
                      <div className="text-right">
                        <span className="text-gray-400 line-through mr-2">150€</span>
                        <span className="text-green-600 font-medium">OFFERT</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-700">Abonnement (1ère année)</span>
                      <span className="text-xl text-gray-900">{quoteData.pricing.subscription}€</span>
                    </div>
                    <div className="flex justify-between items-center py-4 bg-gradient-to-r from-[#6B1E3E]/5 to-[#8B2E4E]/5 rounded-2xl px-4 mt-4">
                      <span className="text-lg font-medium text-gray-900">Total première année</span>
                      <span className="text-3xl text-[#6B1E3E]">{quoteData.pricing.total}€</span>
                    </div>
                  </div>
                </div>

                {/* Économies projetées */}
                <div className="mb-8">
                  <h4 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#6B1E3E]" />
                    Vos économies projetées
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-[#E8D5DC]/30 to-white p-6 rounded-2xl border border-gray-200 text-center">
                      <div className="text-sm text-gray-600 mb-2">Année 1</div>
                      <div className="text-3xl text-[#6B1E3E] mb-1">
                        {quoteData.savings.year1 > 0 ? '+' : ''}{quoteData.savings.year1}€
                      </div>
                      <div className="text-xs text-gray-500">ROI en {quoteData.savings.roi} mois</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#E8D5DC]/30 to-white p-6 rounded-2xl border border-gray-200 text-center">
                      <div className="text-sm text-gray-600 mb-2">5 ans</div>
                      <div className="text-3xl text-[#6B1E3E] mb-1">+{quoteData.savings.year5}€</div>
                      <div className="text-xs text-gray-500">Gains nets cumulés</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-white p-6 rounded-2xl border border-[#D4AF37]/30 text-center">
                      <div className="text-sm text-gray-600 mb-2">10 ans</div>
                      <div className="text-3xl text-[#D4AF37] mb-1">+{quoteData.savings.year10}€</div>
                      <div className="text-xs text-gray-500">Total économisé</div>
                    </div>
                  </div>
                </div>

                {/* Garanties */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200 mb-8">
                  <h4 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Inclus dans votre offre
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Garantie 5 ans pièces et main d\'œuvre',
                      'Installation professionnelle offerte',
                      'SAV réactif sous 48h',
                      'Satisfait ou remboursé 30 jours'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <motion.button
                    onClick={() => navigate('configurator')}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-6 h-6" />
                    Commander maintenant
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      onClick={handleDownloadPDF}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger PDF
                    </motion.button>

                    <motion.button
                      onClick={handleSendEmail}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-all flex items-center justify-center gap-2"
                      disabled={!email}
                    >
                      <Mail className="w-5 h-5" />
                      Envoyer par email
                    </motion.button>
                  </div>

                  <motion.button
                    onClick={() => setStep('form')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 text-gray-600 hover:text-[#6B1E3E] transition-colors"
                  >
                    ← Modifier mes informations
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'sent' && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-12 text-center shadow-xl border-2 border-green-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-3xl text-gray-900 mb-4">Devis envoyé !</h3>
              <p className="text-xl text-gray-700 mb-8">
                Votre devis personnalisé a été envoyé à <span className="text-[#6B1E3E] font-medium">{email}</span>
              </p>

              <div className="space-y-4">
                <motion.button
                  onClick={() => navigate('configurator')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  Finaliser ma commande
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                <button
                  onClick={() => {
                    setStep('form');
                    setShowQuote(false);
                  }}
                  className="w-full py-3 text-gray-600 hover:text-[#6B1E3E] transition-colors"
                >
                  Générer un nouveau devis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
