import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Home, TrendingUp, Clock, Leaf, Heart, ChevronDown, ChevronUp, Star, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  customer: string;
  profile: string;
  location: string;
  situation: string;
  challenges: string[];
  solution: string;
  results: {
    financial: { amount: string; period: string };
    time: { saved: string; period: string };
    environmental: { bottles: string; co2: string };
    lifestyle: string[];
  };
  testimonial: string;
  timeline: string;
  rating: number;
  image: string;
}

interface DetailedCaseStudiesProps {
  className?: string;
}

export function DetailedCaseStudies({ className = '' }: DetailedCaseStudiesProps) {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      customer: 'Famille Dubois',
      profile: 'Couple avec 2 enfants (8 et 12 ans)',
      location: 'Appartement 85m², Lyon 6ème',
      situation: 'Forte consommation d\'eau en bouteille (8-10L/jour), bouilloire électrique utilisée 12-15 fois par jour pour thés et cafés',
      challenges: [
        'Budget eau en bouteille : 120€/mois',
        'Courses hebdomadaires lourdes (3 packs de 6 bouteilles)',
        'Stockage problématique (petit appartement)',
        'Attente bouilloire frustrante le matin',
        'Préoccupations santé (microplastiques)'
      ],
      solution: 'Installation HYDRAO Chrome avec modules Eau Filtrée + Eau Bouillante + Eau Pétillante en janvier 2023',
      results: {
        financial: { amount: '1 350€', period: 'première année' },
        time: { saved: '2h30', period: 'par semaine' },
        environmental: { bottles: '2 880', co2: '187kg' },
        lifestyle: [
          'Petit-déjeuner 15 min plus rapide',
          'Enfants autonomes pour leur thé',
          'Gain de place dans le placard',
          'Fini les courses bouteilles',
          'Eau pétillante à volonté le soir'
        ]
      },
      testimonial: 'HYDRAO a changé notre quotidien. Les enfants peuvent se servir de l\'eau chaude en toute sécurité grâce au bouton sécurisé. On ne se voyait plus revenir aux bouteilles. C\'est rentabilisé depuis 5 mois et on continue d\'économiser.',
      timeline: '18 mois d\'utilisation',
      rating: 5,
      image: '👨‍👩‍👧‍👦'
    },
    {
      id: '2',
      customer: 'Sophie Martin',
      profile: 'Consultante freelance, célibataire',
      location: 'Studio 35m², Paris 11ème',
      situation: 'Petit espace, budget serré, consommation importante de thé vert (8-10 tasses/jour) pour rester concentrée',
      challenges: [
        'Bouilloire prend de la place',
        'Attend 2-3 min entre chaque tasse',
        'Eau du robinet goût chlore',
        'Budget bouteilles : 45€/mois',
        'Pas de place pour stocker'
      ],
      solution: 'Installation HYDRAO Noir Mat avec modules Eau Filtrée + Eau Bouillante en mars 2023',
      results: {
        financial: { amount: '580€', period: 'première année' },
        time: { saved: '45min', period: 'par semaine' },
        environmental: { bottles: '960', co2: '62kg' },
        lifestyle: [
          'Thé prêt en 5 secondes',
          'Productivité améliorée',
          'Cuisine plus spacieuse',
          'Eau pure sans chlore',
          'Design premium valorisant'
        ]
      },
      testimonial: 'En télétravail, j\'enchaîne les thés toute la journée. HYDRAO m\'a fait gagner un temps fou. Plus besoin d\'attendre la bouilloire entre deux appels. Et l\'esthétique noir mat sublime ma petite cuisine.',
      timeline: '15 mois d\'utilisation',
      rating: 5,
      image: '👩‍💼'
    },
    {
      id: '3',
      customer: 'Marc & Julie Rousseau',
      profile: 'Couple de retraités actifs',
      location: 'Maison 120m², Bordeaux',
      situation: 'Soucieux de l\'environnement, budget confortable mais préoccupés par le gaspillage et les déchets plastiques',
      challenges: [
        'Conscience écologique forte',
        'Porter les packs devient difficile',
        'Voiture diesel pour courses (empreinte carbone)',
        'Tri des bouteilles contraignant',
        'Culpabilité déchets plastiques'
      ],
      solution: 'Installation HYDRAO Champagne avec modules Eau Filtrée + Eau Pétillante + Eau Bouillante en septembre 2022',
      results: {
        financial: { amount: '1 100€', period: 'première année' },
        time: { saved: '1h30', period: 'par semaine' },
        environmental: { bottles: '3 120', co2: '203kg' },
        lifestyle: [
          'Impact environnemental réduit',
          'Apéritif pétillant quotidien',
          'Fini le port de charges',
          'Fierté du choix écologique',
          'Recommandé à 8 amis'
        ]
      },
      testimonial: 'À notre âge, porter des packs d\'eau devenait pénible. Mais surtout, on culpabilisait de jeter autant de plastique. HYDRAO a résolu ces deux problèmes. On est fiers de montrer notre robinet aux amis et de leur expliquer l\'impact environnemental.',
      timeline: '26 mois d\'utilisation',
      rating: 5,
      image: '👴👵'
    }
  ];

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <section className={`section-padding bg-gradient-to-br from-[#FAF8F5] to-white ${className}`}>
      <div className="section-container max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Études de Cas Détaillées</span>
          </motion.div>

          <h2 className="mb-6 text-gray-900">
            Histoires vraies
            <span className="block text-[#6B1E3E]">de clients HYDRAO</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez en détail comment HYDRAO a transformé le quotidien de vraies familles
          </p>
        </motion.div>

        {/* Case studies */}
        <div className="space-y-6">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
            >
              {/* Header - Always visible */}
              <button
                onClick={() => toggleCase(study.id)}
                className="w-full p-6 md:p-8 flex items-start gap-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="text-6xl flex-shrink-0">{study.image}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-1">{study.customer}</h3>
                      <p className="text-sm text-gray-600">{study.profile} • {study.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(study.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{study.situation}</p>

                  {/* Quick results - Always visible */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-light text-green-600">{study.results.financial.amount}</div>
                      <div className="text-xs text-gray-600">économisés</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-light text-blue-600">{study.results.time.saved}</div>
                      <div className="text-xs text-gray-600">gagnées/sem</div>
                    </div>
                    <div className="text-center p-3 bg-[#6B1E3E]/5 rounded-xl">
                      <Leaf className="w-5 h-5 text-[#6B1E3E] mx-auto mb-1" />
                      <div className="text-lg font-light text-[#6B1E3E]">{study.results.environmental.bottles}</div>
                      <div className="text-xs text-gray-600">bouteilles évitées</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#6B1E3E] font-medium">
                    <span>{expandedCase === study.id ? 'Voir moins' : 'Lire l\'étude complète'}</span>
                    {expandedCase === study.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedCase === study.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-gray-200">
                      {/* Challenges */}
                      <div className="mb-8">
                        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                          <Home className="w-5 h-5 text-[#6B1E3E]" />
                          Situation avant HYDRAO
                        </h4>
                        <ul className="space-y-2">
                          {study.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-red-500 mt-1">❌</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solution */}
                      <div className="mb-8 p-6 bg-[#6B1E3E]/5 rounded-2xl border border-[#6B1E3E]/20">
                        <h4 className="text-lg font-medium text-[#6B1E3E] mb-3">
                          Solution mise en place
                        </h4>
                        <p className="text-gray-700">{study.solution}</p>
                      </div>

                      {/* Detailed results */}
                      <div className="mb-8">
                        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          Résultats après {study.timeline}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Financial */}
                          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                              <h5 className="font-medium text-green-900">Impact Financier</h5>
                            </div>
                            <div className="text-3xl font-light text-green-600 mb-1">
                              {study.results.financial.amount}
                            </div>
                            <div className="text-sm text-gray-600">
                              économisés sur {study.results.financial.period}
                            </div>
                          </div>

                          {/* Environmental */}
                          <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Leaf className="w-5 h-5 text-[#D4AF37]" />
                              <h5 className="font-medium text-gray-900">Impact Environnemental</h5>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bouteilles évitées</span>
                                <span className="font-medium text-gray-900">{study.results.environmental.bottles}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">CO₂ économisé</span>
                                <span className="font-medium text-gray-900">{study.results.environmental.co2}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lifestyle improvements */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-blue-900">Amélioration du quotidien</h5>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {study.results.lifestyle.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-6">
                        <div className="text-4xl mb-4">💬</div>
                        <blockquote className="text-lg italic mb-4">
                          "{study.testimonial}"
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <p className="text-white/90">— {study.customer}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(study.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            Votre histoire pourrait être la prochaine
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all">
            Calculer mes économies personnalisées
          </button>
        </motion.div>
      </div>
    </section>
  );
}
