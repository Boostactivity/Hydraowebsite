import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Wifi, Zap, TrendingUp, Droplet, Thermometer, Settings, Bell, BarChart3, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface AppFeature {
  id: string;
  name: string;
  description: string;
  category: 'control' | 'monitoring' | 'insights' | 'automation';
  icon: React.ReactNode;
  status: 'available' | 'coming-soon';
  emoji: string;
}

interface DeviceStatus {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  temperature: number;
  waterQuality: number;
  filterLife: number;
  lastUsed: string;
}

export function IoTIntegration() {
  const { language } = useLanguage();
  const [selectedDevice, setSelectedDevice] = useState<string>('kitchen');

  const features: AppFeature[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Contrôle à distance' : 'Remote control',
      description: language === 'fr'
        ? 'Contrôlez température, débit et type d\'eau depuis votre smartphone où que vous soyez.'
        : 'Control temperature, flow and water type from your smartphone anywhere.',
      category: 'control',
      icon: <Smartphone className="w-5 h-5" />,
      status: 'available',
      emoji: '📱',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Monitoring temps réel' : 'Real-time monitoring',
      description: language === 'fr'
        ? 'Suivez en direct votre consommation d\'eau, énergie et qualité de filtration.'
        : 'Track in real-time your water, energy consumption and filtration quality.',
      category: 'monitoring',
      icon: <BarChart3 className="w-5 h-5" />,
      status: 'available',
      emoji: '📊',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Notifications intelligentes' : 'Smart notifications',
      description: language === 'fr'
        ? 'Recevez des alertes pour changement filtre, maintenance ou anomalies détectées.'
        : 'Receive alerts for filter change, maintenance or detected anomalies.',
      category: 'automation',
      icon: <Bell className="w-5 h-5" />,
      status: 'available',
      emoji: '🔔',
    },
    {
      id: '4',
      name: language === 'fr' ? 'Analyse consommation' : 'Consumption analysis',
      description: language === 'fr'
        ? 'Graphiques détaillés et insights IA pour optimiser votre utilisation et économies.'
        : 'Detailed graphs and AI insights to optimize your usage and savings.',
      category: 'insights',
      icon: <TrendingUp className="w-5 h-5" />,
      status: 'available',
      emoji: '📈',
    },
    {
      id: '5',
      name: language === 'fr' ? 'Programmation horaires' : 'Schedule programming',
      description: language === 'fr'
        ? 'Définissez des programmes automatiques selon vos habitudes et préférences.'
        : 'Set automatic programs based on your habits and preferences.',
      category: 'automation',
      icon: <Settings className="w-5 h-5" />,
      status: 'available',
      emoji: '⏰',
    },
    {
      id: '6',
      name: language === 'fr' ? 'Qualité eau tracking' : 'Water quality tracking',
      description: language === 'fr'
        ? 'Suivi continu des paramètres de qualité avec historique et tendances.'
        : 'Continuous quality parameters tracking with history and trends.',
      category: 'monitoring',
      icon: <Droplet className="w-5 h-5" />,
      status: 'available',
      emoji: '💧',
    },
    {
      id: '7',
      name: language === 'fr' ? 'Contrôle vocal' : 'Voice control',
      description: language === 'fr'
        ? 'Commandez HYDRAO par la voix via l\'app (Siri, Google Assistant intégré).'
        : 'Control HYDRAO by voice via app (Siri, Google Assistant integrated).',
      category: 'control',
      icon: <Zap className="w-5 h-5" />,
      status: 'coming-soon',
      emoji: '🎤',
    },
    {
      id: '8',
      name: language === 'fr' ? 'Recettes intelligentes' : 'Smart recipes',
      description: language === 'fr'
        ? 'Suggestions recettes basées sur type d\'eau et température optimale (2025).'
        : 'Recipe suggestions based on water type and optimal temperature (2025).',
      category: 'insights',
      icon: <Award className="w-5 h-5" />,
      status: 'coming-soon',
      emoji: '🍳',
    },
  ];

  const devices: DeviceStatus[] = [
    {
      id: 'kitchen',
      name: 'HYDRAO Kitchen',
      location: language === 'fr' ? 'Cuisine' : 'Kitchen',
      status: 'online',
      temperature: 22,
      waterQuality: 98,
      filterLife: 67,
      lastUsed: language === 'fr' ? '2 min' : '2 min ago',
    },
    {
      id: 'bathroom',
      name: 'HYDRAO Bathroom',
      location: language === 'fr' ? 'Salle de bain' : 'Bathroom',
      status: 'online',
      temperature: 18,
      waterQuality: 95,
      filterLife: 45,
      lastUsed: language === 'fr' ? '15 min' : '15 min ago',
    },
  ];

  const stats = [
    {
      value: '89K',
      label: language === 'fr' ? 'Utilisateurs app' : 'App users',
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      value: '4.8/5',
      label: language === 'fr' ? 'Note moyenne' : 'Average rating',
      icon: <Award className="w-5 h-5" />,
    },
    {
      value: '99.7%',
      label: language === 'fr' ? 'Uptime IoT' : 'IoT uptime',
      icon: <Wifi className="w-5 h-5" />,
    },
    {
      value: '234K',
      label: language === 'fr' ? 'Devices connectés' : 'Connected devices',
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const selectedDeviceData = devices.find(d => d.id === selectedDevice) || devices[0];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Application Mobile IoT'}
            {language === 'en' && 'IoT Mobile App'}
            {language === 'es' && 'Aplicación Móvil IoT'}
            {language === 'it' && 'App Mobile IoT'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Contrôlez HYDRAO depuis votre smartphone'}
            {language === 'en' && 'Control HYDRAO from your smartphone'}
            {language === 'es' && 'Controla HYDRAO desde tu smartphone'}
            {language === 'it' && 'Controlla HYDRAO dal tuo smartphone'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Device Selector */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Vos appareils'}
          {language === 'en' && 'Your devices'}
          {language === 'es' && 'Tus dispositivos'}
          {language === 'it' && 'I tuoi dispositivi'}
        </h3>

        <div className="flex gap-4 mb-4">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setSelectedDevice(device.id)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                selectedDevice === device.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-gray-900">{device.name}</div>
                <div className={`w-3 h-3 rounded-full ${
                  device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              <div className="text-sm text-gray-600">{device.location}</div>
            </button>
          ))}
        </div>

        {/* Device Dashboard */}
        <motion.div
          key={selectedDevice}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-2xl mb-1">{selectedDeviceData.name}</h4>
              <div className="text-sm opacity-90">{selectedDeviceData.location}</div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold">Online</span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5" />
                <div className="text-sm opacity-75">
                  {language === 'fr' ? 'Température' : 'Temperature'}
                </div>
              </div>
              <div className="text-3xl font-bold">{selectedDeviceData.temperature}°C</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-5 h-5" />
                <div className="text-sm opacity-75">
                  {language === 'fr' ? 'Qualité eau' : 'Water quality'}
                </div>
              </div>
              <div className="text-3xl font-bold">{selectedDeviceData.waterQuality}%</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5" />
                <div className="text-sm opacity-75">
                  {language === 'fr' ? 'Vie filtre' : 'Filter life'}
                </div>
              </div>
              <div className="text-3xl font-bold">{selectedDeviceData.filterLife}%</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <div className="text-sm opacity-75">
                  {language === 'fr' ? 'Dernière util.' : 'Last used'}
                </div>
              </div>
              <div className="text-xl font-bold">{selectedDeviceData.lastUsed}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Fonctionnalités de l\'app'}
          {language === 'en' && 'App features'}
          {language === 'es' && 'Funcionalidades de la app'}
          {language === 'it' && 'Funzionalità dell\'app'}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Emoji */}
                <div className="text-5xl flex-shrink-0">{feature.emoji}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{feature.name}</h4>
                    <div className={`${
                      feature.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    } text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap`}>
                      {feature.status === 'available'
                        ? (language === 'fr' ? 'Disponible' : 'Available')
                        : (language === 'fr' ? 'Bientôt' : 'Coming')}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* App Screenshots Preview */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Interface app mobile'}
          {language === 'en' && 'Mobile app interface'}
          {language === 'es' && 'Interfaz app móvil'}
          {language === 'it' && 'Interfaccia app mobile'}
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">📱</div>
            <div className="font-bold text-gray-900 mb-1">Dashboard</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Vue d\'ensemble' : 'Overview'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="font-bold text-gray-900 mb-1">Analytics</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Graphiques détaillés' : 'Detailed graphs'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">⚙️</div>
            <div className="font-bold text-gray-900 mb-1">Settings</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Contrôles' : 'Controls'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">🔔</div>
            <div className="font-bold text-gray-900 mb-1">Alerts</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Notifications' : 'Notifications'}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white text-center">
        <Smartphone className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Téléchargez l\'app HYDRAO'}
          {language === 'en' && 'Download the HYDRAO app'}
          {language === 'es' && 'Descarga la app HYDRAO'}
          {language === 'it' && 'Scarica l\'app HYDRAO'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '89K utilisateurs • 4.8/5 étoiles • 99.7% uptime • 234K devices connectés • Contrôle total 24/7'}
          {language === 'en' && '89K users • 4.8/5 stars • 99.7% uptime • 234K connected devices • Total 24/7 control'}
          {language === 'es' && '89K usuarios • 4.8/5 estrellas • 99.7% uptime • 234K dispositivos conectados • Control total 24/7'}
          {language === 'it' && '89K utenti • 4.8/5 stelle • 99.7% uptime • 234K dispositivi connessi • Controllo totale 24/7'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            {language === 'fr' && 'App Store'}
            {language === 'en' && 'App Store'}
            {language === 'es' && 'App Store'}
            {language === 'it' && 'App Store'}
          </button>
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            {language === 'fr' && 'Google Play'}
            {language === 'en' && 'Google Play'}
            {language === 'es' && 'Google Play'}
            {language === 'it' && 'Google Play'}
          </button>
        </div>
      </div>
    </div>
  );
}
