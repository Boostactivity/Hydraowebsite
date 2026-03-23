import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Users, Lock, Star, TrendingUp, Award, Gift, Calendar, CheckCircle, MessageCircle, Image as ImageIcon, Video } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface GroupBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface GroupActivity {
  type: 'post' | 'event' | 'poll';
  author: string;
  avatar: string;
  content: string;
  engagement: number;
  time: string;
}

export function FacebookGroupVIP() {
  const { language } = useLanguage();

  const benefits: GroupBenefit[] = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: language === 'fr' ? 'Groupe Privé' : 'Private Group',
      description: language === 'fr'
        ? 'Accessible uniquement aux propriétaires HYDRAO vérifiés'
        : 'Only accessible to verified HYDRAO owners',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: language === 'fr' ? 'Contenu Exclusif' : 'Exclusive Content',
      description: language === 'fr'
        ? 'Recettes, astuces et conseils partagés par la communauté'
        : 'Recipes, tips and advice shared by the community',
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: language === 'fr' ? 'Offres Spéciales' : 'Special Offers',
      description: language === 'fr'
        ? 'Promotions et cadeaux réservés aux membres du groupe'
        : 'Promotions and gifts reserved for group members',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: language === 'fr' ? 'Support Premium' : 'Premium Support',
      description: language === 'fr'
        ? 'Réponses prioritaires de l\'équipe HYDRAO'
        : 'Priority responses from HYDRAO team',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: language === 'fr' ? 'Événements VIP' : 'VIP Events',
      description: language === 'fr'
        ? 'Webinars, Q&A live et rencontres exclusives'
        : 'Webinars, live Q&As and exclusive meetups',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'fr' ? 'Communauté Active' : 'Active Community',
      description: language === 'fr'
        ? '8 500+ membres actifs qui partagent leur expérience'
        : '8,500+ active members sharing their experience',
    },
  ];

  const activities: GroupActivity[] = [
    {
      type: 'post',
      author: 'Marie L.',
      avatar: '👩‍🍳',
      content: language === 'fr'
        ? 'Nouvelle recette de limonade maison ! 🍋 Avec l\'eau gazeuse HYDRAO, c\'est juste parfait. Je partage la recette en commentaires !'
        : 'New homemade lemonade recipe! 🍋 With HYDRAO sparkling water, it\'s just perfect. Sharing the recipe in comments!',
      engagement: 142,
      time: '2h',
    },
    {
      type: 'event',
      author: 'HYDRAO Team',
      avatar: '💧',
      content: language === 'fr'
        ? '📅 Webinar exclusif jeudi 19h : "10 astuces pour maximiser vos économies avec HYDRAO". Réservé aux membres du groupe !'
        : '📅 Exclusive webinar Thursday 7pm: "10 tips to maximize your savings with HYDRAO". Reserved for group members!',
      engagement: 287,
      time: '5h',
    },
    {
      type: 'poll',
      author: 'Thomas R.',
      avatar: '🤔',
      content: language === 'fr'
        ? 'Question : Quelle température préférez-vous pour votre thé ? Bouillante 100°C ou chaude 85°C ?'
        : 'Question: What temperature do you prefer for your tea? Boiling 100°C or hot 85°C?',
      engagement: 96,
      time: '8h',
    },
  ];

  const stats = [
    {
      value: '8 542',
      label: language === 'fr' ? 'Membres VIP' : 'VIP Members',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '850+',
      label: language === 'fr' ? 'Publications/mois' : 'Posts/month',
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      value: '12 400',
      label: language === 'fr' ? 'Interactions/jour' : 'Interactions/day',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '4.9/5',
      label: language === 'fr' ? 'Satisfaction' : 'Satisfaction',
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const contentTypes = [
    {
      icon: <ImageIcon className="w-5 h-5" />,
      label: language === 'fr' ? 'Photos recettes' : 'Recipe photos',
      count: '2 400+',
      color: 'blue',
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: language === 'fr' ? 'Vidéos tutos' : 'Tutorial videos',
      count: '420+',
      color: 'purple',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: language === 'fr' ? 'Discussions' : 'Discussions',
      count: '5 600+',
      color: 'green',
    },
  ];

  const upcomingEvents = [
    {
      title: language === 'fr' ? 'Webinar : Économies HYDRAO' : 'Webinar: HYDRAO Savings',
      date: language === 'fr' ? 'Jeudi 19h' : 'Thursday 7pm',
      attendees: 287,
      emoji: '💰',
    },
    {
      title: language === 'fr' ? 'Q&A Live avec le fondateur' : 'Live Q&A with founder',
      date: language === 'fr' ? 'Vendredi 18h' : 'Friday 6pm',
      attendees: 412,
      emoji: '🎙️',
    },
    {
      title: language === 'fr' ? 'Concours photo cuisine' : 'Kitchen photo contest',
      date: language === 'fr' ? 'Tout le mois' : 'All month',
      attendees: 156,
      emoji: '📸',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Facebook className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Groupe Facebook VIP'}
            {language === 'en' && 'VIP Facebook Group'}
            {language === 'es' && 'Grupo Facebook VIP'}
            {language === 'it' && 'Gruppo Facebook VIP'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Communauté privée pour propriétaires HYDRAO'}
            {language === 'en' && 'Private community for HYDRAO owners'}
            {language === 'es' && 'Comunidad privada para propietarios HYDRAO'}
            {language === 'it' && 'Comunità privata per proprietari HYDRAO'}
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

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-6 h-6" />
              <span className="font-semibold text-lg">
                {language === 'fr' && 'Groupe Privé'}
                {language === 'en' && 'Private Group'}
                {language === 'es' && 'Grupo Privado'}
                {language === 'it' && 'Gruppo Privato'}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-3">
              {language === 'fr' && 'Rejoignez 8 500+ propriétaires HYDRAO'}
              {language === 'en' && 'Join 8,500+ HYDRAO owners'}
              {language === 'es' && 'Únete a 8,500+ propietarios HYDRAO'}
              {language === 'it' && 'Unisciti a 8,500+ proprietari HYDRAO'}
            </h3>
            <p className="text-lg opacity-90 mb-4">
              {language === 'fr' && 'Partagez vos expériences, découvrez des recettes exclusives et bénéficiez d\'un support prioritaire dans notre groupe Facebook VIP.'}
              {language === 'en' && 'Share your experiences, discover exclusive recipes and benefit from priority support in our VIP Facebook group.'}
              {language === 'es' && 'Comparte tus experiencias, descubre recetas exclusivas y benefíciate de soporte prioritario en nuestro grupo Facebook VIP.'}
              {language === 'it' && 'Condividi le tue esperienze, scopri ricette esclusive e beneficia del supporto prioritario nel nostro gruppo Facebook VIP.'}
            </p>
            <a
              href="https://facebook.com/groups/hydrao-vip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              {language === 'fr' && 'Rejoindre le groupe'}
              {language === 'en' && 'Join the group'}
              {language === 'es' && 'Unirse al grupo'}
              {language === 'it' && 'Unisciti al gruppo'}
            </a>
          </div>
          <div className="hidden md:block text-8xl">👥</div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Avantages membres'}
          {language === 'en' && 'Member benefits'}
          {language === 'es' && 'Beneficios miembros'}
          {language === 'it' && 'Vantaggi membri'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-blue-500 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                {benefit.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Types */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Contenu partagé'}
          {language === 'en' && 'Shared content'}
          {language === 'es' && 'Contenido compartido'}
          {language === 'it' && 'Contenuto condiviso'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {contentTypes.map((type, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-${type.color}-50 to-${type.color}-100 rounded-xl p-6 border-2 border-${type.color}-200`}
            >
              <div className={`w-12 h-12 bg-${type.color}-200 rounded-full flex items-center justify-center text-${type.color}-700 mb-3`}>
                {type.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{type.count}</div>
              <div className="text-sm text-gray-700 font-semibold">{type.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Activité récente'}
          {language === 'en' && 'Recent activity'}
          {language === 'es' && 'Actividad reciente'}
          {language === 'it' && 'Attività recente'}
        </h3>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">{activity.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">{activity.author}</span>
                    <span className="text-sm text-gray-500">· {activity.time}</span>
                    {activity.type === 'event' && (
                      <div className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {language === 'fr' ? 'Événement' : 'Event'}
                      </div>
                    )}
                    {activity.type === 'poll' && (
                      <div className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {language === 'fr' ? 'Sondage' : 'Poll'}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{activity.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {activity.engagement}{' '}
                      {language === 'fr' ? 'réactions' : 'reactions'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Événements à venir'}
          {language === 'en' && 'Upcoming events'}
          {language === 'es' && 'Próximos eventos'}
          {language === 'it' && 'Eventi in arrivo'}
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{event.emoji}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees}{' '}
                      {language === 'fr' ? 'intéressés' : 'interested'}
                    </div>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white text-center">
        <Facebook className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-2">
          {language === 'fr' && 'Prêt à rejoindre la communauté ?'}
          {language === 'en' && 'Ready to join the community?'}
          {language === 'es' && '¿Listo para unirte a la comunidad?'}
          {language === 'it' && 'Pronto a unirti alla comunità?'}
        </h3>
        <p className="text-lg opacity-90 mb-4">
          {language === 'fr' && 'Réservé aux propriétaires HYDRAO. Prouvez votre achat pour accéder au groupe.'}
          {language === 'en' && 'Reserved for HYDRAO owners. Prove your purchase to access the group.'}
          {language === 'es' && 'Reservado para propietarios HYDRAO. Prueba tu compra para acceder al grupo.'}
          {language === 'it' && 'Riservato ai proprietari HYDRAO. Prova il tuo acquisto per accedere al gruppo.'}
        </p>
        <a
          href="https://facebook.com/groups/hydrao-vip"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <Facebook className="w-5 h-5" />
          {language === 'fr' && 'Demander l\'accès'}
          {language === 'en' && 'Request access'}
          {language === 'es' && 'Solicitar acceso'}
          {language === 'it' && 'Richiedi accesso'}
        </a>
      </div>
    </div>
  );
}
