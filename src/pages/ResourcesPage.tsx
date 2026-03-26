import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Video, FileText, MessageCircle, TrendingUp, Users, Award, Check, ArrowRight } from 'lucide-react';
import { Page } from '../App';
import { DownloadableGuides } from '../components/content/DownloadableGuides';

interface ResourcesPageProps {
  navigate: (page: Page) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  situation: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  savings: number;
  timeframe: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Restaurant 3 étoiles réduit ses coûts de 40%',
    client: 'Restaurant Le Jardin',
    location: 'Paris 8ème',
    situation: 'Restaurant gastronomique de 80 couverts utilisant 500L d\'eau filtrée par jour',
    challenge: 'Coûts élevés en eau embouteillée pour cuisine et service, impact environnemental négatif',
    solution: '3 HYDRAL Premium installés : cuisine, bar, service',
    results: [
      '€2,400 économisés par an',
      '12,000 bouteilles plastique évitées',
      'Temps de service réduit de 30%',
      'Image éco-responsable renforcée'
    ],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop',
    savings: 2400,
    timeframe: '1 an'
  },
  {
    id: '2',
    title: 'Famille de 5 personnes : 1 000€ économisés',
    client: 'Famille Martin',
    location: 'Lyon',
    situation: 'Famille avec 3 enfants, grosse consommation d\'eau pétillante (15 packs/mois)',
    challenge: 'Budget bouteilles élevé, corvée de courses, manque de place stockage',
    solution: 'HYDRAL Premium + abonnement Confort',
    results: [
      '€1,200 économisés par an',
      '5,400 bouteilles évitées',
      'Gain de place considérable',
      'Eau pétillante à volonté pour les enfants'
    ],
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=500&fit=crop',
    savings: 1200,
    timeframe: '1 an'
  },
  {
    id: '3',
    title: 'Bureau 50 personnes : ROI en 8 mois',
    client: 'Tech Startup ParisOne',
    location: 'Paris La Défense',
    situation: 'Startup tech de 50 employés avec forte consommation café/thé',
    challenge: 'Machine à café médiocre, fontaine à eau basique, team insatisfait',
    solution: 'HYDRAL Premium espace café + 2 Compact aux étages',
    results: [
      '€3,600 économisés par an',
      'Satisfaction employés +85%',
      'ROI atteint en 8 mois',
      'Argument recrutement écologie'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    savings: 3600,
    timeframe: '8 mois ROI'
  }
];

export function ResourcesPage({ navigate }: ResourcesPageProps) {
  const [activeTab, setActiveTab] = useState<'guides' | 'videos' | 'blog' | 'cases' | 'faq'>('guides');

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="mb-6 text-gray-900">
            Centre de ressources HYDRAL
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour devenir un expert HYDRAL
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {[
            { id: 'guides', icon: FileText, label: 'Guides PDF' },
            { id: 'videos', icon: Video, label: 'Vidéos' },
            { id: 'blog', icon: BookOpen, label: 'Blog' },
            { id: 'cases', icon: Award, label: 'Success Stories' },
            { id: 'faq', icon: MessageCircle, label: 'FAQ' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#6B1E3E] text-white shadow-lg'
                  : 'bg-[#FAF8F5] text-gray-700 hover:bg-[#6B1E3E]/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[600px]">
          {activeTab === 'guides' && <GuidesTab />}
          {activeTab === 'videos' && <VideosTab navigate={navigate} />}
          {activeTab === 'blog' && <BlogTab navigate={navigate} />}
          {activeTab === 'cases' && <CaseStudiesTab cases={CASE_STUDIES} />}
          {activeTab === 'faq' && <FAQTab navigate={navigate} />}
        </div>
      </div>
    </div>
  );
}

function GuidesTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        Téléchargez nos guides gratuits
      </h2>
      <DownloadableGuides />
    </motion.div>
  );
}

