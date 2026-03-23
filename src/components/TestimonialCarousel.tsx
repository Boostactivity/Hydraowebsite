import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  quote: string;
  details: string;
  savings: string;
  verified: boolean;
  hasVideo?: boolean;
  date: string;
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sophie Martin',
      location: 'Paris 16ème',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      rating: 5,
      quote: 'Je ne peux plus m\'en passer. C\'est devenu un réflexe : thé le matin, eau gazeuse à midi, tout est instantané.',
      details: 'Famille de 4 personnes • Installé il y a 8 mois',
      savings: '95€/mois économisés',
      verified: true,
      hasVideo: true,
      date: 'Il y a 2 semaines'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      location: 'Lyon',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 5,
      quote: 'Rentabilisé en 5 mois. La meilleure décision pour ma cuisine. Le design est sublime et la qualité irréprochable.',
      details: 'Couple sans enfant • Installé il y a 1 an',
      savings: '62€/mois économisés',
      verified: true,
      date: 'Il y a 1 mois'
    },
    {
      id: 3,
      name: 'Marie Lefevre',
      location: 'Bordeaux',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      rating: 5,
      quote: 'Fini les packs d\'eau dans les escaliers ! Mes enfants adorent l\'eau pétillante et je suis tranquille avec la filtration.',
      details: 'Famille de 5 personnes • Installé il y a 6 mois',
      savings: '128€/mois économisés',
      verified: true,
      date: 'Il y a 3 semaines'
    },
    {
      id: 4,
      name: 'Alexandre Bernard',
      location: 'Marseille',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      rating: 5,
      quote: 'J\'ai comparé plusieurs robinets premium du marché. HYDRAO à 490€ offre exactement ce que je cherchais : qualité irréprochable et prix accessible.',
      details: 'Célibataire • Installé il y a 4 mois',
      savings: '48€/mois économisés',
      verified: true,
      hasVideo: true,
      date: 'Il y a 1 semaine'
    },
    {
      id: 5,
      name: 'Julie & Marc Rousseau',
      location: 'Nantes',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      rating: 5,
      quote: 'L\'installation était impeccable, l\'installateur a tout géré en 2h. Depuis, c\'est un bonheur quotidien.',
      details: 'Couple avec 2 enfants • Installé il y a 3 mois',
      savings: '87€/mois économisés',
      verified: true,
      date: 'Il y a 5 jours'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setAutoplay(false);
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Main card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-gradient-to-br from-white to-[#FAF8F5] rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left: Image */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  {currentTestimonial.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.4 }}
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                  {currentTestimonial.hasVideo && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-6 h-6 text-[#6B1E3E] ml-0.5" />
                    </motion.button>
                  )}
                </div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1 mt-4"
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center md:text-left mt-2"
                >
                  <h4 className="text-lg font-medium text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-sm text-gray-600">{currentTestimonial.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{currentTestimonial.date}</p>
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Quote className="w-12 h-12 text-[#6B1E3E]/20 mb-4" />
                  
                  <blockquote className="text-xl text-gray-900 leading-relaxed mb-6 italic">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-[#6B1E3E] rounded-full" />
                      {currentTestimonial.details}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      💰 {currentTestimonial.savings}
                    </div>
                  </div>

                  {currentTestimonial.verified && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 text-sm text-blue-600"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Avis vérifié • Achat certifié</span>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
          <motion.button
            onClick={handlePrev}
            className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-gray-900 hover:bg-[#6B1E3E] hover:text-white transition-all"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-gray-900 hover:bg-[#6B1E3E] hover:text-white transition-all"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setAutoplay(false);
            }}
            className={`transition-all rounded-full ${
              idx === currentIndex 
                ? 'bg-[#6B1E3E] w-8 h-2' 
                : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-4 mt-8"
      >
        <div className="text-center p-4 bg-white rounded-2xl border border-gray-200">
          <div className="text-3xl font-light text-[#6B1E3E] mb-1">4.9/5</div>
          <div className="text-sm text-gray-600">Note moyenne</div>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl border border-gray-200">
          <div className="text-3xl font-light text-[#6B1E3E] mb-1">2 000+</div>
          <div className="text-sm text-gray-600">Avis vérifiés</div>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl border border-gray-200">
          <div className="text-3xl font-light text-[#6B1E3E] mb-1">98%</div>
          <div className="text-sm text-gray-600">Recommandent</div>
        </div>
      </motion.div>
    </div>
  );
}