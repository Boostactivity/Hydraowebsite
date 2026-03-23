import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Clock, Award, Gift, TrendingUp, Star, CheckCircle, PartyPopper, Utensils, GraduationCap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface CustomerEvent {
  id: string;
  title: string;
  description: string;
  type: 'meetup' | 'workshop' | 'vip' | 'launch';
  date: string;
  time: string;
  location: string;
  city: string;
  attendees: number;
  maxAttendees: number;
  price: string;
  benefits: string[];
  level: 'all' | 'owners' | 'vip';
  status: 'upcoming' | 'sold-out' | 'past';
  emoji: string;
}

export function CustomerEvents() {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');

  const events: CustomerEvent[] = [
    {
      id: '1',
      title: language === 'fr'
        ? 'Meetup HYDRAO Paris - Networking & Dégustation'
        : 'HYDRAO Paris Meetup - Networking & Tasting',
      description: language === 'fr'
        ? 'Rencontrez d\'autres propriétaires HYDRAO autour d\'une dégustation de boissons créées avec HYDRAO. Networking, échange d\'astuces et surprises.'
        : 'Meet other HYDRAO owners over a tasting of drinks created with HYDRAO. Networking, tips exchange and surprises.',
      type: 'meetup',
      date: '2025-01-15',
      time: '19:00',
      location: language === 'fr' ? 'Showroom HYDRAO' : 'HYDRAO Showroom',
      city: 'Paris',
      attendees: 42,
      maxAttendees: 50,
      price: language === 'fr' ? 'Gratuit' : 'Free',
      benefits: [
        language === 'fr' ? 'Dégustation cocktails & boissons' : 'Cocktails & drinks tasting',
        language === 'fr' ? 'Networking avec communauté' : 'Community networking',
        language === 'fr' ? 'Goodies HYDRAO offerts' : 'Free HYDRAO goodies',
        language === 'fr' ? 'Code promo exclusif -25%' : 'Exclusive promo code -25%',
      ],
      level: 'owners',
      status: 'upcoming',
      emoji: '🍹',
    },
    {
      id: '2',
      title: language === 'fr'
        ? 'Workshop Cuisine : 20 Recettes HYDRAO en 2h'
        : 'Cooking Workshop: 20 HYDRAO Recipes in 2h',
      description: language === 'fr'
        ? 'Atelier cuisine avec notre chef partenaire. Apprenez à créer 20 recettes de boissons, cocktails et préparations culinaires avec HYDRAO.'
        : 'Cooking workshop with our partner chef. Learn to create 20 drink, cocktail and culinary recipes with HYDRAO.',
      type: 'workshop',
      date: '2025-01-22',
      time: '14:00',
      location: language === 'fr' ? 'École de Cuisine Le Cordon' : 'Le Cordon Cooking School',
      city: 'Lyon',
      attendees: 18,
      maxAttendees: 20,
      price: '29€',
      benefits: [
        language === 'fr' ? 'Atelier 2h avec chef pro' : '2h workshop with pro chef',
        language === 'fr' ? 'E-book 20 recettes offert' : 'Free 20-recipe e-book',
        language === 'fr' ? 'Dégustation sur place' : 'On-site tasting',
        language === 'fr' ? 'Kit ustensiles offert' : 'Free utensils kit',
      ],
      level: 'all',
      status: 'upcoming',
      emoji: '👨‍🍳',
    },
    {
      id: '3',
      title: language === 'fr'
        ? 'VIP Night : Lancement Nouvelle Gamme'
        : 'VIP Night: New Range Launch',
      description: language === 'fr'
        ? 'Soirée VIP exclusive pour découvrir en avant-première notre nouvelle gamme. Cocktail dînatoire, démos live et cadeaux exceptionnels.'
        : 'Exclusive VIP evening to preview our new range. Cocktail dinner, live demos and exceptional gifts.',
      type: 'vip',
      date: '2025-02-05',
      time: '20:00',
      location: language === 'fr' ? 'Hôtel Particulier Montmartre' : 'Hôtel Particulier Montmartre',
      city: 'Paris',
      attendees: 87,
      maxAttendees: 100,
      price: language === 'fr' ? 'Sur invitation' : 'By invitation',
      benefits: [
        language === 'fr' ? 'Avant-première nouvelle gamme' : 'New range preview',
        language === 'fr' ? 'Cocktail dînatoire gastronomique' : 'Gastronomic cocktail dinner',
        language === 'fr' ? 'Rencontre avec fondateurs' : 'Meet the founders',
        language === 'fr' ? 'Cadeau VIP 200€' : 'VIP gift €200',
        language === 'fr' ? 'Accès priorité nouvelles sorties' : 'Priority access new releases',
      ],
      level: 'vip',
      status: 'upcoming',
      emoji: '💎',
    },
    {
      id: '4',
      title: language === 'fr'
        ? 'Workshop Économies : Optimisez votre ROI'
        : 'Savings Workshop: Optimize Your ROI',
      description: language === 'fr'
        ? 'Atelier pratique pour maximiser vos économies avec HYDRAO. Calculs personnalisés, astuces d\'optimisation et stratégies pour ROI rapide.'
        : 'Practical workshop to maximize your savings with HYDRAO. Personalized calculations, optimization tips and strategies for fast ROI.',
      type: 'workshop',
      date: '2025-01-28',
      time: '18:30',
      location: language === 'fr' ? 'Espace Coworking WeWork' : 'WeWork Coworking Space',
      city: 'Bordeaux',
      attendees: 24,
      maxAttendees: 30,
      price: language === 'fr' ? 'Gratuit' : 'Free',
      benefits: [
        language === 'fr' ? 'Audit économies personnalisé' : 'Personalized savings audit',
        language === 'fr' ? 'Calculateur ROI Excel offert' : 'Free Excel ROI calculator',
        language === 'fr' ? 'Guide optimisation 40 pages' : '40-page optimization guide',
        language === 'fr' ? 'Bon réduction filtres -30%' : 'Filter discount -30%',
      ],
      level: 'owners',
      status: 'upcoming',
      emoji: '💰',
    },
    {
      id: '5',
      title: language === 'fr'
        ? 'Meetup Lyon - Apéro HYDRAO'
        : 'Lyon Meetup - HYDRAO Aperitif',
      description: language === 'fr'
        ? 'Apéro convivial entre propriétaires HYDRAO lyonnais. Échangez vos recettes, astuces et découvrez les nouveautés à venir.'
        : 'Friendly aperitif between Lyon HYDRAO owners. Exchange your recipes, tips and discover upcoming news.',
      type: 'meetup',
      date: '2025-02-12',
      time: '18:00',
      location: language === 'fr' ? 'Bar à Eau Le Source' : 'Le Source Water Bar',
      city: 'Lyon',
      attendees: 0,
      maxAttendees: 40,
      price: language === 'fr' ? 'Gratuit' : 'Free',
      benefits: [
        language === 'fr' ? 'Boissons HYDRAO illimitées' : 'Unlimited HYDRAO drinks',
        language === 'fr' ? 'Tapas et finger food' : 'Tapas and finger food',
        language === 'fr' ? 'Goodies surprise' : 'Surprise goodies',
        language === 'fr' ? 'Tombola cadeaux 500€' : 'Gift raffle €500',
      ],
      level: 'owners',
      status: 'upcoming',
      emoji: '🥂',
    },
    {
      id: '6',
      title: language === 'fr'
        ? 'Lancement HYDRAO 2.0 - Grand Opening'
        : 'HYDRAO 2.0 Launch - Grand Opening',
      description: language === 'fr'
        ? 'Événement de lancement majeur pour HYDRAO 2.0. Démos live, ateliers, cadeaux et surprises exceptionnelles pour célébrer cette nouvelle ère.'
        : 'Major launch event for HYDRAO 2.0. Live demos, workshops, gifts and exceptional surprises to celebrate this new era.',
      type: 'launch',
      date: '2025-03-01',
      time: '10:00',
      location: language === 'fr' ? 'Palais des Congrès' : 'Convention Center',
      city: 'Paris',
      attendees: 345,
      maxAttendees: 500,
      price: language === 'fr' ? 'Gratuit' : 'Free',
      benefits: [
        language === 'fr' ? 'Première mondiale HYDRAO 2.0' : 'HYDRAO 2.0 world premiere',
        language === 'fr' ? '12 ateliers simultanés' : '12 simultaneous workshops',
        language === 'fr' ? 'Rencontre fondateurs & équipe' : 'Meet founders & team',
        language === 'fr' ? 'Offre lancement exclusive -40%' : 'Exclusive launch offer -40%',
        language === 'fr' ? 'Goodies premium 100€' : 'Premium goodies €100',
      ],
      level: 'all',
      status: 'upcoming',
      emoji: '🚀',
    },
  ];

  const types = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: events.length, icon: <Calendar className="w-4 h-4" /> },
    { id: 'meetup', label: language === 'fr' ? 'Meetups' : 'Meetups', count: events.filter(e => e.type === 'meetup').length, icon: <Users className="w-4 h-4" /> },
    { id: 'workshop', label: language === 'fr' ? 'Ateliers' : 'Workshops', count: events.filter(e => e.type === 'workshop').length, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'vip', label: 'VIP', count: events.filter(e => e.type === 'vip').length, icon: <Award className="w-4 h-4" /> },
    { id: 'launch', label: language === 'fr' ? 'Lancements' : 'Launches', count: events.filter(e => e.type === 'launch').length, icon: <PartyPopper className="w-4 h-4" /> },
  ];

  const stats = [
    {
      value: '48',
      label: language === 'fr' ? 'Événements/an' : 'Events/year',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      value: '3 200+',
      label: language === 'fr' ? 'Participants 2024' : 'Participants 2024',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '12',
      label: language === 'fr' ? 'Villes' : 'Cities',
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      value: '4.8/5',
      label: language === 'fr' ? 'Satisfaction' : 'Satisfaction',
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const filteredEvents = selectedType === 'all'
    ? events
    : events.filter(e => e.type === selectedType);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'all': return language === 'fr' ? 'Tous publics' : 'All audiences';
      case 'owners': return language === 'fr' ? 'Propriétaires' : 'Owners';
      case 'vip': return 'VIP';
      default: return level;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'all': return 'green';
      case 'owners': return 'blue';
      case 'vip': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <PartyPopper className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Événements Clients'}
            {language === 'en' && 'Customer Events'}
            {language === 'es' && 'Eventos Clientes'}
            {language === 'it' && 'Eventi Clienti'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Rencontres, ateliers et soirées exclusives'}
            {language === 'en' && 'Meetups, workshops and exclusive evenings'}
            {language === 'es' && 'Encuentros, talleres y veladas exclusivas'}
            {language === 'it' && 'Incontri, workshop e serate esclusive'}
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
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
          >
            <div className="flex items-center gap-2 mb-2 text-purple-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedType === type.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.icon}
            {type.label}
            <span className="text-sm opacity-75">({type.count})</span>
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-[#6B1E3E] hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="text-5xl">{event.emoji}</div>
                <div className={`bg-${getLevelColor(event.level)}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {getLevelLabel(event.level)}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 line-clamp-2">{event.title}</h3>
              <p className="text-sm opacity-90 line-clamp-2">{event.description}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-semibold">
                      {language === 'fr' ? 'Date' : 'Date'}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {new Date(event.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-orange-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-semibold">
                      {language === 'fr' ? 'Heure' : 'Time'}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{event.time}</div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    {language === 'fr' ? 'Lieu' : 'Location'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-900">{event.location}</div>
                <div className="text-xs text-gray-600">{event.city}</div>
              </div>

              {/* Attendees */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {event.attendees}/{event.maxAttendees}{' '}
                  {language === 'fr' ? 'inscrits' : 'registered'}
                </div>
                <div className="font-bold text-[#6B1E3E]">{event.price}</div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#6B1E3E] to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200 mb-4">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-600" />
                  {language === 'fr' ? 'Inclus' : 'Included'}
                </div>
                <div className="space-y-1">
                  {event.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full px-6 py-3 bg-[#6B1E3E] text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                {event.status === 'sold-out' 
                  ? (language === 'fr' ? 'Complet' : 'Sold out')
                  : (language === 'fr' ? 'Réserver ma place' : 'Reserve my seat')
                }
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-8 text-white text-center">
        <PartyPopper className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Rejoignez nos événements exclusifs'}
          {language === 'en' && 'Join our exclusive events'}
          {language === 'es' && 'Únete a nuestros eventos exclusivos'}
          {language === 'it' && 'Unisciti ai nostri eventi esclusivi'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '48 événements par an dans 12 villes • 3 200+ participants en 2024 • Meetups, ateliers, soirées VIP et lancements produits'}
          {language === 'en' && '48 events per year in 12 cities • 3,200+ participants in 2024 • Meetups, workshops, VIP evenings and product launches'}
          {language === 'es' && '48 eventos por año en 12 ciudades • 3,200+ participantes en 2024 • Meetups, talleres, veladas VIP y lanzamientos'}
          {language === 'it' && '48 eventi all\'anno in 12 città • 3,200+ partecipanti nel 2024 • Meetup, workshop, serate VIP e lanci prodotti'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {language === 'fr' && 'Voir tous les événements'}
            {language === 'en' && 'See all events'}
            {language === 'es' && 'Ver todos los eventos'}
            {language === 'it' && 'Vedi tutti gli eventi'}
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors">
            {language === 'fr' && 'Organiser un événement'}
            {language === 'en' && 'Organize an event'}
            {language === 'es' && 'Organizar un evento'}
            {language === 'it' && 'Organizza un evento'}
          </button>
        </div>
      </div>
    </div>
  );
}
