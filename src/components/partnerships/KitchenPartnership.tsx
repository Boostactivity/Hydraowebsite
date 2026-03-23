import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, TrendingUp, Award, Users, DollarSign, Package, CheckCircle, Gift, BookOpen, Headphones, FileText, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

interface PartnerBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function KitchenPartnership() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [showForm, setShowForm] = useState(false);

  const benefits: PartnerBenefit[] = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: language === 'fr' ? 'Commission 20%' : '20% Commission',
      description: language === 'fr'
        ? 'Gagnez 98€ par HYDRAO vendu (490€ × 20%)'
        : 'Earn $107 per HYDRAO sold ($535 × 20%)',
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: language === 'fr' ? 'Showroom Kit' : 'Showroom Kit',
      description: language === 'fr'
        ? 'HYDRAO démo offert pour votre showroom + PLV'
        : 'Free demo HYDRAO for your showroom + POS materials',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: language === 'fr' ? 'Formation Technique' : 'Technical Training',
      description: language === 'fr'
        ? 'Formation installation + argumentaire vente'
        : 'Installation training + sales pitch',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'fr' ? 'Leads Qualifiés' : 'Qualified Leads',
      description: language === 'fr'
        ? 'Clients de votre zone géographique orientés vers vous'
        : 'Customers in your area directed to you',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: language === 'fr' ? 'Support Dédié' : 'Dedicated Support',
      description: language === 'fr'
        ? 'Hotline partenaires 7j/7 + account manager'
        : 'Partner hotline 7/7 + account manager',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: language === 'fr' ? 'Certification' : 'Certification',
      description: language === 'fr'
        ? 'Label "Installateur Certifié HYDRAO"'
        : '"HYDRAO Certified Installer" badge',
    },
  ];

  const tiers = [
    {
      name: language === 'fr' ? 'Bronze' : 'Bronze',
      sales: '1-5',
      commission: 20,
      benefits: [
        language === 'fr' ? 'Commission 20%' : '20% commission',
        language === 'fr' ? 'Showroom kit' : 'Showroom kit',
        language === 'fr' ? 'Formation en ligne' : 'Online training',
        language === 'fr' ? 'Support email' : 'Email support',
      ],
      color: 'from-orange-400 to-amber-600',
    },
    {
      name: language === 'fr' ? 'Silver' : 'Silver',
      sales: '6-15',
      commission: 22,
      benefits: [
        language === 'fr' ? 'Commission 22%' : '22% commission',
        language === 'fr' ? 'Showroom kit premium' : 'Premium showroom kit',
        language === 'fr' ? 'Formation présentielle' : 'On-site training',
        language === 'fr' ? 'Support téléphone' : 'Phone support',
        language === 'fr' ? 'Leads qualifiés' : 'Qualified leads',
      ],
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: language === 'fr' ? 'Gold' : 'Gold',
      sales: '16+',
      commission: 25,
      benefits: [
        language === 'fr' ? 'Commission 25%' : '25% commission',
        language === 'fr' ? 'Multi-showroom kits' : 'Multi-showroom kits',
        language === 'fr' ? 'Formation continue' : 'Ongoing training',
        language === 'fr' ? 'Account manager dédié' : 'Dedicated account manager',
        language === 'fr' ? 'Co-marketing' : 'Co-marketing',
        language === 'fr' ? 'Priorité leads' : 'Priority leads',
      ],
      color: 'from-yellow-400 to-yellow-600',
    },
  ];

  const stats = [
    {
      value: '450+',
      label: language === 'fr' ? 'Cuisinistes partenaires' : 'Partner installers',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: formatPrice(98),
      label: language === 'fr' ? 'Commission moyenne' : 'Avg commission',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      value: '8 500€',
      label: language === 'fr' ? 'Revenu moyen/an' : 'Avg revenue/year',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '4.9/5',
      label: language === 'fr' ? 'Satisfaction partenaires' : 'Partner satisfaction',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const resources = [
    {
      title: language === 'fr' ? 'Guide Installation' : 'Installation Guide',
      description: language === 'fr' ? 'PDF technique 24 pages' : '24-page technical PDF',
      icon: <FileText className="w-5 h-5" />,
      size: '2.4 MB',
    },
    {
      title: language === 'fr' ? 'Argumentaire Vente' : 'Sales Pitch',
      description: language === 'fr' ? 'Script + objections' : 'Script + objections',
      icon: <BookOpen className="w-5 h-5" />,
      size: '1.8 MB',
    },
    {
      title: language === 'fr' ? 'Assets Marketing' : 'Marketing Assets',
      description: language === 'fr' ? 'Logos, photos HD, vidéos' : 'Logos, HD photos, videos',
      icon: <Package className="w-5 h-5" />,
      size: '150 MB',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Wrench className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Programme Partenaires Cuisinistes'}
            {language === 'en' && 'Kitchen Installer Partnership'}
            {language === 'es' && 'Programa Partners Cocinas'}
            {language === 'it' && 'Programma Partner Cucine'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Jusqu\'à 25% de commission par vente'}
            {language === 'en' && 'Up to 25% commission per sale'}
            {language === 'es' && 'Hasta 25% de comisión por venta'}
            {language === 'it' && 'Fino al 25% di commissione per vendita'}
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
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200"
          >
            <div className="flex items-center gap-2 mb-2 text-orange-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-orange-600 rounded-xl p-8 text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-3">
              {language === 'fr' && 'Augmentez votre CA de 15-25%'}
              {language === 'en' && 'Increase your revenue by 15-25%'}
              {language === 'es' && 'Aumenta tus ingresos 15-25%'}
              {language === 'it' && 'Aumenta il fatturato del 15-25%'}
            </h3>
            <p className="text-lg opacity-90 mb-4">
              {language === 'fr' && 'Proposez HYDRAO dans vos projets cuisine haut de gamme. Installation facile, marges attractives, clients satisfaits.'}
              {language === 'en' && 'Offer HYDRAO in your premium kitchen projects. Easy installation, attractive margins, satisfied customers.'}
              {language === 'es' && 'Ofrece HYDRAO en tus proyectos de cocina premium. Instalación fácil, márgenes atractivos, clientes satisfechos.'}
              {language === 'it' && 'Proponi HYDRAO nei tuoi progetti cucina premium. Installazione facile, margini interessanti, clienti soddisfatti.'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'fr' && 'Devenir partenaire'}
              {language === 'en' && 'Become a partner'}
              {language === 'es' && 'Ser partner'}
              {language === 'it' && 'Diventa partner'}
            </button>
          </div>
          <div className="hidden md:block text-8xl">🔧</div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Vos avantages'}
          {language === 'en' && 'Your benefits'}
          {language === 'es' && 'Tus ventajas'}
          {language === 'it' && 'I tuoi vantaggi'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-orange-500 transition-colors"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-3">
                {benefit.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Niveaux de partenariat'}
          {language === 'en' && 'Partnership tiers'}
          {language === 'es' && 'Niveles de asociación'}
          {language === 'it' && 'Livelli partnership'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative overflow-hidden rounded-xl"
            >
              <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold mb-2">{tier.name}</h4>
                  <div className="text-sm opacity-90 mb-3">
                    {tier.sales}{' '}
                    {language === 'fr' && 'ventes/mois'}
                    {language === 'en' && 'sales/month'}
                    {language === 'es' && 'ventas/mes'}
                    {language === 'it' && 'vendite/mese'}
                  </div>
                  <div className="text-4xl font-bold">{tier.commission}%</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Ressources partenaires'}
          {language === 'en' && 'Partner resources'}
          {language === 'es' && 'Recursos partners'}
          {language === 'it' && 'Risorse partner'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{resource.size}</span>
                    <Download className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200"
        >
          <h3 className="font-bold text-xl text-gray-900 mb-4">
            {language === 'fr' && 'Candidature Partenaire'}
            {language === 'en' && 'Partner Application'}
            {language === 'es' && 'Solicitud Partner'}
            {language === 'it' && 'Candidatura Partner'}
          </h3>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Nom de l\'entreprise'}
                  {language === 'en' && 'Company name'}
                  {language === 'es' && 'Nombre empresa'}
                  {language === 'it' && 'Nome azienda'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="Cuisines Dupont"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">SIRET/VAT</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="123 456 789 00012"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Contact'}
                  {language === 'en' && 'Contact'}
                  {language === 'es' && 'Contacto'}
                  {language === 'it' && 'Contatto'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="contact@cuisines-dupont.fr"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Téléphone'}
                  {language === 'en' && 'Phone'}
                  {language === 'es' && 'Teléfono'}
                  {language === 'it' && 'Telefono'}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Ville'}
                  {language === 'en' && 'City'}
                  {language === 'es' && 'Ciudad'}
                  {language === 'it' && 'Città'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  placeholder="Paris"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                {language === 'fr' && 'Volume cuisine/an'}
                {language === 'en' && 'Kitchen volume/year'}
                {language === 'es' && 'Volumen cocinas/año'}
                {language === 'it' && 'Volume cucine/anno'}
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none">
                <option>1-10</option>
                <option>11-30</option>
                <option>31-60</option>
                <option>61-100</option>
                <option>100+</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">
                {language === 'fr' && 'Message'}
                {language === 'en' && 'Message'}
                {language === 'es' && 'Mensaje'}
                {language === 'it' && 'Messaggio'}
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                placeholder={language === 'fr' ? 'Parlez-nous de votre entreprise...' : 'Tell us about your company...'}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-[#6B1E3E] to-orange-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              {language === 'fr' && 'Envoyer ma candidature'}
              {language === 'en' && 'Submit application'}
              {language === 'es' && 'Enviar solicitud'}
              {language === 'it' && 'Invia candidatura'}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
