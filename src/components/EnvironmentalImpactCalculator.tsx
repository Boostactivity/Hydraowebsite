import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Droplets, TreePine, Wind, Recycle, Globe, TrendingDown } from 'lucide-react';

interface EnvironmentalImpactCalculatorProps {
  className?: string;
}

export function EnvironmentalImpactCalculator({ className = '' }: EnvironmentalImpactCalculatorProps) {
  const [months, setMonths] = useState(12);
  const [householdSize, setHouseholdSize] = useState(4);

  // Calculs environnementaux basés sur données réelles
  const bottlesPerPersonPerMonth = 50; // ~12L/semaine
  const totalBottles = months * householdSize * bottlesPerPersonPerMonth;
  
  // Impacts environnementaux
  const plasticKg = totalBottles * 0.035; // 35g par bouteille 1.5L
  const co2Kg = totalBottles * 0.065; // 65g CO2 par bouteille (production + transport)
  const waterLiters = totalBottles * 3; // 3L d'eau pour produire 1 bouteille
  const oilLiters = totalBottles * 0.25; // 0.25L pétrole par bouteille
  const treesEquivalent = co2Kg / 13; // 1 arbre absorbe ~13kg CO2/an

  const monthsOptions = [
    { value: 1, label: '1 mois' },
    { value: 6, label: '6 mois' },
    { value: 12, label: '1 an' },
    { value: 24, label: '2 ans' },
    { value: 60, label: '5 ans' },
  ];

  const householdOptions = [
    { value: 1, label: '1', icon: '👤' },
    { value: 2, label: '2', icon: '👥' },
    { value: 4, label: '4', icon: '👨‍👩‍👧‍👦' },
    { value: 6, label: '6+', icon: '👨‍👩‍👧‍👧' },
  ];

  const impacts = [
    {
      icon: Recycle,
      label: 'Bouteilles plastique',
      value: totalBottles.toLocaleString(),
      unit: 'bouteilles',
      color: 'from-blue-500 to-cyan-500',
      comparison: `Soit ${Math.round(plasticKg)}kg de plastique non produit`
    },
    {
      icon: Wind,
      label: 'CO₂ évité',
      value: Math.round(co2Kg).toLocaleString(),
      unit: 'kg',
      color: 'from-green-500 to-emerald-500',
      comparison: `= ${Math.round(treesEquivalent)} arbres plantés`
    },
    {
      icon: Droplets,
      label: 'Eau économisée',
      value: Math.round(waterLiters).toLocaleString(),
      unit: 'litres',
      color: 'from-blue-400 to-blue-600',
      comparison: `Soit ${Math.round(waterLiters / 200)} baignoires`
    },
    {
      icon: Globe,
      label: 'Pétrole épargné',
      value: Math.round(oilLiters).toLocaleString(),
      unit: 'litres',
      color: 'from-orange-500 to-red-500',
      comparison: `= ${Math.round(oilLiters / 45)} pleins de voiture`
    },
  ];

  // Comparaisons concrètes
  const comparisons = [
    {
      icon: TreePine,
      value: Math.round(treesEquivalent),
      label: 'arbres à planter',
      sublabel: 'pour compenser votre ancien impact',
      color: 'text-green-600',
      bg: 'from-green-50 to-emerald-50'
    },
    {
      icon: Recycle,
      value: Math.round(plasticKg),
      label: 'kg de plastique',
      sublabel: 'non produits ni jetés',
      color: 'text-blue-600',
      bg: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Wind,
      value: Math.round(co2Kg),
      label: 'kg de CO₂',
      sublabel: 'non émis dans l\'atmosphère',
      color: 'text-emerald-600',
      bg: 'from-emerald-50 to-green-50'
    },
  ];

  return (
    <div className={`bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-700 rounded-full mb-6"
        >
          <Leaf className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider font-medium">Impact Environnemental</span>
        </motion.div>

        <h2 className="mb-4 text-gray-900">
          Votre impact positif
          <span className="block text-green-600">pour la planète</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculez les déchets et pollution évités grâce à HYDRAO
        </p>
      </div>

      {/* Contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Période */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Période de calcul
          </label>
          <div className="grid grid-cols-5 gap-2">
            {monthsOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMonths(option.value)}
                className={`px-3 py-3 rounded-xl text-xs font-medium transition-all ${
                  months === option.value
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Taille foyer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Personnes au foyer
          </label>
          <div className="grid grid-cols-4 gap-2">
            {householdOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setHouseholdSize(option.value)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                  householdSize === option.value
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Impacts visuels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {impacts.map((impact, idx) => {
          const Icon = impact.icon;
          return (
            <motion.div
              key={impact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${impact.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{impact.label}</div>
                  <div className="text-2xl font-light text-gray-900">
                    {impact.value} <span className="text-lg text-gray-500">{impact.unit}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 bg-white/80 rounded-lg p-3">
                {impact.comparison}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Hero comparaisons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {comparisons.map((comp, idx) => {
          const Icon = comp.icon;
          return (
            <motion.div
              key={comp.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`text-center p-6 bg-gradient-to-br ${comp.bg} rounded-2xl border-2 border-green-200`}
            >
              <Icon className={`w-10 h-10 ${comp.color} mx-auto mb-3`} />
              <div className={`text-4xl font-light ${comp.color} mb-2`}>
                {comp.value}
              </div>
              <div className="font-medium text-gray-900 mb-1">
                {comp.label}
              </div>
              <div className="text-xs text-gray-600">
                {comp.sublabel}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Message motivationnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center"
      >
        <Leaf className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-medium mb-3">
          Félicitations pour votre engagement !
        </h3>
        <p className="text-lg text-white/90 mb-4">
          En {months} mois avec HYDRAO, vous évitez{' '}
          <strong>{totalBottles.toLocaleString()} bouteilles plastique</strong> et{' '}
          <strong>{Math.round(co2Kg)} kg de CO₂</strong>.
        </p>
        <p className="text-white/80">
          C'est l'équivalent de planter <strong>{Math.round(treesEquivalent)} arbres</strong>.
        </p>
      </motion.div>

      {/* Méthodologie */}
      <details className="mt-8 text-sm text-gray-600">
        <summary className="cursor-pointer hover:text-green-600 font-medium">
          📊 Méthodologie de calcul
        </summary>
        <div className="mt-4 space-y-2 pl-4 border-l-2 border-gray-200">
          <p>• <strong>Bouteilles :</strong> {bottlesPerPersonPerMonth} bouteilles/personne/mois (moyenne France)</p>
          <p>• <strong>Plastique :</strong> 35g par bouteille 1.5L</p>
          <p>• <strong>CO₂ :</strong> 65g par bouteille (production + transport)</p>
          <p>• <strong>Eau :</strong> 3L d'eau nécessaires pour produire 1 bouteille</p>
          <p>• <strong>Pétrole :</strong> 0.25L par bouteille (fabrication plastique)</p>
          <p>• <strong>Arbres :</strong> 1 arbre absorbe ~13kg CO₂/an</p>
          <p className="pt-2 text-xs text-gray-500">
            Sources : ADEME, Zero Waste France, National Geographic
          </p>
        </div>
      </details>

      {/* CTA partage social */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-gray-900 mb-3">
          <TrendingDown className="w-5 h-5 text-green-600" />
          <span className="font-medium">Partagez votre impact</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Inspirez votre entourage en partageant vos économies écologiques
        </p>
        <button className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors">
          Partager mon impact 🌱
        </button>
      </motion.div>
    </div>
  );
}
