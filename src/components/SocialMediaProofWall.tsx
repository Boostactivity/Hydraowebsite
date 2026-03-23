import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Star, Users, Check, Filter } from 'lucide-react';

type SocialProofType = 'instagram' | 'facebook' | 'google' | 'video';
type FilterType = 'all' | 'famille' | 'couple' | 'solo';

type SocialProof = {
  id: string;
  type: SocialProofType;
  platform: string;
  author: string;
  image: string;
  content: string;
  rating?: number;
  household: FilterType;
  verified: boolean;
};

export function SocialMediaProofWall() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Données de social proof (à remplacer par vraies données API)
  const socialProofs: SocialProof[] = [
    {
      id: '1',
      type: 'instagram',
      platform: 'Instagram',
      author: '@sophie_cuisine',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600',
      content: 'Plus jamais de packs d\'eau à porter ! HYDRAO a changé notre quotidien 🙌',
      household: 'famille',
      verified: true
    },
    {
      id: '2',
      type: 'google',
      platform: 'Google',
      author: 'Marc D.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      content: 'Investissement rentabilisé en 5 mois. Design sublime, qualité irréprochable.',
      rating: 5,
      household: 'couple',
      verified: true
    },
    {
      id: '3',
      type: 'instagram',
      platform: 'Instagram',
      author: '@maison_moderne',
      image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600',
      content: 'Le robinet qui impressionne tous nos invités. Élégance et praticité réunies ✨',
      household: 'couple',
      verified: true
    },
    {
      id: '4',
      type: 'facebook',
      platform: 'Facebook',
      author: 'Julie M.',
      image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600',
      content: 'Fini les bouteilles plastique ! Notre famille économise 80€/mois, c\'est énorme.',
      household: 'famille',
      verified: true
    },
    {
      id: '5',
      type: 'google',
      platform: 'Google',
      author: 'Thomas P.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600',
      content: 'Meilleur achat de l\'année. Eau bouillante instantanée = game changer pour le thé.',
      rating: 5,
      household: 'solo',
      verified: true
    },
    {
      id: '6',
      type: 'instagram',
      platform: 'Instagram',
      author: '@famille_eco',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      content: '2400 bouteilles évitées cette année ! Nos enfants sont fiers de notre impact 🌍',
      household: 'famille',
      verified: true
    },
    {
      id: '7',
      type: 'facebook',
      platform: 'Facebook',
      author: 'Claire & Antoine',
      image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600',
      content: 'Design épuré, technologie au top. Exactement ce qu\'on cherchait pour notre cuisine.',
      household: 'couple',
      verified: true
    },
    {
      id: '8',
      type: 'google',
      platform: 'Google',
      author: 'Isabelle R.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600',
      content: 'Installation nickel, SAV réactif, qualité premium. Je recommande les yeux fermés.',
      rating: 5,
      household: 'famille',
      verified: true
    },
    {
      id: '9',
      type: 'instagram',
      platform: 'Instagram',
      author: '@urban_home',
      image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600',
      content: 'L\'eau pétillante illimitée = notre meilleure décision de l\'année 🥂',
      household: 'couple',
      verified: true
    }
  ];

  const filteredProofs = activeFilter === 'all' 
    ? socialProofs 
    : socialProofs.filter(proof => proof.household === activeFilter);

  const filters: { id: FilterType; label: string; emoji: string }[] = [
    { id: 'all', label: 'Tous', emoji: '🏠' },
    { id: 'famille', label: 'Familles', emoji: '👨‍👩‍👧‍👦' },
    { id: 'couple', label: 'Couples', emoji: '👥' },
    { id: 'solo', label: 'Solo', emoji: '👤' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[#FAF8F5] via-white to-[#E8D5DC]/10">
      <div className="section-container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6 border border-[#6B1E3E]/20"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Validation sociale</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Ils ont franchi le pas
            <span className="block text-[#6B1E3E]">+2 347 cuisines équipées</span>
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience HYDRAO
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '2347', label: 'Installations', icon: Users },
            { value: '4.9/5', label: 'Note moyenne', icon: Star },
            { value: '98%', label: 'Recommandent', icon: Check },
            { value: '2400+', label: 'Avis vérifiés', icon: Check }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200"
              >
                <Icon className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
                <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filtres */}
        <div className="flex justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full border-2 transition-all ${
                activeFilter === filter.id
                  ? 'border-[#6B1E3E] bg-[#6B1E3E] text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#6B1E3E]/50'
              }`}
            >
              <span className="mr-2">{filter.emoji}</span>
              {filter.label}
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredProofs.map((proof, index) => (
            <motion.div
              key={proof.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="break-inside-avoid mb-6"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 hover:border-[#6B1E3E]/30 transition-all">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={proof.image} 
                    alt={`Installation HYDRAO - ${proof.author}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Platform Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 flex items-center gap-1.5 shadow-lg">
                    {proof.type === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-600" />}
                    {proof.type === 'facebook' && <Facebook className="w-3.5 h-3.5 text-blue-600" />}
                    {proof.type === 'google' && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />}
                    {proof.platform}
                  </div>

                  {/* Verified Badge */}
                  {proof.verified && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-[#6B1E3E] rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating (si Google) */}
                  {proof.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(proof.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  )}

                  {/* Author */}
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {proof.author}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed">
                    "{proof.content}"
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Client vérifié ✓</span>
                    <span className="text-xs text-[#6B1E3E] font-medium">
                      {proof.household === 'famille' && '👨‍👩‍👧‍👦 Famille'}
                      {proof.household === 'couple' && '👥 Couple'}
                      {proof.household === 'solo' && '👤 Solo'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700 mb-6">
            Rejoignez les <span className="text-[#6B1E3E] font-medium">+2 347 foyers</span> qui ont transformé leur cuisine
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full shadow-xl">
            <Check className="w-5 h-5" />
            <span>Note moyenne : 4.9/5 • 98% de satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
