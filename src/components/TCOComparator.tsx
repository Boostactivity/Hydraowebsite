import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Calculator, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface TCOComparatorProps {
  initialHousehold?: number;
}

export function TCOComparator({ initialHousehold = 4 }: TCOComparatorProps) {
  const [household, setHousehold] = useState(initialHousehold);
  const [years, setYears] = useState(5);

  // VRAIS CHIFFRES basés sur les données réelles
  // Consommation recommandée : 2L/personne/jour
  const dailyWaterPerPerson = 2; // litres
  const yearlyWaterPerPerson = dailyWaterPerPerson * 365; // 730L
  
  // Coûts eau embouteillée : 0,35€/L en moyenne
  const bottledWaterCostPerLiter = 0.35;
  const bottledWaterYearlyCost = yearlyWaterPerPerson * household * bottledWaterCostPerLiter;
  
  // Électricité bouilloire : 0,15€ par utilisation, environ 4 fois/jour pour famille moyenne
  const kettleUsesPerDay = Math.min(household * 1.5, 8); // Max 8 utilisations/jour
  const kettleElectricityCost = kettleUsesPerDay * 0.15 * 365;
  
  // Eau pétillante achetée (si famille ≥3) : ~1€/L, environ 2L/semaine/personne
  const sparklingWaterWeekly = household >= 3 ? household * 2 : 0; // litres/semaine
  const sparklingWaterCost = sparklingWaterWeekly * 52 * 1.0; // 1€/L
  
  const traditionalYearlyCost = bottledWaterYearlyCost + kettleElectricityCost + sparklingWaterCost;
  const traditionalTotalCost = traditionalYearlyCost * years;

  // Coûts HYDRAO
  const hydroInitialCost = 490; // Robinet 5-en-1 prix unique
  const hydroYearlyCost = household <= 2 ? 59 : 139; // Abonnement Filtre Only ou Plus+
  
  // Eau du robinet : 0,004€/L
  const tapWaterCostPerLiter = 0.004;
  const tapWaterYearlyCost = yearlyWaterPerPerson * household * tapWaterCostPerLiter;
  
  // Eau pétillante maison : 0,22€/L
  const sparklingHomeYearlyCost = sparklingWaterWeekly > 0 ? sparklingWaterWeekly * 52 * 0.22 : 0;
  
  // Électricité HYDRAO : environ 25€/an (boiler maintient température)
  const hydroElectricityCost = 25;
  
  const hydroTotalYearly = hydroYearlyCost + tapWaterYearlyCost + sparklingHomeYearlyCost + hydroElectricityCost;
  const hydroTotalCost = hydroInitialCost + (hydroTotalYearly * years);

  // Économies
  const totalSavings = traditionalTotalCost - hydroTotalCost;
  
  // Calcul sécurisé du break-even
  const yearlyDifference = traditionalYearlyCost - hydroTotalYearly;
  const breakEvenMonths = yearlyDifference > 0 
    ? Math.ceil(hydroInitialCost / (yearlyDifference / 12))
    : 999; // Si pas d'économies, afficher un nombre très élevé

  // Impact environnemental RÉEL
  // 2L/jour × 365j = 730L/an/personne = ~487 bouteilles 1.5L/an/personne
  const bottlesPerPersonPerYear = yearlyWaterPerPerson / 1.5; // ~487
  const bottlesSaved = Math.round(bottlesPerPersonPerYear * household * years);
  
  // Plastique : 35g par bouteille 1.5L
  const plasticSaved = (bottlesSaved * 0.035); // kg
  
  // CO2 : 400g par litre embouteillé (données réelles)
  const co2Saved = (yearlyWaterPerPerson * household * years * 0.4); // kg

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Household size */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <label className="flex items-center gap-2 text-gray-900 mb-4">
            <Users className="w-5 h-5 text-[#6B1E3E]" />
            <span>Nombre de personnes au foyer</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="8"
              value={household}
              onChange={(e) => setHousehold(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#6B1E3E]"
            />
            <div className="text-3xl text-[#6B1E3E] w-12 text-center">{household}</div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1</span>
            <span>8</span>
          </div>
        </div>

        {/* Years */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <label className="flex items-center gap-2 text-gray-900 mb-4">
            <Calculator className="w-5 h-5 text-[#6B1E3E]" />
            <span>Projection sur (années)</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#6B1E3E]"
            />
            <div className="text-3xl text-[#6B1E3E] w-12 text-center">{years}</div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1 an</span>
            <span>10 ans</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sans HYDRAO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border-2 border-gray-200 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="text-gray-900">Sans HYDRAO</h4>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Packs d'eau</span>
              <span className="text-gray-900">{Math.round(bottledWaterYearlyCost)}€/an</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Bouilloire électrique</span>
              <span className="text-gray-900">{Math.round(kettleElectricityCost)}€/an</span>
            </div>
            {sparklingWaterCost > 0 && (
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Eau pétillante</span>
                <span className="text-gray-900">{Math.round(sparklingWaterCost)}€/an</span>
              </div>
            )}
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Coût annuel</span>
              <span className="text-gray-900">{Math.round(traditionalYearlyCost)}€/an</span>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl mt-6">
            <div className="text-sm text-gray-700 mb-1">Total sur {years} an{years > 1 ? 's' : ''}</div>
            <div className="text-3xl text-gray-900">{traditionalTotalCost.toFixed(0)}€</div>
          </div>
        </motion.div>

        {/* Avec HYDRAO */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#E8D5DC]/30 to-white p-8 rounded-3xl border-2 border-[#6B1E3E]/20 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 px-3 py-1 gradient-bordeaux text-white text-xs rounded-full font-medium">
            Économie
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-[#6B1E3E]" />
            </div>
            <h4 className="text-gray-900">Avec HYDRAO</h4>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Robinet (année 1 uniquement)</span>
              <span className="text-gray-900">{hydroInitialCost}€</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Abonnement consommables</span>
              <span className="text-gray-900">{hydroYearlyCost}€/an</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Électricité</span>
              <span className="text-gray-900">{hydroElectricityCost}€/an</span>
            </div>
            <div className="h-px bg-[#6B1E3E]/20"></div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Coût annuel (après année 1)</span>
              <span className="text-gray-900">{Math.round(hydroTotalYearly)}€/an</span>
            </div>
          </div>

          <div className="p-4 bg-[#6B1E3E]/10 rounded-xl mt-6">
            <div className="text-sm text-[#6B1E3E] mb-1 font-medium">Total sur {years} an{years > 1 ? 's' : ''}</div>
            <div className="text-3xl text-[#6B1E3E] font-light">{hydroTotalCost.toFixed(0)}€</div>
          </div>
        </motion.div>
      </div>

      {/* Savings Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90 text-white p-8 rounded-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-sm opacity-90 mb-2">Économie totale</div>
            <div className="text-4xl mb-1">{totalSavings > 0 ? '+' : ''}{totalSavings.toFixed(0)}€</div>
            <div className="text-xs opacity-75">sur {years} an{years > 1 ? 's' : ''}</div>
          </div>

          <div className="text-center">
            <div className="text-sm opacity-90 mb-2">Rentabilisé en</div>
            <div className="text-4xl mb-1">{breakEvenMonths} mois</div>
            <div className="text-xs opacity-75">puis économies pures</div>
          </div>

          <div className="text-center">
            <div className="text-sm opacity-90 mb-2">Économie/mois</div>
            <div className="text-4xl mb-1">
              {((traditionalYearlyCost - hydroTotalYearly) / 12).toFixed(0)}€
            </div>
            <div className="text-xs opacity-75">après amortissement</div>
          </div>
        </div>
      </motion.div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-br from-[#FAF8F5] to-white p-8 rounded-3xl border-2 border-[#6B1E3E]/20">
        <h3 className="text-2xl text-gray-900 mb-6 text-center">Impact environnemental évité</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-[#6B1E3E]/10 hover:border-[#6B1E3E]/30 transition-all">
            <div className="text-4xl mb-2">🌊</div>
            <div className="text-3xl text-[#6B1E3E] mb-1 font-light">
              {bottlesSaved.toLocaleString()}
            </div>
            <div className="text-sm text-[#8B7E74] font-light">Bouteilles plastique évitées</div>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl border-2 border-[#6B1E3E]/10 hover:border-[#6B1E3E]/30 transition-all">
            <div className="text-4xl mb-2">♻️</div>
            <div className="text-3xl text-[#6B1E3E] mb-1 font-light">
              {plasticSaved.toFixed(0)} kg
            </div>
            <div className="text-sm text-[#8B7E74] font-light">Plastique non produit</div>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl border-2 border-[#6B1E3E]/10 hover:border-[#6B1E3E]/30 transition-all">
            <div className="text-4xl mb-2">🌍</div>
            <div className="text-3xl text-[#6B1E3E] mb-1 font-light">
              {co2Saved.toFixed(0)} kg
            </div>
            <div className="text-sm text-[#8B7E74] font-light">CO₂ économisé</div>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-6 font-light">
          Équivalent à <strong className="text-[#6B1E3E] font-medium">{Math.round(co2Saved / 0.12)} arbres plantés</strong> ou <strong className="text-[#6B1E3E] font-medium">{Math.round(co2Saved * 5)} km en voiture</strong> non parcourus.
        </p>
      </div>
    </div>
  );
}