function VideosTab({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <Video className="w-20 h-20 mx-auto mb-6 text-red-600" />
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Vidéothèque complète
      </h2>
      <p className="text-[#8B7E74] mb-8 max-w-2xl mx-auto">
        Tutoriels d'installation, témoignages clients, comparatifs produits et bien plus encore
      </p>
      <button
        onClick={() => navigate('video-hub')}
        className="px-8 py-4 bg-[#6B1E3E] text-white rounded-full font-medium hover:bg-[#6B1E3E]/90 hover:shadow-xl transition-all"
      >
        Accéder aux vidéos
      </button>
    </motion.div>
  );
}

function BlogTab({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <BookOpen className="w-20 h-20 mx-auto mb-6 text-[#6B1E3E]" />
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Blog Lifestyle HYDRAL
      </h2>
      <p className="text-[#8B7E74] mb-8 max-w-2xl mx-auto">
        Inspirations, conseils et guides pour tirer le meilleur de votre robinet 5-en-1
      </p>
      <button
        onClick={() => navigate('blog')}
        className="px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all"
      >
        Lire les articles
      </button>
    </motion.div>
  );
}

function CaseStudiesTab({ cases }: { cases: CaseStudy[] }) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  if (selectedCase) {
    return <CaseStudyDetail caseStudy={selectedCase} onBack={() => setSelectedCase(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        Success Stories Clients
      </h2>
      <p className="text-[#8B7E74] mb-12 text-center max-w-2xl mx-auto">
        Découvrez comment nos clients transforment leur quotidien et économisent des milliers d'euros avec HYDRAL
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((caseStudy, index) => (
          <motion.button
            key={caseStudy.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCase(caseStudy)}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all text-left"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                {caseStudy.savings}€ économisés
              </div>
            </div>

            <div className="p-6">
              <div className="text-sm text-[#8B7E74] mb-2">{caseStudy.client} • {caseStudy.location}</div>
              <h3 className="font-bold text-gray-900 mb-3 group-hover:text-[#6B1E3E] transition-colors">
                {caseStudy.title}
              </h3>

              <div className="space-y-2 mb-4">
                {caseStudy.results.slice(0, 2).map((result, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#8B7E74]">
                    <Check className="w-4 h-4 text-[#6B1E3E] mt-0.5 flex-shrink-0" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-[#6B1E3E] font-medium text-sm">
                <span>Lire l'étude complète</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function CaseStudyDetail({ caseStudy, onBack }: { caseStudy: CaseStudy; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#8B7E74] hover:text-[#6B1E3E] transition-colors mb-8"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
        <span>Retour aux success stories</span>
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
              {caseStudy.savings}€ économisés
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
              {caseStudy.timeframe}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {caseStudy.title}
          </h1>

          <div className="text-lg text-[#8B7E74] mb-8">
            {caseStudy.client} • {caseStudy.location}
          </div>

          <div className="space-y-8">
            <Section title="Situation initiale" icon={Users}>
              <p className="text-gray-700 leading-relaxed">{caseStudy.situation}</p>
            </Section>

            <Section title="Défi" icon={TrendingUp}>
              <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
            </Section>

            <Section title="Solution HYDRAL" icon={Award}>
              <p className="text-gray-700 leading-relaxed mb-4">{caseStudy.solution}</p>
            </Section>

            <Section title="Résultats" icon={Check}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-xl"
                  >
                    <Check className="w-5 h-5 text-[#6B1E3E] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#6B1E3E]" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FAQTab({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <MessageCircle className="w-20 h-20 mx-auto mb-6 text-[#6B1E3E]" />
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Base de connaissances FAQ
      </h2>
      <p className="text-[#8B7E74] mb-8 max-w-2xl mx-auto">
        50+ questions-réponses sur l'installation, l'utilisation, la maintenance et la garantie
      </p>
      <button
        onClick={() => navigate('faq')}
        className="px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all"
      >
        Accéder à la FAQ complète
      </button>
    </motion.div>
  );
}
