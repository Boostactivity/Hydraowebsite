import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Users, TrendingUp, DollarSign, Award, BarChart3, Link2, Camera, Video, MessageSquare, CheckCircle, Gift } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

interface InfluencerTier {
  name: string;
  followers: { min: number; max: number | null };
  commission: number;
  perks: string[];
  icon: React.ReactNode;
  color: string;
}

export function InfluencerProgram() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'tiers' | 'apply'>('overview');

  const tiers: InfluencerTier[] = [
    {
      name: language === 'fr' ? 'Nano' : 'Nano',
      followers: { min: 1000, max: 10000 },
      commission: 10,
      perks: [
        language === 'fr' ? 'Commission 10%' : '10% commission',
        language === 'fr' ? 'Lien d\'affiliation unique' : 'Unique affiliate link',
        language === 'fr' ? 'Support dédié' : 'Dedicated support',
        language === 'fr' ? 'Visuels marketing' : 'Marketing visuals',
      ],
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: language === 'fr' ? 'Micro' : 'Micro',
      followers: { min: 10000, max: 100000 },
      commission: 15,
      perks: [
        language === 'fr' ? 'Commission 15%' : '15% commission',
        language === 'fr' ? 'HYDRAO offert' : 'Free HYDRAO device',
        language === 'fr' ? 'Stories highlight' : 'Stories highlight',
        language === 'fr' ? 'Code promo personnalisé' : 'Custom promo code',
        language === 'fr' ? 'Reporting avancé' : 'Advanced reporting',
      ],
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-500',
    },
    {
      name: language === 'fr' ? 'Macro' : 'Macro',
      followers: { min: 100000, max: 1000000 },
      commission: 20,
      perks: [
        language === 'fr' ? 'Commission 20%' : '20% commission',
        language === 'fr' ? 'Pack ambassadeur' : 'Ambassador pack',
        language === 'fr' ? 'Co-création contenu' : 'Content co-creation',
        language === 'fr' ? 'Bonus performance' : 'Performance bonuses',
        language === 'fr' ? 'Mise en avant blog' : 'Blog feature',
        language === 'fr' ? 'Event privés' : 'Private events',
      ],
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      name: language === 'fr' ? 'Mega' : 'Mega',
      followers: { min: 1000000, max: null },
      commission: 25,
      perks: [
        language === 'fr' ? 'Commission 25%' : '25% commission',
        language === 'fr' ? 'Partenariat exclusif' : 'Exclusive partnership',
        language === 'fr' ? 'Campagne dédiée' : 'Dedicated campaign',
        language === 'fr' ? 'Bonus fixes garantis' : 'Guaranteed fixed bonuses',
        language === 'fr' ? 'Négociation personnalisée' : 'Custom negotiation',
        language === 'fr' ? 'PR international' : 'International PR',
      ],
      icon: <Award className="w-6 h-6" />,
      color: 'from-pink-500 to-red-600',
    },
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: '250+',
      label: language === 'fr' ? 'Influenceurs actifs' : 'Active influencers',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: formatPrice(150000),
      label: language === 'fr' ? 'Versés en 2024' : 'Paid in 2024',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: '18%',
      label: language === 'fr' ? 'Taux conversion moyen' : 'Avg conversion rate',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: formatPrice(580),
      label: language === 'fr' ? 'Revenu moyen/mois' : 'Avg revenue/month',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const contentTypes = [
    {
      icon: <Camera className="w-5 h-5" />,
      name: language === 'fr' ? 'Photos' : 'Photos',
      examples: ['Instagram posts', 'Pinterest boards', 'Blog articles'],
    },
    {
      icon: <Video className="w-5 h-5" />,
      name: language === 'fr' ? 'Vidéos' : 'Videos',
      examples: ['YouTube reviews', 'TikTok demos', 'Instagram Reels'],
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      name: language === 'fr' ? 'Stories' : 'Stories',
      examples: ['Instagram Stories', 'Snapchat', 'Facebook Stories'],
    },
  ];

  const formatFollowers = (min: number, max: number | null) => {
    const formatNum = (num: number) => {
      if (num >= 1000000) return `${num / 1000000}M`;
      if (num >= 1000) return `${num / 1000}K`;
      return num.toString();
    };
    
    return max ? `${formatNum(min)} - ${formatNum(max)}` : `${formatNum(min)}+`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Programme Influenceurs'}
            {language === 'en' && 'Influencer Program'}
            {language === 'es' && 'Programa de Influencers'}
            {language === 'it' && 'Programma Influencer'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Devenez ambassadeur HYDRAO'}
            {language === 'en' && 'Become a HYDRAO ambassador'}
            {language === 'es' && 'Conviértete en embajador HYDRAO'}
            {language === 'it' && 'Diventa ambasciatore HYDRAO'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-semibold transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#6B1E3E] text-[#6B1E3E]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          {language === 'fr' && 'Vue d\'ensemble'}
          {language === 'en' && 'Overview'}
          {language === 'es' && 'Resumen'}
          {language === 'it' && 'Panoramica'}
        </button>
        <button
          onClick={() => setActiveTab('tiers')}
          className={`px-4 py-2 font-semibold transition-colors border-b-2 ${
            activeTab === 'tiers'
              ? 'border-[#6B1E3E] text-[#6B1E3E]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          {language === 'fr' && 'Niveaux'}
          {language === 'en' && 'Tiers'}
          {language === 'es' && 'Niveles'}
          {language === 'it' && 'Livelli'}
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-4 py-2 font-semibold transition-colors border-b-2 ${
            activeTab === 'apply'
              ? 'border-[#6B1E3E] text-[#6B1E3E]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          {language === 'fr' && 'Postuler'}
          {language === 'en' && 'Apply'}
          {language === 'es' && 'Solicitar'}
          {language === 'it' && 'Candidati'}
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">
                  {language === 'fr' && 'Gagnez jusqu\'à 25% de commission'}
                  {language === 'en' && 'Earn up to 25% commission'}
                  {language === 'es' && 'Gana hasta 25% de comisión'}
                  {language === 'it' && 'Guadagna fino al 25% di commissione'}
                </h3>
                <p className="text-lg opacity-90 mb-4">
                  {language === 'fr' && 'Sur chaque vente générée (490€ = 122€ pour vous)'}
                  {language === 'en' && 'On every sale generated ($535 = $134 for you)'}
                  {language === 'es' && 'En cada venta generada (490€ = 122€ para ti)'}
                  {language === 'it' && 'Su ogni vendita generata (490€ = 122€ per te)'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveTab('apply')}
                    className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {language === 'fr' && 'Devenir ambassadeur'}
                    {language === 'en' && 'Become ambassador'}
                    {language === 'es' && 'Ser embajador'}
                    {language === 'it' && 'Diventa ambasciatore'}
                  </button>
                  <button
                    onClick={() => setActiveTab('tiers')}
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors"
                  >
                    {language === 'fr' && 'Voir les niveaux'}
                    {language === 'en' && 'View tiers'}
                    {language === 'es' && 'Ver niveles'}
                    {language === 'it' && 'Vedi livelli'}
                  </button>
                </div>
              </div>
              <div className="hidden md:block text-8xl">🌟</div>
            </div>
          </div>

          {/* Content Types */}
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-4">
              {language === 'fr' && 'Types de contenus acceptés'}
              {language === 'en' && 'Accepted content types'}
              {language === 'es' && 'Tipos de contenido aceptados'}
              {language === 'it' && 'Tipi di contenuto accettati'}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {contentTypes.map((type, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-[#6B1E3E] transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#6B1E3E] text-white rounded-full flex items-center justify-center">
                      {type.icon}
                    </div>
                    <div className="font-bold text-gray-900">{type.name}</div>
                  </div>
                  <ul className="space-y-1">
                    {type.examples.map((example, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6" />
              {language === 'fr' && 'Avantages ambassadeurs'}
              {language === 'en' && 'Ambassador benefits'}
              {language === 'es' && 'Beneficios embajador'}
              {language === 'it' && 'Vantaggi ambasciatore'}
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>
                  {language === 'fr' && 'Commissions récurrentes à vie'}
                  {language === 'en' && 'Lifetime recurring commissions'}
                  {language === 'es' && 'Comisiones recurrentes de por vida'}
                  {language === 'it' && 'Commissioni ricorrenti a vita'}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>
                  {language === 'fr' && 'Support marketing dédié'}
                  {language === 'en' && 'Dedicated marketing support'}
                  {language === 'es' && 'Soporte marketing dedicado'}
                  {language === 'it' && 'Supporto marketing dedicato'}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>
                  {language === 'fr' && 'Dashboard analytics temps réel'}
                  {language === 'en' && 'Real-time analytics dashboard'}
                  {language === 'es' && 'Panel de análisis en tiempo real'}
                  {language === 'it' && 'Dashboard analytics in tempo reale'}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>
                  {language === 'fr' && 'Paiements mensuels garantis'}
                  {language === 'en' && 'Guaranteed monthly payments'}
                  {language === 'es' && 'Pagos mensuales garantizados'}
                  {language === 'it' && 'Pagamenti mensili garantiti'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tiers Tab */}
      {activeTab === 'tiers' && (
        <div className="space-y-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${tier.color} rounded-xl p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                      <p className="opacity-90">
                        {formatFollowers(tier.followers.min, tier.followers.max)}{' '}
                        {language === 'fr' && 'abonnés'}
                        {language === 'en' && 'followers'}
                        {language === 'es' && 'seguidores'}
                        {language === 'it' && 'follower'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold mb-1">{tier.commission}%</div>
                    <div className="text-sm opacity-90">
                      {language === 'fr' && 'commission'}
                      {language === 'en' && 'commission'}
                      {language === 'es' && 'comisión'}
                      {language === 'it' && 'commissione'}
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-2">
                    {tier.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Apply Tab */}
      {activeTab === 'apply' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                ℹ️
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">
                  {language === 'fr' && 'Critères d\'éligibilité'}
                  {language === 'en' && 'Eligibility criteria'}
                  {language === 'es' && 'Criterios de elegibilidad'}
                  {language === 'it' && 'Criteri di ammissibilità'}
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>✓ {language === 'fr' ? 'Minimum 1 000 abonnés' : 'Minimum 1,000 followers'}</li>
                  <li>✓ {language === 'fr' ? 'Contenu aligné avec nos valeurs' : 'Content aligned with our values'}</li>
                  <li>✓ {language === 'fr' ? 'Engagement rate > 2%' : 'Engagement rate > 2%'}</li>
                  <li>✓ {language === 'fr' ? 'Compte actif depuis 6+ mois' : 'Account active for 6+ months'}</li>
                </ul>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Nom complet'}
                  {language === 'en' && 'Full name'}
                  {language === 'es' && 'Nombre completo'}
                  {language === 'it' && 'Nome completo'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6B1E3E] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6B1E3E] focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                {language === 'fr' && 'Plateforme principale'}
                {language === 'en' && 'Main platform'}
                {language === 'es' && 'Plataforma principal'}
                {language === 'it' && 'Piattaforma principale'}
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6B1E3E] focus:outline-none">
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Blog</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Nom du compte'}
                  {language === 'en' && 'Account name'}
                  {language === 'es' && 'Nombre de cuenta'}
                  {language === 'it' && 'Nome account'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6B1E3E] focus:outline-none"
                  placeholder="@username"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Nombre d\'abonnés'}
                  {language === 'en' && 'Number of followers'}
                  {language === 'es' && 'Número de seguidores'}
                  {language === 'it' && 'Numero di follower'}
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6B1E3E] focus:outline-none"
                  placeholder="10000"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                {language === 'fr' && 'Pourquoi voulez-vous devenir ambassadeur HYDRAO ?'}
                {language === 'en' && 'Why do you want to become a HYDRAO ambassador?'}
                {language === 'es' && '¿Por qué quieres ser embajador de HYDRAO?'}
                {language === 'it' && 'Perché vuoi diventare ambasciatore HYDRAO?'}
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6B1E3E] focus:outline-none resize-none"
                placeholder={language === 'fr' ? 'Parlez-nous de vous...' : 'Tell us about yourself...'}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-[#6B1E3E] to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              {language === 'fr' && 'Envoyer ma candidature'}
              {language === 'en' && 'Submit application'}
              {language === 'es' && 'Enviar solicitud'}
              {language === 'it' && 'Invia candidatura'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            {language === 'fr' && 'Réponse sous 48-72h • Support: '}
            {language === 'en' && 'Response within 48-72h • Support: '}
            {language === 'es' && 'Respuesta en 48-72h • Soporte: '}
            {language === 'it' && 'Risposta entro 48-72h • Supporto: '}
            <a href="mailto:influencers@hydrao.com" className="text-[#6B1E3E] font-semibold hover:underline">
              influencers@hydrao.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
