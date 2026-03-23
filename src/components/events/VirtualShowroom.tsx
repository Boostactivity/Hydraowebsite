import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, MapPin, Calendar, Users, Clock, Video, Award, TrendingUp, Play, Share2, Star, Maximize2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface ShowroomTour {
  id: string;
  title: string;
  description: string;
  location: string;
  type: '360' | 'live' | 'guided';
  duration: string;
  views: number;
  rating: number;
  highlights: string[];
  available: string;
  guide?: string;
  nextLive?: string;
  thumbnail: string;
}

export function VirtualShowroom() {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');

  const tours: ShowroomTour[] = [
    {
      id: '1',
      title: language === 'fr' 
        ? 'Showroom Paris - Visite 360° Interactive'
        : 'Paris Showroom - Interactive 360° Tour',
      description: language === 'fr'
        ? 'Explorez notre showroom parisien en réalité virtuelle. Navigation libre, zoom sur les produits, démonstrations vidéo intégrées.'
        : 'Explore our Paris showroom in virtual reality. Free navigation, product zoom, integrated video demos.',
      location: 'Paris, France',
      type: '360',
      duration: language === 'fr' ? 'À votre rythme' : 'At your pace',
      views: 24500,
      rating: 4.9,
      highlights: [
        language === 'fr' ? '7 zones thématiques' : '7 themed zones',
        language === 'fr' ? 'Démos 5-en-1 interactives' : 'Interactive 5-in-1 demos',
        language === 'fr' ? 'Comparatif produits' : 'Product comparison',
        language === 'fr' ? 'Points d\'info cliquables' : 'Clickable info points',
      ],
      available: language === 'fr' ? 'Disponible 24/7' : 'Available 24/7',
      thumbnail: '🏢',
    },
    {
      id: '2',
      title: language === 'fr'
        ? 'Visite Guidée Live avec Expert - Jeudi 18h'
        : 'Live Guided Tour with Expert - Thursday 6pm',
      description: language === 'fr'
        ? 'Visite guidée en direct avec notre expert produit. Posez vos questions, voyez les démonstrations live et découvrez tous les secrets HYDRAO.'
        : 'Live guided tour with our product expert. Ask questions, watch live demos and discover all HYDRAO secrets.',
      location: language === 'fr' ? 'En ligne (Zoom)' : 'Online (Zoom)',
      type: 'live',
      duration: '45 min',
      views: 0,
      rating: 4.8,
      highlights: [
        language === 'fr' ? 'Démo live 5 fonctions' : 'Live 5-function demo',
        language === 'fr' ? 'Q&A en direct' : 'Live Q&A',
        language === 'fr' ? 'Comparaison concurrents' : 'Competitor comparison',
        language === 'fr' ? 'Offre exclusive participants' : 'Exclusive participant offer',
      ],
      available: language === 'fr' ? 'Places limitées' : 'Limited seats',
      guide: 'Sophie Martin',
      nextLive: '2024-12-26T18:00',
      thumbnail: '🎥',
    },
    {
      id: '3',
      title: language === 'fr'
        ? 'Tour Complet : Fabrication à Installation'
        : 'Complete Tour: Manufacturing to Installation',
      description: language === 'fr'
        ? 'De notre usine aux cuisines clients. Découvrez le processus complet : fabrication, assemblage, tests qualité et installation finale.'
        : 'From our factory to customer kitchens. Discover the complete process: manufacturing, assembly, quality tests and final installation.',
      location: language === 'fr' ? 'Multi-sites' : 'Multi-site',
      type: 'guided',
      duration: '25 min',
      views: 8900,
      rating: 4.9,
      highlights: [
        language === 'fr' ? 'Visite usine exclusive' : 'Exclusive factory tour',
        language === 'fr' ? 'Tests qualité ISO 9001' : 'ISO 9001 quality tests',
        language === 'fr' ? 'Processus d\'assemblage' : 'Assembly process',
        language === 'fr' ? 'Installation client final' : 'Final customer installation',
      ],
      available: language === 'fr' ? 'Replay disponible' : 'Replay available',
      guide: 'Marc Lefebvre',
      thumbnail: '🏭',
    },
    {
      id: '4',
      title: language === 'fr'
        ? 'Showroom New York - Experience Center'
        : 'New York Showroom - Experience Center',
      description: language === 'fr'
        ? 'Notre nouveau showroom américain à Manhattan. Design moderne, stations de test et espace lounge pour découvrir HYDRAO.'
        : 'Our new American showroom in Manhattan. Modern design, testing stations and lounge space to discover HYDRAO.',
      location: 'New York, USA',
      type: '360',
      duration: language === 'fr' ? 'À votre rythme' : 'At your pace',
      views: 12300,
      rating: 4.8,
      highlights: [
        language === 'fr' ? '5 stations de test' : '5 testing stations',
        language === 'fr' ? 'Lounge client VIP' : 'VIP customer lounge',
        language === 'fr' ? 'Mur des témoignages' : 'Testimonial wall',
        language === 'fr' ? 'Bar à eau gazeuse' : 'Sparkling water bar',
      ],
      available: language === 'fr' ? 'Disponible 24/7' : 'Available 24/7',
      thumbnail: '🗽',
    },
  ];

  const types = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: tours.length },
    { id: '360', label: language === 'fr' ? 'Visite 360°' : '360° Tour', count: tours.filter(t => t.type === '360').length },
    { id: 'live', label: language === 'fr' ? 'Live guidé' : 'Guided live', count: tours.filter(t => t.type === 'live').length },
    { id: 'guided', label: language === 'fr' ? 'Visite guidée' : 'Guided tour', count: tours.filter(t => t.type === 'guided').length },
  ];

  const stats = [
    {
      value: '6',
      label: language === 'fr' ? 'Showrooms' : 'Showrooms',
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      value: '45K+',
      label: language === 'fr' ? 'Visites virtuelles' : 'Virtual visits',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      value: '4.9/5',
      label: language === 'fr' ? 'Satisfaction' : 'Satisfaction',
      icon: <Star className="w-5 h-5" />,
    },
    {
      value: '+340%',
      label: language === 'fr' ? 'Croissance' : 'Growth',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const filteredTours = selectedType === 'all'
    ? tours
    : tours.filter(t => t.type === selectedType);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case '360': return language === 'fr' ? '360° Virtuel' : '360° Virtual';
      case 'live': return language === 'fr' ? 'Live' : 'Live';
      case 'guided': return language === 'fr' ? 'Guidé' : 'Guided';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '360': return 'blue';
      case 'live': return 'red';
      case 'guided': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Eye className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Visites Virtuelles Showroom'}
            {language === 'en' && 'Virtual Showroom Tours'}
            {language === 'es' && 'Tours Virtuales Showroom'}
            {language === 'it' && 'Tour Virtuali Showroom'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Découvrez HYDRAO comme si vous y étiez'}
            {language === 'en' && 'Discover HYDRAO as if you were there'}
            {language === 'es' && 'Descubre HYDRAO como si estuvieras allí'}
            {language === 'it' && 'Scopri HYDRAO come se fossi lì'}
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
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
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
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedType === type.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.label}
            <span className="ml-2 text-sm opacity-75">({type.count})</span>
          </button>
        ))}
      </div>

      {/* Tours Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {filteredTours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-[#6B1E3E] hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-12 flex items-center justify-center">
              <div className="text-8xl">{tour.thumbnail}</div>
              <div className="absolute top-4 right-4">
                <div className={`bg-${getTypeColor(tour.type)}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {getTypeLabel(tour.type)}
                </div>
              </div>
              {tour.type === 'live' && tour.nextLive && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  LIVE
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title & Location */}
              <div className="mb-3">
                <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {tour.location}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{tour.description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {tour.duration}
                </div>
                {tour.views > 0 && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatViews(tour.views)}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {tour.rating}
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {language === 'fr' ? 'Points forts' : 'Highlights'}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {tour.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-700">
                      <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide or Next Live */}
              {tour.guide && (
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-600 mb-1">
                    {language === 'fr' ? 'Guide' : 'Guide'}
                  </div>
                  <div className="font-semibold text-gray-900">{tour.guide}</div>
                </div>
              )}

              {tour.nextLive && (
                <div className="bg-red-50 rounded-lg p-3 mb-4 border border-red-200">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-gray-900">
                      {new Date(tour.nextLive).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              )}

              {/* Availability */}
              <div className="text-sm text-gray-600 mb-4">
                {tour.available}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2">
                <button className="flex-1 px-4 py-3 bg-[#6B1E3E] text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                  {tour.type === 'live' ? (
                    <>
                      <Video className="w-5 h-5" />
                      {language === 'fr' ? 'Réserver ma place' : 'Reserve my seat'}
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-5 h-5" />
                      {language === 'fr' ? 'Commencer la visite' : 'Start tour'}
                    </>
                  )}
                </button>
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Award className="w-12 h-12 mb-3 opacity-90" />
            <h3 className="font-bold text-2xl mb-3">
              {language === 'fr' && 'Expérience Immersive Unique'}
              {language === 'en' && 'Unique Immersive Experience'}
              {language === 'es' && 'Experiencia Inmersiva Única'}
              {language === 'it' && 'Esperienza Immersiva Unica'}
            </h3>
            <p className="text-lg opacity-90 mb-4">
              {language === 'fr' && 'Visitez nos showrooms du monde entier sans bouger de chez vous. Navigation 360°, démos interactives et guides experts en direct.'}
              {language === 'en' && 'Visit our showrooms worldwide from home. 360° navigation, interactive demos and live expert guides.'}
              {language === 'es' && 'Visita nuestros showrooms del mundo desde casa. Navegación 360°, demos interactivas y guías expertos en vivo.'}
              {language === 'it' && 'Visita i nostri showroom nel mondo da casa. Navigazione 360°, demo interattive e guide esperte live.'}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                45K+ visites
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                4.9/5 satisfaction
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                6 showrooms
              </div>
            </div>
          </div>
          <div className="hidden md:block text-8xl">👁️</div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 text-center">
        <h3 className="font-bold text-xl text-gray-900 mb-2">
          {language === 'fr' && 'Vous préférez une visite physique ?'}
          {language === 'en' && 'Prefer a physical visit?'}
          {language === 'es' && '¿Prefieres una visita física?'}
          {language === 'it' && 'Preferisci una visita fisica?'}
        </h3>
        <p className="text-gray-600 mb-4">
          {language === 'fr' && 'Prenez rendez-vous dans l\'un de nos 6 showrooms'}
          {language === 'en' && 'Make an appointment in one of our 6 showrooms'}
          {language === 'es' && 'Haz una cita en uno de nuestros 6 showrooms'}
          {language === 'it' && 'Prendi un appuntamento in uno dei nostri 6 showroom'}
        </p>
        <button className="px-6 py-3 bg-[#6B1E3E] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          {language === 'fr' && 'Trouver un showroom'}
          {language === 'en' && 'Find a showroom'}
          {language === 'es' && 'Encontrar un showroom'}
          {language === 'it' && 'Trova uno showroom'}
        </button>
      </div>
    </div>
  );
}
