import React from 'react';
import { Page } from '../App';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface TestimonialsPageProps {
  navigate: (page: Page) => void;
}

export function TestimonialsPage({ navigate }: TestimonialsPageProps) {
  const testimonials = [
    {
      name: "Sophie Martin",
      location: "Paris 15ème",
      role: "Mère de famille, 2 enfants",
      rating: 5,
      date: "Installé depuis 8 mois",
      image: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?w=400",
      quote: "J'ai arrêté de compter le temps gagné",
      text: "Plus de bouilloire qui chauffe pendant 5 minutes. Plus de packs d'eau à porter jusqu'au 3ème étage. Mon HYDRAL m'a fait gagner au moins 20 minutes par jour. Et mes enfants adorent l'eau pétillante.",
      verified: true,
      usage: "Utilise principalement eau bouillante et pétillante"
    },
    {
      name: "Thomas Dubois",
      location: "Lyon 6ème",
      role: "Chef entrepreneur",
      rating: 5,
      date: "Installé depuis 1 an",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      quote: "La fin des compromis en cuisine",
      text: "J'ai testé plusieurs robinets premium avant de choisir HYDRAL. Rapport qualité-prix imbattable : toutes les fonctionnalités que je cherchais à un prix accessible. L'eau pétillante intégrée change tout. Je ne reviendrai jamais en arrière.",
      verified: true,
      usage: "Utilise les 5 types d'eau quotidiennement"
    },
    {
      name: "Claire Rousseau",
      location: "Bordeaux",
      role: "Architecte d'intérieur",
      rating: 5,
      date: "Installé depuis 6 mois",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      quote: "Mes clients me demandent tous la même chose",
      text: "Depuis que j'ai installé HYDRAL chez moi, 100% de mes projets de rénovation cuisine incluent un robinet 5-en-1. C'est devenu le standard. Plus personne ne veut revenir à l'ancien système.",
      verified: true,
      usage: "Recommande HYDRAL dans tous ses projets"
    },
    {
      name: "Marc Lefebvre",
      location: "Marseille",
      role: "Père de 3 enfants",
      rating: 5,
      date: "Installé depuis 4 mois",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      quote: "Économies réelles dès le premier mois",
      text: "On buvait 2 packs de 6 bouteilles d'eau par semaine (24 bouteilles). Plus 4 cartouches Sodastream par mois. Tout ça a disparu. HYDRAL est rentabilisé en moins de 2 ans avec nos économies.",
      verified: true,
      usage: "Famille nombreuse, gros consommateur d'eau"
    },
    {
      name: "Julie Petit",
      location: "Nantes",
      role: "Infirmière",
      rating: 5,
      date: "Installé depuis 10 mois",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      quote: "La sécurité enfants fonctionne parfaitement",
      text: "J'avais peur pour mes jumeaux de 4 ans avec l'eau bouillante. Le système de sécurité est incroyable : double verrouillage + bague de protection. Ils ne peuvent absolument pas actionner l'eau chaude seuls.",
      verified: true,
      usage: "Sécurité maximale pour jeunes enfants"
    },
    {
      name: "David Chen",
      location: "Toulouse",
      role: "Consultant IT",
      rating: 5,
      date: "Installé depuis 5 mois",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      quote: "Installation rapide, zéro problème",
      text: "Commande passée un lundi, installateur chez moi le vendredi suivant. Installation en 2h30 chrono, tout fonctionne parfaitement. Le SAV a répondu à toutes mes questions techniques en moins de 24h.",
      verified: true,
      usage: "Apprécie la qualité du service"
    },
  ];

  const stats = [
    { number: "4,9/5", label: "Note moyenne client" },
    { number: "2000+", label: "Foyers équipés" },
    { number: "98%", label: "Clients satisfaits" },
    { number: "4,2 ans", label: "Durée moyenne d'utilisation" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B1E3E]/10 rounded-full mb-8">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-sm text-[#6B1E3E]">Noté 4,9/5 par nos clients</span>
            </div>

            <h1 className="mb-6 text-gray-900">
              Ils ont franchi le pas
              <span className="block text-[#6B1E3E]">Voici leurs retours</span>
            </h1>

            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Plus de 2000 foyers ont déjà installé HYDRAL. Pas de langue de bois : découvrez leurs témoignages authentiques, leurs chiffres réels, et pourquoi ils ne reviendraient jamais en arrière.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl border border-gray-200/50 shadow-sm"
              >
                <div className="text-4xl text-[#6B1E3E] mb-2">{stat.number}</div>
                <div className="text-sm text-[#8B7E74]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#FAF8F5] rounded-3xl p-8 border border-gray-200/50 hover:shadow-xl transition-shadow"
              >
                {/* Header avec photo et infos */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6B1E3E] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-1">{testimonial.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#8B7E74] mb-2">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                    </div>
                    <div className="text-xs text-[#8B7E74]">{testimonial.date}</div>
                  </div>
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#6B1E3E]/20 mb-4" />

                {/* Quote principale */}
                <h4 className="text-xl text-gray-900 mb-4 italic">
                  "{testimonial.quote}"
                </h4>

                {/* Texte détaillé */}
                <p className="text-[#8B7E74] leading-relaxed mb-4">
                  {testimonial.text}
                </p>

                {/* Usage tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-xs text-gray-700 border border-gray-200">
                  {testimonial.usage}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video testimonials section - Coming soon */}
      <section className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6 text-gray-900">
              Témoignages vidéo
              <span className="block text-[#6B1E3E]">Bientôt disponibles</span>
            </h2>
            <p className="text-xl text-[#8B7E74] mb-12 max-w-3xl mx-auto">
              Nous préparons une série de visites chez nos clients pour vous montrer leur HYDRAL en action, dans de vraies cuisines, avec de vrais retours d'expérience.
            </p>
            <div className="aspect-video max-w-4xl mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center border border-gray-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#6B1E3E] border-b-8 border-b-transparent ml-1"></div>
                </div>
                <p className="text-gray-500">Prochainement</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6">
              Prêt à rejoindre
              <span className="block">nos 2000+ clients ?</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Choisissez votre HYDRAL maintenant et transformez votre quotidien en cuisine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => navigate('configurator')}
                className="px-10 py-5 bg-white text-[#6B1E3E] rounded-full shadow-xl hover:bg-[#FAF8F5]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Créer mon HYDRAL
              </motion.button>
              <motion.button
                onClick={() => navigate('faq')}
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir la FAQ
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}