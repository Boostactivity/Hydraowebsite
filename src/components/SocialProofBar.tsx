import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';

export function SocialProofBar() {
  const customers = [
    { name: 'Sophie M.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Thomas D.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Claire R.', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Marc L.', avatar: 'https://i.pravatar.cc/150?img=7' },
    { name: 'Julie P.', avatar: 'https://i.pravatar.cc/150?img=9' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6"
    >
      {/* Avatars empilés */}
      <div className="flex items-center">
        <div className="flex -space-x-3">
          {customers.map((customer, idx) => (
            <motion.img
              key={idx}
              src={customer.avatar}
              alt={customer.name}
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300 }}
              className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
            />
          ))}
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">2 347</span> clients satisfaits
          </p>
        </div>
      </div>

      {/* Séparateur */}
      <div className="hidden sm:block w-px h-12 bg-gray-200"></div>

      {/* Badge installation */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Installation garantie</p>
          <p className="text-xs text-gray-600">Sous 7 jours ouvrés</p>
        </div>
      </div>
    </motion.div>
  );
}
