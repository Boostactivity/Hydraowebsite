import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, TrendingDown, Award, Users, Clock, Shield, CheckCircle, DollarSign, Zap, Package, FileText, Calculator } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

export function B2BProgram() {
  const { language } = useLanguage();
  const { formatPrice, currency } = useCurrency();
  const [units, setUnits] = useState(10);
  const [showQuote, setShowQuote] = useState(false);

  const calculateSavings = (units: number) => {
    const annualBottlesCost = 2340; // per unit
    const installationCost = 1200; // per unit (device + installation)
    const totalInstallation = units * installationCost;
    const annualSavings = units * annualBottlesCost;
    const roi = (totalInstallation / annualSavings) * 12; // months
    
    return {
      totalInstallation,
      annualSavings,
      roi: Math.round(roi),
      fiveYearSavings: annualSavings * 5 - totalInstallation,
    };
  };

  const savings = calculateSavings(units);

  const benefits = [
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: language === 'fr' ? 'Économies Massives' : 'Massive Savings',
      description: language === 'fr'
        ? `Économisez jusqu'à ${formatPrice(2340)}/unité/an sur les bouteilles`
        : `Save up to ${formatPrice(2340)}/unit/year on bottles`,
      highlight: formatPrice(2340) + '/an',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: language === 'fr' ? 'ROI Rapide' : 'Fast ROI',
      description: language === 'fr'
        ? 'Retour sur investissement en 6-8 mois'
        : 'Return on investment in 6-8 months',
      highlight: '6-8 mois',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'fr' ? 'Satisfaction Client' : 'Customer Satisfaction',
      description: language === 'fr'
        ? 'Améliorez l\'expérience client avec eau premium'
        : 'Enhance customer experience with premium water',
      highlight: '+40%',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: language === 'fr' ? 'Image Éco-responsable' : 'Eco-friendly Image',
      description: language === 'fr'
        ? 'Renforcez votre engagement environnemental'
        : 'Strengthen your environmental commitment',
      highlight: '0 déchet',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === 'fr' ? 'Garantie Pro' : 'Pro Warranty',
      description: language === 'fr'
        ? 'Garantie 5 ans + maintenance prioritaire'
        : '5-year warranty + priority maintenance',
      highlight: '5 ans',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: language === 'fr' ? 'Installation Rapide' : 'Quick Installation',
      description: language === 'fr'
        ? 'Déploiement complet en 2-3 jours'
        : 'Full deployment in 2-3 days',
      highlight: '2-3 jours',
    },
  ];

  const useCases = [
    {
      type: language === 'fr' ? 'Hôtel Boutique' : 'Boutique Hotel',
      icon: '🏨',
      rooms: 45,
      locations: [
        language === 'fr' ? 'Chambres (suite parentale)' : 'Rooms (master suite)',
        language === 'fr' ? 'Spa & Wellness' : 'Spa & Wellness',
        language === 'fr' ? 'Bar & Restaurant' : 'Bar & Restaurant',
      ],
      savings: 45 * 2340,
      investment: 45 * 1200,
    },
    {
      type: language === 'fr' ? 'Restaurant Gastronomique' : 'Fine Dining',
      icon: '🍽️',
      rooms: 8,
      locations: [
        language === 'fr' ? 'Cuisine principale' : 'Main kitchen',
        language === 'fr' ? 'Bar cocktails' : 'Cocktail bar',
        language === 'fr' ? 'Pâtisserie' : 'Pastry',
        language === 'fr' ? 'WC clients' : 'Customer restrooms',
      ],
      savings: 8 * 2340,
      investment: 8 * 1200,
    },
    {
      type: language === 'fr' ? 'Bureaux Entreprise' : 'Corporate Office',
      icon: '🏢',
      rooms: 120,
      locations: [
        language === 'fr' ? 'Espaces cafétéria' : 'Cafeteria spaces',
        language === 'fr' ? 'Salles de réunion' : 'Meeting rooms',
        language === 'fr' ? 'Open spaces' : 'Open spaces',
        language === 'fr' ? 'Espaces détente' : 'Break rooms',
      ],
      savings: 120 * 2340,
      investment: 120 * 1200,
    },
  ];

  const packages = [
    {
      name: language === 'fr' ? 'Starter' : 'Starter',
      units: '5-15',
      price: 1150,
      features: [
        language === 'fr' ? 'Prix unitaire réduit' : 'Reduced unit price',
        language === 'fr' ? 'Installation incluse' : 'Installation included',
        language === 'fr' ? 'Formation équipe' : 'Team training',
        language === 'fr' ? 'Support email' : 'Email support',
        language === 'fr' ? 'Garantie 3 ans' : '3-year warranty',
      ],
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: language === 'fr' ? 'Professional' : 'Professional',
      units: '16-50',
      price: 1050,
      features: [
        language === 'fr' ? 'Prix unitaire -15%' : 'Unit price -15%',
        language === 'fr' ? 'Installation premium' : 'Premium installation',
        language === 'fr' ? 'Formation complète' : 'Complete training',
        language === 'fr' ? 'Support téléphone' : 'Phone support',
        language === 'fr' ? 'Garantie 5 ans' : '5-year warranty',
        language === 'fr' ? 'Maintenance annuelle' : 'Annual maintenance',
      ],
      color: 'from-purple-400 to-pink-500',
      popular: true,
    },
    {
      name: language === 'fr' ? 'Enterprise' : 'Enterprise',
      units: '51+',
      price: 950,
      features: [
        language === 'fr' ? 'Prix unitaire -25%' : 'Unit price -25%',
        language === 'fr' ? 'Installation sur-mesure' : 'Custom installation',
        language === 'fr' ? 'Formation continue' : 'Ongoing training',
        language === 'fr' ? 'Account manager 24/7' : 'Account manager 24/7',
        language === 'fr' ? 'Garantie 7 ans' : '7-year warranty',
        language === 'fr' ? 'Maintenance illimitée' : 'Unlimited maintenance',
        language === 'fr' ? 'Remplacement prioritaire' : 'Priority replacement',
      ],
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  const stats = [
    {
      value: '85+',
      label: language === 'fr' ? 'Clients B2B' : 'B2B clients',
    },
    {
      value: '2 400+',
      label: language === 'fr' ? 'Unités installées' : 'Units installed',
    },
    {
      value: formatPrice(5600000),
      label: language === 'fr' ? 'Économies générées' : 'Savings generated',
    },
    {
      value: '7.2 mois',
      label: language === 'fr' ? 'ROI moyen' : 'Average ROI',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Building2 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Programme B2B Hôtels & Restaurants'}
            {language === 'en' && 'B2B Program Hotels & Restaurants'}
            {language === 'es' && 'Programa B2B Hoteles & Restaurantes'}
            {language === 'it' && 'Programma B2B Hotel & Ristoranti'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Solutions sur-mesure pour professionnels'}
            {language === 'en' && 'Custom solutions for professionals'}
            {language === 'es' && 'Soluciones personalizadas para profesionales'}
            {language === 'it' && 'Soluzioni su misura per professionisti'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ROI Calculator */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-8 h-8" />
          <h3 className="text-2xl font-bold">
            {language === 'fr' && 'Calculateur ROI B2B'}
            {language === 'en' && 'B2B ROI Calculator'}
            {language === 'es' && 'Calculadora ROI B2B'}
            {language === 'it' && 'Calcolatore ROI B2B'}
          </h3>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-4">
          <label className="block font-semibold mb-3">
            {language === 'fr' && 'Nombre d\'unités à installer'}
            {language === 'en' && 'Number of units to install'}
            {language === 'es' && 'Número de unidades a instalar'}
            {language === 'it' && 'Numero di unità da installare'}
          </label>
          <input
            type="range"
            min="5"
            max="200"
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value))}
            className="w-full h-3 bg-white/30 rounded-lg appearance-none cursor-pointer mb-3"
          />
          <div className="text-center">
            <span className="text-5xl font-bold">{units}</span>
            <span className="text-xl ml-2">
              {language === 'fr' && 'unités'}
              {language === 'en' && 'units'}
              {language === 'es' && 'unidades'}
              {language === 'it' && 'unità'}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">
              {language === 'fr' && 'Investissement'}
              {language === 'en' && 'Investment'}
              {language === 'es' && 'Inversión'}
              {language === 'it' && 'Investimento'}
            </div>
            <div className="text-2xl font-bold">{formatPrice(savings.totalInstallation)}</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">
              {language === 'fr' && 'Économies/an'}
              {language === 'en' && 'Savings/year'}
              {language === 'es' && 'Ahorros/año'}
              {language === 'it' && 'Risparmi/anno'}
            </div>
            <div className="text-2xl font-bold">{formatPrice(savings.annualSavings)}</div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">ROI</div>
            <div className="text-2xl font-bold">
              {savings.roi}{' '}
              {language === 'fr' && 'mois'}
              {language === 'en' && 'months'}
              {language === 'es' && 'meses'}
              {language === 'it' && 'mesi'}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-sm opacity-90 mb-1">
              {language === 'fr' && 'Gains 5 ans'}
              {language === 'en' && '5-year gains'}
              {language === 'es' && 'Ganancias 5 años'}
              {language === 'it' && 'Guadagni 5 anni'}
            </div>
            <div className="text-2xl font-bold">{formatPrice(savings.fiveYearSavings)}</div>
          </div>
        </div>

        <button
          onClick={() => setShowQuote(true)}
          className="w-full mt-4 py-3 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          {language === 'fr' && 'Obtenir un devis personnalisé'}
          {language === 'en' && 'Get custom quote'}
          {language === 'es' && 'Obtener presupuesto personalizado'}
          {language === 'it' && 'Ottieni preventivo personalizzato'}
        </button>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Avantages B2B'}
          {language === 'en' && 'B2B Benefits'}
          {language === 'es' && 'Beneficios B2B'}
          {language === 'it' && 'Vantaggi B2B'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  {benefit.icon}
                </div>
                <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {benefit.highlight}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Cas d\'usage'}
          {language === 'en' && 'Use cases'}
          {language === 'es' && 'Casos de uso'}
          {language === 'it' && 'Casi d\'uso'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white"
            >
              <div className="text-5xl mb-4">{useCase.icon}</div>
              <h4 className="font-bold text-xl mb-3">{useCase.type}</h4>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                <div className="text-sm opacity-90 mb-2">
                  {useCase.rooms}{' '}
                  {language === 'fr' && 'unités'}
                  {language === 'en' && 'units'}
                  {language === 'es' && 'unidades'}
                  {language === 'it' && 'unità'}
                </div>
                <div className="space-y-1">
                  {useCase.locations.map((location, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      {location}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <div className="opacity-75 text-xs mb-1">
                    {language === 'fr' && 'Économies/an'}
                    {language === 'en' && 'Savings/year'}
                    {language === 'es' && 'Ahorros/año'}
                    {language === 'it' && 'Risparmi/anno'}
                  </div>
                  <div className="font-bold">{formatPrice(useCase.savings)}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <div className="opacity-75 text-xs mb-1">ROI</div>
                  <div className="font-bold">
                    {Math.round((useCase.investment / useCase.savings) * 12)}{' '}
                    {language === 'fr' ? 'mois' : 'months'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Forfaits B2B'}
          {language === 'en' && 'B2B Packages'}
          {language === 'es' && 'Paquetes B2B'}
          {language === 'it' && 'Pacchetti B2B'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden ${
                pkg.popular ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {language === 'fr' && 'POPULAIRE'}
                  {language === 'en' && 'POPULAR'}
                  {language === 'es' && 'POPULAR'}
                  {language === 'it' && 'POPOLARE'}
                </div>
              )}
              <div className={`bg-gradient-to-br ${pkg.color} p-6 text-white`}>
                <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                <div className="text-sm opacity-90 mb-4">{pkg.units} unités</div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{formatPrice(pkg.price)}</span>
                  <span className="text-sm opacity-90">/unité</span>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Form */}
      {showQuote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200"
        >
          <h3 className="font-bold text-xl text-gray-900 mb-4">
            {language === 'fr' && 'Demande de Devis B2B'}
            {language === 'en' && 'B2B Quote Request'}
            {language === 'es' && 'Solicitud Presupuesto B2B'}
            {language === 'it' && 'Richiesta Preventivo B2B'}
          </h3>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Nom de l\'établissement'}
                  {language === 'en' && 'Establishment name'}
                  {language === 'es' && 'Nombre del establecimiento'}
                  {language === 'it' && 'Nome struttura'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Hôtel Le Luxe"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Type'}
                  {language === 'en' && 'Type'}
                  {language === 'es' && 'Tipo'}
                  {language === 'it' && 'Tipo'}
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none">
                  <option>{language === 'fr' ? 'Hôtel' : 'Hotel'}</option>
                  <option>{language === 'fr' ? 'Restaurant' : 'Restaurant'}</option>
                  <option>{language === 'fr' ? 'Bureaux' : 'Office'}</option>
                  <option>{language === 'fr' ? 'Spa/Wellness' : 'Spa/Wellness'}</option>
                  <option>{language === 'fr' ? 'Autre' : 'Other'}</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Contact'}
                  {language === 'en' && 'Contact'}
                  {language === 'es' && 'Contacto'}
                  {language === 'it' && 'Contatto'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Jean Martin"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="contact@hotel-luxe.fr"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Téléphone'}
                  {language === 'en' && 'Phone'}
                  {language === 'es' && 'Teléfono'}
                  {language === 'it' && 'Telefono'}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Nombre d\'unités'}
                  {language === 'en' && 'Number of units'}
                  {language === 'es' && 'Número de unidades'}
                  {language === 'it' && 'Numero di unità'}
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder={units.toString()}
                  defaultValue={units}
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                {language === 'fr' && 'Détails du projet'}
                {language === 'en' && 'Project details'}
                {language === 'es' && 'Detalles del proyecto'}
                {language === 'it' && 'Dettagli progetto'}
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder={language === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-[#6B1E3E] to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              {language === 'fr' && 'Recevoir mon devis sous 24h'}
              {language === 'en' && 'Receive quote within 24h'}
              {language === 'es' && 'Recibir presupuesto en 24h'}
              {language === 'it' && 'Ricevi preventivo entro 24h'}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
