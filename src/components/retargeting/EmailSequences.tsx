import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Clock, Zap, Gift, TrendingUp, Users, AlertCircle, Check, Send, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

interface EmailSequence {
  id: string;
  name: string;
  trigger: string;
  emails: Email[];
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  active: boolean;
}

interface Email {
  id: string;
  delay: string;
  subject: string;
  preview: string;
  cta: string;
  icon: React.ReactNode;
  color: string;
}

export function EmailSequences() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  const sequences: EmailSequence[] = [
    {
      id: 'cart-abandonment',
      name: language === 'fr' ? 'Panier Abandonné' : 'Cart Abandonment',
      trigger: language === 'fr' ? 'Produit ajouté au panier sans achat' : 'Product added to cart without purchase',
      active: true,
      stats: {
        sent: 1250,
        opened: 625,
        clicked: 250,
        converted: 125,
      },
      emails: [
        {
          id: '1',
          delay: '1h',
          subject: language === 'fr' 
            ? '🛒 Vous avez oublié quelque chose !' 
            : '🛒 You forgot something!',
          preview: language === 'fr'
            ? 'Votre HYDRAO vous attend ! Finalisez votre commande maintenant et économisez 2340€/an.'
            : 'Your HYDRAO is waiting! Complete your order now and save $2,550/year.',
          cta: language === 'fr' ? 'Finaliser ma commande' : 'Complete my order',
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'from-orange-400 to-red-500',
        },
        {
          id: '2',
          delay: '24h',
          subject: language === 'fr'
            ? '💰 Offre spéciale : -50€ sur votre HYDRAO'
            : '💰 Special offer: $55 off your HYDRAO',
          preview: language === 'fr'
            ? 'Dernière chance ! Utilisez le code SAVE50 pour économiser 50€ sur votre commande. Offre valable 48h.'
            : 'Last chance! Use code SAVE50 for $55 off your order. Valid for 48h.',
          cta: language === 'fr' ? 'Utiliser mon code' : 'Use my code',
          icon: <Gift className="w-5 h-5" />,
          color: 'from-purple-500 to-pink-600',
        },
        {
          id: '3',
          delay: '72h',
          subject: language === 'fr'
            ? '⏰ Votre panier expire dans 24h'
            : '⏰ Your cart expires in 24h',
          preview: language === 'fr'
            ? 'Dernières heures pour profiter de -50€ ! Plus de 12 000 foyers ont déjà fait le choix HYDRAO.'
            : 'Last hours for $55 off! Over 12,000 homes already chose HYDRAO.',
          cta: language === 'fr' ? 'Ne pas rater cette offre' : 'Don\'t miss this offer',
          icon: <Clock className="w-5 h-5" />,
          color: 'from-red-500 to-pink-600',
        },
      ],
    },
    {
      id: 'calculator-users',
      name: language === 'fr' ? 'Utilisateurs Calculateur' : 'Calculator Users',
      trigger: language === 'fr' ? 'Calculateur utilisé sans ajout panier' : 'Calculator used without adding to cart',
      active: true,
      stats: {
        sent: 850,
        opened: 510,
        clicked: 204,
        converted: 85,
      },
      emails: [
        {
          id: '1',
          delay: '2h',
          subject: language === 'fr'
            ? '💡 Vous économiserez 2340€/an avec HYDRAO'
            : '💡 You\'ll save $2,550/year with HYDRAO',
          preview: language === 'fr'
            ? 'Récapitulatif de vos économies + témoignages clients qui ont fait le même calcul que vous.'
            : 'Your savings summary + testimonials from customers who did the same calculation.',
          cta: language === 'fr' ? 'Voir mon calcul' : 'View my calculation',
          icon: <TrendingUp className="w-5 h-5" />,
          color: 'from-green-500 to-emerald-600',
        },
        {
          id: '2',
          delay: '48h',
          subject: language === 'fr'
            ? '🎁 Offre exclusive : -10% pour passage à l\'action'
            : '🎁 Exclusive offer: 10% off for taking action',
          preview: language === 'fr'
            ? 'Vous avez calculé vos économies, passez à l\'action ! -10% avec le code CALC10.'
            : 'You calculated your savings, take action! 10% off with code CALC10.',
          cta: language === 'fr' ? 'J\'en profite' : 'Get my discount',
          icon: <Gift className="w-5 h-5" />,
          color: 'from-blue-500 to-cyan-600',
        },
      ],
    },
    {
      id: 'checkout-abandonment',
      name: language === 'fr' ? 'Paiement Abandonné' : 'Checkout Abandonment',
      trigger: language === 'fr' ? 'Checkout commencé sans finalisation' : 'Checkout started without completion',
      active: true,
      stats: {
        sent: 450,
        opened: 315,
        clicked: 180,
        converted: 108,
      },
      emails: [
        {
          id: '1',
          delay: '30min',
          subject: language === 'fr'
            ? '❗ Un problème avec votre paiement ?'
            : '❗ Issue with your payment?',
          preview: language === 'fr'
            ? 'Nous sommes là pour vous aider ! Besoin d\'assistance pour finaliser votre commande ?'
            : 'We\'re here to help! Need assistance completing your order?',
          cta: language === 'fr' ? 'Finaliser maintenant' : 'Complete now',
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'from-red-500 to-orange-600',
        },
        {
          id: '2',
          delay: '6h',
          subject: language === 'fr'
            ? '💳 Paiement en 3× sans frais disponible'
            : '💳 Pay in 3 interest-free available',
          preview: language === 'fr'
            ? 'Facilitez votre achat ! Payez en 3× sans frais avec Klarna. 3 x 163€ au lieu de 490€.'
            : 'Make your purchase easier! Pay in 3 interest-free with Klarna. 3 x $178 instead of $535.',
          cta: language === 'fr' ? 'Payer en 3×' : 'Pay in 3',
          icon: <Gift className="w-5 h-5" />,
          color: 'from-pink-500 to-purple-600',
        },
      ],
    },
    {
      id: 'product-viewers',
      name: language === 'fr' ? 'Visiteurs Produit' : 'Product Viewers',
      trigger: language === 'fr' ? 'Page produit vue sans action' : 'Product page viewed without action',
      active: true,
      stats: {
        sent: 2100,
        opened: 840,
        clicked: 252,
        converted: 84,
      },
      emails: [
        {
          id: '1',
          delay: '24h',
          subject: language === 'fr'
            ? '✨ Découvrez pourquoi 12 000 foyers ont choisi HYDRAO'
            : '✨ Discover why 12,000 homes chose HYDRAO',
          preview: language === 'fr'
            ? 'Témoignages clients, comparatif avec la concurrence et garantie satisfait ou remboursé 30j.'
            : 'Customer testimonials, competitor comparison and 30-day money-back guarantee.',
          cta: language === 'fr' ? 'Lire les avis' : 'Read reviews',
          icon: <Users className="w-5 h-5" />,
          color: 'from-blue-500 to-purple-600',
        },
        {
          id: '2',
          delay: '96h',
          subject: language === 'fr'
            ? '🎯 Encore hésitant ? Parlons-en !'
            : '🎯 Still hesitating? Let\'s talk!',
          preview: language === 'fr'
            ? 'Réservez un appel gratuit de 15min avec un expert HYDRAO pour répondre à toutes vos questions.'
            : 'Book a free 15min call with a HYDRAO expert to answer all your questions.',
          cta: language === 'fr' ? 'Réserver mon appel' : 'Book my call',
          icon: <Calendar className="w-5 h-5" />,
          color: 'from-green-500 to-teal-600',
        },
      ],
    },
  ];

  const [selectedSequence, setSelectedSequence] = useState<EmailSequence>(sequences[0]);

  const calculateRate = (numerator: number, denominator: number) => {
    return denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Séquences Email Retargeting'}
            {language === 'en' && 'Email Retargeting Sequences'}
            {language === 'es' && 'Secuencias Email Retargeting'}
            {language === 'it' && 'Sequenze Email Retargeting'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Récupérez jusqu\'à 24% des visiteurs perdus'}
            {language === 'en' && 'Recover up to 24% of lost visitors'}
            {language === 'es' && 'Recupera hasta 24% de visitantes perdidos'}
            {language === 'it' && 'Recupera fino al 24% dei visitatori persi'}
          </p>
        </div>
      </div>

      {/* Sequence Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {sequences.map((sequence) => (
          <button
            key={sequence.id}
            onClick={() => setSelectedSequence(sequence)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedSequence.id === sequence.id
                ? 'border-[#6B1E3E] bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold text-gray-900 mb-1 text-sm">{sequence.name}</div>
            <div className="text-2xl font-bold text-[#6B1E3E]">
              {calculateRate(sequence.stats.converted, sequence.stats.sent)}%
            </div>
            <div className="text-xs text-gray-600">
              {language === 'fr' && 'conversion'}
              {language === 'en' && 'conversion'}
              {language === 'es' && 'conversión'}
              {language === 'it' && 'conversione'}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Sequence Details */}
      <motion.div
        key={selectedSequence.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Trigger */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">
              {language === 'fr' && 'Déclencheur'}
              {language === 'en' && 'Trigger'}
              {language === 'es' && 'Desencadenador'}
              {language === 'it' && 'Trigger'}
            </span>
          </div>
          <p className="text-blue-800">{selectedSequence.trigger}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Send className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {language === 'fr' && 'Envoyés'}
                {language === 'en' && 'Sent'}
                {language === 'es' && 'Enviados'}
                {language === 'it' && 'Inviati'}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{selectedSequence.stats.sent}</div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">
                {language === 'fr' && 'Ouverts'}
                {language === 'en' && 'Opened'}
                {language === 'es' && 'Abiertos'}
                {language === 'it' && 'Aperti'}
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{selectedSequence.stats.opened}</div>
            <div className="text-xs text-blue-700">
              {calculateRate(selectedSequence.stats.opened, selectedSequence.stats.sent)}%
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-600">
                {language === 'fr' && 'Clics'}
                {language === 'en' && 'Clicked'}
                {language === 'es' && 'Clics'}
                {language === 'it' && 'Clic'}
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-900">{selectedSequence.stats.clicked}</div>
            <div className="text-xs text-purple-700">
              {calculateRate(selectedSequence.stats.clicked, selectedSequence.stats.opened)}%
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {language === 'fr' && 'Convertis'}
                {language === 'en' && 'Converted'}
                {language === 'es' && 'Convertidos'}
                {language === 'it' && 'Convertiti'}
              </span>
            </div>
            <div className="text-2xl font-bold text-green-900">{selectedSequence.stats.converted}</div>
            <div className="text-xs text-green-700">
              {calculateRate(selectedSequence.stats.converted, selectedSequence.stats.sent)}%
            </div>
          </div>
        </div>

        {/* Email Timeline */}
        <div className="space-y-4">
          {selectedSequence.emails.map((email, index) => (
            <div key={email.id} className="relative">
              {/* Timeline connector */}
              {index < selectedSequence.emails.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 -z-10" />
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className={`w-12 h-12 bg-gradient-to-br ${email.color} rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                  {email.icon}
                </div>

                {/* Email card */}
                <div className="flex-1 bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-[#6B1E3E] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-600">
                          {language === 'fr' && 'Envoyé'}
                          {language === 'en' && 'Sent'}
                          {language === 'es' && 'Enviado'}
                          {language === 'it' && 'Inviato'}
                          {' '}{email.delay}
                          {' '}
                          {language === 'fr' && 'après déclenchement'}
                          {language === 'en' && 'after trigger'}
                          {language === 'es' && 'después del trigger'}
                          {language === 'it' && 'dopo il trigger'}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{email.subject}</h3>
                      <p className="text-sm text-gray-700 mb-3">{email.preview}</p>
                    </div>
                  </div>

                  <button className={`px-4 py-2 bg-gradient-to-br ${email.color} text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow`}>
                    {email.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            {language === 'fr' && 'Performance Globale'}
            {language === 'en' && 'Overall Performance'}
            {language === 'es' && 'Rendimiento Global'}
            {language === 'it' && 'Performance Globale'}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm opacity-90 mb-1">
                {language === 'fr' && 'Taux d\'ouverture'}
                {language === 'en' && 'Open rate'}
                {language === 'es' && 'Tasa de apertura'}
                {language === 'it' && 'Tasso di apertura'}
              </div>
              <div className="text-3xl font-bold">
                {calculateRate(selectedSequence.stats.opened, selectedSequence.stats.sent)}%
              </div>
              <div className="text-xs opacity-75 mt-1">
                {language === 'fr' && 'Benchmark e-commerce: 15-20%'}
                {language === 'en' && 'E-commerce benchmark: 15-20%'}
                {language === 'es' && 'Benchmark e-commerce: 15-20%'}
                {language === 'it' && 'Benchmark e-commerce: 15-20%'}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm opacity-90 mb-1">
                {language === 'fr' && 'Taux de clic'}
                {language === 'en' && 'Click rate'}
                {language === 'es' && 'Tasa de clic'}
                {language === 'it' && 'Tasso di clic'}
              </div>
              <div className="text-3xl font-bold">
                {calculateRate(selectedSequence.stats.clicked, selectedSequence.stats.opened)}%
              </div>
              <div className="text-xs opacity-75 mt-1">
                {language === 'fr' && 'Benchmark: 2-5%'}
                {language === 'en' && 'Benchmark: 2-5%'}
                {language === 'es' && 'Benchmark: 2-5%'}
                {language === 'it' && 'Benchmark: 2-5%'}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm opacity-90 mb-1">
                {language === 'fr' && 'Taux de conversion'}
                {language === 'en' && 'Conversion rate'}
                {language === 'es' && 'Tasa de conversión'}
                {language === 'it' && 'Tasso di conversione'}
              </div>
              <div className="text-3xl font-bold">
                {calculateRate(selectedSequence.stats.converted, selectedSequence.stats.sent)}%
              </div>
              <div className="text-xs opacity-75 mt-1">
                {language === 'fr' && 'Benchmark: 1-3%'}
                {language === 'en' && 'Benchmark: 1-3%'}
                {language === 'es' && 'Benchmark: 1-3%'}
                {language === 'it' && 'Benchmark: 1-3%'}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm opacity-90">
            {language === 'fr' && `Revenu généré: ${formatPrice(selectedSequence.stats.converted * 490)} • ROI: ${((selectedSequence.stats.converted * 490) / (selectedSequence.stats.sent * 0.5)).toFixed(0)}×`}
            {language === 'en' && `Revenue generated: ${formatPrice(selectedSequence.stats.converted * 490)} • ROI: ${((selectedSequence.stats.converted * 490) / (selectedSequence.stats.sent * 0.5)).toFixed(0)}×`}
            {language === 'es' && `Ingresos generados: ${formatPrice(selectedSequence.stats.converted * 490)} • ROI: ${((selectedSequence.stats.converted * 490) / (selectedSequence.stats.sent * 0.5)).toFixed(0)}×`}
            {language === 'it' && `Ricavi generati: ${formatPrice(selectedSequence.stats.converted * 490)} • ROI: ${((selectedSequence.stats.converted * 490) / (selectedSequence.stats.sent * 0.5)).toFixed(0)}×`}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
