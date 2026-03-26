import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Search, Eye, Clock, ThumbsUp, Filter, Video } from 'lucide-react';
import { Page } from '../App';

interface VideoHubPageProps {
  navigate: (page: Page) => void;
}

interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  views: number;
  likes: number;
  videoUrl?: string;
  featured?: boolean;
}

const VIDEOS: VideoContent[] = [
  {
    id: '1',
    title: 'Installation HYDRAL en moins d\'1h : tutoriel complet',
    description: 'Suivez notre expert pas à pas pour installer votre robinet HYDRAL sans plombier. Outils nécessaires, astuces et pièges à éviter.',
    thumbnail: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=500&fit=crop',
    duration: '15:23',
    category: 'Tutoriels',
    views: 12453,
    likes: 892,
    featured: true
  },
  {
    id: '2',
    title: 'Témoignage : Comment j\'économise jusqu\'à 1 000€/an avec HYDRAL',
    description: 'Marie, mère de 3 enfants à Lyon, partage son expérience après 1 an d\'utilisation. Calculs détaillés et surprise à la clé !',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop',
    duration: '8:45',
    category: 'Témoignages',
    views: 8721,
    likes: 634,
    featured: true
  },
  {
    id: '3',
    title: 'HYDRAL vs robinets premium : comparatif détaillé 2026',
    description: 'Analyse objective du marché des robinets 5-en-1. Prix, fonctionnalités, économies, design. On teste tout pour vous.',
    thumbnail: 'https://images.unsplash.com/photo-1560185127-6a7e3e5b9f09?w=800&h=500&fit=crop',
    duration: '12:17',
    category: 'Comparatifs',
    views: 15234,
    likes: 1124,
    featured: true
  },
  {
    id: '4',
    title: 'Entretien et maintenance : tout ce qu\'il faut savoir',
    description: 'Changement de filtre, nettoyage, détartrage... Nos conseils pour maintenir votre HYDRAL au top pendant des années.',
    thumbnail: 'https://images.unsplash.com/photo-1585128792334-2e82b9813d70?w=800&h=500&fit=crop',
    duration: '10:34',
    category: 'Tutoriels',
    views: 5892,
    likes: 421
  },
  {
    id: '5',
    title: 'Unboxing HYDRAL One : découverte complète',
    description: 'Déballage et première impression du robinet 5-en-1. Contenu du colis, qualité de fabrication, accessoires inclus.',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    duration: '7:23',
    category: 'Découverte',
    views: 9876,
    likes: 712
  },
  {
    id: '6',
    title: 'Chef étoilé : pourquoi l\'eau filtrée change tout',
    description: 'Interview exclusive d\'un chef 3 étoiles Michelin qui explique l\'impact de la qualité de l\'eau en cuisine.',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop',
    duration: '11:52',
    category: 'Experts',
    views: 4231,
    likes: 387
  },
  {
    id: '7',
    title: '10 cocktails à faire avec votre eau pétillante HYDRAL',
    description: 'Un mixologue professionnel vous dévoile ses recettes favorites. Impressionnez vos invités sans effort !',
    thumbnail: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=500&fit=crop',
    duration: '14:08',
    category: 'Recettes',
    views: 6543,
    likes: 498
  },
  {
    id: '8',
    title: 'Avant/Après : transformation complète d\'une cuisine',
    description: 'Suivez la rénovation d\'une cuisine parisienne avec l\'intégration d\'un HYDRAL. Design, travaux, résultat final.',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    duration: '9:41',
    category: 'Inspiration',
    views: 7234,
    likes: 589
  },
  {
    id: '9',
    title: 'FAQ en vidéo : 20 questions les plus fréquentes',
    description: 'Réponses rapides et claires aux questions que vous vous posez sur HYDRAL. Installation, garantie, maintenance...',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=500&fit=crop',
    duration: '18:45',
    category: 'FAQ',
    views: 3456,
    likes: 234
  },
  {
    id: '10',
    title: 'Impact écologique : 1 an sans bouteilles plastique',
    description: 'Calcul détaillé de l\'empreinte carbone évitée. Témoignage d\'une famille zéro déchet à Marseille.',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop',
    duration: '6:32',
    category: 'Écologie',
    views: 4891,
    likes: 412
  }
];

