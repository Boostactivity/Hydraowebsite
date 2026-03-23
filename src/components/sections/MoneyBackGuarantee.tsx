import React from 'react';
import { motion } from 'motion/react';
import { Shield, Check, RotateCcw, HeartHandshake } from 'lucide-react';

export function MoneyBackGuarantee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-3xl p-10 shadow-xl"
    >
      <div className="flex items-start gap-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <Shield className="w-8 h-8 text-green-600" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl text-gray-900">Satisfait ou remboursé 30 jours</h3>
            <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">100% garanti</span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Testez HYDRAO chez vous pendant 30 jours. Si vous n'êtes pas entièrement satisfait, 
            nous reprenons le robinet et vous remboursons intégralement. Sans poser de questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">30 jours d'essai</div>
                <div className="text-sm text-gray-600">Testez en conditions réelles</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Retour gratuit</div>
                <div className="text-sm text-gray-600">Désinstallation incluse</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Remboursement intégral</div>
                <div className="text-sm text-gray-600">Sous 7 jours ouvrés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
