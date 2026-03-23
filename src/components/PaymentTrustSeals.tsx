import { motion } from 'motion/react';
import { Shield, Lock, CheckCircle2, CreditCard, Smartphone } from 'lucide-react';

interface PaymentTrustSealsProps {
  variant?: 'compact' | 'full' | 'minimal';
  showLogos?: boolean;
}

export function PaymentTrustSeals({ 
  variant = 'full',
  showLogos = true 
}: PaymentTrustSealsProps) {
  
  const paymentMethods = [
    { name: 'Visa', color: '#1A1F71' },
    { name: 'Mastercard', color: '#EB001B' },
    { name: 'Amex', color: '#006FCF' },
    { name: 'PayPal', color: '#003087' },
    { name: 'Apple Pay', color: '#000000' },
    { name: 'Google Pay', color: '#4285F4' }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Paiement sécurisé SSL',
      description: 'Cryptage 256 bits'
    },
    {
      icon: Shield,
      title: '3D Secure',
      description: 'Protection maximale'
    },
    {
      icon: CheckCircle2,
      title: 'Données protégées',
      description: 'Conformité RGPD'
    }
  ];

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
        <Lock className="w-4 h-4 text-green-600" />
        <span>Paiement 100% sécurisé</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="inline-flex flex-col gap-4">
        {/* Logos paiement */}
        {showLogos && (
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm"
              >
                <span className="text-[10px] font-medium" style={{ color: method.color }}>
                  {method.name}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Badge sécurité */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4 text-green-600" />
          <span>Paiement sécurisé SSL • 3D Secure</span>
        </div>
      </div>
    );
  }

  // Variant full (default)
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-700 rounded-full mb-4 border border-green-200">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Paiement 100% sécurisé</span>
          </div>
          <h3 className="text-2xl text-gray-900 mb-2">Vos données sont protégées</h3>
          <p className="text-gray-600">Nous utilisons les technologies de sécurité les plus avancées</p>
        </motion.div>

        {/* Méthodes de paiement */}
        {showLogos && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="text-center text-sm text-gray-600 mb-4 font-medium">
              Tous les moyens de paiement acceptés :
            </div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="w-20 h-14 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold" style={{ color: method.color }}>
                    {method.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features de sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-green-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badges de confiance additionnels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: CreditCard, text: 'Paiement en 3× sans frais' },
            { icon: Shield, text: 'Données cryptées' },
            { icon: Lock, text: 'Certifié PCI-DSS' },
            { icon: Smartphone, text: 'Paiement mobile' }
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-gray-200"
            >
              <badge.icon className="w-5 h-5 text-[#6B1E3E] flex-shrink-0" />
              <span className="text-sm text-gray-700">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer trust message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-green-200 rounded-full shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">
              Plus de <span className="font-medium text-gray-900">2 347 clients</span> nous font confiance
            </span>
          </div>
        </motion.div>

        {/* Logos certifications */}
        <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
          <div className="text-xs text-gray-500 text-center">
            <div className="font-medium mb-1">Certifié par :</div>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-gray-100 rounded">SSL</span>
              <span className="px-3 py-1 bg-gray-100 rounded">PCI-DSS</span>
              <span className="px-3 py-1 bg-gray-100 rounded">RGPD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
