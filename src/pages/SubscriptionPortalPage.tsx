import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Package, 
  CreditCard, 
  Settings, 
  Download,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Droplet,
  Zap,
  Gift,
  ArrowRight,
  Clock,
  Pause,
  Play
} from 'lucide-react';
import { Page } from '../App';

interface Subscription {
  id: string;
  plan: 'essential' | 'premium' | 'ultimate';
  status: 'active' | 'paused' | 'cancelled';
  startDate: Date;
  nextBillingDate: Date;
  price: number;
  annualSavings: number;
  autoRenewal: boolean;
}

interface SubscriptionPortalPageProps {
  navigate: (page: Page) => void;
}

export function SubscriptionPortalPage({ navigate }: SubscriptionPortalPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deliveries' | 'billing' | 'settings'>('overview');

  // Mock subscription data
  const subscription: Subscription = {
    id: 'SUB-2024-001',
    plan: 'premium',
    status: 'active',
    startDate: new Date('2024-01-15'),
    nextBillingDate: new Date('2025-01-15'),
    price: 99,
    annualSavings: 2340,
    autoRenewal: true
  };

  const planDetails = {
    essential: { name: 'Essential', color: 'blue', icon: '💧' },
    premium: { name: 'Premium', color: 'purple', icon: '⭐' },
    ultimate: { name: 'Ultimate', color: 'pink', icon: '👑' }
  };

  const currentPlan = planDetails[subscription.plan];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Mon Abonnement HYDRAO
          </motion.h1>
          <p className="text-gray-600">
            Gérez votre abonnement, vos livraisons et vos préférences en toute simplicité
          </p>
        </div>

        {/* Subscription Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                {subscription.status === 'active' && (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Actif</span>
                  </>
                )}
                {subscription.status === 'paused' && (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>En pause</span>
                  </>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {currentPlan.icon} Plan {currentPlan.name}
              </h2>
              <p className="text-white/90 text-lg">
                Membre depuis le {subscription.startDate.toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div className="text-right">
              <div className="text-5xl font-bold mb-1">{subscription.price}€</div>
              <div className="text-white/90">par an</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm opacity-90">Économies</span>
              </div>
              <div className="text-2xl font-bold">{subscription.annualSavings}€/an</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm opacity-90">Prochain paiement</span>
              </div>
              <div className="text-2xl font-bold">
                {new Date(subscription.nextBillingDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5" />
                <span className="text-sm opacity-90">Livraisons</span>
              </div>
              <div className="text-2xl font-bold">4/an</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: <Zap className="w-4 h-4" /> },
            { id: 'deliveries', label: 'Livraisons', icon: <Package className="w-4 h-4" /> },
            { id: 'billing', label: 'Facturation', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#6B1E3E] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab subscription={subscription} navigate={navigate} />}
        {activeTab === 'deliveries' && <DeliveriesTab />}
        {activeTab === 'billing' && <BillingTab subscription={subscription} />}
        {activeTab === 'settings' && <SettingsTab subscription={subscription} />}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ subscription, navigate }: { subscription: Subscription; navigate: (page: Page) => void }) {
  return (
    <div className="space-y-6">
      {/* Plan Benefits */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Votre plan Premium inclut
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '✅', text: 'Filtres charbon actif (livrés tous les 3 mois)' },
            { icon: '💧', text: 'Cartouches CO₂ (4 par an)' },
            { icon: '🔧', text: 'Maintenance annuelle gratuite' },
            { icon: '📞', text: 'Support prioritaire < 2h' },
            { icon: '🎁', text: '10% de réduction sur accessoires' },
            { icon: '🛡️', text: 'Garantie 3 ans incluse' }
          ].map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-2xl">{benefit.icon}</span>
              <span className="text-gray-700">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              👑 Passez au plan Ultimate
            </h3>
            <p className="text-white/90 mb-4">
              Garantie 5 ans + Livraison express + Kit entretien premium
            </p>
            <div className="text-sm text-white/80">
              Seulement +40€/an (139€ au lieu de 99€)
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span>Upgrader</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Activité récente
        </h3>
        <div className="space-y-3">
          {[
            { date: '15 déc 2024', text: 'Livraison de filtres effectuée', icon: Package, color: 'green' },
            { date: '01 déc 2024', text: 'Paiement mensuel traité (99€)', icon: CreditCard, color: 'blue' },
            { date: '20 nov 2024', text: 'Cartouches CO₂ expédiées', icon: Droplet, color: 'cyan' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.text}</div>
                <div className="text-sm text-gray-500">{activity.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Deliveries Tab
function DeliveriesTab() {
  const deliveries = [
    { id: 1, date: new Date('2025-01-15'), status: 'scheduled', items: ['Filtres x2', 'CO₂ x1'] },
    { id: 2, date: new Date('2024-12-15'), status: 'delivered', items: ['Filtres x2'] },
    { id: 3, date: new Date('2024-09-15'), status: 'delivered', items: ['Filtres x2', 'CO₂ x1'] }
  ];

  return (
    <div className="space-y-6">
      {/* Next Delivery */}
      <div className="bg-white rounded-2xl p-6 border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Prochaine livraison programmée
          </h3>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              15 janvier 2025
            </div>
            <div className="text-gray-600">Dans 26 jours</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Contenu</div>
            <div className="font-semibold text-gray-900">2 Filtres + 1 CO₂</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors">
            Modifier la date
          </button>
          <button className="flex-1 px-4 py-2 bg-[#6B1E3E] text-white rounded-xl font-semibold hover:bg-[#8B2E4E] transition-colors">
            Ajouter des items
          </button>
        </div>
      </div>

      {/* Delivery History */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Historique des livraisons
        </h3>
        <div className="space-y-3">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  delivery.status === 'delivered' 
                    ? 'bg-green-100' 
                    : 'bg-blue-100'
                }`}>
                  {delivery.status === 'delivered' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {delivery.date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {delivery.items.join(' • ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  delivery.status === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {delivery.status === 'delivered' ? 'Livré' : 'Programmé'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Billing Tab
function BillingTab({ subscription }: { subscription: Subscription }) {
  const invoices = [
    { id: 'INV-2024-12', date: new Date('2024-12-01'), amount: 99, status: 'paid' },
    { id: 'INV-2024-11', date: new Date('2024-11-01'), amount: 99, status: 'paid' },
    { id: 'INV-2024-10', date: new Date('2024-10-01'), amount: 99, status: 'paid' }
  ];

  return (
    <div className="space-y-6">
      {/* Payment Method */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Moyen de paiement
          </h3>
          <button className="text-[#6B1E3E] font-semibold hover:underline flex items-center gap-1">
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Visa •••• 4242</div>
            <div className="text-sm text-gray-600">Expire 12/2026</div>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            Par défaut
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Factures
        </h3>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-600">
                    {invoice.date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-gray-900">{invoice.amount}€</div>
                  <div className="text-sm text-green-600">Payé</div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ subscription }: { subscription: Subscription }) {
  return (
    <div className="space-y-6">
      {/* Auto-renewal */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Renouvellement automatique
        </h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              Renouvellement annuel automatique
            </div>
            <div className="text-sm text-gray-600">
              Votre abonnement sera automatiquement renouvelé le {subscription.nextBillingDate.toLocaleDateString('fr-FR')}
            </div>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold">
            Activé
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Notifications
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Rappels de livraison', enabled: true },
            { label: 'Confirmations de paiement', enabled: true },
            { label: 'Offres exclusives membres', enabled: true },
            { label: 'Conseils d\'utilisation', enabled: false }
          ].map((notif, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-900">{notif.label}</span>
              <button className={`px-4 py-2 rounded-lg font-semibold ${
                notif.enabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {notif.enabled ? 'Activé' : 'Désactivé'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
        <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Zone dangereuse
        </h3>
        <div className="space-y-3">
          <button className="w-full px-6 py-3 border-2 border-orange-300 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
            <Pause className="w-5 h-5" />
            <span>Mettre en pause mon abonnement</span>
          </button>
          <button className="w-full px-6 py-3 border-2 border-red-300 text-red-700 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <Trash2 className="w-5 h-5" />
            <span>Annuler mon abonnement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
