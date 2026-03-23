import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Package, Video, Gift, Share2, Download, Calendar, Truck, Phone, Mail } from 'lucide-react';
import { Page } from '../App';

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  email: string;
  deliveryDate: string;
  installationDate?: string;
  hasInstallation: boolean;
  navigate: (page: Page) => void;
}

export function OrderConfirmationPremium({
  orderNumber,
  customerName,
  email,
  deliveryDate,
  installationDate,
  hasInstallation,
  navigate
}: OrderConfirmationProps) {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero Confirmation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Header Success */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-12 h-12 text-green-600" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">
              Commande confirmée ! 🎉
            </h1>
            <p className="text-xl text-white/90">
              Merci {customerName}, votre HYDRAO est en route vers vous !
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Numéro de commande</h3>
                <button className="flex items-center gap-2 text-sm text-[#6B1E3E] hover:text-[#8B2E4E] transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </button>
              </div>
              <p className="text-3xl font-bold text-[#6B1E3E] mb-6">{orderNumber}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-gray-600">Email de confirmation</div>
                    <div className="font-medium text-gray-900">{email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-gray-600">Livraison estimée</div>
                    <div className="font-medium text-gray-900">{deliveryDate}</div>
                  </div>
                </div>
                {hasInstallation && installationDate && (
                  <div className="flex items-center gap-3 md:col-span-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-600">Installation planifiée</div>
                      <div className="font-medium text-gray-900">{installationDate}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Point 166 - Installation Preparation Video */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    🎥 Préparez votre installation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Regardez notre guide vidéo complet (15 min) pour installer votre HYDRAO comme un pro. Outils nécessaires, étapes détaillées et astuces d'expert.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate('video-hub')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Video className="w-5 h-5" />
                      <span>Voir la vidéo maintenant</span>
                    </button>
                    <button
                      onClick={() => navigate('resources')}
                      className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors border-2 border-blue-200"
                    >
                      Télécharger le guide PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Point 166 - Referral Program */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    💰 Parrainez vos proches et gagnez 50€
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Vous adorez déjà HYDRAO ? Partagez votre expérience ! Pour chaque ami qui commande avec votre code, <strong>vous gagnez 50€</strong> et <strong>il économise 50€</strong>.
                  </p>
                  <div className="bg-white rounded-xl p-4 mb-4 border border-purple-200">
                    <div className="text-sm text-gray-600 mb-2">Votre code parrain unique :</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 px-4 py-3 bg-purple-100 rounded-lg font-mono text-xl font-bold text-purple-900">
                        {customerName.toUpperCase().replace(/\s/g, '')}-{orderNumber.slice(-4)}
                      </div>
                      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Copier
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Partager par email</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Preview */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Suivre ma commande</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  En préparation
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Vous recevrez un email avec le lien de suivi dès l'expédition. Livraison estimée : <strong>{deliveryDate}</strong>
              </p>
              <button
                onClick={() => navigate('home')}
                className="flex items-center gap-2 text-[#6B1E3E] hover:text-[#8B2E4E] font-medium transition-colors"
              >
                <Truck className="w-5 h-5" />
                <span>Voir le statut de livraison →</span>
              </button>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Besoin d'aide ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <Phone className="w-6 h-6 text-[#6B1E3E]" />
                  <div>
                    <div className="font-medium text-gray-900">Appelez-nous</div>
                    <div className="text-sm text-gray-600">01 23 45 67 89</div>
                  </div>
                </a>
                <button
                  onClick={() => navigate('support')}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <Mail className="w-6 h-6 text-[#6B1E3E]" />
                  <div>
                    <div className="font-medium text-gray-900">Centre d'aide</div>
                    <div className="text-sm text-gray-600">FAQ & Tutoriels</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => navigate('home')}
            className="px-8 py-4 bg-[#6B1E3E] text-white rounded-full font-semibold hover:bg-[#8B2E4E] transition-colors"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour à l'accueil
          </motion.button>
          <motion.button
            onClick={() => navigate('shop')}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-colors"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuer mes achats
          </motion.button>
        </div>
      </div>
    </div>
  );
}
