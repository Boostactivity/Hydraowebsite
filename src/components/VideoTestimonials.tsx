import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Star, Quote, CheckCircle, MapPin } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  rating: number;
  savings: string;
  duration: string;
}

export function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sophie Martin',
      location: 'Paris 16ème',
      role: 'Famille de 4',
      thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      quote: "HYDRAO a transformé notre quotidien. Plus de courses, plus d'attente. Juste de l'eau parfaite instantanément.",
      rating: 5,
      savings: '980€/an',
      duration: '1:23'
    },
    {
      id: 2,
      name: 'Marc Dubois',
      location: 'Lyon',
      role: 'Couple sans enfants',
      thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quote: "Rentabilisé en 5 mois. L'investissement le plus intelligent qu'on ait fait pour la maison.",
      rating: 5,
      savings: '650€/an',
      duration: '2:10'
    },
    {
      id: 3,
      name: 'Caroline Leroy',
      location: 'Bordeaux',
      role: 'Famille de 5',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quote: "Avec 3 enfants, on économise plus de 1200€ par an. Et la qualité de l'eau est exceptionnelle.",
      rating: 5,
      savings: '1 240€/an',
      duration: '1:45'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[#FAF8F5] to-white">
      <div className="section-container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8 border border-[#6B1E3E]/20"
          >
            <Play className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Témoignages authentiques</span>
          </motion.div>

          <h2 className="mb-6 text-gray-900">
            Ils ont franchi le pas
            <span className="block text-[#6B1E3E]">Découvrez leurs histoires</span>
          </h2>
          <p className="text-xl text-[#8B7E74] font-light max-w-2xl mx-auto">
            De vraies personnes, de vraies économies, de vrais changements.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(testimonial)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 group-hover:border-[#6B1E3E]/40 transition-all">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                    >
                      <Play className="w-7 h-7 text-[#6B1E3E] ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {testimonial.duration}
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-white p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="w-6 h-6 text-[#6B1E3E]/20 absolute -top-1 -left-1" />
                    <p className="text-sm text-gray-700 italic pl-6 line-clamp-3">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#6B1E3E]">{testimonial.savings}</div>
                      <div className="text-xs text-gray-500">économisés/an</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: CheckCircle, value: '2 347+', label: 'Clients satisfaits' },
            { icon: Star, value: '4.9/5', label: 'Note moyenne' },
            { icon: Play, value: '127', label: 'Témoignages vidéo' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-200">
              <stat.icon className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
              <div className="text-3xl font-light text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>

              {/* Video */}
              <div className="aspect-video bg-black">
                <iframe
                  src={selectedVideo.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Témoignage de ${selectedVideo.name}`}
                />
              </div>

              {/* Video Info */}
              <div className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(selectedVideo.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                    </div>
                    <h3 className="text-2xl text-gray-900 mb-2">{selectedVideo.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedVideo.location}
                      </span>
                      <span>•</span>
                      <span>{selectedVideo.role}</span>
                    </div>
                    <p className="text-gray-700 italic">"{selectedVideo.quote}"</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-light text-[#6B1E3E] mb-1">{selectedVideo.savings}</div>
                    <div className="text-sm text-gray-600">économisés par an</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
