import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Zap, TrendingUp, Sparkles, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLazyLoad } from '../../hooks/useIntersectionObserver';

interface BeforeAfterCase {
  id: string;
  customer: string;
  location: string;
  before: {
    image: string;
    description: string;
  };
  after: {
    image: string;
    description: string;
  };
  results: {
    icon: any;
    label: string;
    value: string;
  }[];
  testimonial: string;
}

interface BeforeAfterPhotoGalleryProps {
  className?: string;
}

export function BeforeAfterPhotoGallery({ className = '' }: BeforeAfterPhotoGalleryProps) {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  
  // Lazy load avec Intersection Observer
  const { ref, isVisible } = useLazyLoad<HTMLElement>(0.1);

  const cases: BeforeAfterCase[] = [
    {
      id: '1',
      customer: 'Famille Dubois',
      location: 'Lyon (69)',
      before: {
        image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800',
        description: 'Cuisine encombrée de packs d\'eau, bouilloire sur le plan de travail'
      },
      after: {
        image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
        description: 'Cuisine épurée avec HYDRAO, espace libéré'
      },
      results: [
        { icon: TrendingUp, label: 'Économies', value: '980€/an' },
        { icon: Sparkles, label: 'Espace gagné', value: '2m² placard' },
        { icon: Zap, label: 'Temps gagné', value: '45min/semaine' }
      ],
      testimonial: 'On ne réalise pas à quel point les bouteilles prenaient de la place. Maintenant notre cuisine respire !'
    },
    {
      id: '2',
      customer: 'Sophie Martin',
      location: 'Paris (75)',
      before: {
        image: 'https://images.unsplash.com/photo-1565183928294-7d22f2d8a2de?w=800',
        description: 'Ancien robinet standard, multiple ustensiles sur le plan'
      },
      after: {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        description: 'HYDRAO installé, design minimaliste'
      },
      results: [
        { icon: TrendingUp, label: 'Économies', value: '1200€/an' },
        { icon: Sparkles, label: 'Esthétique', value: '+200% valorisation' },
        { icon: Zap, label: 'Confort', value: 'Immédiat' }
      ],
      testimonial: 'L\'aspect premium de HYDRAO a totalement transformé ma cuisine. C\'est devenu la pièce dont je suis le plus fière.'
    },
    {
      id: '3',
      customer: 'Marc & Julie',
      location: 'Bordeaux (33)',
      before: {
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
        description: 'Cartons de bouteilles stockés au sol, cuisine désorganisée'
      },
      after: {
        image: 'https://images.unsplash.com/photo-1556909172-4c7d97c1e1d8?w=800',
        description: 'Tout rangé, robinet HYDRAO comme point focal'
      },
      results: [
        { icon: TrendingUp, label: 'Économies', value: '850€/an' },
        { icon: Sparkles, label: 'Organisation', value: '100%' },
        { icon: Zap, label: 'Bien-être', value: 'Quotidien' }
      ],
      testimonial: 'Fini les allers-retours au supermarché avec des packs de 6 bouteilles. Quel soulagement !'
    }
  ];

  const currentCase = cases[selectedCase];

  return (
    <section ref={ref} className={`section-padding bg-white ${className}`}>
      <div className="section-container max-w-7xl mx-auto">
        {!isVisible ? (
          /* Loading placeholder */
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#6B1E3E]"></div>
            <p className="text-gray-600 mt-4">Chargement de la galerie...</p>
          </div>
        ) : (
          <>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Avant / Après</span>
          </motion.div>

          <h2 className="mb-6 text-gray-900">
            La transformation HYDRAO
            <span className="block text-[#6B1E3E]">en images</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment HYDRAO a transformé la cuisine de nos clients
          </p>
        </motion.div>

        {/* Main comparison slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border-2 border-gray-200 p-4 md:p-8">
            {/* Customer info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl text-gray-900 mb-1">{currentCase.customer}</h3>
                <p className="text-gray-600">{currentCase.location}</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-[#6B1E3E] text-white rounded-full text-sm font-medium hover:bg-[#8B2E4E] transition-colors"
              >
                Voir en grand
              </button>
            </div>

            {/* Comparison slider */}
            <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] bg-gray-100">
              {/* After image (full) */}
              <ImageWithFallback
                src={currentCase.after.image}
                alt={currentCase.after.description}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }}
              >
                <ImageWithFallback
                  src={currentCase.before.image}
                  alt={currentCase.before.description}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${comparisonPosition}%` }}
                onMouseDown={(e) => {
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (rect) {
                      const x = moveEvent.clientX - rect.left;
                      const percentage = (x / rect.width) * 100;
                      setComparisonPosition(Math.max(0, Math.min(100, percentage)));
                    }
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };

                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm">
                Avant
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#6B1E3E] text-white text-sm rounded-full backdrop-blur-sm">
                Après HYDRAO
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentCase.results.map((result, idx) => {
                const Icon = result.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl border-2 border-gray-200 p-4 text-center"
                  >
                    <Icon className="w-6 h-6 text-[#6B1E3E] mx-auto mb-2" />
                    <div className="text-2xl font-light text-[#6B1E3E] mb-1">{result.value}</div>
                    <div className="text-sm text-gray-600">{result.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
              <p className="text-gray-700 italic">
                "{currentCase.testimonial}"
              </p>
              <p className="text-sm text-gray-600 mt-2">
                — {currentCase.customer}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Thumbnails navigation */}
        <div className="grid grid-cols-3 gap-4">
          {cases.map((caseItem, idx) => (
            <motion.button
              key={caseItem.id}
              onClick={() => setSelectedCase(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                selectedCase === idx
                  ? 'border-[#6B1E3E] ring-2 ring-[#6B1E3E]/30'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-video">
                <ImageWithFallback
                  src={caseItem.after.image}
                  alt={caseItem.customer}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <p className="text-white text-sm font-medium">{caseItem.customer}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl w-full bg-white rounded-3xl p-8"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl text-gray-900 mb-6">{currentCase.customer}</h3>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-2 font-medium">Avant</div>
                    <div className="rounded-2xl overflow-hidden aspect-video">
                      <ImageWithFallback
                        src={currentCase.before.image}
                        alt={currentCase.before.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{currentCase.before.description}</p>
                  </div>

                  <div>
                    <div className="text-sm text-[#6B1E3E] mb-2 font-medium">Après HYDRAO</div>
                    <div className="rounded-2xl overflow-hidden aspect-video">
                      <ImageWithFallback
                        src={currentCase.after.image}
                        alt={currentCase.after.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{currentCase.after.description}</p>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <p className="text-gray-700 italic">"{currentCase.testimonial}"</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}