import { motion } from 'motion/react';
import { Shield, Truck, CreditCard, Clock, Award, Headphones, Star } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function TrustBadges({ variant = 'full', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: 'Paiement 100% sécurisé',
      description: 'SSL & 3D Secure',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Truck,
      title: 'Livraison offerte',
      description: 'Sous 5-7 jours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      title: 'Garantie 5 ans',
      description: 'Pièces & main d\'œuvre',
      color: 'text-[#6B1E3E]',
      bgColor: 'bg-[#E8D5DC]/30'
    },
    {
      icon: Clock,
      title: 'Satisfait ou remboursé',
      description: '30 jours pour essayer',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Headphones,
      title: 'Support premium',
      description: '7j/7 - Réponse en 2h',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: CreditCard,
      title: 'Paiement 3× sans frais',
      description: 'À partir de 150€',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`${badge.bgColor} rounded-xl p-4 text-center`}
          >
            <badge.icon className={`w-6 h-6 ${badge.color} mx-auto mb-2`} />
            <div className="text-xs font-medium text-gray-900">{badge.title}</div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <section className={`section-padding bg-white border-y border-gray-200 ${className}`}>
      <div className="section-container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl text-gray-900 mb-2">Vos garanties HYDRAL</h3>
          <p className="text-gray-600">Achetez en toute confiance</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${badge.bgColor} rounded-2xl p-6 border-2 border-transparent hover:border-gray-200 transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${badge.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm`}>
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium mb-1">{badge.title}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos paiement sécurisé */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-sm text-gray-500 mb-4">Moyens de paiement acceptés</p>
          <div className="flex items-center justify-center gap-6 flex-wrap opacity-60">
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
              💳 Visa
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
              💳 Mastercard
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
              💳 Amex
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
              🏦 PayPal
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
              💰 3× sans frais
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}