import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Video, Calendar, Users, Clock, CheckCircle, Award, TrendingUp, Play, Download, Star, Gift } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar: string;
  attendees: number;
  maxAttendees: number;
  category: 'installation' | 'optimization' | 'maintenance' | 'recipes';
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'upcoming' | 'live' | 'replay';
  topics: string[];
  bonuses: string[];
}

export function Webinars() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const webinars: Webinar[] = [
    {
      id: '1',
      title: language === 'fr' 
        ? 'Installation HYDRAO de A à Z : Guide complet'
        : 'HYDRAO Installation A to Z: Complete Guide',
      description: language === 'fr'
        ? 'Apprenez à installer votre HYDRAO en 60 minutes avec notre expert. Toutes les étapes détaillées, astuces pro et réponses à vos questions en direct.'
        : 'Learn to install your HYDRAO in 60 minutes with our expert. All detailed steps, pro tips and live Q&A.',
      date: '2024-12-28',
      time: '18:00',
      duration: '90 min',
      speaker: 'Marc Lefebvre',
      speakerRole: language === 'fr' ? 'Expert Installation' : 'Installation Expert',
      speakerAvatar: '👨‍🔧',
      attendees: 342,
      maxAttendees: 500,
      category: 'installation',
      level: 'beginner',
      status: 'upcoming',
      topics: [
        language === 'fr' ? 'Préparation et outils nécessaires' : 'Preparation and required tools',
        language === 'fr' ? 'Installation étape par étape' : 'Step-by-step installation',
        language === 'fr' ? 'Raccordement eau et électricité' : 'Water and electricity connection',
        language === 'fr' ? 'Tests et mise en service' : 'Testing and commissioning',
        language === 'fr' ? 'Q&A en direct' : 'Live Q&A',
      ],
      bonuses: [
        language === 'fr' ? 'PDF guide installation téléchargeable' : 'Downloadable installation PDF guide',
        language === 'fr' ? 'Checklist pré-installation' : 'Pre-installation checklist',
        language === 'fr' ? 'Vidéo replay 30 jours' : '30-day replay access',
      ],
    },
    {
      id: '2',
      title: language === 'fr'
        ? 'Optimisez vos économies : 10 astuces HYDRAO'
        : 'Maximize Your Savings: 10 HYDRAO Tips',
      description: language === 'fr'
        ? 'Découvrez comment maximiser vos économies avec HYDRAO. Réglages optimaux, usage intelligent et astuces pour économiser jusqu\'à 400€/mois.'
        : 'Discover how to maximize your savings with HYDRAO. Optimal settings, smart usage and tips to save up to $435/month.',
      date: '2024-12-30',
      time: '19:00',
      duration: '60 min',
      speaker: 'Sophie Martin',
      speakerRole: language === 'fr' ? 'Experte Économies' : 'Savings Expert',
      speakerAvatar: '💰',
      attendees: 567,
      maxAttendees: 1000,
      category: 'optimization',
      level: 'intermediate',
      status: 'upcoming',
      topics: [
        language === 'fr' ? 'Calculer vos économies réelles' : 'Calculate your real savings',
        language === 'fr' ? 'Réglages pour eau gazeuse parfaite' : 'Settings for perfect sparkling water',
        language === 'fr' ? 'Optimiser consommation filtres' : 'Optimize filter consumption',
        language === 'fr' ? 'Remplacer toutes vos bouteilles' : 'Replace all your bottles',
        language === 'fr' ? 'ROI en moins de 6 mois' : 'ROI in under 6 months',
      ],
      bonuses: [
        language === 'fr' ? 'Calculateur économies Excel' : 'Excel savings calculator',
        language === 'fr' ? 'Guide comparatif bouteilles' : 'Bottle comparison guide',
        language === 'fr' ? 'Code promo filtres -20%' : 'Filter promo code -20%',
      ],
    },
    {
      id: '3',
      title: language === 'fr'
        ? 'Maintenance HYDRAO : Prolongez la durée de vie'
        : 'HYDRAO Maintenance: Extend Lifespan',
      description: language === 'fr'
        ? 'Maintenez votre HYDRAO en parfait état. Nettoyage, changement filtres, détartrage et entretien préventif pour 10+ ans de service.'
        : 'Keep your HYDRAO in perfect condition. Cleaning, filter changes, descaling and preventive maintenance for 10+ years of service.',
      date: '2025-01-05',
      time: '17:00',
      duration: '45 min',
      speaker: 'Thomas Dubois',
      speakerRole: language === 'fr' ? 'Technicien Senior' : 'Senior Technician',
      speakerAvatar: '🔧',
      attendees: 189,
      maxAttendees: 300,
      category: 'maintenance',
      level: 'intermediate',
      status: 'upcoming',
      topics: [
        language === 'fr' ? 'Planning maintenance mensuel' : 'Monthly maintenance schedule',
        language === 'fr' ? 'Changement filtres en 5 min' : '5-minute filter change',
        language === 'fr' ? 'Détartrage et nettoyage' : 'Descaling and cleaning',
        language === 'fr' ? 'Diagnostics pannes courantes' : 'Common issue diagnostics',
        language === 'fr' ? 'Garantie et SAV' : 'Warranty and support',
      ],
      bonuses: [
        language === 'fr' ? 'Calendrier maintenance PDF' : 'PDF maintenance calendar',
        language === 'fr' ? 'Vidéo changement filtre' : 'Filter change video',
        language === 'fr' ? 'Bon réduction pièces -15%' : 'Parts discount -15%',
      ],
    },
    {
      id: '4',
      title: language === 'fr'
        ? '50 Recettes HYDRAO : Boissons & Cocktails'
        : '50 HYDRAO Recipes: Drinks & Cocktails',
      description: language === 'fr'
        ? 'Transformez votre HYDRAO en bar professionnel. 50 recettes de boissons, cocktails, thés glacés et sodas maison avec notre mixologue expert.'
        : 'Transform your HYDRAO into a professional bar. 50 recipes for drinks, cocktails, iced teas and homemade sodas with our expert mixologist.',
      date: '2025-01-08',
      time: '20:00',
      duration: '75 min',
      speaker: 'Emma Rousseau',
      speakerRole: language === 'fr' ? 'Mixologue' : 'Mixologist',
      speakerAvatar: '🍹',
      attendees: 723,
      maxAttendees: 1000,
      category: 'recipes',
      level: 'beginner',
      status: 'upcoming',
      topics: [
        language === 'fr' ? 'Cocktails sans alcool' : 'Non-alcoholic cocktails',
        language === 'fr' ? 'Thés glacés aromatisés' : 'Flavored iced teas',
        language === 'fr' ? 'Sodas maison healthy' : 'Healthy homemade sodas',
        language === 'fr' ? 'Eaux détox infusées' : 'Infused detox waters',
        language === 'fr' ? 'Démonstration live' : 'Live demonstration',
      ],
      bonuses: [
        language === 'fr' ? 'E-book 50 recettes' : '50-recipe e-book',
        language === 'fr' ? 'Fiches recettes imprimables' : 'Printable recipe cards',
        language === 'fr' ? 'Liste courses optimale' : 'Optimal shopping list',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: language === 'fr' ? 'Tous les webinars' : 'All webinars', count: webinars.length },
    { id: 'installation', label: 'Installation', count: webinars.filter(w => w.category === 'installation').length },
    { id: 'optimization', label: language === 'fr' ? 'Optimisation' : 'Optimization', count: webinars.filter(w => w.category === 'optimization').length },
    { id: 'maintenance', label: 'Maintenance', count: webinars.filter(w => w.category === 'maintenance').length },
    { id: 'recipes', label: language === 'fr' ? 'Recettes' : 'Recipes', count: webinars.filter(w => w.category === 'recipes').length },
  ];

  const stats = [
    {
      value: '48',
      label: language === 'fr' ? 'Webinars/an' : 'Webinars/year',
      icon: <Video className="w-5 h-5" />,
    },
    {
      value: '12 400+',
      label: language === 'fr' ? 'Participants' : 'Participants',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '4.9/5',
      label: language === 'fr' ? 'Satisfaction' : 'Satisfaction',
      icon: <Star className="w-5 h-5" />,
    },
    {
      value: '92%',
      label: language === 'fr' ? 'Taux réussite' : 'Success rate',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const filteredWebinars = selectedCategory === 'all'
    ? webinars
    : webinars.filter(w => w.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'green';
      case 'intermediate': return 'orange';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return language === 'fr' ? 'Débutant' : 'Beginner';
      case 'intermediate': return language === 'fr' ? 'Intermédiaire' : 'Intermediate';
      case 'advanced': return language === 'fr' ? 'Avancé' : 'Advanced';
      default: return level;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <Video className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Webinars HYDRAO'}
            {language === 'en' && 'HYDRAO Webinars'}
            {language === 'es' && 'Webinars HYDRAO'}
            {language === 'it' && 'Webinar HYDRAO'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Formations live avec nos experts'}
            {language === 'en' && 'Live training with our experts'}
            {language === 'es' && 'Formación en vivo con nuestros expertos'}
            {language === 'it' && 'Formazione live con i nostri esperti'}
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
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200"
          >
            <div className="flex items-center gap-2 mb-2 text-red-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Webinars List */}
      <div className="space-y-6">
        {filteredWebinars.map((webinar, index) => (
          <motion.div
            key={webinar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-[#6B1E3E] hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl flex-shrink-0">{webinar.speakerAvatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-2">{webinar.title}</h3>
                    <div className={`bg-${getLevelColor(webinar.level)}-100 text-${getLevelColor(webinar.level)}-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap`}>
                      {getLevelLabel(webinar.level)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{webinar.description}</p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(webinar.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {webinar.time} ({webinar.duration})
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {webinar.attendees}/{webinar.maxAttendees}
                    </div>
                  </div>

                  {/* Speaker */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'fr' ? 'Animé par' : 'Hosted by'}
                    </div>
                    <div className="font-bold text-gray-900">{webinar.speaker}</div>
                    <div className="text-sm text-gray-600">{webinar.speakerRole}</div>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {language === 'fr' ? 'Au programme' : 'Topics covered'}
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {webinar.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#6B1E3E] rounded-full flex-shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonuses */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200 mb-4">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-600" />
                  {language === 'fr' ? 'Bonus inclus' : 'Included bonuses'}
                </h4>
                <div className="space-y-1">
                  {webinar.bonuses.map((bonus, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {bonus}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <button className="flex-1 px-6 py-3 bg-[#6B1E3E] text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  {language === 'fr' ? 'S\'inscrire gratuitement' : 'Register for free'}
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {language === 'fr' ? 'Info' : 'Info'}
                </button>
              </div>

              {/* Attendees Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>
                    {language === 'fr' ? 'Places réservées' : 'Reserved seats'}
                  </span>
                  <span className="font-semibold">
                    {Math.round((webinar.attendees / webinar.maxAttendees) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#6B1E3E] to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${(webinar.attendees / webinar.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Bottom */}
      <div className="mt-6 bg-gradient-to-br from-[#6B1E3E] to-red-600 rounded-xl p-8 text-white text-center">
        <Video className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-2">
          {language === 'fr' && 'Rejoignez nos webinars gratuits'}
          {language === 'en' && 'Join our free webinars'}
          {language === 'es' && 'Únete a nuestros webinars gratuitos'}
          {language === 'it' && 'Unisciti ai nostri webinar gratuiti'}
        </h3>
        <p className="text-lg opacity-90 mb-4">
          {language === 'fr' && '4 webinars par mois • 12 400+ participants • 4.9/5 satisfaction'}
          {language === 'en' && '4 webinars per month • 12,400+ participants • 4.9/5 satisfaction'}
          {language === 'es' && '4 webinars por mes • 12,400+ participantes • 4.9/5 satisfacción'}
          {language === 'it' && '4 webinar al mese • 12,400+ partecipanti • 4.9/5 soddisfazione'}
        </p>
        <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {language === 'fr' && 'Voir tous les webinars'}
          {language === 'en' && 'See all webinars'}
          {language === 'es' && 'Ver todos los webinars'}
          {language === 'it' && 'Vedi tutti i webinar'}
        </button>
      </div>
    </div>
  );
}
