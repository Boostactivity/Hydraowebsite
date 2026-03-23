import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Zap, Smartphone, Wifi, Speaker, Lightbulb, Thermometer, Shield, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface SmartPlatform {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: 'integrated' | 'coming-soon';
  logo: string;
  users: string;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  platform: string;
  emoji: string;
}

export function SmartHomeIntegration() {
  const { language } = useLanguage();

  const platforms: SmartPlatform[] = [
    {
      id: 'alexa',
      name: 'Amazon Alexa',
      description: language === 'fr'
        ? 'Contrôlez HYDRAO par la voix avec Alexa. "Alexa, active l\'eau filtrée" ou "Alexa, quelle est ma consommation d\'eau ?"'
        : 'Control HYDRAO by voice with Alexa. "Alexa, activate filtered water" or "Alexa, what\'s my water consumption?"',
      features: [
        language === 'fr' ? 'Commandes vocales' : 'Voice commands',
        language === 'fr' ? 'Routines automatiques' : 'Automatic routines',
        language === 'fr' ? 'Status reports' : 'Status reports',
        language === 'fr' ? 'Skills personnalisées' : 'Custom skills',
      ],
      status: 'integrated',
      logo: '🗣️',
      users: '234K',
    },
    {
      id: 'google',
      name: 'Google Home',
      description: language === 'fr'
        ? 'Intégration complète Google Assistant. "Hey Google, prépare mon café" déclenche eau chaude automatiquement.'
        : 'Full Google Assistant integration. "Hey Google, prepare my coffee" triggers hot water automatically.',
      features: [
        language === 'fr' ? 'Assistant vocal' : 'Voice assistant',
        language === 'fr' ? 'Scénarios intelligents' : 'Smart scenarios',
        language === 'fr' ? 'Dashboard Google' : 'Google Dashboard',
        language === 'fr' ? 'Chromecast' : 'Chromecast',
      ],
      status: 'integrated',
      logo: '🎙️',
      users: '189K',
    },
    {
      id: 'homekit',
      name: 'Apple HomeKit',
      description: language === 'fr'
        ? 'Contrôle via Siri et app Maison. Intégration native iOS avec sécurité Apple et automations avancées.'
        : 'Control via Siri and Home app. Native iOS integration with Apple security and advanced automations.',
      features: [
        language === 'fr' ? 'Siri commands' : 'Siri commands',
        language === 'fr' ? 'App Maison' : 'Home app',
        language === 'fr' ? 'Sécurité Apple' : 'Apple security',
        language === 'fr' ? 'Automations' : 'Automations',
      ],
      status: 'integrated',
      logo: '🍎',
      users: '156K',
    },
    {
      id: 'ifttt',
      name: 'IFTTT',
      description: language === 'fr'
        ? 'Créez des automations personnalisées connectant HYDRAO à 700+ services (Météo, Calendrier, Smart devices...).'
        : 'Create custom automations connecting HYDRAO to 700+ services (Weather, Calendar, Smart devices...).',
      features: [
        language === 'fr' ? '700+ intégrations' : '700+ integrations',
        language === 'fr' ? 'Applets custom' : 'Custom applets',
        language === 'fr' ? 'Multi-trigger' : 'Multi-trigger',
        language === 'fr' ? 'Workflows' : 'Workflows',
      ],
      status: 'integrated',
      logo: '🔗',
      users: '89K',
    },
    {
      id: 'samsung',
      name: 'Samsung SmartThings',
      description: language === 'fr'
        ? 'Intégration SmartThings pour contrôle centralisé de votre écosystème Samsung et devices compatibles.'
        : 'SmartThings integration for centralized control of your Samsung ecosystem and compatible devices.',
      features: [
        language === 'fr' ? 'Hub centralisé' : 'Centralized hub',
        language === 'fr' ? 'Scènes Samsung' : 'Samsung scenes',
        language === 'fr' ? 'Multi-device' : 'Multi-device',
        language === 'fr' ? 'Geofencing' : 'Geofencing',
      ],
      status: 'coming-soon',
      logo: '📱',
      users: 'Soon',
    },
  ];

  const automations: Automation[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Routine matinale' : 'Morning routine',
      description: language === 'fr'
        ? 'À 7h00, active eau chaude café + allume lumières cuisine + lance playlist matinale.'
        : 'At 7am, activate hot coffee water + turn on kitchen lights + start morning playlist.',
      trigger: language === 'fr' ? '7h00 en semaine' : '7am weekdays',
      action: language === 'fr' ? 'Multi-actions' : 'Multi-actions',
      platform: 'Alexa',
      emoji: '☀️',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Mode économie' : 'Economy mode',
      description: language === 'fr'
        ? 'Si absence détectée >2h, HYDRAO passe en mode veille et diminue thermostat automatiquement.'
        : 'If absence detected >2h, HYDRAO enters standby and automatically lowers thermostat.',
      trigger: language === 'fr' ? 'Absence >2h' : 'Absence >2h',
      action: language === 'fr' ? 'Mode veille' : 'Standby mode',
      platform: 'Google Home',
      emoji: '💚',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Alerte filtre' : 'Filter alert',
      description: language === 'fr'
        ? 'Quand filtre <15%, ajoute automatiquement "Filtre HYDRAO" à liste courses Alexa + notification mobile.'
        : 'When filter <15%, automatically add "HYDRAO filter" to Alexa shopping list + mobile notification.',
      trigger: language === 'fr' ? 'Filtre <15%' : 'Filter <15%',
      action: language === 'fr' ? 'Liste + Notif' : 'List + Notif',
      platform: 'Alexa',
      emoji: '🛒',
    },
    {
      id: '4',
      name: language === 'fr' ? 'Mode invités' : 'Guest mode',
      description: language === 'fr'
        ? '"Dis Siri, mode invités" → Active eau gazeuse, règle température 22°C, affiche instructions écran.'
        : '"Hey Siri, guest mode" → Activate sparkling water, set temperature 22°C, display screen instructions.',
      trigger: language === 'fr' ? 'Commande vocale' : 'Voice command',
      action: language === 'fr' ? 'Config invités' : 'Guest config',
      platform: 'HomeKit',
      emoji: '👥',
    },
    {
      id: '5',
      name: language === 'fr' ? 'Smart recipe' : 'Smart recipe',
      description: language === 'fr'
        ? 'Quand tu dis "Alexa, prépare thé vert", HYDRAO chauffe eau à 75°C (température optimale thé vert).'
        : 'When you say "Alexa, prepare green tea", HYDRAO heats water to 75°C (optimal green tea temperature).',
      trigger: language === 'fr' ? 'Commande recette' : 'Recipe command',
      action: language === 'fr' ? 'Temp optimale' : 'Optimal temp',
      platform: 'Alexa',
      emoji: '🍵',
    },
    {
      id: '6',
      name: language === 'fr' ? 'Sync météo' : 'Weather sync',
      description: language === 'fr'
        ? 'Si température extérieure >30°C détectée, HYDRAO propose automatiquement eau froide gazeuse.'
        : 'If outdoor temperature >30°C detected, HYDRAO automatically suggests cold sparkling water.',
      trigger: language === 'fr' ? 'Météo >30°C' : 'Weather >30°C',
      action: language === 'fr' ? 'Suggestion eau' : 'Water suggestion',
      platform: 'IFTTT',
      emoji: '🌡️',
    },
  ];

  const stats = [
    {
      value: '4',
      label: language === 'fr' ? 'Plateformes' : 'Platforms',
      icon: <Home className="w-5 h-5" />,
    },
    {
      value: '668K',
      label: language === 'fr' ? 'Utilisateurs' : 'Users',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '2.3M',
      label: language === 'fr' ? 'Commandes/mois' : 'Commands/month',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      value: '99.8%',
      label: language === 'fr' ? 'Réactivité' : 'Responsiveness',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Home className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Intégration Smart Home'}
            {language === 'en' && 'Smart Home Integration'}
            {language === 'es' && 'Integración Smart Home'}
            {language === 'it' && 'Integrazione Smart Home'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Connectez HYDRAO à votre maison intelligente'}
            {language === 'en' && 'Connect HYDRAO to your smart home'}
            {language === 'es' && 'Conecta HYDRAO a tu hogar inteligente'}
            {language === 'it' && 'Connetti HYDRAO alla tua casa intelligente'}
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
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Platforms */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Plateformes supportées'}
          {language === 'en' && 'Supported platforms'}
          {language === 'es' && 'Plataformas compatibles'}
          {language === 'it' && 'Piattaforme supportate'}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="text-6xl flex-shrink-0">{platform.logo}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{platform.name}</h4>
                    <div className={`${
                      platform.status === 'integrated'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    } text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1`}>
                      {platform.status === 'integrated' && <CheckCircle className="w-3 h-3" />}
                      {platform.status === 'integrated'
                        ? (language === 'fr' ? 'Intégré' : 'Integrated')
                        : (language === 'fr' ? 'Bientôt' : 'Coming')}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {platform.features.map((feature, i) => (
                      <div key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                        ✓ {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-gray-900">{platform.users}</span> {language === 'fr' ? 'utilisateurs' : 'users'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Automations */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Automations populaires'}
          {language === 'en' && 'Popular automations'}
          {language === 'es' && 'Automatizaciones populares'}
          {language === 'it' && 'Automazioni popolari'}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-6"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-4xl">{automation.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{automation.name}</h4>
                  <div className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded inline-block mb-2">
                    {automation.platform}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{automation.description}</p>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 border border-purple-200">
                  <div className="text-xs text-gray-600 mb-1">
                    {language === 'fr' ? 'Déclencheur' : 'Trigger'}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{automation.trigger}</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-purple-200">
                  <div className="text-xs text-gray-600 mb-1">
                    {language === 'fr' ? 'Action' : 'Action'}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{automation.action}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Voice Commands Examples */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Exemples de commandes vocales'}
          {language === 'en' && 'Voice command examples'}
          {language === 'es' && 'Ejemplos comandos voz'}
          {language === 'it' && 'Esempi comandi vocali'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🗣️</div>
            <div className="font-bold text-gray-900 mb-2">"Alexa, eau filtrée"</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Active mode filtration' : 'Activate filtration mode'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🎙️</div>
            <div className="font-bold text-gray-900 mb-2">"Hey Google, consommation"</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Rapport vocal détaillé' : 'Detailed voice report'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🍎</div>
            <div className="font-bold text-gray-900 mb-2">"Dis Siri, température café"</div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Chauffe à 96°C optimal' : 'Heat to optimal 96°C'}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white text-center">
        <Home className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Votre maison, plus intelligente'}
          {language === 'en' && 'Your home, smarter'}
          {language === 'es' && 'Tu hogar, más inteligente'}
          {language === 'it' && 'La tua casa, più intelligente'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '4 plateformes • 668K utilisateurs • 2.3M commandes/mois • 99.8% réactivité • Contrôle vocal total'}
          {language === 'en' && '4 platforms • 668K users • 2.3M commands/month • 99.8% responsiveness • Total voice control'}
          {language === 'es' && '4 plataformas • 668K usuarios • 2.3M comandos/mes • 99.8% respuesta • Control vocal total'}
          {language === 'it' && '4 piattaforme • 668K utenti • 2.3M comandi/mese • 99.8% reattività • Controllo vocale totale'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            Alexa
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            Google Home
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            Apple HomeKit
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            IFTTT
          </div>
        </div>

        <button className="px-8 py-4 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors">
          {language === 'fr' && 'Configurer maintenant'}
          {language === 'en' && 'Configure now'}
          {language === 'es' && 'Configurar ahora'}
          {language === 'it' && 'Configura ora'}
        </button>
      </div>
    </div>
  );
}
