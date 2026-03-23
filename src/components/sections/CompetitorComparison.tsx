import React from 'react';
import { motion } from 'motion/react';
import { Check, X, TrendingDown } from 'lucide-react';

export function CompetitorComparison() {
  const features = [
    { name: 'Eau bouillante instantanée', hydrao: true, concurrent: true },
    { name: 'Eau filtrée premium', hydrao: true, concurrent: false },
    { name: 'Eau pétillante réfrigérée', hydrao: true, concurrent: false },
    { name: 'Installation incluse', hydrao: true, concurrent: false },
    { name: 'Garantie 5 ans complète', hydrao: true, concurrent: false },
    { name: 'Design minimaliste premium', hydrao: true, concurrent: true },
    { name: 'Prix tout compris', hydrao: '490€', concurrent: '800-1200€' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingDown className="w-6 h-6" />
          <h3 className="text-2xl">Pourquoi choisir HYDRAO ?</h3>
        </div>
        <p className="text-white/90">Plus de fonctionnalités, 40% moins cher</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-8 py-5 text-gray-900 font-medium">Fonctionnalité</th>
              <th className="px-6 py-5">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#6B1E3E]">HYDRAO</div>
                  <div className="text-xs text-gray-500 mt-1">490€ TTC</div>
                </div>
              </th>
              <th className="px-6 py-5">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-700">Concurrents</div>
                  <div className="text-xs text-gray-500 mt-1">800-1200€</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-8 py-4 text-gray-700">{feature.name}</td>
                <td className="px-6 py-4 text-center">
                  {typeof feature.hydrao === 'boolean' ? (
                    feature.hydrao ? (
                      <div className="inline-flex w-8 h-8 rounded-full bg-green-100 items-center justify-center">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="inline-flex w-8 h-8 rounded-full bg-red-100 items-center justify-center">
                        <X className="w-5 h-5 text-red-600" />
                      </div>
                    )
                  ) : (
                    <span className="text-[#6B1E3E] font-semibold">{feature.hydrao}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {typeof feature.concurrent === 'boolean' ? (
                    feature.concurrent ? (
                      <div className="inline-flex w-8 h-8 rounded-full bg-green-100 items-center justify-center">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="inline-flex w-8 h-8 rounded-full bg-red-100 items-center justify-center">
                        <X className="w-5 h-5 text-red-600" />
                      </div>
                    )
                  ) : (
                    <span className="text-gray-600">{feature.concurrent}</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer CTA */}
      <div className="bg-[#FAF8F5] px-8 py-6 text-center">
        <div className="inline-flex items-center gap-2 text-[#6B1E3E] font-medium">
          <Check className="w-5 h-5" />
          <span>Économisez 40% avec les mêmes fonctionnalités + plus encore</span>
        </div>
      </div>
    </motion.div>
  );
}
