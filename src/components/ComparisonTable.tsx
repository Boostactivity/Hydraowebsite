import { motion } from 'motion/react';
import { Check, X, Star } from 'lucide-react';

export function ComparisonTable() {
  const features = [
    { name: 'Prix du robinet', hydral: '490€', marche: '1500-3000€', bouteilles: '0€ (mais 1200€/an après)' },
    { name: 'Eau bouillante 100°C', hydral: true, marche: true, bouteilles: false },
    { name: 'Eau filtrée professionnelle', hydral: '5 étapes', marche: '2-3 étapes', bouteilles: 'Variable' },
    { name: 'Eau pétillante', hydral: true, marche: 'Option +300€', bouteilles: false },
    { name: 'Eau chaude réglable 40-60°C', hydral: true, marche: false, bouteilles: false },
    { name: 'Garantie', hydral: '5 ans', marche: '2 ans', bouteilles: '2 ans' },
    { name: 'Abonnement filtres', hydral: '59-139€/an', marche: '~100€/an', bouteilles: '~80€/an' },
    { name: 'Délai de livraison', hydral: '7 jours', marche: '2-3 semaines', bouteilles: '5 jours' },
    { name: 'SAV France', hydral: '48h', marche: '3-5 jours', bouteilles: '48h' },
    { name: 'Design premium', hydral: true, marche: true, bouteilles: false },
    { name: 'Économie vs bouteilles', hydral: '1000€/an', marche: '1000€/an', bouteilles: '600€/an' }
  ];

  const renderCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container max-w-7xl mx-auto">
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
            <Star className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Comparaison complète</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            HYDRAL face à la concurrence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pourquoi HYDRAL est le choix le plus intelligent en 2024
          </p>
        </motion.div>

        {/* Version Mobile - Cards */}
        <div className="lg:hidden space-y-6">
          {['HYDRAL', 'Marché', 'Bouteilles'].map((brand, brandIndex) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: brandIndex * 0.1 }}
              className={`rounded-2xl p-6 ${
                brand === 'HYDRAL' 
                  ? 'bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white ring-4 ring-[#D4AF37]' 
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={brand === 'HYDRAL' ? 'text-white' : 'text-gray-900'}>{brand}</h3>
                {brand === 'HYDRAL' && (
                  <div className="px-3 py-1 bg-[#D4AF37] text-white text-xs rounded-full font-medium">
                    ⭐ Meilleur choix
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="pb-3 border-b border-white/10 last:border-0">
                    <div className={`text-xs mb-1 ${brand === 'HYDRAL' ? 'text-white/70' : 'text-gray-500'}`}>
                      {feature.name}
                    </div>
                    <div className={`font-medium ${brand === 'HYDRAL' ? 'text-white' : 'text-gray-900'}`}>
                      {renderCell(feature[brand.toLowerCase().replace(' ', '') as keyof typeof feature])}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Version Desktop - Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden lg:block overflow-hidden rounded-2xl border-2 border-gray-200 shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-6 text-gray-900 font-medium w-1/4">Critères</th>
                  <th className="p-6 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-white text-xs rounded-full font-medium whitespace-nowrap">
                      ⭐ Meilleur choix
                    </div>
                    <div className="mt-2">HYDRAL</div>
                  </th>
                  <th className="p-6 text-gray-900 font-medium">Marché</th>
                  <th className="p-6 text-gray-900 font-medium">Bouteilles</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {features.map((feature, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="p-6 text-gray-900 font-medium">{feature.name}</td>
                    <td className="p-6 text-center bg-[#6B1E3E]/5 font-medium text-[#6B1E3E]">
                      {renderCell(feature.hydral)}
                    </td>
                    <td className="p-6 text-center">{renderCell(feature.marche)}</td>
                    <td className="p-6 text-center">{renderCell(feature.bouteilles)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Résumé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-[#6B1E3E]/5 rounded-2xl">
            <div className="text-4xl font-light text-[#6B1E3E] mb-2">-45%</div>
            <div className="text-sm text-gray-600">Moins cher que la concurrence premium</div>
          </div>
          <div className="text-center p-6 bg-[#6B1E3E]/5 rounded-2xl">
            <div className="text-4xl font-light text-[#6B1E3E] mb-2">5 ans</div>
            <div className="text-sm text-gray-600">La meilleure garantie du marché</div>
          </div>
          <div className="text-center p-6 bg-[#6B1E3E]/5 rounded-2xl">
            <div className="text-4xl font-light text-[#6B1E3E] mb-2">100%</div>
            <div className="text-sm text-gray-600">Toutes les fonctionnalités incluses</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}