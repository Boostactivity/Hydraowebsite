import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, ThumbsUp, MessageCircle, Award, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  photos?: string[];
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sophie M.',
    location: 'Paris',
    rating: 5,
    date: '2024-12-15',
    title: 'Un investissement qui change la vie !',
    content: 'Installé depuis 3 mois, je ne peux plus m\'en passer. L\'eau pétillante à volonté est un vrai luxe, et les économies sont réelles : plus aucune bouteille à acheter ! Installation simple, service client au top.',
    verified: true,
    helpful: 24
  },
  {
    id: '2',
    author: 'Thomas D.',
    location: 'Lyon',
    rating: 5,
    date: '2024-12-10',
    title: 'Qualité exceptionnelle',
    content: 'Design élégant, finition impeccable. L\'eau filtrée a vraiment un meilleur goût. Le café et le thé sont sublimés. Seul petit bémol : le prix, mais on l\'amortit vite avec les économies réalisées.',
    verified: true,
    helpful: 18
  },
  {
    id: '3',
    author: 'Marie L.',
    location: 'Marseille',
    rating: 5,
    date: '2024-12-05',
    title: 'Parfait pour famille nombreuse',
    content: 'Avec 4 enfants, on achetait des dizaines de bouteilles par semaine. HYDRAO nous fait économiser plus de 100€/mois ! Les enfants adorent l\'eau pétillante. Installation rapide par un pro.',
    verified: true,
    helpful: 31
  },
  {
    id: '4',
    author: 'Nicolas B.',
    location: 'Toulouse',
    rating: 5,
    date: '2024-11-28',
    title: 'Révolution en cuisine',
    content: 'En tant que chef à domicile, la qualité de l\'eau est cruciale. HYDRAO me donne une eau ultra-pure pour mes recettes. L\'eau bouillante instantanée est un gain de temps fou. Je recommande à 200% !',
    verified: true,
    helpful: 15
  },
  {
    id: '5',
    author: 'Émilie R.',
    location: 'Nice',
    rating: 4,
    date: '2024-11-20',
    title: 'Très bon produit',
    content: 'Très satisfaite de mon achat. L\'eau est vraiment meilleure, l\'installation s\'est bien passée. Je mets 4 étoiles car le changement de filtre est un peu cher, mais dans l\'ensemble c\'est un excellent investissement.',
    verified: true,
    helpful: 9
  }
];

export function ReviewsWidget() {
  const [showModal, setShowModal] = useState(false);

  const averageRating = 4.9;
  const totalReviews = 523;

  return (
    <>
      {/* Floating Widget */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-24 right-6 z-[80] bg-white rounded-2xl shadow-2xl p-4 border-2 border-[#6B1E3E] hover:scale-105 transition-transform group"
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-2xl font-bold text-[#6B1E3E]">{averageRating}/5</div>
          </div>
          
          <div className="border-l border-gray-300 pl-3">
            <div className="font-semibold text-gray-900">{totalReviews} avis</div>
            <div className="text-xs text-gray-600">Clients vérifiés</div>
          </div>
        </div>

        <div className="mt-2 text-xs text-[#6B1E3E] font-medium group-hover:underline">
          Voir tous les avis →
        </div>
      </motion.button>

      {/* Modal with reviews */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Avis clients HYDRAO
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(averageRating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xl font-bold text-[#6B1E3E]">
                          {averageRating}/5
                        </span>
                      </div>
                      <span className="text-gray-600">
                        {totalReviews} avis vérifiés
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Rating breakdown */}
                <RatingBreakdown />
              </div>

              {/* Reviews list */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-6">
                  {SAMPLE_REVIEWS.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ReviewCard review={review} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function RatingBreakdown() {
  const breakdown = [
    { stars: 5, count: 487, percentage: 93 },
    { stars: 4, count: 28, percentage: 5 },
    { stars: 3, count: 6, percentage: 1 },
    { stars: 2, count: 2, percentage: 0.5 },
    { stars: 1, count: 0, percentage: 0.5 }
  ];

  return (
    <div className="mt-6 space-y-2">
      {breakdown.map((item) => (
        <div key={item.stars} className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-16">
            <span className="text-sm font-medium text-gray-700">{item.stars}</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 w-12">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-[#6B1E3E] flex items-center justify-center text-white font-semibold">
            {review.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{review.author}</span>
              {review.verified && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-medium text-green-700">Vérifié</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600">{review.location}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      <p className="text-gray-700 mb-4">{review.content}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-[#6B1E3E] transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>Utile ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
}

// Inline reviews summary (for product page)
export function ReviewsSummary({ onViewAll }: { onViewAll: () => void }) {
  const averageRating = 4.9;
  const totalReviews = 523;

  return (
    <button
      onClick={onViewAll}
      className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 hover:border-[#6B1E3E] transition-all group w-full"
    >
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(averageRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-2xl font-bold text-[#6B1E3E]">{averageRating}/5</span>
      </div>
      
      <div className="flex-1 text-left">
        <div className="font-semibold text-gray-900">{totalReviews} avis clients</div>
        <div className="text-sm text-gray-600">93% recommandent ce produit</div>
      </div>

      <div className="text-[#6B1E3E] group-hover:translate-x-1 transition-transform">
        →
      </div>
    </button>
  );
}

// Mini reviews carousel (for homepage)
export function ReviewsCarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SAMPLE_REVIEWS.slice(0, 3).map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{review.content}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">{review.author}</span>
            <span>•</span>
            <span>{review.location}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
