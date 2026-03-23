import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Baby, Heart, Briefcase, Home, TrendingUp } from 'lucide-react';
import { Page } from '../App';

interface PersonalizedHeroProps {
  navigate: (page: Page) => void;
}

type UserProfile = 'family' | 'couple' | 'single' | 'professional' | 'ecoconscious' | 'default';

interface ProfileContent {
  icon: any;
  badge: string;
  headline: string;
  subheadline: string;
  benefit1: string;
  benefit2: string;
  benefit3: string;
  savings: string;
  roi: string;
  cta: string;
  testimonial: {
    quote: string;
    author: string;
    image: string;
  };
}

export function PersonalizedHero({ navigate }: PersonalizedHeroProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>('default');
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  useEffect(() => {
    // Détection intelligente basée sur l'heure, comportement, etc.
    const hour = new Date().getHours();
    const dayOfWeek = new Date().getDay();

    // Simulation de détection
    if (hour >= 7 && hour <= 9) {
      setUserProfile('family'); // Matin = familles
    } else if (hour >= 12 && hour <= 14) {
      setUserProfile('professional'); // Midi = professionnels
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      setUserProfile('ecoconscious'); // Weekend = éco-conscients
    } else {
      setUserProfile('couple');
    }
  }, []);

  const profiles: Record<UserProfile, ProfileContent> = {
    family: {
      icon: Users,
      badge: '👨‍👩‍👧‍👦 Parfait pour les familles',
      headline: 'Simplifiez la vie de toute votre famille',
      subheadline: 'Eau bouillante pour les biberons, eau filtrée pour les enfants, eau pétillante pour les ados. Tout le monde est content.',
      benefit1: 'Biberons à température parfaite en 3 secondes',
      benefit2: 'Eau ultra-pure sans microplastiques pour vos enfants',
      benefit3: 'Plus besoin de porter des packs d\'eau dans les escaliers',
      savings: '1 000€/an',
      roi: '6 mois',
      cta: 'Calculer mes économies familiales',
      testimonial: {
        quote: 'Avec 3 enfants, HYDRAO a transformé notre quotidien. Plus de biberons qui refroidissent, plus de courses d\'eau !',
        author: 'Marie & Thomas, Paris',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'
      }
    },
    couple: {
      icon: Heart,
      badge: '💑 Idéal pour les couples',
      headline: 'Le confort premium que vous méritez',
      subheadline: 'Thé du matin instantané, eau gazeuse pour l\'apéro, cuisine design. Votre quotidien en mieux.',
      benefit1: 'Thé ou café prêt en 3 secondes chaque matin',
      benefit2: 'Eau gazeuse illimitée pour vos apéros',
      benefit3: 'Design premium qui sublime votre cuisine',
      savings: '500€/an',
      roi: '12 mois',
      cta: 'Découvrir mon ROI',
      testimonial: {
        quote: 'On ne pensait pas que ça changerait autant notre quotidien. C\'est devenu indispensable !',
        author: 'Sophie & Marc, Lyon',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'
      }
    },
    single: {
      icon: Home,
      badge: '🏠 Optimisé pour vous',
      headline: 'L\'essentiel, sans le superflu',
      subheadline: 'Eau filtrée pure, eau bouillante instantanée. Tout ce dont vous avez besoin, rien de plus.',
      benefit1: 'Plus jamais attendre que l\'eau chauffe',
      benefit2: 'Économisez au minimum 48€/mois sur l\'eau en bouteille',
      benefit3: 'Livraison rapide sous 7 jours',
      savings: '580€/an',
      roi: '10 mois',
      cta: 'Voir ma configuration idéale',
      testimonial: {
        quote: 'Rentabilisé en moins d\'un an et ma cuisine est tellement plus belle maintenant.',
        author: 'Alexandre, Bordeaux',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      }
    },
    professional: {
      icon: Briefcase,
      badge: '💼 Pour les professionnels exigeants',
      headline: 'Temps = argent. HYDRAO vous fait gagner les deux.',
      subheadline: 'Plus de temps perdu, eau parfaite instantanément. ROI en 6 mois. Déduction fiscale possible.',
      benefit1: 'Gain de temps : 2h/semaine économisées',
      benefit2: 'ROI rapide avec économies mesurables',
      benefit3: 'Déduction fiscale possible (équipement pro)',
      savings: '850€/an',
      roi: '7 mois',
      cta: 'Calculer mon ROI professionnel',
      testimonial: {
        quote: 'En tant qu\'entrepreneur, chaque minute compte. HYDRAO me fait gagner du temps et de l\'argent.',
        author: 'Thomas, CEO',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
      }
    },
    ecoconscious: {
      icon: TrendingUp,
      badge: '🌱 Engagement écologique',
      headline: 'Votre impact positif commence ici',
      subheadline: '2 400 bouteilles plastique évitées par an. 156 kg de CO₂ économisés. Un geste concret pour la planète.',
      benefit1: '2 400 bouteilles plastique évitées chaque année',
      benefit2: '156 kg de CO₂ non émis annuellement',
      benefit3: '0 microplastique vs 240 000 par bouteille',
      savings: '720€/an',
      roi: '8 mois',
      cta: 'Voir mon impact environnemental',
      testimonial: {
        quote: 'Fini la culpabilité des bouteilles plastique. Mon empreinte carbone a vraiment baissé !',
        author: 'Julie, Marseille',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
      }
    },
    default: {
      icon: Home,
      badge: '✨ Découvrez HYDRAO',
      headline: 'Eau bouillante, filtrée, pétillante. Un seul robinet.',
      subheadline: 'Arrêtez d\'acheter des bouteilles. Arrêtez d\'attendre que l\'eau chauffe. Tout ce dont vous avez besoin, instantanément.',
      benefit1: '5 types d\'eau en un seul robinet',
      benefit2: 'Économies réelles dès le premier mois',
      benefit3: 'Garantie 5 ans sur tout le système',
      savings: '500-1200€/an',
      roi: '6-12 mois',
      cta: 'Calculer mes économies',
      testimonial: {
        quote: 'Le meilleur investissement pour ma cuisine. Je recommande à 100% !',
        author: 'Client HYDRAO',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
      }
    }
  };

  const currentContent = profiles[userProfile];
  const Icon = currentContent.icon;

  const profileOptions: { key: UserProfile; label: string; icon: any }[] = [
    { key: 'family', label: 'Famille', icon: Users },
    { key: 'couple', label: 'Couple', icon: Heart },
    { key: 'single', label: 'Solo', icon: Home },
    { key: 'professional', label: 'Pro', icon: Briefcase },
    { key: 'ecoconscious', label: 'Éco', icon: TrendingUp }
  ];

  return (
    <section className="relative pt-8 pb-24 lg:pt-12 lg:pb-32 overflow-hidden bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#E8D5DC]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-[#6B1E3E]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Profile Selector */}
      <div className="relative section-container mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="text-sm text-gray-600">Afficher pour :</span>
          <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-md border border-gray-200">
            {profileOptions.map((option) => {
              const OptionIcon = option.icon;
              return (
                <motion.button
                  key={option.key}
                  onClick={() => setUserProfile(option.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    userProfile === option.key
                      ? 'bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <OptionIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            key={userProfile}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm border-2 border-[#6B1E3E]/20 rounded-full mb-6 shadow-lg"
            >
              <Icon className="w-5 h-5 text-[#6B1E3E]" />
              <span className="text-sm text-gray-900 font-medium">{currentContent.badge}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-gray-900"
              >
                {currentContent.headline}
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-[#6B5E54] mb-8 leading-relaxed"
            >
              {currentContent.subheadline}
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              {[currentContent.benefit1, currentContent.benefit2, currentContent.benefit3].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#6B1E3E] rounded-full" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-8 p-6 bg-gradient-to-r from-[#6B1E3E]/5 to-[#D4AF37]/5 rounded-2xl border border-[#6B1E3E]/20 mb-8"
            >
              <div>
                <div className="text-3xl font-light text-[#6B1E3E] mb-1">{currentContent.savings}</div>
                <div className="text-sm text-gray-600">économisés/an</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div>
                <div className="text-3xl font-light text-[#6B1E3E] mb-1">{currentContent.roi}</div>
                <div className="text-sm text-gray-600">ROI moyen</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              onClick={() => navigate('savings')}
              className="px-10 py-5 gradient-bordeaux text-white rounded-full shadow-lg hover:shadow-xl font-medium text-lg transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentContent.cta} →
            </motion.button>
          </motion.div>

          {/* Right: Testimonial Card */}
          <motion.div
            key={`testimonial-${userProfile}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={currentContent.testimonial.image}
                  alt={currentContent.testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <svg className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-900 font-medium">{currentContent.testimonial.author}</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "{currentContent.testimonial.quote}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}