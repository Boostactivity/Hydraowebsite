import React, { useState } from 'react';
import { Page } from '../App';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Lock, CreditCard, Truck, Check, Shield, MapPin, User, Mail, Phone, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TrustBadges } from '../components/TrustBadges';
import { StickyCheckoutSummary } from '../components/StickyCheckoutSummary';

interface CheckoutPageProps {
  navigate: (page: Page) => void;
}

// Point 161 - Guest Checkout (P1 CRITIQUE)
type CheckoutMode = 'guest' | 'create-account' | 'login';

export function CheckoutPage({ navigate }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'confirmation'>('info');
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>('guest');
  const [createAccountAfter, setCreateAccountAfter] = useState(false);
  
  const [formData, setFormData] = useState({
    // Coordonnées
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '', // Only if create-account
    // Livraison
    address: '',
    postalCode: '',
    city: '',
    // Facturation
    billingDifferent: false,
    billingAddress: '',
    billingPostalCode: '',
    billingCity: '',
    // Options
    includeInstallation: false,
    installationDate: '',
    // Paiement
    paymentMethod: 'card',
  });

  const shipping = 0; // Livraison offerte
  const installation = formData.includeInstallation ? 280 : 0;
  const total = cartTotal + shipping + installation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      setStep('payment');
    } else if (step === 'payment') {
      // Simuler le paiement
      setTimeout(() => {
        setStep('confirmation');
        clearCart();
      }, 1000);
    }
  };

  // Point 162 - Address Autocomplete (simulé - en production utiliser Google Places API)
  const handleAddressAutocomplete = (value: string) => {
    setFormData({ ...formData, address: value });
    
    // Simuler autocomplete après 3 caractères
    if (value.length >= 3) {
      // En production : appeler Google Places API ici
      // Pour la démo, on simule avec un timeout
      setTimeout(() => {
        if (value.toLowerCase().includes('par')) {
          // Suggestions simulées
          console.log('Suggestions:', [
            '123 Avenue des Champs-Élysées, 75008 Paris',
            '45 Rue de la Paix, 75002 Paris',
            '78 Boulevard Haussmann, 75008 Paris'
          ]);
        }
      }, 300);
    }
  };

  const selectAddress = (address: string, postalCode: string, city: string) => {
    setFormData({
      ...formData,
      address,
      postalCode,
      city
    });
  };

  // Page de confirmation
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-gray-200/50 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="mb-6 text-gray-900">Commande confirmée !</h1>
            <p className="text-xl text-[#8B7E74] mb-8">
              Merci {formData.firstName}, votre commande a bien été enregistrée.
            </p>
            <div className="p-6 bg-[#FAF8F5] rounded-2xl mb-8 text-left">
              <h3 className="text-lg mb-4 text-gray-900">Numéro de commande</h3>
              <p className="text-3xl text-[#6B1E3E] mb-6">HYDRAL-{Date.now().toString().slice(-8)}</p>
              
              <div className="space-y-3 text-sm text-[#8B7E74]">
                <div className="flex justify-between">
                  <span>Email de confirmation :</span>
                  <span className="text-gray-900">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison estimée :</span>
                  <span className="text-gray-900">3-5 jours ouvrés</span>
                </div>
                {formData.includeInstallation && (
                  <div className="flex justify-between">
                    <span>Installation :</span>
                    <span className="text-gray-900">Planifiée le {formData.installationDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Point 161 - Option créer compte après achat */}
            {checkoutMode === 'guest' && createAccountAfter && (
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left text-sm text-blue-900">
                    <strong className="block mb-2">Créer votre compte en 1 clic ?</strong>
                    <p className="mb-4 text-blue-800">
                      Suivez votre commande, accédez à vos factures et bénéficiez d'avantages exclusifs.
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
                      Créer mon compte
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('home')}
                className="px-8 py-4 bg-[#6B1E3E] text-white rounded-full hover:bg-[#6B1E3E]/90 transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Retour à l'accueil
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('cart')}
            className="flex items-center gap-2 text-[#8B7E74] hover:text-[#6B1E3E] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au panier
          </button>
          <h1 className="mb-4 text-gray-900">Paiement sécurisé</h1>
          
          {/* Point 164 - Progress Bar Checkout améliorée */}
          <CheckoutProgressBar currentStep={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 'info' && (
                <div>
                  {/* Point 161 - Guest Checkout Choice */}
                  <GuestCheckoutSelector
                    mode={checkoutMode}
                    setMode={setCheckoutMode}
                  />

                  {/* Coordonnées */}
                  <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/50">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="w-6 h-6 text-[#6B1E3E]" />
                      <h2 className="text-2xl text-gray-900">Vos coordonnées</h2>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-[#8B7E74] mb-2">Prénom *</label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#8B7E74] mb-2">Nom *</label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-[#8B7E74] mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#8B7E74] mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="06 XX XX XX XX"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                        />
                      </div>

                      {/* Mot de passe si création de compte */}
                      {checkoutMode === 'create-account' && (
                        <div>
                          <label className="block text-sm text-[#8B7E74] mb-2 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Mot de passe *
                          </label>
                          <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="8 caractères minimum"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                          />
                        </div>
                      )}

                      {/* Point 161 - Option créer compte après */}
                      {checkoutMode === 'guest' && (
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={createAccountAfter}
                            onChange={(e) => setCreateAccountAfter(e.target.checked)}
                            className="mt-1 w-4 h-4 text-[#6B1E3E] rounded"
                          />
                          <span className="text-sm text-gray-700">
                            Me proposer de créer un compte après la commande pour suivre mes commandes et accéder à des avantages exclusifs
                          </span>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Point 162 - Address Autocomplete */}
                  <AddressAutocompleteSection
                    formData={formData}
                    setFormData={setFormData}
                    onAddressChange={handleAddressAutocomplete}
                    onSelectAddress={selectAddress}
                  />

                  {/* Installation */}
                  {formData.includeInstallation && (
                    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/50">
                      <h2 className="text-2xl mb-6 text-gray-900">Date d'installation souhaitée</h2>
                      <input
                        type="date"
                        required
                        value={formData.installationDate}
                        onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                        min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
                      />
                      <p className="text-sm text-[#8B7E74] mt-3">
                        Un installateur vous contactera sous 48h pour confirmer le rendez-vous.
                      </p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full px-8 sm:px-12 py-4 sm:py-5 min-h-[48px] bg-[#6B1E3E] text-white rounded-full text-base sm:text-lg hover:bg-[#6B1E3E]/90 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Continuer vers le paiement</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </motion.button>
                </div>
              )}

              {step === 'payment' && (
                <div>
                  {/* Point 163 - Payment Methods Logos */}
                  <PaymentMethodsSection formData={formData} setFormData={setFormData} />

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="flex-1 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] border border-[#6B1E3E]/30 text-[#6B1E3E] rounded-full hover:border-[#6B1E3E] hover:bg-[#6B1E3E]/5 transition-colors"
                    >
                      Retour
                    </button>
                    <motion.button
                      type="submit"
                      className="flex-1 px-8 sm:px-12 py-4 sm:py-5 min-h-[48px] bg-[#6B1E3E] text-white rounded-full text-base sm:text-lg hover:bg-[#6B1E3E]/90 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Lock className="w-5 h-5" />
                      <span>Valider le paiement</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Point 165 - Order Summary Sticky */}
          <div className="lg:col-span-1">
            <StickyCheckoutSummary
              onCheckout={() => step === 'info' ? setStep('payment') : handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
              showPromoCode
            />

            {/* Trust Badges */}
            <div className="mt-8">
              <TrustBadges variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Point 164 - Improved Progress Bar
function CheckoutProgressBar({ currentStep }: { currentStep: 'info' | 'payment' | 'confirmation' }) {
  const steps = [
    { id: 'cart', label: 'Panier', icon: '🛒' },
    { id: 'info', label: 'Livraison', icon: '📦' },
    { id: 'payment', label: 'Paiement', icon: '💳' },
    { id: 'confirmation', label: 'Confirmation', icon: '✅' }
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-200/50">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-xl mb-1 sm:mb-2 transition-all ${
                index <= currentIndex
                  ? 'bg-[#6B1E3E] text-white scale-110'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {index < currentIndex ? '✓' : step.icon}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${
                index <= currentIndex ? 'text-[#6B1E3E]' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                index < currentIndex ? 'bg-[#6B1E3E]' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Point 161 - Guest Checkout Selector
function GuestCheckoutSelector({ mode, setMode }: { mode: CheckoutMode; setMode: (mode: CheckoutMode) => void }) {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/50">
      <h2 className="text-2xl mb-6 text-gray-900">Comment souhaitez-vous commander ?</h2>
      <div className="space-y-4">
        <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
          mode === 'guest' ? 'border-[#6B1E3E] bg-[#6B1E3E]/5' : 'border-gray-200 hover:border-gray-300'
        }`}>
          <input
            type="radio"
            name="checkout-mode"
            checked={mode === 'guest'}
            onChange={() => setMode('guest')}
            className="mt-1 w-5 h-5 text-[#6B1E3E]"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">Commander en tant qu'invité</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Recommandé
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Finalisation rapide sans créer de compte. Vous pourrez en créer un après votre commande.
            </p>
          </div>
        </label>

        <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
          mode === 'create-account' ? 'border-[#6B1E3E] bg-[#6B1E3E]/5' : 'border-gray-200 hover:border-gray-300'
        }`}>
          <input
            type="radio"
            name="checkout-mode"
            checked={mode === 'create-account'}
            onChange={() => setMode('create-account')}
            className="mt-1 w-5 h-5 text-[#6B1E3E]"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">Créer un compte</div>
            <p className="text-sm text-gray-600">
              Suivez vos commandes, accédez à vos factures et bénéficiez d'avantages exclusifs.
            </p>
          </div>
        </label>

        <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
          mode === 'login' ? 'border-[#6B1E3E] bg-[#6B1E3E]/5' : 'border-gray-200 hover:border-gray-300'
        }`}>
          <input
            type="radio"
            name="checkout-mode"
            checked={mode === 'login'}
            onChange={() => setMode('login')}
            className="mt-1 w-5 h-5 text-[#6B1E3E]"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-1">J'ai déjà un compte</div>
            <p className="text-sm text-gray-600">
              Connectez-vous pour retrouver vos informations et commander plus rapidement.
            </p>
          </div>
        </label>
      </div>

      {mode === 'guest' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <strong>Astuce :</strong> Vous recevrez un email de confirmation avec un lien pour créer votre compte et suivre votre commande.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Point 162 - Address Autocomplete Section
function AddressAutocompleteSection({ 
  formData, 
  setFormData, 
  onAddressChange,
  onSelectAddress
}: { 
  formData: any; 
  setFormData: (data: any) => void;
  onAddressChange: (value: string) => void;
  onSelectAddress: (address: string, postalCode: string, city: string) => void;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Suggestions simulées (en production = Google Places API)
  const mockSuggestions = [
    { address: '123 Avenue des Champs-Élysées', postalCode: '75008', city: 'Paris' },
    { address: '45 Rue de la Paix', postalCode: '75002', city: 'Paris' },
    { address: '78 Boulevard Haussmann', postalCode: '75008', city: 'Paris' }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/50">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="w-6 h-6 text-[#6B1E3E]" />
        <h2 className="text-2xl text-gray-900">Adresse de livraison</h2>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm text-[#8B7E74] mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Adresse * (autocomplete)
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => {
              onAddressChange(e.target.value);
              setShowSuggestions(e.target.value.length >= 3);
            }}
            onFocus={() => formData.address.length >= 3 && setShowSuggestions(true)}
            placeholder="Commencez à taper votre adresse..."
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
          />
          
          {/* Autocomplete Dropdown (simulé) */}
          {showSuggestions && formData.address.length >= 3 && (
            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-[#6B1E3E] rounded-xl shadow-xl overflow-hidden">
              <div className="p-3 bg-[#6B1E3E]/5 border-b border-[#6B1E3E]/20">
                <div className="text-xs text-[#6B1E3E] font-semibold">
                  ⚡ Suggestions (Google Places)
                </div>
              </div>
              {mockSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onSelectAddress(suggestion.address, suggestion.postalCode, suggestion.city);
                    setShowSuggestions(false);
                  }}
                  className="w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-3 border-b border-gray-100 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{suggestion.address}</div>
                    <div className="text-sm text-gray-600">{suggestion.postalCode} {suggestion.city}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-[#8B7E74] mb-2">Code postal *</label>
            <input
              type="text"
              required
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#8B7E74] mb-2">Ville *</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
            />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-900">
              <strong>Livraison gratuite</strong> sur toute la France métropolitaine • Délai: 3-5 jours ouvrés
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Point 163 - Payment Methods with Logos
function PaymentMethodsSection({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/50">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-[#6B1E3E]" />
        <h2 className="text-2xl text-gray-900">Paiement sécurisé</h2>
      </div>

      {/* Payment Method Logos - Point 163 */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl">
        <div className="text-sm text-gray-600 mb-3 font-medium">Moyens de paiement acceptés :</div>
        <div className="flex flex-wrap items-center gap-4">
          {/* CB */}
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 font-semibold text-blue-600">
            CB
          </div>
          {/* Visa */}
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 font-semibold text-blue-800">
            VISA
          </div>
          {/* Mastercard */}
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 font-semibold text-orange-600">
            MASTERCARD
          </div>
          {/* PayPal */}
          <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 font-semibold text-blue-600">
            PayPal
          </div>
          {/* Apple Pay */}
          <div className="px-4 py-2 bg-black rounded-lg text-white font-semibold">
             Pay
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-[#8B7E74] mb-2">Numéro de carte</label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-[#8B7E74] mb-2">Date d'expiration</label>
            <input
              type="text"
              placeholder="MM/AA"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#8B7E74] mb-2">CVV</label>
            <input
              type="text"
              placeholder="XXX"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] transition-colors"
            />
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] rounded-2xl flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#8B7E74]">
            <p className="mb-1"><strong className="text-gray-900">Paiement 100% sécurisé</strong></p>
            <p>Vos données bancaires sont cryptées (SSL/TLS) et ne sont jamais stockées sur nos serveurs. Paiement géré par <strong>Stripe</strong>.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Lock className="w-4 h-4 text-green-600" />
          <span>Cryptage SSL 256-bit</span>
          <span>•</span>
          <span>Certifié PCI-DSS</span>
        </div>
      </div>
    </div>
  );
}