import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ShoppingCart, Eye, TrendingUp, MapPin } from 'lucide-react';

interface Activity {
  id: string;
  type: 'viewing' | 'purchased' | 'configured';
  user: string;
  location: string;
  product?: string;
  time: number;
}

interface LiveActivityCounterProps {
  className?: string;
  variant?: 'minimal' | 'full';
}

export function LiveActivityCounter({ className = '', variant = 'full' }: LiveActivityCounterProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [stats, setStats] = useState({
    viewing: 247,
    purchased24h: 38,
    configured: 156
  });

  // Données de démo
  const demoActivities: Omit<Activity, 'id' | 'time'>[] = [
    { type: 'purchased', user: 'Sophie L.', location: 'Paris (75)', product: 'HYDRAO Chrome' },
    { type: 'viewing', user: 'Marc D.', location: 'Lyon (69)' },
    { type: 'configured', user: 'Julie M.', location: 'Bordeaux (33)', product: 'HYDRAO Noir Mat' },
    { type: 'purchased', user: 'Thomas R.', location: 'Marseille (13)', product: 'HYDRAO Or Rose' },
    { type: 'viewing', user: 'Claire B.', location: 'Toulouse (31)' },
    { type: 'configured', user: 'Antoine P.', location: 'Nantes (44)', product: 'HYDRAO Champagne' },
    { type: 'purchased', user: 'Laura S.', location: 'Nice (06)', product: 'HYDRAO Chrome' },
    { type: 'viewing', user: 'David K.', location: 'Strasbourg (67)' },
    { type: 'configured', user: 'Emma W.', location: 'Lille (59)', product: 'HYDRAO Noir Mat' },
    { type: 'purchased', user: 'Nicolas F.', location: 'Rennes (35)', product: 'HYDRAO Laiton' }
  ];

  // Simuler l'activité en temps réel
  useEffect(() => {
    const showActivity = () => {
      const randomActivity = demoActivities[Math.floor(Math.random() * demoActivities.length)];
      const newActivity: Activity = {
        ...randomActivity,
        id: Math.random().toString(36).substr(2, 9),
        time: Date.now()
      };

      setCurrentActivity(newActivity);

      // Mettre à jour les stats
      setStats(prev => ({
        viewing: prev.viewing + (randomActivity.type === 'viewing' ? 1 : 0),
        purchased24h: prev.purchased24h + (randomActivity.type === 'purchased' ? 1 : 0),
        configured: prev.configured + (randomActivity.type === 'configured' ? 1 : 0)
      }));

      // Ajouter à l'historique
      setActivities(prev => [newActivity, ...prev].slice(0, 5));

      // Cacher après 5 secondes
      setTimeout(() => {
        setCurrentActivity(null);
      }, 5000);
    };

    // Première activité immédiate
    showActivity();

    // Puis toutes les 8-15 secondes
    const interval = setInterval(() => {
      showActivity();
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  const getActivityConfig = (type: Activity['type']) => {
    switch (type) {
      case 'purchased':
        return {
          icon: ShoppingCart,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'vient d\'acheter'
        };
      case 'configured':
        return {
          icon: TrendingUp,
          color: 'text-[#6B1E3E]',
          bg: 'bg-[#6B1E3E]/5',
          border: 'border-[#6B1E3E]/20',
          text: 'a configuré'
        };
      case 'viewing':
        return {
          icon: Eye,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'regarde actuellement'
        };
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`fixed bottom-24 left-4 z-40 ${className}`}>
        <AnimatePresence>
          {currentActivity && (
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className={`max-w-sm ${getActivityConfig(currentActivity.type).bg} border-2 ${getActivityConfig(currentActivity.type).border} rounded-2xl p-4 shadow-xl backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3">
                {React.createElement(getActivityConfig(currentActivity.type).icon, {
                  className: `w-5 h-5 ${getActivityConfig(currentActivity.type).color} flex-shrink-0`
                })}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    <span className="font-medium">{currentActivity.user}</span>
                    {' '}{getActivityConfig(currentActivity.type).text}
                  </p>
                  {currentActivity.product && (
                    <p className="text-xs text-gray-600 truncate">{currentActivity.product}</p>
                  )}
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {currentActivity.location}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section className={`section-padding bg-gradient-to-br from-white to-[#FAF8F5] ${className}`}>
      <div className="section-container max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 text-green-700 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Activité en Direct</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Vous n'êtes pas seul
            <span className="block text-[#6B1E3E]">à découvrir HYDRAO</span>
          </h2>
          <p className="text-lg text-gray-600">
            Des centaines de personnes consultent et achètent HYDRAO en ce moment même
          </p>
        </motion.div>

        {/* Stats en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 border-blue-200 p-6 text-center"
          >
            <Eye className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <motion.div
              key={stats.viewing}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-light text-blue-600 mb-2"
            >
              {stats.viewing}
            </motion.div>
            <div className="text-sm text-gray-600">personnes regardent maintenant</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-green-200 p-6 text-center"
          >
            <ShoppingCart className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <motion.div
              key={stats.purchased24h}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-light text-green-600 mb-2"
            >
              {stats.purchased24h}
            </motion.div>
            <div className="text-sm text-gray-600">achats ces 24 dernières heures</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border-2 border-[#6B1E3E]/20 p-6 text-center"
          >
            <TrendingUp className="w-10 h-10 text-[#6B1E3E] mx-auto mb-3" />
            <motion.div
              key={stats.configured}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-light text-[#6B1E3E] mb-2"
            >
              {stats.configured}
            </motion.div>
            <div className="text-sm text-gray-600">configurations aujourd'hui</div>
          </motion.div>
        </div>

        {/* Flux d'activité */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8">
          <h3 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Activité récente
          </h3>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {activities.slice(0, 5).map((activity) => {
                const config = getActivityConfig(activity.type);
                const Icon = config.icon;

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, x: -100 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className={`flex items-center gap-4 p-4 ${config.bg} border ${config.border} rounded-xl`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}<span className="text-gray-600">{config.text}</span>
                      </p>
                      {activity.product && (
                        <p className="text-xs text-gray-600 mt-0.5">{activity.product}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                    </div>

                    <div className="text-xs text-gray-400 flex-shrink-0">
                      À l'instant
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {activities.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              Chargement de l'activité en temps réel...
            </div>
          )}
        </div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            ✅ <strong>+2 347 foyers</strong> ont déjà fait confiance à HYDRAO
          </p>
        </motion.div>
      </div>
    </section>
  );
}
