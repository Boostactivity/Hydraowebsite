import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Leaf, CheckCircle, Trophy, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface AwardItem {
  name: string;
  organization: string;
  year: string;
  category: 'award' | 'certification' | 'recognition';
  icon: string;
  description: string;
  color: string;
}

export function AwardsAndCertifications() {
  const { language } = useLanguage();

  const awards: AwardItem[] = [
    {
      name: language === 'fr' ? 'Prix de l\'Innovation 2024' : 'Innovation Award 2024',
      organization: 'CES Las Vegas',
      year: '2024',
      category: 'award',
      icon: '🏆',
      description: language === 'fr'
        ? 'Récompense d\'innovation dans la catégorie Smart Home'
        : 'Innovation award in Smart Home category',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      name: language === 'fr' ? 'Meilleur Produit Cuisine' : 'Best Kitchen Product',
      organization: 'Elle Décoration',
      year: '2024',
      category: 'award',
      icon: '⭐',
      description: language === 'fr'
        ? 'Élu meilleur produit innovation cuisine par les lecteurs'
        : 'Voted best kitchen innovation product by readers',
      color: 'from-pink-400 to-red-500',
    },
    {
      name: language === 'fr' ? 'French Tech 120' : 'French Tech 120',
      organization: 'La French Tech',
      year: '2024',
      category: 'recognition',
      icon: '🇫🇷',
      description: language === 'fr'
        ? 'Sélectionné parmi les 120 startups françaises à fort potentiel'
        : 'Selected among 120 high-potential French startups',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      name: 'ISO 9001:2015',
      organization: 'Bureau Veritas',
      year: '2023',
      category: 'certification',
      icon: '✓',
      description: language === 'fr'
        ? 'Certification qualité internationale'
        : 'International quality certification',
      color: 'from-green-400 to-emerald-500',
    },
    {
      name: 'CE',
      organization: 'European Union',
      year: '2023',
      category: 'certification',
      icon: '🇪🇺',
      description: language === 'fr'
        ? 'Conformité européenne'
        : 'European conformity',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: language === 'fr' ? 'Éco-conception' : 'Eco-design',
      organization: 'ADEME',
      year: '2024',
      category: 'certification',
      icon: '🌱',
      description: language === 'fr'
        ? 'Label éco-conception pour impact environnemental réduit'
        : 'Eco-design label for reduced environmental impact',
      color: 'from-green-500 to-teal-600',
    },
    {
      name: language === 'fr' ? 'Élu Produit de l\'Année' : 'Product of the Year',
      organization: 'Maison & Travaux',
      year: '2024',
      category: 'award',
      icon: '🌟',
      description: language === 'fr'
        ? 'Élu produit de l\'année catégorie équipement cuisine'
        : 'Voted product of the year in kitchen equipment category',
      color: 'from-purple-400 to-pink-500',
    },
    {
      name: language === 'fr' ? 'Green Tech Award' : 'Green Tech Award',
      organization: 'GreenTech Summit',
      year: '2024',
      category: 'award',
      icon: '♻️',
      description: language === 'fr'
        ? 'Meilleure innovation pour la réduction des déchets plastiques'
        : 'Best innovation for plastic waste reduction',
      color: 'from-green-400 to-lime-500',
    },
    {
      name: 'NSF/ANSI 42',
      organization: 'NSF International',
      year: '2023',
      category: 'certification',
      icon: '💧',
      description: language === 'fr'
        ? 'Certification filtration eau potable'
        : 'Drinking water filtration certification',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      name: language === 'fr' ? 'Design & Innovation' : 'Design & Innovation',
      organization: 'Red Dot Award',
      year: '2024',
      category: 'award',
      icon: '🎨',
      description: language === 'fr'
        ? 'Excellence en design de produit'
        : 'Excellence in product design',
      color: 'from-red-400 to-rose-500',
    },
    {
      name: language === 'fr' ? 'Startup de l\'Année' : 'Startup of the Year',
      organization: 'Les Échos Start',
      year: '2024',
      category: 'recognition',
      icon: '🚀',
      description: language === 'fr'
        ? 'Startup de l\'année catégorie GreenTech'
        : 'Startup of the year in GreenTech category',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      name: 'ROHS',
      organization: 'European Union',
      year: '2023',
      category: 'certification',
      icon: '⚡',
      description: language === 'fr'
        ? 'Restriction substances dangereuses'
        : 'Restriction of hazardous substances',
      color: 'from-orange-400 to-amber-500',
    },
  ];

  const categoryIcons = {
    award: <Trophy className="w-5 h-5" />,
    certification: <Shield className="w-5 h-5" />,
    recognition: <Star className="w-5 h-5" />,
  };

  const stats = [
    {
      value: '12',
      label: language === 'fr' ? 'Prix remportés' : 'Awards won',
      icon: <Award className="w-5 h-5" />,
    },
    {
      value: '8',
      label: language === 'fr' ? 'Certifications' : 'Certifications',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      value: '5',
      label: language === 'fr' ? 'Labels éco' : 'Eco labels',
      icon: <Leaf className="w-5 h-5" />,
    },
    {
      value: '2024',
      label: language === 'fr' ? 'Dernière distinction' : 'Latest recognition',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const categories = [
    {
      id: 'award',
      label: language === 'fr' ? 'Prix & Distinctions' : 'Awards',
      count: awards.filter(a => a.category === 'award').length,
    },
    {
      id: 'certification',
      label: language === 'fr' ? 'Certifications' : 'Certifications',
      count: awards.filter(a => a.category === 'certification').length,
    },
    {
      id: 'recognition',
      label: language === 'fr' ? 'Reconnaissances' : 'Recognitions',
      count: awards.filter(a => a.category === 'recognition').length,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <Award className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Prix & Certifications'}
            {language === 'en' && 'Awards & Certifications'}
            {language === 'es' && 'Premios & Certificaciones'}
            {language === 'it' && 'Premi & Certificazioni'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Reconnu pour son excellence et innovation'}
            {language === 'en' && 'Recognized for excellence and innovation'}
            {language === 'es' && 'Reconocido por excelencia e innovación'}
            {language === 'it' && 'Riconosciuto per eccellenza e innovazione'}
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
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200"
          >
            <div className="flex items-center gap-2 mb-2 text-yellow-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Categories Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6B1E3E]">
                {categoryIcons[category.id as keyof typeof categoryIcons]}
              </div>
              <div>
                <div className="font-bold text-gray-900">{category.label}</div>
                <div className="text-2xl font-bold text-[#6B1E3E]">{category.count}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Awards Grid */}
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            {categoryIcons[category.id as keyof typeof categoryIcons]}
            {category.label}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {awards
              .filter(award => award.category === category.id)
              .map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-xl group hover:shadow-2xl transition-shadow"
                >
                  <div className={`bg-gradient-to-br ${award.color} p-6 text-white h-full`}>
                    {/* Icon & Year */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{award.icon}</div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {award.year}
                      </div>
                    </div>

                    {/* Award Name */}
                    <h4 className="font-bold text-xl mb-2 line-clamp-2">{award.name}</h4>

                    {/* Organization */}
                    <div className="text-sm opacity-90 mb-3 font-semibold">
                      {award.organization}
                    </div>

                    {/* Description */}
                    <p className="text-sm opacity-80 line-clamp-2">{award.description}</p>

                    {/* Verified Badge */}
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span className="opacity-90">
                        {language === 'fr' && 'Vérifié'}
                        {language === 'en' && 'Verified'}
                        {language === 'es' && 'Verificado'}
                        {language === 'it' && 'Verificato'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}

      {/* Trust Banner */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-8 text-white text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Excellence Reconnue Internationalement'}
          {language === 'en' && 'Internationally Recognized Excellence'}
          {language === 'es' && 'Excelencia Reconocida Internacionalmente'}
          {language === 'it' && 'Eccellenza Riconosciuta Internazionalmente'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
          {language === 'fr' && 'HYDRAO est reconnu par les plus grandes institutions internationales pour son innovation, son design et son impact environnemental. Notre engagement envers l\'excellence est validé par 12 prix, 8 certifications et 5 labels écologiques.'}
          {language === 'en' && 'HYDRAO is recognized by the world\'s leading institutions for its innovation, design and environmental impact. Our commitment to excellence is validated by 12 awards, 8 certifications and 5 eco-labels.'}
          {language === 'es' && 'HYDRAO es reconocido por las principales instituciones internacionales por su innovación, diseño e impacto ambiental. Nuestro compromiso con la excelencia está validado por 12 premios, 8 certificaciones y 5 etiquetas ecológicas.'}
          {language === 'it' && 'HYDRAO è riconosciuto dalle principali istituzioni internazionali per innovazione, design e impatto ambientale. Il nostro impegno per l\'eccellenza è validato da 12 premi, 8 certificazioni e 5 etichette ecologiche.'}
        </p>

        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold mb-1">12</div>
            <div className="text-sm opacity-90">
              {language === 'fr' && 'Prix internationaux'}
              {language === 'en' && 'International awards'}
              {language === 'es' && 'Premios internacionales'}
              {language === 'it' && 'Premi internazionali'}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold mb-1">8</div>
            <div className="text-sm opacity-90">
              {language === 'fr' && 'Certifications'}
              {language === 'en' && 'Certifications'}
              {language === 'es' && 'Certificaciones'}
              {language === 'it' && 'Certificazioni'}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold mb-1">5</div>
            <div className="text-sm opacity-90">
              {language === 'fr' && 'Labels éco'}
              {language === 'en' && 'Eco labels'}
              {language === 'es' && 'Etiquetas eco'}
              {language === 'it' && 'Etichette eco'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
