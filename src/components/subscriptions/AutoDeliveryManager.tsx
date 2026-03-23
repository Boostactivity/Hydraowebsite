import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Calendar, 
  TrendingUp, 
  Zap,
  CheckCircle,
  Settings,
  Truck,
  Bell,
  Plus,
  Minus,
  Edit,
  Save
} from 'lucide-react';

interface AutoDeliverySettings {
  frequency: 30 | 60 | 90; // days
  quantity: number;
  nextDelivery: Date;
  autoAdjust: boolean;
  reminderDays: number;
}

export function AutoDeliveryManager() {
  const [settings, setSettings] = useState<AutoDeliverySettings>({
    frequency: 90,
    quantity: 2,
    nextDelivery: new Date('2025-01-15'),
    autoAdjust: true,
    reminderDays: 7
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In production: save to backend
    console.log('Saving auto-delivery settings:', settings);
  };

  const usageData = [
    { month: 'Sept', usage: 85 },
    { month: 'Oct', usage: 92 },
    { month: 'Nov', usage: 88 },
    { month: 'Déc', usage: 95 }
  ];

  const predictedNextChange = new Date(settings.nextDelivery);
  predictedNextChange.setDate(predictedNextChange.getDate() + settings.frequency);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6" />
              <h2 className="text-3xl font-bold">Livraison Automatique Intelligente</h2>
            </div>
            <p className="text-white/90 text-lg">
              Vos filtres arrivent automatiquement au bon moment, jamais en rupture
            </p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-sm text-white/80 mb-1">Prochaine livraison</div>
            <div className="text-2xl font-bold">
              {settings.nextDelivery.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-sm text-white/80 mb-1">Fréquence</div>
            <div className="text-2xl font-bold">Tous les {settings.frequency}j</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-sm text-white/80 mb-1">Quantité</div>
            <div className="text-2xl font-bold">{settings.quantity} filtres</div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#6B1E3E]" />
            Paramètres de livraison
          </h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-[#6B1E3E] font-semibold hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              <span>Modifier</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#6B1E3E] text-white font-semibold hover:bg-[#8B2E4E] rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer</span>
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Fréquence de livraison
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 30, label: '30 jours', desc: 'Utilisation intensive' },
                { value: 60, label: '60 jours', desc: 'Utilisation normale' },
                { value: 90, label: '90 jours', desc: 'Utilisation modérée' }
              ].map((option) => (
                <button
                  key={option.value}
                  disabled={!isEditing}
                  onClick={() => setSettings({ ...settings, frequency: option.value as any })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.frequency === option.value
                      ? 'border-[#6B1E3E] bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                >
                  <div className="font-bold text-gray-900 mb-1">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Quantité par livraison
            </label>
            <div className="flex items-center gap-4">
              <button
                disabled={!isEditing || settings.quantity <= 1}
                onClick={() => setSettings({ ...settings, quantity: settings.quantity - 1 })}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#6B1E3E] hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-gray-900">{settings.quantity}</div>
                <div className="text-sm text-gray-600">filtres</div>
              </div>
              <button
                disabled={!isEditing || settings.quantity >= 6}
                onClick={() => setSettings({ ...settings, quantity: settings.quantity + 1 })}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#6B1E3E] hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Auto-adjust */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Ajustement automatique intelligent
                </div>
                <div className="text-sm text-gray-600">
                  Notre IA analyse votre consommation et ajuste automatiquement la fréquence pour éviter les ruptures
                </div>
              </div>
            </div>
            <button
              disabled={!isEditing}
              onClick={() => setSettings({ ...settings, autoAdjust: !settings.autoAdjust })}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                settings.autoAdjust
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
            >
              {settings.autoAdjust ? 'Activé' : 'Désactivé'}
            </button>
          </div>

          {/* Reminder */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Rappel avant livraison
            </label>
            <select
              disabled={!isEditing}
              value={settings.reminderDays}
              onChange={(e) => setSettings({ ...settings, reminderDays: Number(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#6B1E3E] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value={3}>3 jours avant</option>
              <option value={7}>7 jours avant</option>
              <option value={14}>14 jours avant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#6B1E3E]" />
          Analyse de consommation
        </h3>

        <div className="mb-6">
          <div className="flex items-end gap-4 h-40">
            {usageData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.usage}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                />
                <div className="text-sm font-semibold text-gray-700">{data.month}</div>
                <div className="text-xs text-gray-500">{data.usage}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">Consommation stable</span>
            </div>
            <div className="text-sm text-green-800">
              Votre fréquence actuelle (90j) est optimale
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Prochaine suggestion</span>
            </div>
            <div className="text-sm text-blue-800">
              Le {predictedNextChange.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deliveries */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#6B1E3E]" />
          Prochaines livraisons programmées
        </h3>

        <div className="space-y-3">
          {[0, 1, 2].map((index) => {
            const deliveryDate = new Date(settings.nextDelivery);
            deliveryDate.setDate(deliveryDate.getDate() + (settings.frequency * index));
            
            return (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${
                index === 0 ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-purple-500' : 'bg-gray-400'
                  }`}>
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {deliveryDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {settings.quantity} filtres charbon actif
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    <Bell className="w-4 h-4" />
                    <span>Prochaine</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
