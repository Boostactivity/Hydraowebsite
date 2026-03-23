import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Award, TrendingUp, Users, Gift, BookOpen, FileText, Image, Download, CheckCircle, DollarSign, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

export function ArchitectPartnership() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [showForm, setShowForm] = useState(false);

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: language === 'fr' ? 'Commission 15%' : '15% Commission',
      description: language === 'fr'
        ? '73.50€ par HYDRAO prescrit (490€ × 15%)'
        : '$80 per HYDRAO prescribed ($535 × 15%)',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: language === 'fr' ? 'Specs BIM' : 'BIM Specs',
      description: language === 'fr'
        ? 'Fichiers Revit, ArchiCAD, SketchUp prêts'
        : 'Ready-to-use Revit, ArchiCAD, SketchUp files',
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: language === 'fr' ? 'Visuels HD' : 'HD Visuals',
      description: language === 'fr'
        ? 'Rendus 3D, photos produits haute résolution'
        : '3D renders, high-res product photography',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: language === 'fr' ? 'CPD Training' : 'CPD Training',
      description: language === 'fr'
        ? 'Formation continue professionnelle certifiée'
        : 'Certified professional development training',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: language === 'fr' ? 'Co-Branding' : 'Co-Branding',
      description: language === 'fr'
        ? 'Mise en avant de vos projets HYDRAO'
        : 'Feature your HYDRAO projects',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'fr' ? 'Network VIP' : 'VIP Network',
      description: language === 'fr'
        ? 'Accès communauté architectes + événements'
        : 'Access architect community + events',
    },
  ];

  const projects = [
    {
      name: language === 'fr' ? 'Résidence Luxe' : 'Luxury Residence',
      location: 'Paris 16e',
      architect: 'Studio Darchitecte',
      units: 12,
      image: '🏢',
      revenue: 12 * 73.5,
    },
    {
      name: language === 'fr' ? 'Hôtel Boutique' : 'Boutique Hotel',
      location: 'Lyon',
      architect: 'Atelier Design',
      units: 45,
      image: '🏨',
      revenue: 45 * 73.5,
    },
    {
      name: language === 'fr' ? 'Appartements Haut de Gamme' : 'Premium Apartments',
      location: 'Bordeaux',
      architect: 'Cabinet Architecture',
      units: 28,
      image: '🏛️',
      revenue: 28 * 73.5,
    },
  ];

  const resources = [
    {
      title: language === 'fr' ? 'BIM Library' : 'BIM Library',
      files: ['Revit (.rfa)', 'ArchiCAD (.gsm)', 'SketchUp (.skp)'],
      icon: <FileText className="w-5 h-5" />,
      size: '45 MB',
    },
    {
      title: language === 'fr' ? 'Specs Techniques' : 'Technical Specs',
      files: ['Dimensions', 'Raccordements', 'Capacités'],
      icon: <Ruler className="w-5 h-5" />,
      size: '3.2 MB',
    },
    {
      title: language === 'fr' ? 'Assets Visuels' : 'Visual Assets',
      files: ['Rendus 3D 4K', 'Photos HD', 'Textures'],
      icon: <Image className="w-5 h-5" />,
      size: '280 MB',
    },
  ];

  const stats = [
    {
      value: '180+',
      label: language === 'fr' ? 'Architectes partenaires' : 'Partner architects',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '3 200+',
      label: language === 'fr' ? 'Unités prescrites' : 'Units prescribed',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: formatPrice(5800),
      label: language === 'fr' ? 'Commission moy/projet' : 'Avg commission/project',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      value: '95%',
      label: language === 'fr' ? 'Taux satisfaction' : 'Satisfaction rate',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Ruler className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Programme Partenaires Architectes'}
            {language === 'en' && 'Architect Partnership Program'}
            {language === 'es' && 'Programa Partners Arquitectos'}
            {language === 'it' && 'Programma Partner Architetti'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Prescrivez HYDRAO dans vos projets haut de gamme'}
            {language === 'en' && 'Prescribe HYDRAO in your premium projects'}
            {language === 'es' && 'Prescribe HYDRAO en tus proyectos premium'}
            {language === 'it' && 'Prescrivi HYDRAO nei tuoi progetti premium'}
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
            <h3 className="text-3xl font-bold mb-3">
              {language === 'fr' && 'Valorisez vos projets avec HYDRAO'}
              {language === 'en' && 'Enhance your projects with HYDRAO'}
              {language === 'es' && 'Valoriza tus proyectos con HYDRAO'}
              {language === 'it' && 'Valorizza i tuoi progetti con HYDRAO'}
            </h3>
            <p className="text-lg opacity-90 mb-4">
              {language === 'fr' && 'Le robinet 5-en-1 plébiscité par les architectes pour les projets résidentiels et hôteliers premium. Design minimaliste, performance maximale.'}
              {language === 'en' && 'The 5-in-1 tap favored by architects for premium residential and hotel projects. Minimalist design, maximum performance.'}
              {language === 'es' && 'El grifo 5 en 1 preferido por arquitectos para proyectos residenciales y hoteleros premium. Diseño minimalista, rendimiento máximo.'}
              {language === 'it' && 'Il rubinetto 5 in 1 preferito dagli architetti per progetti residenziali e alberghieri premium. Design minimalista, prestazioni massime.'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'fr' && 'Rejoindre le programme'}
              {language === 'en' && 'Join the program'}
              {language === 'es' && 'Unirse al programa'}
              {language === 'it' && 'Unisciti al programma'}
            </button>
          </div>
          <div className="hidden md:block text-8xl">📐</div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Avantages architectes'}
          {language === 'en' && 'Architect benefits'}
          {language === 'es' && 'Beneficios arquitectos'}
          {language === 'it' && 'Vantaggi architetti'}
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

      {/* Projects Showcase */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Projets Réalisés'}
          {language === 'en' && 'Completed Projects'}
          {language === 'es' && 'Proyectos Realizados'}
          {language === 'it' && 'Progetti Realizzati'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white"
            >
              <div className="text-5xl mb-4">{project.image}</div>
              <h4 className="font-bold text-xl mb-2">{project.name}</h4>
              <div className="space-y-1 text-sm opacity-90 mb-4">
                <div>📍 {project.location}</div>
                <div>🏗️ {project.architect}</div>
                <div>
                  {project.units}{' '}
                  {language === 'fr' && 'unités HYDRAO'}
                  {language === 'en' && 'HYDRAO units'}
                  {language === 'es' && 'unidades HYDRAO'}
                  {language === 'it' && 'unità HYDRAO'}
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xs opacity-90 mb-1">
                  {language === 'fr' && 'Commission totale'}
                  {language === 'en' && 'Total commission'}
                  {language === 'es' && 'Comisión total'}
                  {language === 'it' && 'Commissione totale'}
                </div>
                <div className="text-2xl font-bold">{formatPrice(project.revenue)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Ressources Techniques'}
          {language === 'en' && 'Technical Resources'}
          {language === 'es' && 'Recursos Técnicos'}
          {language === 'it' && 'Risorse Tecniche'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {resource.icon}
                </div>
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{resource.title}</h4>
              <div className="space-y-1 mb-3">
                {resource.files.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {file}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500">{resource.size}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Prescribe HYDRAO */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white mb-6">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          {language === 'fr' && 'Pourquoi prescrire HYDRAO ?'}
          {language === 'en' && 'Why prescribe HYDRAO?'}
          {language === 'es' && '¿Por qué prescribir HYDRAO?'}
          {language === 'it' && 'Perché prescrivere HYDRAO?'}
        </h3>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Design minimaliste'}
                {language === 'en' && 'Minimalist design'}
                {language === 'es' && 'Diseño minimalista'}
                {language === 'it' && 'Design minimalista'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'S\'intègre parfaitement dans vos concepts haut de gamme'}
                {language === 'en' && 'Perfectly integrated into your premium concepts'}
                {language === 'es' && 'Se integra perfectamente en tus conceptos premium'}
                {language === 'it' && 'Si integra perfettamente nei tuoi concetti premium'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Argument de vente'}
                {language === 'en' && 'Selling point'}
                {language === 'es' && 'Argumento de venta'}
                {language === 'it' && 'Argomento di vendita'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Différenciez vos projets avec une innovation unique'}
                {language === 'en' && 'Differentiate your projects with unique innovation'}
                {language === 'es' && 'Diferencia tus proyectos con innovación única'}
                {language === 'it' && 'Differenzia i tuoi progetti con innovazione unica'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Durabilité'}
                {language === 'en' && 'Sustainability'}
                {language === 'es' && 'Sostenibilidad'}
                {language === 'it' && 'Sostenibilità'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Répondez aux normes RE2020 et HQE'}
                {language === 'en' && 'Meet RE2020 and HQE standards'}
                {language === 'es' && 'Cumple con normas RE2020 y HQE'}
                {language === 'it' && 'Soddisfa gli standard RE2020 e HQE'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Satisfaction client'}
                {language === 'en' && 'Client satisfaction'}
                {language === 'es' && 'Satisfacción cliente'}
                {language === 'it' && 'Soddisfazione cliente'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && '4.8/5 étoiles - Vos clients seront ravis'}
                {language === 'en' && '4.8/5 stars - Your clients will be delighted'}
                {language === 'es' && '4.8/5 estrellas - Tus clientes estarán encantados'}
                {language === 'it' && '4.8/5 stelle - I tuoi clienti saranno entusiasti'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200"
        >
          <h3 className="font-bold text-xl text-gray-900 mb-4">
            {language === 'fr' && 'Rejoindre le Programme'}
            {language === 'en' && 'Join the Program'}
            {language === 'es' && 'Unirse al Programa'}
            {language === 'it' && 'Unisciti al Programma'}
          </h3>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Cabinet/Agence'}
                  {language === 'en' && 'Firm/Agency'}
                  {language === 'es' && 'Estudio/Agencia'}
                  {language === 'it' && 'Studio/Agenzia'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Atelier Architecture"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Architecte principal'}
                  {language === 'en' && 'Lead architect'}
                  {language === 'es' && 'Arquitecto principal'}
                  {language === 'it' && 'Architetto principale'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Marie Dubois"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="contact@atelier-architecture.fr"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Téléphone'}
                  {language === 'en' && 'Phone'}
                  {language === 'es' && 'Teléfono'}
                  {language === 'it' && 'Telefono'}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Spécialisation'}
                  {language === 'en' && 'Specialization'}
                  {language === 'es' && 'Especialización'}
                  {language === 'it' && 'Specializzazione'}
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>{language === 'fr' ? 'Résidentiel' : 'Residential'}</option>
                  <option>{language === 'fr' ? 'Hôtellerie' : 'Hospitality'}</option>
                  <option>{language === 'fr' ? 'Commercial' : 'Commercial'}</option>
                  <option>{language === 'fr' ? 'Mixte' : 'Mixed'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  {language === 'fr' && 'Projets/an'}
                  {language === 'en' && 'Projects/year'}
                  {language === 'es' && 'Proyectos/año'}
                  {language === 'it' && 'Progetti/anno'}
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>1-3</option>
                  <option>4-10</option>
                  <option>11-20</option>
                  <option>20+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2">Portfolio (URL)</label>
              <input
                type="url"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="https://atelier-architecture.fr"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-[#6B1E3E] to-blue-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              {language === 'fr' && 'Rejoindre le programme'}
              {language === 'en' && 'Join the program'}
              {language === 'es' && 'Unirse al programa'}
              {language === 'it' && 'Unisciti al programma'}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
