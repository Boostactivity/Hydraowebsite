import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Leaf, TrendingDown, Award, CheckCircle, Target, BarChart3, Globe, Users, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface Metric {
  id: string;
  category: 'carbon' | 'plastic' | 'water' | 'energy';
  name: string;
  value: string;
  target: string;
  progress: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface Initiative {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  impact: string;
  year: string;
  emoji: string;
}

export function SustainabilityReport() {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const metrics: Metric[] = [
    {
      id: '1',
      category: 'carbon',
      name: language === 'fr' ? 'Émissions CO₂ évitées' : 'CO₂ emissions avoided',
      value: '4 230 tonnes',
      target: '5 000 tonnes',
      progress: 85,
      trend: 'down',
      icon: <Leaf className="w-5 h-5" />,
      color: 'green',
    },
    {
      id: '2',
      category: 'plastic',
      name: language === 'fr' ? 'Plastique évité' : 'Plastic avoided',
      value: '124 tonnes',
      target: '150 tonnes',
      progress: 83,
      trend: 'down',
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: '3',
      category: 'water',
      name: language === 'fr' ? 'Eau économisée' : 'Water saved',
      value: '45.6M litres',
      target: '50M litres',
      progress: 91,
      trend: 'up',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'cyan',
    },
    {
      id: '4',
      category: 'energy',
      name: language === 'fr' ? 'Énergie renouvelable' : 'Renewable energy',
      value: '78%',
      target: '100%',
      progress: 78,
      trend: 'up',
      icon: <Zap className="w-5 h-5" />,
      color: 'yellow',
    },
  ];

  const initiatives: Initiative[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Usine 100% énergie verte' : '100% green energy factory',
      description: language === 'fr'
        ? 'Transition complète vers énergie solaire et éolienne pour notre site de production principal.'
        : 'Complete transition to solar and wind energy for our main production facility.',
      status: 'completed',
      impact: language === 'fr' ? '-890 tonnes CO₂/an' : '-890 tons CO₂/year',
      year: '2024',
      emoji: '☀️',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Packaging 100% recyclable' : '100% recyclable packaging',
      description: language === 'fr'
        ? 'Élimination totale du plastique dans nos emballages, remplacé par carton recyclé et matériaux compostables.'
        : 'Total elimination of plastic in our packaging, replaced by recycled cardboard and compostable materials.',
      status: 'completed',
      impact: language === 'fr' ? '-45 tonnes plastique/an' : '-45 tons plastic/year',
      year: '2024',
      emoji: '📦',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Programme reforestation' : 'Reforestation program',
      description: language === 'fr'
        ? 'Plantation de 50 000 arbres en partenariat avec One Tree Planted pour compenser notre empreinte carbone.'
        : 'Planting 50,000 trees in partnership with One Tree Planted to offset our carbon footprint.',
      status: 'in-progress',
      impact: language === 'fr' ? '+50K arbres plantés' : '+50K trees planted',
      year: '2024',
      emoji: '🌳',
    },
    {
      id: '4',
      name: language === 'fr' ? 'Recyclage filtres usagés' : 'Used filter recycling',
      description: language === 'fr'
        ? 'Programme de retour et recyclage des filtres usagés avec valorisation à 95%.'
        : 'Return and recycling program for used filters with 95% recovery rate.',
      status: 'in-progress',
      impact: language === 'fr' ? '95% taux recyclage' : '95% recycling rate',
      year: '2024',
      emoji: '♻️',
    },
    {
      id: '5',
      name: language === 'fr' ? 'Neutralité carbone 2025' : 'Carbon neutral 2025',
      description: language === 'fr'
        ? 'Objectif ambitieux de neutralité carbone totale pour toute la chaîne de valeur HYDRAO d\'ici fin 2025.'
        : 'Ambitious goal of total carbon neutrality for the entire HYDRAO value chain by end of 2025.',
      status: 'planned',
      impact: language === 'fr' ? '0 émission nette' : 'Net zero emissions',
      year: '2025',
      emoji: '🎯',
    },
  ];

  const certifications = [
    { name: 'B Corp', logo: '🏅', status: 'certified' },
    { name: 'Carbon Neutral', logo: '🌿', status: 'certified' },
    { name: 'ISO 14001', logo: '✅', status: 'certified' },
    { name: '1% for the Planet', logo: '🌍', status: 'member' },
  ];

  const stats = [
    {
      value: '4.2K',
      label: language === 'fr' ? 'Tonnes CO₂ évitées' : 'Tons CO₂ avoided',
      icon: <Leaf className="w-5 h-5" />,
    },
    {
      value: '124',
      label: language === 'fr' ? 'Tonnes plastique' : 'Tons plastic',
      icon: <TrendingDown className="w-5 h-5" />,
    },
    {
      value: '45.6M',
      label: language === 'fr' ? 'Litres eau' : 'Liters water',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      value: '50K',
      label: language === 'fr' ? 'Arbres plantés' : 'Trees planted',
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return language === 'fr' ? 'Complété' : 'Completed';
      case 'in-progress': return language === 'fr' ? 'En cours' : 'In progress';
      case 'planned': return language === 'fr' ? 'Planifié' : 'Planned';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'orange';
      case 'planned': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Rapport Durabilité 2024'}
            {language === 'en' && 'Sustainability Report 2024'}
            {language === 'es' && 'Informe Sostenibilidad 2024'}
            {language === 'it' && 'Rapporto Sostenibilità 2024'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Transparence totale sur notre impact environnemental'}
            {language === 'en' && 'Total transparency on our environmental impact'}
            {language === 'es' && 'Transparencia total sobre nuestro impacto ambiental'}
            {language === 'it' && 'Trasparenza totale sul nostro impatto ambientale'}
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
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-2 text-green-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Indicateurs clés 2024'}
          {language === 'en' && 'Key metrics 2024'}
          {language === 'es' && 'Indicadores clave 2024'}
          {language === 'it' && 'Indicatori chiave 2024'}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-xl p-6 border-2 border-${metric.color}-200`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-200 rounded-full flex items-center justify-center text-${metric.color}-700`}>
                  {metric.icon}
                </div>
                <div className={`bg-${metric.color}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {metric.progress}%
                </div>
              </div>

              <h4 className="font-bold text-lg text-gray-900 mb-2">{metric.name}</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {language === 'fr' ? 'Réalisé' : 'Achieved'}
                  </div>
                  <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {language === 'fr' ? 'Objectif 2024' : '2024 Target'}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">{metric.target}</div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-3 rounded-full transition-all`}
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Initiatives */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Initiatives durabilité'}
          {language === 'en' && 'Sustainability initiatives'}
          {language === 'es' && 'Iniciativas sostenibilidad'}
          {language === 'it' && 'Iniziative sostenibilità'}
        </h3>

        <div className="space-y-4">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Emoji */}
                <div className="text-5xl flex-shrink-0">{initiative.emoji}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{initiative.name}</h4>
                    <div className={`bg-${getStatusColor(initiative.status)}-100 text-${getStatusColor(initiative.status)}-700 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap`}>
                      {getStatusLabel(initiative.status)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{initiative.description}</p>

                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full border border-green-200">
                      {initiative.impact}
                    </div>
                    <div className="text-sm text-gray-500">
                      {initiative.year}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Certifications & Engagements'}
          {language === 'en' && 'Certifications & Commitments'}
          {language === 'es' && 'Certificaciones & Compromisos'}
          {language === 'it' && 'Certificazioni & Impegni'}
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 text-center"
            >
              <div className="text-5xl mb-3">{cert.logo}</div>
              <div className="font-bold text-gray-900 mb-2">{cert.name}</div>
              <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block">
                {cert.status === 'certified' 
                  ? (language === 'fr' ? 'Certifié' : 'Certified')
                  : (language === 'fr' ? 'Membre' : 'Member')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-6">
          {language === 'fr' && 'Roadmap durabilité'}
          {language === 'en' && 'Sustainability roadmap'}
          {language === 'es' && 'Roadmap sostenibilidad'}
          {language === 'it' && 'Roadmap sostenibilità'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg text-gray-900 mb-2">2024</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>✅ Usine 100% verte</div>
              <div>✅ Packaging recyclable</div>
              <div>🔄 Programme reforestation</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg text-gray-900 mb-2">2025</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>🎯 Neutralité carbone</div>
              <div>🔄 Recyclage filtres</div>
              <div>📦 Emballage 100% compostable</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-lg text-gray-900 mb-2">2026</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>🌍 Impact positif net</div>
              <div>♻️ Économie circulaire</div>
              <div>🌳 100K arbres plantés</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-green-600 rounded-xl p-8 text-white text-center">
        <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Transparence totale, action concrète'}
          {language === 'en' && 'Total transparency, concrete action'}
          {language === 'es' && 'Transparencia total, acción concreta'}
          {language === 'it' && 'Trasparenza totale, azione concreta'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && 'Notre rapport durabilité complet est public et audité par un tiers indépendant. Téléchargez-le pour voir tous les détails.'}
          {language === 'en' && 'Our complete sustainability report is public and audited by an independent third party. Download it to see all details.'}
          {language === 'es' && 'Nuestro informe completo de sostenibilidad es público y auditado por un tercero independiente. Descárgalo para ver todos los detalles.'}
          {language === 'it' && 'Il nostro rapporto completo di sostenibilità è pubblico e verificato da una terza parte indipendente. Scaricalo per vedere tutti i dettagli.'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {language === 'fr' && 'Télécharger rapport PDF'}
            {language === 'en' && 'Download PDF report'}
            {language === 'es' && 'Descargar informe PDF'}
            {language === 'it' && 'Scarica rapporto PDF'}
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
            <Target className="w-5 h-5" />
            {language === 'fr' && 'Voir objectifs 2025'}
            {language === 'en' && 'View 2025 goals'}
            {language === 'es' && 'Ver objetivos 2025'}
            {language === 'it' && 'Vedi obiettivi 2025'}
          </button>
        </div>
      </div>
    </div>
  );
}
