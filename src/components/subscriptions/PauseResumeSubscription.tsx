import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pause, 
  Play, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Gift,
  X,
  ArrowRight,
  Clock,
  Heart,
  TrendingDown
} from 'lucide-react';

interface PauseResumeProps {
  currentStatus: 'active' | 'paused';
  onStatusChange: (newStatus: 'active' | 'paused', duration?: number) => void;
}

export function PauseResumeSubscription({ currentStatus, onStatusChange }: PauseResumeProps) {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [pauseDuration, setPauseDuration] = useState<30 | 60 | 90>(30);
  const [pauseReason, setPauseReason] = useState('');

  const handlePause = () => {
    onStatusChange('paused', pauseDuration);
    setShowPauseModal(false);
  };

  const handleResume = () => {
    onStatusChange('active');
    setShowResumeModal(false);
  };

  return (
    <>
      {/* Quick Action Card */}
      {currentStatus === 'active' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Pause className="w-5 h-5 text-orange-500" />
                Besoin d'une pause ?
              </h3>
              <p className="text-gray-600 mb-4">
                Partez en vacances ? Trop de stock ? Mettez votre abonnement en pause temporairement, sans frais.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: '✈️', text: 'Vacances' },
                  { icon: '📦', text: 'Stock suffisant' },
                  { icon: '💰', text: 'Budget serré' }
                ].map((reason, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl mb-1">{reason.icon}</div>
                    <div className="text-xs text-gray-600">{reason.text}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowPauseModal(true)}
                className="w-full px-6 py-3 border-2 border-orange-300 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                <Pause className="w-5 h-5" />
                <span>Mettre en pause</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                <Clock className="w-4 h-4" />
                <span>Abonnement en pause</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">
                Votre abonnement reprendra bientôt
              </h3>
              <p className="text-white/90 text-lg">
                Reprise automatique le 15 février 2025
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Pause className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white/80 mb-1">Pause depuis</div>
                <div className="text-xl font-bold">15 décembre</div>
              </div>
              <div>
                <div className="text-sm text-white/80 mb-1">Reprise dans</div>
                <div className="text-xl font-bold">62 jours</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setShowResumeModal(true)}
              className="w-full px-6 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span>Reprendre maintenant</span>
            </button>
            <button className="w-full px-6 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Prolonger la pause
            </button>
          </div>
        </motion.div>
      )}

      {/* Pause Modal */}
      <AnimatePresence>
        {showPauseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowPauseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Mettre en pause votre abonnement
                  </h2>
                  <p className="text-gray-600">
                    Aucun frais, reprise quand vous voulez
                  </p>
                </div>
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Retention Offer */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      🎁 Offre spéciale : Restez avec nous !
                    </h3>
                    <p className="text-white/90 mb-4">
                      Au lieu de mettre en pause, recevez <strong>-30% sur votre prochaine livraison</strong> + un filtre premium offert
                    </p>
                    <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                      J'accepte l'offre 🎉
                    </button>
                  </div>
                </div>
              </div>

              {/* Pause Duration */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Durée de la pause
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 30, label: '1 mois', desc: 'Courte pause' },
                    { value: 60, label: '2 mois', desc: 'Vacances' },
                    { value: 90, label: '3 mois', desc: 'Longue durée' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPauseDuration(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        pauseDuration === option.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900 mb-1">{option.label}</div>
                      <div className="text-xs text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason (optional) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Pourquoi mettez-vous en pause ? (optionnel)
                </label>
                <select
                  value={pauseReason}
                  onChange={(e) => setPauseReason(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Sélectionnez une raison...</option>
                  <option value="vacation">Vacances / Absence</option>
                  <option value="stock">J'ai encore du stock</option>
                  <option value="budget">Contraintes budgétaires</option>
                  <option value="quality">Problème de qualité</option>
                  <option value="other">Autre raison</option>
                </select>
              </div>

              {/* What happens during pause */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Pendant la pause
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Aucune livraison ni facturation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Vous gardez tous vos avantages membres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Support client toujours disponible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Reprise automatique ou manuelle quand vous voulez</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handlePause}
                  className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Confirmer la pause</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Bon retour ! 🎉
                  </h2>
                  <p className="text-gray-600">
                    Reprenez votre abonnement maintenant
                  </p>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Welcome Back Offer */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-xl">Content de vous revoir !</div>
                    <div className="text-white/90">Cadeau de bienvenue</div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-bold mb-2">🎁 -20% sur votre prochaine commande</div>
                  <div className="text-sm text-white/90">
                    + Livraison express gratuite pour votre retour
                  </div>
                </div>
              </div>

              {/* Next Delivery */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Prochaine livraison
                </h4>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { 
                        day: '2-digit', 
                        month: 'long' 
                      })}
                    </div>
                    <div className="text-sm text-gray-600">Dans 7 jours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Contenu</div>
                    <div className="font-semibold text-gray-900">2 Filtres + 1 CO₂</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleResume}
                  className="w-full px-6 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Reprendre mon abonnement</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Pas encore
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Compact widget version
export function PauseResumeWidget({ currentStatus, onStatusChange }: PauseResumeProps) {
  return (
    <div className={`p-4 rounded-xl border-2 ${
      currentStatus === 'active' 
        ? 'border-orange-200 bg-orange-50' 
        : 'border-green-200 bg-green-50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentStatus === 'active' ? (
            <Pause className="w-5 h-5 text-orange-600" />
          ) : (
            <Play className="w-5 h-5 text-green-600" />
          )}
          <div>
            <div className={`font-semibold ${
              currentStatus === 'active' ? 'text-orange-900' : 'text-green-900'
            }`}>
              {currentStatus === 'active' ? 'Mettre en pause' : 'Reprendre'}
            </div>
            <div className="text-xs text-gray-600">
              {currentStatus === 'active' ? 'Sans frais' : 'Reprise immédiate'}
            </div>
          </div>
        </div>
        <button className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          currentStatus === 'active'
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}>
          {currentStatus === 'active' ? 'Pause' : 'Reprendre'}
        </button>
      </div>
    </div>
  );
}