const CATEGORIES = ['Toutes', 'Tutoriels', 'Témoignages', 'Comparatifs', 'Découverte', 'Experts', 'Recettes', 'Inspiration', 'FAQ', 'Écologie'];

export function VideoHubPage({ navigate }: VideoHubPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);

  const filteredVideos = VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredVideos = VIDEOS.filter(v => v.featured);

  if (selectedVideo) {
    return <VideoPlayer video={selectedVideo} onBack={() => setSelectedVideo(null)} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-6">
            <Video className="w-10 h-10 text-[#6B1E3E]" />
          </div>
          <h1 className="mb-6 text-gray-900">
            Vidéothèque HYDRAL
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Tutoriels, témoignages et inspirations pour devenir un pro HYDRAL
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une vidéo..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#6B1E3E] text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#6B1E3E] hover:text-[#6B1E3E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Videos */}
        {selectedCategory === 'Toutes' && searchQuery === '' && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vidéos à la une</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeaturedVideoCard video={video} onClick={() => setSelectedVideo(video)} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Videos */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCategory === 'Toutes' ? 'Toutes les vidéos' : `Vidéos ${selectedCategory}`}
            </h2>
            <span className="text-[#8B7E74]">
              {filteredVideos.length} vidéo{filteredVideos.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E54] rounded-3xl p-12 text-center text-white"
        >
          <Video className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h2 className="mb-4 text-white">
            Nouveautés vidéo chaque semaine
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Abonnez-vous pour recevoir nos derniers tutoriels et témoignages
          </p>

          <button className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-medium hover:shadow-xl transition-all">
            S'abonner à la chaîne YouTube
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function FeaturedVideoCard({ video, onClick }: { video: VideoContent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all w-full text-left"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-red-600 ml-1" />
          </div>
        </div>
        <div className="absolute top-4 left-4 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">
          ⭐ À la une
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-sm font-medium">
          {video.duration}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-xs font-medium">
            {video.category}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors line-clamp-2">
          {video.title}
        </h3>
        
        <p className="text-[#8B7E74] text-sm mb-4 line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-[#8B7E74]">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{video.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{video.likes}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function VideoCard({ video, onClick }: { video: VideoContent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all w-full text-left"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-red-600 ml-1" />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded text-xs font-medium">
          {video.duration}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-xs font-medium">
            {video.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors line-clamp-2">
          {video.title}
        </h3>
        
        <p className="text-[#8B7E74] text-sm mb-3 line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-[#8B7E74]">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{video.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{video.likes}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function VideoPlayer({ video, onBack, navigate }: { video: VideoContent; onBack: () => void; navigate: (page: Page) => void }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <span className="text-2xl">←</span>
          <span>Retour aux vidéos</span>
        </button>

        {/* Video Player Placeholder */}
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-8">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-10 h-10 text-red-600 ml-2" />
            </div>
          </div>
          <div className="absolute top-4 right-4 px-3 py-2 bg-black/70 backdrop-blur-sm text-white rounded-lg">
            {video.duration}
          </div>
        </div>

        {/* Video Info */}
        <div className="bg-white rounded-3xl p-8">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-sm font-semibold mb-4">
              {video.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {video.title}
            </h1>
            <p className="text-[#8B7E74] text-lg leading-relaxed">
              {video.description}
            </p>
          </div>

          <div className="flex items-center gap-6 text-[#8B7E74] mb-8">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{video.views.toLocaleString()} vues</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              <span>{video.likes} J'aime</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{video.duration}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 px-6 py-4 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              <span>J'aime</span>
            </button>
            <button className="px-6 py-4 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Partager
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">
            Convaincu ? Choisissez votre HYDRAL
          </h3>
          <button
            onClick={() => navigate('configurator')}
            className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Commencer ma configuration
          </button>
        </div>
      </div>
    </div>
  );
}