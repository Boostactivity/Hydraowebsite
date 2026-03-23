import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  impact: string;
  savings: string;
}

export function SocialProofSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sophie Durand',
      location: 'Paris 15ème',
      avatar: '👩',
      rating: 5,
      date: 'Il y a 3 jours',
      verified: true,
      title: 'Je ne peux plus m\'en passer',
      content: 'Installé depuis 6 mois, je me demande comment j\'ai pu vivre sans. Plus de bouteilles à porter, l\'eau est parfaite, et mes enfants adorent l\'eau pétillante à volonté.',
      impact: '2 400 bouteilles évitées',
      savings: '840€ économisés'
    },
    {
      id: 2,
      name: 'Marc Lefebvre',
      location: 'Lyon 6ème',
      avatar: '👨',
      rating: 5,
      date: 'Il y a 1 semaine',
      verified: true,
      title: 'Investissement rentabilisé en 5 mois',
      content: 'Famille de 4, on buvait 3 packs d\'eau par semaine. Le calcul est vite fait. En plus, l\'installation a été super pro, tout était fini en 2h.',
      impact: 'ROI en 5 mois',
      savings: '1 200€/an économisés'
    },
    {
      id: 3,
      name: 'Alexandre M.',
      location: 'Marseille',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      verified: true,
      title: 'Qualité exceptionnelle',
      content: 'J\'ai comparé plusieurs robinets premium. HYDRAO offre le meilleur rapport qualité-prix du marché : 490€ pour toutes les fonctionnalités. La qualité de l\'eau est bluffante.',
      impact: 'Premium accessible',
      savings: '1000€ économisés vs alternatives'
    },
    {
      id: 4,
      name: 'Thomas Bernard',
      location: 'Nantes',
      avatar: '👨',
      rating: 5,
      date: 'Il y a 3 semaines',
      verified: true,
      title: 'Un vrai game changer',
      content: 'Plus besoin d\'attendre que l\'eau chauffe pour le thé, plus de courses lourdes. Ma femme et moi sommes ravis. Le SAV a même été réactif pour une petite question.',
      impact: '15 thés/jour instantanés',
      savings: '50% énergie économisée'
    },
    {
      id: 5,
      name: 'Caroline Petit',
      location: 'Marseille',
      avatar: '👩',
      rating: 5,
      date: 'Il y a 1 mois',
      verified: true,
      title: 'Enfin une eau pure à la maison',
      content: 'Avec un bébé, je voulais une eau vraiment propre. La filtration 5 étapes me rassure totalement. Plus de microplastiques, plus de produits chimiques.',
      impact: 'Eau ultra-pure garantie',
      savings: 'Santé: inestimable'
    },
    {
      id: 6,
      name: 'Julien Rousseau',
      location: 'Lille',
      avatar: '👨',
      rating: 5,
      date: 'Il y a 1 mois',
      verified: true,
      title: 'Design et performance',
      content: 'Le robinet est magnifique dans ma cuisine moderne. Finition chrome impeccable, et techniquement c\'est du solide. Zéro regret sur cet achat.',
      impact: 'Design premium',
      savings: 'Cuisine valorisée'
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#6B1E3E]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

      <div className="section-container max-w-6xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <Star className="w-5 h-5 fill-[#6B1E3E]" />
            <span className="text-sm uppercase tracking-wider font-medium">Témoignages certifiés</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plus de 2 347 installations réussies • Note moyenne 4,9/5
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-200 shadow-xl"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar & Info */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg">
                      {testimonials[currentIndex].avatar}
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-lg font-medium text-gray-900 mb-1">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {testimonials[currentIndex].location}
                      </div>
                      {testimonials[currentIndex].verified && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Achat vérifié</span>
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">{testimonials[currentIndex].date}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <Quote className="w-10 h-10 text-[#6B1E3E]/20 mb-4" />
                    
                    <h3 className="text-2xl text-gray-900 mb-4">
                      {testimonials[currentIndex].title}
                    </h3>
                    
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </p>

                    {/* Impact badges */}
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 bg-[#6B1E3E]/5 rounded-full text-sm text-[#6B1E3E] border border-[#6B1E3E]/20">
                        💚 {testimonials[currentIndex].impact}
                      </div>
                      <div className="px-4 py-2 bg-[#D4AF37]/10 rounded-full text-sm text-[#8B7E74] border border-[#D4AF37]/20">
                        💰 {testimonials[currentIndex].savings}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#6B1E3E] text-gray-700 hover:text-[#6B1E3E] transition-all shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-[#6B1E3E] rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#6B1E3E] text-gray-700 hover:text-[#6B1E3E] transition-all shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '2 347', label: 'Clients satisfaits' },
            { value: '4.9/5', label: 'Note moyenne' },
            { value: '98%', label: 'Recommandent HYDRAO' },
            { value: '6 mois', label: 'ROI moyen' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-light text-[#6B1E3E] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}