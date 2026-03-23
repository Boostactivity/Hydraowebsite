import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Microscope, Users, Quote, CheckCircle2 } from 'lucide-react';

interface ExpertEndorsementsSectionProps {
  className?: string;
}

export function ExpertEndorsementsSection({ className = '' }: ExpertEndorsementsSectionProps) {
  const experts = [
    {
      name: 'Dr. Marie Dupont',
      title: 'Médecin nutritionniste',
      credentials: 'CHU Paris, 15 ans d\'expérience',
      photo: '👩‍⚕️',
      quote: 'L\'élimination des microplastiques et perturbateurs endocriniens par la filtration HYDRAO représente un véritable progrès pour la santé quotidienne des familles.',
      expertise: 'Santé & Nutrition',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Pierre Leclerc',
      title: 'Ingénieur en traitement de l\'eau',
      credentials: 'École Polytechnique, Expert ANSES',
      photo: '👨‍🔬',
      quote: 'La technologie de filtration 5 étapes de HYDRAO égale celle des systèmes professionnels utilisés en laboratoire. C\'est remarquable pour un usage domestique.',
      expertise: 'Qualité de l\'eau',
      color: 'from-[#6B1E3E] to-[#8B2E4E]'
    },
    {
      name: 'Sophie Martin',
      title: 'Architecte d\'intérieur',
      credentials: 'Prix du Design Durable 2023',
      photo: '👩‍💼',
      quote: 'HYDRAO allie esthétique premium et fonctionnalité. Un robinet qui sublime la cuisine tout en étant intelligent. Mes clients adorent.',
      expertise: 'Design & Ergonomie',
      color: 'from-[#D4AF37] to-[#FFD700]'
    },
    {
      name: 'Jean Rousseau',
      title: 'Expert environnement',
      credentials: 'Zero Waste France, Consultant ADEME',
      photo: '🌱',
      quote: 'Éviter 2 400 bouteilles plastique par an et par foyer : HYDRAO est l\'une des solutions les plus impactantes pour réduire son empreinte écologique.',
      expertise: 'Écologie',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const certifications = [
    {
      icon: Shield,
      name: 'CE & NF',
      description: 'Certifications européennes'
    },
    {
      icon: Microscope,
      name: 'Tests laboratoire',
      description: 'Qualité eau vérifiée'
    },
    {
      icon: Award,
      name: 'Prix Innovation',
      description: 'CES Las Vegas 2023'
    },
    {
      icon: CheckCircle2,
      name: 'ACS',
      description: 'Attestation Contact Sanitaire'
    }
  ];

  return (
    <section className={`section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-white ${className}`}>
      <div className="section-container max-w-7xl mx-auto">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <Award className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Validé par les Experts</span>
          </motion.div>

          <h2 className="mb-6 text-gray-900">
            Ce que disent les professionnels
            <span className="block text-[#6B1E3E]">de la santé et de l'environnement</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des experts indépendants reconnus valident la technologie et les bénéfices HYDRAO
          </p>
        </motion.div>

        {/* Expert testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {experts.map((expert, idx) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl border-2 border-gray-200 p-8 hover:shadow-2xl transition-all relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${expert.color}`} />

              {/* Expert info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{expert.photo}</div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-1">{expert.name}</h3>
                  <p className="text-sm text-[#6B1E3E] font-medium mb-1">{expert.title}</p>
                  <p className="text-xs text-gray-500">{expert.credentials}</p>
                </div>
                <div className={`px-3 py-1 bg-gradient-to-r ${expert.color} text-white text-xs rounded-full font-medium`}>
                  {expert.expertise}
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" />
                <blockquote className="relative text-gray-700 italic leading-relaxed pl-6">
                  "{expert.quote}"
                </blockquote>
              </div>

              {/* Verified badge */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Expert vérifié</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-3xl p-10"
        >
          <h3 className="text-2xl text-center mb-10">
            Certifications et garanties officielles
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-medium mb-1">{cert.name}</div>
                  <div className="text-sm text-white/80">{cert.description}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Scientific backing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl text-gray-900 mb-4">
                Tests en laboratoire indépendant
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tous les modules HYDRAO sont testés selon les normes <strong>NF EN 1213</strong> et <strong>ACS</strong> 
                (Attestation de Conformité Sanitaire). Les filtres sont analysés par des laboratoires certifiés COFRAC 
                pour garantir l'élimination des contaminants.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: '99.9%', label: 'Chlore éliminé' },
                  { value: '98.5%', label: 'Calcaire filtré' },
                  { value: '100%', label: 'Microplastiques bloqués' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-3xl font-light text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust seal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border-2 border-green-200 rounded-full">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">
              Technologie validée par des experts indépendants
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
