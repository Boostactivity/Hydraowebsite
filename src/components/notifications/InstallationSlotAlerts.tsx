import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Bell, Check, X, AlertCircle, Sparkles } from 'lucide-react';

interface InstallationSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  installer: string;
  city: string;
  available: boolean;
  price?: number;
}

interface InstallationSlotAlertsProps {
  userCity?: string;
  userPostalCode?: string;
}

export function InstallationSlotAlerts({ userCity, userPostalCode }: InstallationSlotAlertsProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<InstallationSlot[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simuler vérification disponibilité installation
    const checkAvailability = () => {
      const mockSlots: InstallationSlot[] = [
        {
          id: '1',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          startTime: '09:00',
          endTime: '12:00',
          installer: 'Pierre M.',
          city: userCity || 'Paris',
          available: true,
          price: 0
        },
        {
          id: '2',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          startTime: '14:00',
          endTime: '17:00',
          installer: 'Marc D.',
          city: userCity || 'Paris',
          available: true,
          price: 0
        }
      ];

      if (mockSlots.length > 0) {
        setAvailableSlots(mockSlots);
        setShowAlert(true);
      }
    };

    const timer = setTimeout(checkAvailability, 5000);
    return () => clearTimeout(timer);
  }, [userCity]);

  if (!showAlert || availableSlots.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating notification */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-24 right-6 z-[80] w-full max-w-sm"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5" />
                </motion.div>
                <div>
                  <div className="font-bold text-sm">Créneaux disponibles !</div>
                  <div className="text-xs text-white/80">Installation dans votre ville</div>
                </div>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {availableSlots.slice(0, 2).map(slot => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                >
                  <div>
                    <div className="text-sm font-semibold">
                      {new Date(slot.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                    <div className="text-xs text-white/80">
                      {slot.startTime} - {slot.endTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-400/30 rounded-full">
                    <Check className="w-3 h-3" />
                    <span className="text-xs font-medium">Dispo</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Voir les créneaux
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modal avec tous les créneaux */}
      <AnimatePresence>
        {showModal && (
          <InstallationSlotsModal
            slots={availableSlots}
            city={userCity}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function InstallationSlotsModal({ 
  slots, 
  city, 
  onClose 
}: { 
  slots: InstallationSlot[];
  city?: string;
  onClose: () => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    
    // En production : API call pour réserver le créneau
    console.log('Slot reserved:', {
      slotId: selectedSlot,
      email,
      phone
    });

    setConfirmed(true);
    
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Réservation confirmée ! ✅
          </h3>
          <p className="text-gray-600 mb-4">
            Votre créneau d'installation est réservé.
            <br />
            Vous allez recevoir une confirmation par email.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-900">
            Un SMS vous sera envoyé 24h avant le rendez-vous
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Créneaux d'installation disponibles
              </h2>
              {city && (
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{city}</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {!selectedSlot ? (
            <>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-900">
                    <strong>Installation gratuite incluse</strong>
                    <ul className="mt-2 space-y-1 text-green-800">
                      <li>• Technicien certifié HYDRAO</li>
                      <li>• Installation complète + tests</li>
                      <li>• Formation à l'utilisation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">
                Sélectionnez un créneau :
              </h3>

              <div className="space-y-3">
                {slots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-2xl transition-all border-2 border-transparent hover:border-blue-300"
                  >
                    <div className="w-16 h-16 rounded-xl bg-blue-100 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {new Date(slot.date).getDate()}
                      </div>
                      <div className="text-xs text-blue-700">
                        {new Date(slot.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </div>

                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">
                        {new Date(slot.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{slot.startTime} - {slot.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👨‍🔧</span>
                          <span>{slot.installer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Disponible</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleReserve} className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Créneau sélectionné :</h3>
                {slots.filter(s => s.id === selectedSlot).map(slot => (
                  <div key={slot.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-blue-500 flex flex-col items-center justify-center text-white">
                      <div className="text-2xl font-bold">
                        {new Date(slot.date).getDate()}
                      </div>
                      <div className="text-xs">
                        {new Date(slot.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {new Date(slot.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {slot.startTime} - {slot.endTime} • {slot.installer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Pour vous envoyer un SMS de rappel 24h avant
                </p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-900">
                    <strong>Important :</strong> Veuillez vous assurer d'être présent au moment du rendez-vous. En cas d'absence, des frais de déplacement de 50€ pourront être facturés.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-semibold hover:shadow-xl transition-all"
                >
                  Confirmer la réservation
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Badge pour indiquer disponibilité installation
export function InstallationAvailabilityBadge({ city, availableSlots }: { city: string; availableSlots: number }) {
  if (availableSlots === 0) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-sm font-medium text-green-700">
        {availableSlots} créneau{availableSlots > 1 ? 'x' : ''} dispo à {city}
      </span>
    </div>
  );
}
