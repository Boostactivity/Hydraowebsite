import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, Check, X, Mail, Sparkles, Lock, Star } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  description: string;
  pages: number;
  downloadCount: number;
  image: string;
  category: string;
  featured?: boolean;
}

const GUIDES: Guide[] = [
  {
    id: 'savings-guide',
    title: 'Guide ultime des économies d\'eau',
    description: 'Calculateurs détaillés, astuces pratiques et témoignages pour économiser jusqu\'à 1200€/an sur votre facture d\'eau.',
    pages: 24,
    downloadCount: 3421,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=500&fit=crop',
    category: 'Économies',
    featured: true
  },
  {
    id: 'installation-checklist',
    title: 'Checklist installation robinet HYDRAL',
    description: 'Liste complète des outils nécessaires, étapes à suivre et pièges à éviter. Installation réussie garantie !',
    pages: 12,
    downloadCount: 2876,
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=500&fit=crop',
    category: 'Installation',
    featured: true
  },
  {
    id: 'maintenance-guide',
    title: 'Guide entretien et maintenance',
    description: 'Calendrier de maintenance, procédures de nettoyage et conseils pour prolonger la durée de vie de votre HYDRAL.',
    pages: 16,
    downloadCount: 1954,
    image: 'https://images.unsplash.com/photo-1585128792334-2e82b9813d70?w=400&h=500&fit=crop',
    category: 'Maintenance'
  },
  {
    id: 'recipes-book',
    title: 'Livre de recettes eau pétillante',
    description: '50 recettes de cocktails, mocktails et boissons santé à réaliser avec votre eau pétillante HYDRAL.',
    pages: 48,
    downloadCount: 4532,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=500&fit=crop',
    category: 'Lifestyle',
    featured: true
  },
  {
    id: 'eco-impact',
    title: 'Calculateur impact écologique',
    description: 'Outil Excel pour calculer précisément votre empreinte carbone évitée et le nombre de bouteilles plastique économisées.',
    pages: 8,
    downloadCount: 1243,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=500&fit=crop',
    category: 'Écologie'
  },
  {
    id: 'kitchen-design',
    title: 'Guide design cuisine moderne',
    description: 'Inspirations, tendances 2026 et conseils d\'architectes pour intégrer HYDRAL dans votre cuisine de rêve.',
    pages: 32,
    downloadCount: 2134,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop',
    category: 'Design'
  }
];

export function DownloadableGuides() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    // En production : API call pour enregistrer l'email et envoyer le guide

    setDownloaded(true);

    // Simuler téléchargement
    setTimeout(() => {
      setSelectedGuide(null);
      setDownloaded(false);
      setEmail('');
    }, 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GuideCard guide={guide} onClick={() => setSelectedGuide(guide)} />
          </motion.div>
        ))}
      </div>

      {/* Download Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => !downloaded && setSelectedGuide(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              {!downloaded ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={selectedGuide.image}
                      alt={selectedGuide.title}
                      className="w-full h-full object-cover"
                    />
                    {selectedGuide.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        <span>Populaire</span>
                      </div>
                    )}
                  </div>

                  {/* Form */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-xs font-semibold mb-3">
                          {selectedGuide.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-xl mb-2">
                          {selectedGuide.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedGuide(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">
                      {selectedGuide.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{selectedGuide.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{selectedGuide.downloadCount.toLocaleString()} téléchargements</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-green-900">
                          <strong>100% gratuit</strong>
                          <ul className="mt-2 space-y-1 text-green-800">
                            <li>• PDF haute qualité téléchargeable</li>
                            <li>• Accès immédiat par email</li>
                            <li>• Conseils exclusifs inclus</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleDownload} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre email pour recevoir le guide
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        <span>Télécharger gratuitement</span>
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Vos données sont protégées. Pas de spam, promis ! 🔒
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    C'est envoyé ! ✨
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Vérifiez votre boîte email :
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium mb-6">
                    <Mail className="w-4 h-4" />
                    <span>{email}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Le guide <strong>{selectedGuide.title}</strong> vous attend !
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GuideCard({ guide, onClick }: { guide: Guide; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all w-full text-left relative"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {guide.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>Populaire</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium mb-2">
            {guide.category}
          </span>
          <h3 className="font-bold text-white text-lg line-clamp-2">
            {guide.title}
          </h3>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {guide.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{guide.pages} pages</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{guide.downloadCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#6B1E3E] text-white rounded-xl font-medium group-hover:bg-[#8B2E4E] transition-colors">
          <Download className="w-5 h-5" />
          <span>Télécharger gratuitement</span>
        </div>
      </div>
    </button>
  );
}

// Section complète pour page dédiée
export function GuidesSection() {
  const featuredGuides = GUIDES.filter(g => g.featured);

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Guides gratuits HYDRAL
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Téléchargez nos guides PDF experts pour devenir un pro du robinet 5-en-1
          </p>
        </motion.div>

        {/* Featured */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Les plus téléchargés</h3>
          <div>
            <DownloadableGuides />
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-12 border-2 border-blue-200"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Pourquoi télécharger nos guides ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: '100% gratuit',
                description: 'Aucun frais caché, téléchargement immédiat'
              },
              {
                icon: Sparkles,
                title: 'Expertise certifiée',
                description: 'Rédigés par nos ingénieurs et designers'
              },
              {
                icon: Check,
                title: 'Mis à jour',
                description: 'Contenu actualisé régulièrement'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Compact CTA pour autres pages
export function GuidesCTA() {
  return (
    <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-8 text-center text-white">
      <FileText className="w-12 h-12 mx-auto mb-4 text-white/90" />
      <h3 className="text-2xl font-semibold mb-2">
        Guides gratuits disponibles
      </h3>
      <p className="text-white/90 mb-6">
        Installation, économies, recettes... Tout pour devenir un pro !
      </p>
      <button className="px-8 py-3 bg-white text-[#6B1E3E] rounded-full font-semibold hover:shadow-xl transition-all">
        Télécharger les guides
      </button>
    </div>
  );
}
