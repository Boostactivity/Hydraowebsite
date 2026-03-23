import { motion } from 'motion/react';
import { Tv, Newspaper, Radio, Award, Quote } from 'lucide-react';

export function MediaSection() {
  const mediaLogos = [
    { name: 'TF1', category: 'TV' },
    { name: 'France 2', category: 'TV' },
    { name: 'Le Figaro', category: 'Presse' },
    { name: 'Les Échos', category: 'Presse' },
    { name: 'RTL', category: 'Radio' },
    { name: 'Europe 1', category: 'Radio' },
  ];

  const awards = [
    {
      icon: Award,
      title: 'Innovation 2024',
      organization: 'Observatoire de l\'Innovation',
      year: '2024'
    },
    {
      icon: Award,
      title: 'Élu Produit de l\'Année',
      organization: 'Catégorie Équipement Cuisine',
      year: '2024'
    },
    {
      icon: Award,
      title: 'Prix de l\'Éco-Design',
      organization: 'Salon Maison & Objet',
      year: '2023'
    }
  ];

  const pressQuotes = [
    {
      quote: "HYDRAO révolutionne notre rapport à l'eau au quotidien avec une technologie accessible.",
      source: "Le Figaro",
      date: "Décembre 2024"
    },
    {
      quote: "Un robinet premium 5-en-1 à prix révolutionnaire : 490€ là où le marché affiche 1500-3000€. HYDRAO démocratise le robinet intelligent.",
      source: "Les Échos",
      date: "Novembre 2024"
    },
    {
      quote: "Un robinet 5-en-1 qui allie design premium et impact environnemental positif.",
      source: "Maison & Travaux",
      date: "Octobre 2024"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8 border border-[#6B1E3E]/20"
          >
            <Tv className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Dans les médias</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Ils parlent de nous
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            HYDRAO fait l'unanimité auprès des médias et experts du secteur.
          </p>
        </motion.div>

        {/* Media Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {mediaLogos.map((media, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg transition-all"
              >
                <div className="text-2xl font-light text-gray-900 mb-2">{media.name}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{media.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Press Quotes */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl text-gray-900 mb-2">Ce qu'en dit la presse</h3>
            <p className="text-gray-600">Des retours unanimes sur l'innovation HYDRAO</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressQuotes.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-[#FAF8F5] to-white p-8 rounded-2xl border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg transition-all"
              >
                <Quote className="w-8 h-8 text-[#6B1E3E]/20 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{item.source}</span>
                  <span className="text-gray-500">{item.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl text-gray-900 mb-2">Récompenses & Distinctions</h3>
          <p className="text-gray-600">Reconnu pour son innovation et son impact positif</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-gradient-to-br from-white via-[#FAF8F5] to-white p-8 rounded-3xl border-2 border-[#D4AF37]/30 shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 mb-4"
              >
                <award.icon className="w-8 h-8 text-[#D4AF37]" />
              </motion.div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{award.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{award.organization}</p>
              <p className="text-xs text-gray-500">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}