import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Reservoir {
  id: string;
  name: string;
  capacity: string;
  description: string;
  specs: {
    diameter: string;
    height: string;
    totalHeight: string;
  };
  price: number;
  features: string[];
}

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservoirs: Reservoir[];
  onSelect: (id: string) => void;
}

export function CompareModal({ isOpen, onClose, reservoirs, onSelect }: CompareModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
                <h2 className="text-3xl font-light text-gray-900">Comparer les réservoirs</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Comparison Table */}
              <div className="overflow-auto max-h-[calc(90vh-120px)]">
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reservoirs.map((reservoir, index) => (
                      <motion.div
                        key={reservoir.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-white to-[#FAF8F5] rounded-2xl border-2 border-gray-200 hover:border-[#6B1E3E]/30 p-6 transition-all"
                      >
                        {/* Name & Capacity */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-light text-gray-900 mb-2">{reservoir.name}</h3>
                          <div className="text-4xl text-[#6B1E3E] mb-2">{reservoir.capacity}</div>
                          <p className="text-sm text-gray-600">{reservoir.description}</p>
                        </div>

                        {/* Price */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                          <div className="text-2xl text-gray-900">
                            {reservoir.price === 0 ? (
                              <span className="text-lg text-gray-600">Inclus</span>
                            ) : (
                              <>+{reservoir.price} €</>
                            )}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6 space-y-3">
                          {reservoir.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Specs */}
                        <div className="mb-6 p-4 bg-white/50 rounded-xl space-y-2">
                          <div className="text-xs text-gray-500">Dimensions</div>
                          <div className="text-sm text-gray-700">Ø {reservoir.specs.diameter}</div>
                          <div className="text-sm text-gray-700">H {reservoir.specs.height}</div>
                        </div>

                        {/* Select Button */}
                        <button
                          onClick={() => {
                            onSelect(reservoir.id);
                            onClose();
                          }}
                          className="w-full py-3 bg-[#6B1E3E] text-white rounded-full font-medium hover:bg-[#6B1E3E]/90 transition-colors"
                        >
                          Choisir ce réservoir
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
