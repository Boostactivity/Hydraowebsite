import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Truck, Check, MapPin, Calendar, Phone, Mail, Download, Share2 } from 'lucide-react';
import { Page } from '../../App';

interface TrackingPageProps {
  navigate: (page: Page) => void;
}

interface TrackingStep {
  id: string;
  label: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export function ShippingTrackingPage({ navigate }: TrackingPageProps) {
  const [orderNumber, setOrderNumber] = useState('HYDRAL-12345678');
  const [showTracking, setShowTracking] = useState(true);

  // Mock tracking data
  const trackingSteps: TrackingStep[] = [
    {
      id: '1',
      label: 'Commande confirmée',
      description: 'Votre commande a été reçue et validée',
      date: '20 mars 2026, 14:30',
      completed: true,
      current: false
    },
    {
      id: '2',
      label: 'En préparation',
      description: 'Votre HYDRAL est en cours de préparation dans notre entrepôt',
      date: '20 mars 2026, 16:00',
      completed: true,
      current: false
    },
    {
      id: '3',
      label: 'Expédié',
      description: 'Votre colis a été remis au transporteur Chronopost',
      date: '21 mars 2026, 09:15',
      completed: true,
      current: true
    },
    {
      id: '4',
      label: 'En transit',
      description: 'Votre colis est en route vers vous',
      date: 'Estimation: 22 mars 2026',
      completed: false,
      current: false
    },
    {
      id: '5',
      label: 'En cours de livraison',
      description: 'Le livreur est en route pour vous livrer',
      date: 'Estimation: 23 mars 2026',
      completed: false,
      current: false
    },
    {
      id: '6',
      label: 'Livré',
      description: 'Votre HYDRAL a été livré avec succès',
      date: '',
      completed: false,
      current: false
    }
  ];

  const deliveryInfo = {
    carrier: 'Chronopost',
    trackingNumber: 'CHR123456789FR',
    estimatedDelivery: '23 mars 2026',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    recipientName: 'Sophie Martin',
    recipientPhone: '06 12 34 56 78'
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-[#6B1E3E]" />
          </div>
          <h1 className="mb-6 text-gray-900">
            Suivi de commande
          </h1>
          <p className="text-xl text-[#8B7E74]">
            Suivez votre HYDRAL en temps réel jusqu'à la livraison
          </p>
        </motion.div>

        {showTracking ? (
          <>
            {/* Order Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-8 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-sm text-[#8B7E74] mb-1">Numéro de commande</div>
                  <div className="text-2xl font-bold text-[#6B1E3E]">{orderNumber}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                    ● En transit
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-[#8B7E74]" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-[#8B7E74]" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Tracking Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Statut de livraison
              </h2>

              <div className="space-y-6">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index < trackingSteps.length - 1 && (
                      <div 
                        className={`absolute left-6 top-14 w-0.5 h-full ${
                          step.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                        step.completed
                          ? 'bg-green-500 scale-110'
                          : step.current
                          ? 'bg-blue-500 scale-110 animate-pulse'
                          : 'bg-gray-200'
                      }`}>
                        {step.completed ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : step.current ? (
                          <Truck className="w-6 h-6 text-white" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div className={`flex-1 pb-8 ${step.current ? 'bg-blue-50 -ml-4 pl-4 -mr-8 pr-8 py-4 rounded-2xl' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${
                            step.current ? 'text-blue-900' : step.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </h3>
                          {step.current && (
                            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                              En cours
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${
                          step.current ? 'text-blue-800' : step.completed ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{step.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Delivery Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Informations de livraison
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-[#8B7E74]">Transporteur</div>
                      <div className="font-semibold text-gray-900">{deliveryInfo.carrier}</div>
                      <div className="text-sm text-[#8B7E74] mt-1">
                        N° suivi : {deliveryInfo.trackingNumber}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-[#8B7E74]">Livraison estimée</div>
                      <div className="font-semibold text-gray-900">{deliveryInfo.estimatedDelivery}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-[#8B7E74]">Adresse de livraison</div>
                      <div className="font-semibold text-gray-900">{deliveryInfo.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-[#8B7E74]">Contact</div>
                      <div className="font-semibold text-gray-900">{deliveryInfo.recipientName}</div>
                      <div className="text-sm text-[#8B7E74]">{deliveryInfo.recipientPhone}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Suivre sur {deliveryInfo.carrier}
                  </button>
                </div>
              </motion.div>

              {/* Map Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Localisation
                </h3>

                {/* Map Placeholder */}
                <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-[#8B7E74]">Carte de suivi en temps réel</p>
                    <p className="text-sm text-[#8B7E74] mt-1">(Intégration Google Maps)</p>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-900">
                      <strong>Notifications SMS activées</strong>
                      <p className="text-green-800 mt-1">
                        Vous recevrez un SMS 30 minutes avant la livraison et à la livraison.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Besoin d'aide avec votre livraison ?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl hover:shadow-md transition-shadow"
                >
                  <Phone className="w-6 h-6 text-[#6B1E3E]" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Service client</div>
                    <div className="text-xs text-[#8B7E74]">01 23 45 67 89</div>
                  </div>
                </a>

                <button
                  onClick={() => navigate('support')}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl hover:shadow-md transition-shadow"
                >
                  <Mail className="w-6 h-6 text-[#6B1E3E]" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">FAQ Livraison</div>
                    <div className="text-xs text-[#8B7E74]">Réponses rapides</div>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-white rounded-2xl hover:shadow-md transition-shadow">
                  <Package className="w-6 h-6 text-[#6B1E3E]" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Modifier livraison</div>
                    <div className="text-xs text-[#8B7E74]">Date ou adresse</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          /* Search Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Suivre votre commande
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de commande
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="HYDRAL-12345678"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowTracking(true)}
                className="w-full px-8 py-4 bg-[#6B1E3E] text-white rounded-full font-semibold hover:bg-[#8B2E4E] transition-colors"
              >
                Suivre ma commande
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
