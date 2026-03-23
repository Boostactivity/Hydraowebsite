import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Recycle, Leaf, CheckCircle, TrendingDown, Award, Target, BarChart3, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface PackagingFeature {
  id: string;
  name: string;
  description: string;
  impact: string;
  status: 'active' | 'coming-soon';
  emoji: string;
  details: string[];
}

interface RecyclingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function EcoPackaging() {
  const { language } = useLanguage();

  const features: PackagingFeature[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Carton 100% recyclé' : '100% recycled cardboard',
      description: language === 'fr'
        ? 'Boîte principale fabriquée à partir de carton recyclé post-consommation certifié FSC.'
        : 'Main box made from FSC-certified post-consumer recycled cardboard.',
      impact: language === 'fr' ? '-45 tonnes plastique/an' : '-45 tons plastic/year',
      status: 'active',
      emoji: '📦',
      details: [
        language === 'fr' ? 'Carton recyclé FSC' : 'FSC recycled cardboard',
        language === 'fr' ? '100% recyclable' : '100% recyclable',
        language === 'fr' ? 'Encre végétale' : 'Vegetable ink',
        language === 'fr' ? 'Sans plastique' : 'Plastic-free',
      ],
    },
    {
      id: '2',
      name: language === 'fr' ? 'Protection compostable' : 'Compostable protection',
      description: language === 'fr'
        ? 'Calage et protection intérieure en amidon de maïs 100% compostable et biodégradable.'
        : 'Interior cushioning and protection in 100% compostable and biodegradable corn starch.',
      impact: language === 'fr' ? '0 déchet plastique' : 'Zero plastic waste',
      status: 'active',
      emoji: '🌽',
      details: [
        language === 'fr' ? 'Amidon de maïs' : 'Corn starch',
        language === 'fr' ? 'Compostable 90 jours' : '90-day compostable',
        language === 'fr' ? 'Biodégradable' : 'Biodegradable',
        language === 'fr' ? 'Sans toxines' : 'Toxin-free',
      ],
    },
    {
      id: '3',
      name: language === 'fr' ? 'Ruban papier kraft' : 'Kraft paper tape',
      description: language === 'fr'
        ? 'Ruban adhésif en papier kraft renforcé, entièrement recyclable et sans plastique.'
        : 'Reinforced kraft paper tape, fully recyclable and plastic-free.',
      impact: language === 'fr' ? '-2 tonnes plastique/an' : '-2 tons plastic/year',
      status: 'active',
      emoji: '📎',
      details: [
        language === 'fr' ? 'Papier kraft' : 'Kraft paper',
        language === 'fr' ? 'Colle naturelle' : 'Natural glue',
        language === 'fr' ? 'Recyclable' : 'Recyclable',
        language === 'fr' ? 'Résistant' : 'Resistant',
      ],
    },
    {
      id: '4',
      name: language === 'fr' ? 'Manuel papier recyclé' : 'Recycled paper manual',
      description: language === 'fr'
        ? 'Notice d\'utilisation imprimée sur papier recyclé avec encre végétale, ou version 100% digitale.'
        : 'User manual printed on recycled paper with vegetable ink, or 100% digital version.',
      impact: language === 'fr' ? '-3 tonnes papier/an' : '-3 tons paper/year',
      status: 'active',
      emoji: '📄',
      details: [
        language === 'fr' ? 'Papier recyclé' : 'Recycled paper',
        language === 'fr' ? 'Encre végétale' : 'Vegetable ink',
        language === 'fr' ? 'Option digitale' : 'Digital option',
        language === 'fr' ? 'QR code' : 'QR code',
      ],
    },
    {
      id: '5',
      name: language === 'fr' ? 'Programme retour filtres' : 'Filter return program',
      description: language === 'fr'
        ? 'Programme de retour gratuit des filtres usagés avec enveloppe prépayée pour recyclage à 95%.'
        : 'Free return program for used filters with prepaid envelope for 95% recycling.',
      impact: language === 'fr' ? '95% taux recyclage' : '95% recycling rate',
      status: 'active',
      emoji: '♻️',
      details: [
        language === 'fr' ? 'Retour gratuit' : 'Free return',
        language === 'fr' ? 'Enveloppe fournie' : 'Envelope provided',
        language === 'fr' ? '95% recyclage' : '95% recycling',
        language === 'fr' ? 'Valorisation' : 'Recovery',
      ],
    },
    {
      id: '6',
      name: language === 'fr' ? 'Emballage bio-plastique' : 'Bio-plastic packaging',
      description: language === 'fr'
        ? 'Remplacement des sachets plastique par bio-plastique végétal compostable (2025).'
        : 'Replacement of plastic bags with compostable plant-based bio-plastic (2025).',
      impact: language === 'fr' ? '-8 tonnes plastique/an' : '-8 tons plastic/year',
      status: 'coming-soon',
      emoji: '🌱',
      details: [
        language === 'fr' ? 'PLA végétal' : 'Plant-based PLA',
        language === 'fr' ? 'Compostable' : 'Compostable',
        language === 'fr' ? 'Lancement 2025' : 'Launch 2025',
        language === 'fr' ? 'Sans pétrole' : 'Oil-free',
      ],
    },
  ];

  const recyclingSteps: RecyclingStep[] = [
    {
      id: 1,
      title: language === 'fr' ? 'Recevez votre HYDRAO' : 'Receive your HYDRAO',
      description: language === 'fr'
        ? 'Déballez votre HYDRAO avec emballage 100% recyclable et compostable'
        : 'Unbox your HYDRAO with 100% recyclable and compostable packaging',
      icon: <Package className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: 2,
      title: language === 'fr' ? 'Compostez le calage' : 'Compost the cushioning',
      description: language === 'fr'
        ? 'Jetez le calage amidon de maïs dans votre compost ou poubelle organique'
        : 'Put the corn starch cushioning in your compost or organic waste',
      icon: <Leaf className="w-5 h-5" />,
      color: 'green',
    },
    {
      id: 3,
      title: language === 'fr' ? 'Recyclez le carton' : 'Recycle the cardboard',
      description: language === 'fr'
        ? 'Mettez le carton et le papier dans votre bac de recyclage'
        : 'Put the cardboard and paper in your recycling bin',
      icon: <Recycle className="w-5 h-5" />,
      color: 'cyan',
    },
    {
      id: 4,
      title: language === 'fr' ? 'Retournez les filtres' : 'Return the filters',
      description: language === 'fr'
        ? 'Utilisez l\'enveloppe prépayée pour nous retourner vos filtres usagés'
        : 'Use the prepaid envelope to return your used filters to us',
      icon: <Award className="w-5 h-5" />,
      color: 'purple',
    },
  ];

  const stats = [
    {
      value: '0%',
      label: language === 'fr' ? 'Plastique packaging' : 'Plastic packaging',
      icon: <TrendingDown className="w-5 h-5" />,
    },
    {
      value: '100%',
      label: language === 'fr' ? 'Recyclable' : 'Recyclable',
      icon: <Recycle className="w-5 h-5" />,
    },
    {
      value: '95%',
      label: language === 'fr' ? 'Taux recyclage' : 'Recycling rate',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      value: '-58T',
      label: language === 'fr' ? 'Plastique évité/an' : 'Plastic avoided/year',
      icon: <Leaf className="w-5 h-5" />,
    },
  ];

  const comparisons = [
    {
      label: language === 'fr' ? 'Emballage standard' : 'Standard packaging',
      plastic: '450g',
      recyclable: '30%',
      compostable: '0%',
      color: 'red',
      emoji: '❌',
    },
    {
      label: language === 'fr' ? 'Emballage HYDRAO' : 'HYDRAO packaging',
      plastic: '0g',
      recyclable: '100%',
      compostable: '65%',
      color: 'green',
      emoji: '✅',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Package className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Programme Éco-Emballage'}
            {language === 'en' && 'Eco-Packaging Program'}
            {language === 'es' && 'Programa Eco-Embalaje'}
            {language === 'it' && 'Programma Eco-Imballaggio'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && '100% recyclable, 0% plastique, 95% taux de recyclage'}
            {language === 'en' && '100% recyclable, 0% plastic, 95% recycling rate'}
            {language === 'es' && '100% reciclable, 0% plástico, 95% tasa reciclaje'}
            {language === 'it' && '100% riciclabile, 0% plastica, 95% tasso riciclaggio'}
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
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-2 text-green-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Comparison */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Comparaison emballage'}
          {language === 'en' && 'Packaging comparison'}
          {language === 'es' && 'Comparación embalaje'}
          {language === 'it' && 'Confronto imballaggio'}
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gradient-to-br from-${comparison.color}-500 to-${comparison.color}-600 rounded-xl p-6 text-white`}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{comparison.emoji}</div>
                <h4 className="font-bold text-xl">{comparison.label}</h4>
              </div>

              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm opacity-75 mb-1">
                    {language === 'fr' ? 'Plastique' : 'Plastic'}
                  </div>
                  <div className="text-2xl font-bold">{comparison.plastic}</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm opacity-75 mb-1">
                    {language === 'fr' ? 'Recyclable' : 'Recyclable'}
                  </div>
                  <div className="text-2xl font-bold">{comparison.recyclable}</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm opacity-75 mb-1">
                    {language === 'fr' ? 'Compostable' : 'Compostable'}
                  </div>
                  <div className="text-2xl font-bold">{comparison.compostable}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Caractéristiques éco-emballage'}
          {language === 'en' && 'Eco-packaging features'}
          {language === 'es' && 'Características eco-embalaje'}
          {language === 'it' && 'Caratteristiche eco-imballaggio'}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Emoji */}
                <div className="text-5xl flex-shrink-0">{feature.emoji}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{feature.name}</h4>
                    <div className={`${
                      feature.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    } text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap`}>
                      {feature.status === 'active' 
                        ? (language === 'fr' ? 'Actif' : 'Active')
                        : (language === 'fr' ? 'Bientôt' : 'Coming soon')}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{feature.description}</p>

                  <div className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full border border-green-200 inline-block mb-3">
                    {feature.impact}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                        ✓ {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recycling Steps */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-6">
          {language === 'fr' && 'Comment recycler votre emballage HYDRAO'}
          {language === 'en' && 'How to recycle your HYDRAO packaging'}
          {language === 'es' && 'Cómo reciclar tu embalaje HYDRAO'}
          {language === 'it' && 'Come riciclare il tuo imballaggio HYDRAO'}
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          {recyclingSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-xl p-4"
            >
              <div className={`w-12 h-12 bg-${step.color}-100 rounded-full flex items-center justify-center text-${step.color}-700 mx-auto mb-3`}>
                {step.icon}
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900 mb-2">{step.title}</div>
                <div className="text-sm text-gray-600">{step.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Visual */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Impact cumulé 2024'}
          {language === 'en' && 'Cumulative impact 2024'}
          {language === 'es' && 'Impacto acumulado 2024'}
          {language === 'it' && 'Impatto cumulativo 2024'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">32 400</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Emballages éco' : 'Eco packages'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">♻️</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">-58T</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Plastique évité' : 'Plastic avoided'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Taux recyclage' : 'Recycling rate'}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-green-600 rounded-xl p-8 text-white text-center">
        <Package className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Emballage responsable, planète respectée'}
          {language === 'en' && 'Responsible packaging, respected planet'}
          {language === 'es' && 'Embalaje responsable, planeta respetado'}
          {language === 'it' && 'Imballaggio responsabile, pianeta rispettato'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '100% recyclable • 0% plastique • 95% taux recyclage • 65% compostable • -58 tonnes plastique évité en 2024'}
          {language === 'en' && '100% recyclable • 0% plastic • 95% recycling rate • 65% compostable • -58 tons plastic avoided in 2024'}
          {language === 'es' && '100% reciclable • 0% plástico • 95% tasa reciclaje • 65% compostable • -58 toneladas plástico evitado en 2024'}
          {language === 'it' && '100% riciclabile • 0% plastica • 95% tasso riciclaggio • 65% compostabile • -58 tonnellate plastica evitata nel 2024'}
        </p>

        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Carton FSC' : 'FSC cardboard'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Calage compostable' : 'Compostable cushioning'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Retour gratuit' : 'Free return'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Zéro déchet' : 'Zero waste'}
          </div>
        </div>
      </div>
    </div>
  );
}
