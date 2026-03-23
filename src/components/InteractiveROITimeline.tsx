import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, DollarSign, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

interface TimelineData {
  month: number;
  spent: number;
  saved: number;
  netBalance: number;
  breakEven: boolean;
}

export function InteractiveROITimeline() {
  const [selectedPlan, setSelectedPlan] = useState<'couple' | 'family' | 'large'>('family');

  const plans = {
    couple: {
      name: 'Couple (2 personnes)',
      monthlySavings: 42,
      initialCost: 490,
      icon: '👥'
    },
    family: {
      name: 'Famille (4 personnes)',
      monthlySavings: 83,
      initialCost: 490,
      icon: '👨‍👩‍👧‍👦'
    },
    large: {
      name: 'Grande famille (5+ personnes)',
      monthlySavings: 100,
      initialCost: 490,
      icon: '👨‍👩‍👧‍👧'
    }
  };

  const selectedData = plans[selectedPlan];

  // Calculer la timeline sur 12 mois
  const timelineData: TimelineData[] = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const saved = selectedData.monthlySavings * month;
    const spent = selectedData.initialCost;
    const netBalance = saved - spent;
    const breakEven = netBalance >= 0;

    return { month, spent, saved, netBalance, breakEven };
  });

  const breakEvenMonth = timelineData.find(d => d.breakEven)?.month || 12;

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-white">
      <div className="section-container max-w-6xl mx-auto">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Retour sur investissement</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Votre HYDRAO se rembourse tout seul
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualisez mois par mois comment votre robinet s'autofinance
          </p>
        </motion.div>

        {/* Sélecteur de profil */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
          {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => {
            const plan = plans[key];
            const isSelected = selectedPlan === key;

            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(key)}
                className={`flex-1 max-w-xs p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-[#6B1E3E] bg-[#6B1E3E]/5 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-3">{plan.icon}</div>
                <div className="text-lg font-medium text-gray-900 mb-1">{plan.name}</div>
                <div className="text-sm text-gray-600 mb-3">
                  {plan.monthlySavings}€ économisés/mois
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#6B1E3E] text-white rounded-full text-xs"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Sélectionné</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Stats clés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-md">
            <div className="text-sm text-gray-600 mb-2">Investissement initial</div>
            <div className="text-4xl text-gray-900 font-light">{selectedData.initialCost}€</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl shadow-xl">
            <div className="text-sm text-white/80 mb-2">Rentabilisé en</div>
            <div className="text-4xl font-light">{breakEvenMonth} mois</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-green-200 shadow-md">
            <div className="text-sm text-gray-600 mb-2">Économies 1ère année</div>
            <div className="text-4xl text-green-600 font-light">{selectedData.monthlySavings * 12}€</div>
          </div>
        </motion.div>

        {/* Timeline visuelle */}
        <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
          <div className="mb-8">
            <h3 className="text-2xl text-gray-900 mb-2">Timeline mois par mois</h3>
            <p className="text-gray-600">
              Suivez l'évolution de votre investissement
            </p>
          </div>

          {/* Graphique */}
          <div className="relative h-64 mb-8">
            {/* Ligne zéro */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 z-0">
              <div className="absolute left-0 -top-6 text-xs text-gray-500">Seuil de rentabilité</div>
            </div>

            {/* Barres */}
            <div className="flex items-end justify-between h-full gap-1 relative z-10">
              {timelineData.map((data, index) => {
                const heightPercent = Math.abs(data.netBalance) / selectedData.initialCost * 100;
                const isPositive = data.breakEven;

                return (
                  <motion.div
                    key={index}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex-1 flex flex-col items-center group cursor-pointer"
                    style={{ transformOrigin: 'bottom' }}
                  >
                    {/* Barre */}
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isPositive
                          ? 'bg-gradient-to-t from-green-500 to-green-400 group-hover:from-green-600 group-hover:to-green-500'
                          : 'bg-gradient-to-t from-red-500 to-red-400 group-hover:from-red-600 group-hover:to-red-500'
                      }`}
                      style={{ 
                        height: `${Math.min(heightPercent, 100)}%`,
                        minHeight: '20px'
                      }}
                    />

                    {/* Tooltip au survol */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-20 bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
                      <div className="font-medium mb-1">Mois {data.month}</div>
                      <div>Économisé: {data.saved}€</div>
                      <div className={isPositive ? 'text-green-400' : 'text-red-400'}>
                        Bilan: {data.netBalance > 0 ? '+' : ''}{data.netBalance}€
                      </div>
                    </div>

                    {/* Label mois */}
                    <div className="text-xs text-gray-500 mt-2">M{data.month}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Légende */}
          <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
              <span className="text-sm text-gray-600">En cours d'amortissement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-400 rounded"></div>
              <span className="text-sm text-gray-600">Rentabilisé (économies nettes)</span>
            </div>
          </div>
        </div>

        {/* Projection 5 ans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border-2 border-green-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl text-gray-900 font-medium">Projection 5 ans</h4>
              <p className="text-sm text-gray-600">Vos économies cumulées</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 5].map((year) => {
              const totalSaved = selectedData.monthlySavings * 12 * year;
              const netProfit = totalSaved - selectedData.initialCost;

              return (
                <div key={year} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Année {year}</div>
                  <div className="text-3xl text-green-600 font-light mb-1">+{netProfit}€</div>
                  <div className="text-xs text-gray-500">de bénéfice net</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
