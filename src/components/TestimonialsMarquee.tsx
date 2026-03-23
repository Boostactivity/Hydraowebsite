import React from 'react';
import { Star } from 'lucide-react';
import { InfiniteMarquee } from './animations/InfiniteMarquee';

export function TestimonialsMarquee() {
  const testimonials = [
    {
      name: 'Sophie Martin',
      location: 'Paris',
      text: 'Révolutionnaire ! Fini d\'attendre que l\'eau bouille. Je recommande à 100%.',
      rating: 5,
    },
    {
      name: 'Thomas Dubois',
      location: 'Lyon',
      text: 'Design magnifique, installation rapide. Un vrai plaisir au quotidien.',
      rating: 5,
    },
    {
      name: 'Marie Leclerc',
      location: 'Marseille',
      text: 'L\'eau pétillante à volonté, c\'est génial ! Plus besoin d\'acheter des bouteilles.',
      rating: 5,
    },
    {
      name: 'Pierre Bernard',
      location: 'Toulouse',
      text: 'Qualité premium pour un prix très compétitif. Excellent rapport qualité/prix.',
      rating: 5,
    },
    {
      name: 'Julie Petit',
      location: 'Bordeaux',
      text: 'Installation professionnelle impeccable. L\'équipe est très réactive.',
      rating: 5,
    },
    {
      name: 'Alexandre Roux',
      location: 'Nice',
      text: 'La filtration change vraiment le goût de l\'eau. On ne peut plus s\'en passer.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-4xl mb-4 text-gray-900">
          Ils ont choisi HYDRAO
        </h2>
        <p className="text-xl text-gray-600">
          Des milliers de clients satisfaits partout en France
        </p>
      </div>

      <InfiniteMarquee speed={40}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-80 flex-shrink-0"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            
            <p className="text-gray-700 mb-4 italic">
              "{testimonial.text}"
            </p>
            
            <div>
              <p className="text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  );
}
