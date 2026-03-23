import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Gift, TrendingDown, AlertCircle, Sparkles, Clock, Tag } from 'lucide-react';
import { Page } from '../App';

interface Notification {
  id: number;
  type: 'promo' | 'stock' | 'update' | 'info';
  title: string;
  message: string;
  action?: string;
  actionPage?: Page;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface SmartNotificationCenterProps {
  navigate: (page: Page) => void;
}

export function SmartNotificationCenter({ navigate }: SmartNotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Notifications initiales
    const initialNotifications: Notification[] = [
      {
        id: 1,
        type: 'promo',
        title: 'Offre flash -50€',
        message: '50€ de réduction avec le code HYDRAL50. Valable 24h.',
        action: 'Profiter de l\'offre',
        actionPage: 'configurator',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'stock',
        title: 'Stock limité',
        message: 'Plus que 8 robinets disponibles ce mois-ci. Commandez maintenant.',
        action: 'Voir disponibilités',
        actionPage: 'configurator',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
        read: false,
        priority: 'high'
      },
      {
        id: 3,
        type: 'update',
        title: 'Nouveaux témoignages',
        message: '23 nouveaux avis clients ajoutés. Note moyenne : 4.9/5.',
        action: 'Lire les avis',
        actionPage: 'home',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
        read: true,
        priority: 'medium'
      },
      {
        id: 4,
        type: 'info',
        title: 'Guide d\'installation',
        message: 'Nouveau guide PDF avec toutes les étapes détaillées disponible.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        priority: 'low'
      }
    ];

    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter(n => !n.read).length);

    // Simuler l'arrivée de nouvelles notifications
    const interval = setInterval(() => {
      const randomNotif: Notification = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'promo' : 'stock',
        title: Math.random() > 0.5 ? '🎁 Nouvelle offre disponible' : '⚡ Alerte stock',
        message: Math.random() > 0.5 
          ? 'Profitez de 10% supplémentaires sur les abonnements.'
          : 'Un robinet vient d\'être réservé. Ne manquez pas le vôtre !',
        action: 'Découvrir',
        actionPage: 'configurator',
        timestamp: new Date(),
        read: false,
        priority: 'high'
      };

      setNotifications(prev => [randomNotif, ...prev].slice(0, 10));
      setUnreadCount(prev => prev + 1);
    }, 60000); // Toutes les minutes

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id: number) => {
    const notif = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notif && !notif.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleAction = (notification: Notification) => {
    if (notification.actionPage) {
      navigate(notification.actionPage);
      markAsRead(notification.id);
      setIsOpen(false);
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'promo': return Gift;
      case 'stock': return TrendingDown;
      case 'update': return Sparkles;
      case 'info': return AlertCircle;
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'promo': return 'from-[#6B1E3E] to-[#8B2E4E]';
      case 'stock': return 'from-orange-500 to-red-500';
      case 'update': return 'from-blue-500 to-indigo-500';
      case 'info': return 'from-gray-500 to-gray-600';
    }
  };

  const formatTimestamp = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  return (
    <>
      {/* Bouton notification flottant */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-6 z-40 w-14 h-14 gradient-bordeaux rounded-full shadow-2xl flex items-center justify-center text-white"
      >
        <Bell className="w-6 h-6" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
            >
              {unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel notifications */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium">Notifications</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">
                    {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-white/90 hover:text-white underline"
                    >
                      Tout marquer comme lu
                    </button>
                  )}
                </div>
              </div>

              {/* Liste notifications */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Bell className="w-16 h-16 mb-4 text-gray-300" />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notification) => {
                      const Icon = getIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className={`p-4 hover:bg-gray-50 transition-colors ${
                            !notification.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getColor(notification.type)} flex items-center justify-center flex-shrink-0 text-white`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            {/* Contenu */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h4>
                                <button
                                  onClick={() => removeNotification(notification.id)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  {formatTimestamp(notification.timestamp)}
                                </div>

                                {notification.action && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAction(notification)}
                                    className="text-sm text-[#6B1E3E] hover:text-[#8B2E4E] font-medium"
                                  >
                                    {notification.action} →
                                  </motion.button>
                                )}
                              </div>

                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="mt-2 text-xs text-blue-600 hover:text-blue-700"
                                >
                                  Marquer comme lu
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span>Recevez des alertes personnalisées selon vos préférences</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}