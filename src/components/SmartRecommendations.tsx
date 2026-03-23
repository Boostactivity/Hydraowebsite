import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Users, Star, ArrowRight } from 'lucide-react';
import { Page } from '../App';

interface Recommendation {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  savings: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  matchScore?: number;
}

interface SmartRecommendationsProps {
  navigate: (page: Page) => void;
  userProfile?: 'couple' | 'family' | 'single';
}

export function SmartRecommendations({ navigate, userProfile = 'family' }: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Simulation d'algorithme de recommandation basé sur le profil
    const allRecommendations: Record<string, Recommendation[]> = {
      couple: [
        {
          id: 1,
          title: 'Robinet HYDRAO + Formule Essentielle',
          subtitle: 'Parfait pour 2 personnes',
          price: 549,
          savings: '62€/mois économisés',
          image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
          badge: '🔥 Meilleur choix pour vous',
          badgeColor: 'from-[#6B1E3E] to-[#8B2E4E]',
          popular: true,
          matchScore: 95
        },
        {
          id: 2,
          title: 'Robinet HYDRAO + Formule Premium',
          subtitle: 'Pour une eau parfaite 24/7',
          price: 629,
          savings: '95€/mois économisés',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
          badge: '✨ Upgrade recommandé',
          badgeColor: 'from-purple-600 to-purple-700',
          matchScore: 87
        }
      ],
      family: [
        {
          id: 1,
          title: 'Robinet HYDRAO + Formule Premium',
          subtitle: 'Idéal pour 4+ personnes',
          price: 629,
          savings: '128€/mois économisés',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
          badge: '🏆 #1 pour les familles',
          badgeColor: 'from-[#6B1E3E] to-[#8B2E4E]',
          popular: true,
          matchScore: 98
        },
        {
          id: 2,
          title: 'Robinet HYDRAO + Formule Confort',
          subtitle: 'Équilibre parfait qualité/prix',
          price: 589,
          savings: '95€/mois économisés',
          image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
          badge: '💰 Meilleur rapport qualité/prix',
          badgeColor: 'from-green-600 to-green-700',
          matchScore: 92
        }
      ],
      single: [
        {
          id: 1,
          title: 'Robinet HYDRAO + Formule Essentielle',
          subtitle: 'L\'essentiel sans superflu',
          price: 549,
          savings: '48€/mois économisés',
          image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
          badge: '🎯 Optimisé pour vous',
          badgeColor: 'from-[#6B1E3E] to-[#8B2E4E]',
          popular: true,
          matchScore: 94
        },
        {
          id: 2,
          title: 'Robinet HYDRAO + Formule Confort',
          subtitle: 'Plus de flexibilité',
          price: 589,
          savings: '62€/mois économisés',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
          badge: '⭐ Choix populaire',
          badgeColor: 'from-blue-600 to-blue-700',
          matchScore: 88
        }
      ]
    };

    setRecommendations(allRecommendations[userProfile] || allRecommendations.family);
  }, [userProfile]);

  return (
    <section className="section-padding bg-gradient-to-br from-[#FAF8F5] via-white to-[#E8D5DC]/10">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full mb-8 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Recommandé pour vous</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Votre configuration idéale
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Basé sur votre profil, nous avons sélectionné les meilleures options pour vous.
          </p>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 ${
                rec.popular ? 'border-[#6B1E3E] ring-4 ring-[#6B1E3E]/10' : 'border-gray-200'
              }`}
            >
              {/* Badge */}
              {rec.badge && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <div className={`px-4 py-2 bg-gradient-to-r ${rec.badgeColor} text-white rounded-full text-sm font-medium shadow-lg`}>
                    {rec.badge}
                  </div>
                </motion.div>
              )}

              {/* Match Score */}
              {rec.matchScore && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  className="absolute top-4 right-4 z-10"
                >
                  <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-[#6B1E3E]">{rec.matchScore}% match</span>
                  </div>
                </motion.div>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl text-gray-900 mb-2">{rec.title}</h3>
                <p className="text-sm text-gray-600 mb-6">{rec.subtitle}</p>

                {/* Price */}
                <div className="flex items-end gap-3 mb-4">
                  <div className="text-4xl font-light text-[#6B1E3E]">{rec.price}€</div>
                  <div className="text-sm text-gray-500 pb-1">TTC</div>
                </div>

                {/* Savings badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4" />
                  {rec.savings}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#6B1E3E] rounded-full" />
                    <span>Garantie 5 ans</span>
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => navigate('configurator')}
                  className={`w-full py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                    rec.popular
                      ? 'bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {rec.popular ? 'Choisir cette configuration' : 'Voir les détails'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Popular indicator */}
              {rec.popular && (
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-4 right-[-30px] w-32 bg-[#D4AF37] text-white text-xs font-medium py-1 text-center rotate-45 shadow-lg">
                    POPULAIRE
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
            <Users className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
            <div className="text-2xl font-light text-gray-900 mb-1">87%</div>
            <div className="text-sm text-gray-600">Choisissent nos recommandations</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
            <Star className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
            <div className="text-2xl font-light text-gray-900 mb-1">4.9/5</div>
            <div className="text-sm text-gray-600">Satisfaction configuration</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-light text-gray-900 mb-1">6 mois</div>
            <div className="text-sm text-gray-600">ROI moyen constaté</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}