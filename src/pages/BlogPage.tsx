import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, Tag, TrendingUp, Heart, BookOpen, User } from 'lucide-react';
import { Page } from '../App';

interface BlogPageProps {
  navigate: (page: Page) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  views: number;
  likes: number;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '10 recettes rafraîchissantes avec eau pétillante HYDRAL',
    excerpt: 'Découvrez comment transformer votre eau pétillante en cocktails, mocktails et boissons santé qui impressionneront vos invités.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=500&fit=crop',
    category: 'Lifestyle',
    author: 'Sophie Martin',
    date: '2024-12-15',
    readTime: 8,
    views: 2543,
    likes: 187,
    featured: true
  },
  {
    id: '2',
    title: 'Comment économiser 1000€/an sur l\'eau : guide complet',
    excerpt: 'Analyse détaillée des économies réelles avec HYDRAL. Calculs, comparaisons et témoignages de clients qui ont fait le switch.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop',
    category: 'Économies',
    author: 'Thomas Dubois',
    date: '2024-12-12',
    readTime: 12,
    views: 3821,
    likes: 294,
    featured: true
  },
  {
    id: '3',
    title: 'Installation HYDRAL : notre guide complet en 10 étapes',
    excerpt: 'De la préparation à la première utilisation, suivez notre guide étape par étape pour installer votre robinet HYDRAL comme un pro.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=500&fit=crop',
    category: 'Installation',
    author: 'Marc Lefèvre',
    date: '2024-12-10',
    readTime: 15,
    views: 4125,
    likes: 356,
    featured: true
  },
  {
    id: '4',
    title: 'L\'impact environnemental : 5000 bouteilles plastique en moins',
    excerpt: 'Une famille parisienne témoigne de son année avec HYDRAL et calcule son empreinte écologique évitée.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop',
    category: 'Écologie',
    author: 'Émilie Rousseau',
    date: '2024-12-08',
    readTime: 10,
    views: 1987,
    likes: 143
  },
  {
    id: '5',
    title: 'Cuisiner avec une eau ultra-pure : le secret des grands chefs',
    excerpt: 'Interview de 3 chefs étoilés qui expliquent pourquoi la qualité de l\'eau change tout en cuisine.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop',
    category: 'Cuisine',
    author: 'Nicolas Bernard',
    date: '2024-12-05',
    readTime: 7,
    views: 2314,
    likes: 201
  },
  {
    id: '6',
    title: 'Café et thé sublimés : le rôle crucial de l\'eau filtrée',
    excerpt: 'Découvrez pourquoi votre café du matin mérite une eau de qualité et comment HYDRAL révèle les vrais arômes.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop',
    category: 'Lifestyle',
    author: 'Sophie Martin',
    date: '2024-12-03',
    readTime: 6,
    views: 1654,
    likes: 98
  },
  {
    id: '7',
    title: 'Design et innovation : l\'histoire de la création HYDRAL',
    excerpt: 'Plongez dans les coulisses du design de notre robinet 5-en-1 et découvrez les défis techniques relevés.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    category: 'Innovation',
    author: 'Thomas Dubois',
    date: '2024-11-28',
    readTime: 11,
    views: 892,
    likes: 67
  },
  {
    id: '8',
    title: 'HYDRAL vs robinets premium : comparatif objectif 2024',
    excerpt: 'Analyse point par point du marché des robinets 5-en-1. Prix, fonctionnalités, économies : on vous dit tout.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1560185127-6a7e3e5b9f09?w=800&h=500&fit=crop',
    category: 'Comparatif',
    author: 'Marc Lefèvre',
    date: '2024-11-25',
    readTime: 14,
    views: 5231,
    likes: 412
  },
  {
    id: '9',
    title: 'Les 7 erreurs à éviter avec votre robinet 5-en-1',
    excerpt: 'Conseils de nos techniciens pour éviter les problèmes courants et maximiser la durée de vie de votre HYDRAL.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1585128792334-2e82b9813d70?w=800&h=500&fit=crop',
    category: 'Maintenance',
    author: 'Émilie Rousseau',
    date: '2024-11-22',
    readTime: 9,
    views: 1432,
    likes: 89
  },
  {
    id: '10',
    title: 'Hydratation optimale : 8 verres par jour devenus faciles',
    excerpt: 'Comment HYDRAL transforme la contrainte de boire de l\'eau en un plaisir quotidien pour toute la famille.',
    content: 'Article complet à venir...',
    image: 'https://images.unsplash.com/photo-1550572017-4814e7a8fde0?w=800&h=500&fit=crop',
    category: 'Santé',
    author: 'Nicolas Bernard',
    date: '2024-11-20',
    readTime: 5,
    views: 1876,
    likes: 134
  }
];

const CATEGORIES = ['Tous', 'Lifestyle', 'Économies', 'Installation', 'Écologie', 'Cuisine', 'Innovation', 'Comparatif', 'Maintenance', 'Santé'];

export function BlogPage({ navigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = BLOG_POSTS.filter(post => post.featured);

  if (selectedPost) {
    return <BlogPostView post={selectedPost} onBack={() => setSelectedPost(null)} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="mb-6 text-gray-900">
            Blog HYDRAL
          </h1>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Inspirations, conseils et guides pour tirer le meilleur de votre robinet 5-en-1
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
                placeholder="Rechercher un article..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#6B1E3E] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'Tous' && searchQuery === '' && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Articles à la une</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeaturedPostCard post={post} onClick={() => setSelectedPost(post)} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCategory === 'Tous' ? 'Tous les articles' : `Articles ${selectedCategory}`}
            </h2>
            <span className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <BlogPostCard post={post} onClick={() => setSelectedPost(post)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-12 text-center text-white"
        >
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h2 className="text-3xl font-semibold mb-4">
            Recevez nos meilleurs articles
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            1 email par mois avec conseils exclusifs, guides pratiques et inspirations lifestyle
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-semibold hover:shadow-xl transition-all whitespace-nowrap">
              S'abonner
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeaturedPostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all w-full text-left"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-4 py-2 bg-[#6B1E3E] text-white rounded-full text-sm font-semibold">
          ⭐ À la une
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function BlogPostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all w-full text-left"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function BlogPostView({ post, onBack, navigate }: { post: BlogPost; onBack: () => void; navigate: (page: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#8B7E74] hover:text-[#6B1E3E] transition-colors mb-8"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          <span>Retour aux articles</span>
        </button>

        <article>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-[#6B1E3E] text-white rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="mb-4 text-gray-900">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min de lecture</span>
              </div>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-3xl mb-8"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {post.content}
            </p>
            {/* Article complet serait ici en production */}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">{post.likes} J'aime</span>
                </button>
              </div>
              <div className="text-gray-600">
                {post.views} vues
              </div>
            </div>
          </div>
        </article>

        <div className="mt-16 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">
            Prêt à transformer votre cuisine ?
          </h3>
          <p className="text-white/90 mb-6">
            Découvrez le robinet 5-en-1 qui change tout
          </p>
          <button
            onClick={() => navigate('configurator')}
            className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-semibold hover:shadow-xl transition-all text-lg"
          >
            Choisir mon HYDRAL
          </button>
        </div>
      </div>
    </div>
  );
}