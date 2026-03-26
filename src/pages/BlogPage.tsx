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
    title: '240 000 microplastiques par litre : ce que contient vraiment votre eau en bouteille',
    excerpt: 'L\'étude PNAS 2024 de Columbia University a révélé un chiffre alarmant...',
    content: 'En janvier 2024, une étude publiée dans la revue PNAS par des chercheurs de Columbia University a fait l\'effet d\'une bombe : une bouteille d\'eau classique d\'un litre contient en moyenne 240 000 particules de nanoplastiques. Ce chiffre, 10 à 100 fois supérieur aux estimations précédentes, remet en question tout ce que nous pensions savoir sur l\'eau embouteillée.\n\nCes nanoplastiques mesurent moins d\'un micromètre. À cette taille, ils traversent les parois intestinales, pénètrent dans le sang et atteignent les organes. Les études toxicologiques sont encore en cours, mais les premières conclusions sont inquiétantes : perturbation endocrinienne, inflammation chronique, et accumulation dans les tissus au fil des années. Les enfants, dont l\'organisme est en développement, sont particulièrement vulnérables.\n\nLe paradoxe est saisissant : nous achetons de l\'eau en bouteille parce que nous pensons qu\'elle est plus pure que l\'eau du robinet. Or, c\'est précisément le contenant plastique qui la contamine. L\'eau du robinet en France est l\'un des produits alimentaires les plus contrôlés, avec des analyses quotidiennes sur plus de 70 paramètres.\n\nLa solution ? Filtrer l\'eau du robinet. Un système de filtration à charbon actif comme celui intégré aux robinets HYDRAL élimine 99% du chlore, réduit le calcaire et capture les particules en suspension, tout en préservant les minéraux essentiels. Vous obtenez une eau pure, sans plastique, directement au robinet. C\'est meilleur pour votre santé, pour votre porte-monnaie, et pour la planète.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=500&fit=crop',
    category: 'Santé',
    author: 'Sophie Martin',
    date: '2026-03-15',
    readTime: 8,
    views: 2543,
    likes: 187,
    featured: true
  },
  {
    id: '2',
    title: 'Bouteilles plastique : le vrai coût pour la planète',
    excerpt: '73% des bouteilles plastique ne sont pas recyclées en France...',
    content: 'Les chiffres donnent le vertige. Chaque année en France, 9,3 milliards de litres d\'eau sont vendus en bouteille plastique. Cela représente environ 25 millions de bouteilles jetées chaque jour. Et contrairement à ce que l\'on croit, seulement 27% d\'entre elles sont effectivement recyclées. Les autres finissent en incinération, en décharge, ou dans la nature.\n\nUne bouteille plastique met 450 ans à se décomposer dans l\'environnement. Pendant ce temps, elle se fragmente en microplastiques qui contaminent les sols, les rivières et les océans. On estime que 8 millions de tonnes de plastique finissent dans les océans chaque année. Les bouteilles d\'eau représentent une part significative de cette pollution.\n\nLe bilan carbone est tout aussi accablant. Produire une bouteille d\'eau en plastique nécessite 100ml de pétrole et génère 3 fois son poids en CO2 si l\'on compte la fabrication, le remplissage, le transport et la gestion des déchets. Transporter de l\'eau depuis les Alpes ou les Vosges jusqu\'à Paris en camion, alors qu\'une eau de qualité coule déjà dans nos canalisations, est un non-sens écologique.\n\nPasser à l\'eau filtrée du robinet, c\'est supprimer en moyenne 700 bouteilles plastique par personne et par an. Pour une famille de 4 personnes, cela représente près de 3 000 bouteilles en moins chaque année. C\'est un geste concret, immédiat et mesurable. Le robinet HYDRAL avec son système de filtration intégré rend cette transition naturelle : l\'eau est pure, a bon goût, et ne génère aucun déchet plastique.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop',
    category: 'Environnement',
    author: 'Thomas Dubois',
    date: '2026-03-08',
    readTime: 10,
    views: 3821,
    likes: 294,
    featured: true
  },
  {
    id: '3',
    title: 'Comment une famille de 4 économise 900€/an en changeant de robinet',
    excerpt: 'Les Dupont dépensaient 920€/an en eau embouteillée...',
    content: 'La famille Dupont, installée en banlieue parisienne, est une famille française classique : deux adultes, deux enfants de 8 et 12 ans. Comme beaucoup de familles, ils achetaient chaque semaine 3 packs de 6 bouteilles d\'1,5L au supermarché, plus quelques bouteilles de Perrier pour les apéritifs. Coût annuel : 520€ en eau plate et 180€ en eau gazeuse. Ajoutez 85€/an d\'électricité pour la bouilloire utilisée 4 à 5 fois par jour (thé, café, biberons, pâtes) et 135€ de filtres Brita. Total : 920€/an.\n\nEn septembre 2025, ils ont installé un HYDRAL One (990€). Le calcul de rentabilité était simple. Première année : 990€ (robinet) + 99€ (formule entretien Standard) + 45€ (électricité du boiler) = 1 134€. Deuxième année et suivantes : 99€ + 45€ = 144€/an. Économie nette dès la deuxième année : 776€. Le robinet est amorti en 13 mois.\n\nMais au-delà des chiffres, c\'est le quotidien qui a changé. Plus de courses d\'eau (gain de temps estimé : 2h/mois). Plus de stockage de packs dans le garage. Plus de bouteilles à jeter (3 000 bouteilles/an en moins). Le thé et le café sont prêts en 5 secondes au lieu de 3 minutes. Les enfants se servent seuls en eau fraîche filtrée. Et le dimanche, l\'eau gazeuse maison accompagne l\'apéro sans avoir à courir au Monoprix.\n\nMme Dupont résume : "On se demande pourquoi on ne l\'a pas fait plus tôt. C\'est l\'un des meilleurs investissements qu\'on ait fait pour la maison." Les chiffres parlent d\'eux-mêmes : sur 10 ans, l\'économie cumulée dépasse 7 000€.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop',
    category: 'Économies',
    author: 'Marc Lefèvre',
    date: '2026-03-01',
    readTime: 12,
    views: 4125,
    likes: 356,
    featured: true
  },
  {
    id: '4',
    title: 'Eau du robinet vs eau en bouteille : le comparatif complet',
    excerpt: 'Qualité, goût, prix, impact environnemental...',
    content: 'Le débat entre eau du robinet et eau en bouteille divise les Français depuis des décennies. Mettons les choses à plat avec un comparatif objectif sur 5 critères essentiels.\n\nQualité et sécurité. L\'eau du robinet en France est soumise à 70 critères de qualité, contrôlés quotidiennement par les Agences Régionales de Santé. C\'est le produit alimentaire le plus surveillé du pays. L\'eau en bouteille est contrôlée aussi, mais moins fréquemment. Avantage : match nul sur la sécurité, léger avantage robinet sur la fréquence des contrôles.\n\nGoût. C\'est le principal reproche fait à l\'eau du robinet : le goût de chlore. Ce chlore est indispensable (il garantit la désinfection jusqu\'à votre verre), mais il altère le goût. Solution : un filtre à charbon actif élimine 99% du chlore en quelques secondes. Avec un système de filtration HYDRAL, l\'eau du robinet n\'a plus rien à envier aux eaux de source.\n\nPrix. L\'eau du robinet coûte 0,003€ le litre en moyenne en France. L\'eau en bouteille premier prix coûte 0,15€ le litre, une eau de source 0,30€, et une eau minérale premium jusqu\'à 1€. Même en ajoutant le coût du filtre (environ 0,02€/litre), l\'eau filtrée reste 10 à 50 fois moins chère que l\'eau en bouteille.\n\nPraticité. L\'eau du robinet est disponible 24h/24, sans courses, sans stockage, sans déchets. L\'eau en bouteille nécessite d\'aller au supermarché, de porter des packs lourds, de les stocker, puis de gérer les déchets. Avantage écrasant pour le robinet.\n\nImpact environnemental. Une famille qui passe de l\'eau en bouteille à l\'eau filtrée du robinet élimine environ 3 000 bouteilles plastique par an et réduit son empreinte carbone liée à l\'eau de 80%. Il n\'y a pas photo.',
    image: 'https://images.unsplash.com/photo-1560185127-6a7e3e5b9f09?w=800&h=500&fit=crop',
    category: 'Guide',
    author: 'Émilie Rousseau',
    date: '2026-02-22',
    readTime: 14,
    views: 5231,
    likes: 412
  },
  {
    id: '5',
    title: 'Fini la bouilloire : pourquoi l\'eau bouillante au robinet change tout',
    excerpt: 'Thé, café, biberon, pâtes... L\'eau bouillante instantanée transforme votre quotidien.',
    content: 'On n\'y pense pas, mais la bouilloire est l\'un des appareils les plus utilisés dans une cuisine française. En moyenne, elle est mise en route 3 à 5 fois par jour : le café du matin, le thé de 10h, le déjeuner (blanchir des légumes, cuire des pâtes), le goûter, la tisane du soir. Chaque utilisation prend 2 à 4 minutes d\'attente. Multipliez par 365 jours, et vous obtenez entre 30 et 50 heures par an passées à attendre que l\'eau bouille.\n\nAvec un robinet équipé d\'un boiler sous évier, l\'eau sort à 100°C instantanément. Pas 2 minutes. Pas 30 secondes. Instantanément. Le boiler maintient en permanence 3 litres d\'eau à température, prêts à être utilisés. Quand vous vous servez, le réservoir se remplit et rechauffe automatiquement en 10-15 minutes.\n\nLe gain de temps est réel mais c\'est surtout le confort qui change tout. Le thé devient un geste de 5 secondes. Le biberon du bébé est prêt immédiatement (mélange eau bouillante + eau filtrée froide = température parfaite). Les pâtes commencent à cuire plus vite. La cuisine devient fluide, sans temps mort.\n\nCôté consommation énergétique, le boiler HYDRAL consomme environ 1500W au moment de chauffer, puis moins de 5W en veille grâce à son isolation thermique renforcée. Sur un mois, cela représente 3 à 5€ d\'électricité, soit sensiblement la même chose qu\'une bouilloire classique utilisée plusieurs fois par jour. Avec un avantage : le boiler ne chauffe que ce qu\'il faut, alors que la bouilloire chauffe souvent plus d\'eau que nécessaire.\n\nUn dernier avantage souvent oublié : la sécurité. Plus de bouilloire brûlante sur le plan de travail, plus de câble qui traîne, plus de risque de renversement. L\'eau bouillante sort du robinet via un circuit dédié avec sécurité enfant (double action : pousser + tourner). C\'est plus sûr qu\'une bouilloire, surtout avec des enfants en bas âge.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop',
    category: 'Lifestyle',
    author: 'Sophie Martin',
    date: '2026-02-15',
    readTime: 8,
    views: 1654,
    likes: 98
  }
];

const CATEGORIES = ['Tous', 'Santé', 'Environnement', 'Économies', 'Guide', 'Lifestyle'];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    : 'bg-[#FAF8F5] text-gray-700 hover:bg-[#6B1E3E]/10'
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
            <span className="text-[#8B7E74]">
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
          <span className="px-3 py-1 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-xs font-medium">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-[#8B7E74] text-sm">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-[#8B7E74] text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-[#8B7E74]">{post.author}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#8B7E74]">
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
          <span className="px-3 py-1 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full text-xs font-medium">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-[#8B7E74] text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#6B1E3E] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-[#8B7E74] text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-[#8B7E74]">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center gap-6 text-[#8B7E74]">
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
            <p className="text-[#8B7E74] leading-relaxed">
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
              <div className="text-[#8B7E74]">
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