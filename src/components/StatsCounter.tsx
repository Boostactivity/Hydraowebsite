import { useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';
import { TrendingUp, Users, Droplets, Leaf, Award, Heart } from 'lucide-react';

interface StatProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '', decimals = 0 }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [springValue, decimals]);

  const formatNumber = (num: string) => {
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  return (
    <span ref={ref}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

export function StatsCounter() {
  // BATCH 20 - Compteur temps réel incrémental
  const [installCount, setInstallCount] = useState(2347);

  useEffect(() => {
    // Incrémente le compteur toutes les 30 secondes (simulation temps réel)
    const interval = setInterval(() => {
      setInstallCount(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      value: installCount,
      suffix: '+',
      label: 'Foyers équipés',
      sublabel: 'Et ça augmente chaque jour',
      color: 'from-[#6B1E3E] to-[#8B2E4E]',
      iconBg: 'bg-[#6B1E3E]/10',
      iconColor: 'text-[#6B1E3E]'
    },
    {
      icon: Droplets,
      value: 5.6,
      suffix: 'M',
      label: 'Bouteilles évitées',
      sublabel: 'Depuis le lancement',
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      decimals: 1
    },
    {
      icon: Leaf,
      value: 365,
      suffix: ' tonnes',
      label: 'CO₂ économisés',
      sublabel: 'Impact environnemental positif',
      color: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Award,
      value: 4.9,
      suffix: '/5',
      label: 'Satisfaction client',
      sublabel: 'Sur 2000+ avis vérifiés',
      color: 'from-[#D4AF37] to-[#B8941F]',
      iconBg: 'bg-[#D4AF37]/10',
      iconColor: 'text-[#D4AF37]',
      decimals: 1
    },
    {
      icon: TrendingUp,
      value: 87,
      suffix: '%',
      label: 'Recommandation',
      sublabel: 'Clients qui recommandent',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Heart,
      value: 6,
      suffix: ' mois',
      label: 'ROI moyen',
      sublabel: 'Temps de rentabilisation',
      color: 'from-red-500 to-pink-600',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[#FAF8F5] via-white to-[#E8D5DC]/10">
      <div className="section-container">
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
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Impact réel</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            HYDRAO en chiffres
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Des résultats concrets qui parlent d'eux-mêmes.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-2xl transition-all"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: idx * 0.1 + 0.2 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.iconBg} mb-6`}
              >
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </motion.div>

              {/* Value */}
              <div className={`text-5xl font-light bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>

              {/* Label */}
              <h3 className="text-xl text-gray-900 mb-2">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-[#6B1E3E]/5 to-[#D4AF37]/5 rounded-2xl border border-[#6B1E3E]/20">
            <p className="text-gray-700">
              <span className="font-medium text-[#6B1E3E]">Rejoignez plus de 2 347 foyers</span> qui ont déjà fait le choix de HYDRAO
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}