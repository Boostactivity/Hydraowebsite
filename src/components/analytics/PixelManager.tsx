import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, TrendingUp, Users, DollarSign, Eye, MousePointer, ShoppingCart, CreditCard, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface PixelEvent {
  id: string;
  type: 'pageview' | 'viewcontent' | 'addtocart' | 'checkout' | 'purchase' | 'lead' | 'custom';
  name: string;
  timestamp: Date;
  data?: Record<string, any>;
  platform: 'facebook' | 'google' | 'both';
}

export function PixelManager() {
  const { language } = useLanguage();
  const [events, setEvents] = useState<PixelEvent[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    pageViews: 0,
    addToCarts: 0,
    purchases: 0,
    leads: 0,
  });

  // Mock events for demonstration
  useEffect(() => {
    const mockEvents: PixelEvent[] = [
      {
        id: '1',
        type: 'pageview',
        name: 'Page View',
        timestamp: new Date(Date.now() - 300000),
        platform: 'both',
      },
      {
        id: '2',
        type: 'viewcontent',
        name: 'View Content - HYDRAO 5-in-1',
        timestamp: new Date(Date.now() - 240000),
        data: { product_id: 'hydrao-001', value: 490 },
        platform: 'both',
      },
      {
        id: '3',
        type: 'custom',
        name: 'Calculator Used',
        timestamp: new Date(Date.now() - 180000),
        data: { savings: 2340 },
        platform: 'facebook',
      },
      {
        id: '4',
        type: 'addtocart',
        name: 'Add to Cart - HYDRAO 5-in-1',
        timestamp: new Date(Date.now() - 120000),
        data: { product_id: 'hydrao-001', value: 490 },
        platform: 'both',
      },
      {
        id: '5',
        type: 'checkout',
        name: 'Initiate Checkout',
        timestamp: new Date(Date.now() - 60000),
        data: { value: 490, num_items: 1 },
        platform: 'both',
      },
    ];

    setEvents(mockEvents);
    setStats({
      totalEvents: mockEvents.length,
      pageViews: mockEvents.filter(e => e.type === 'pageview').length,
      addToCarts: mockEvents.filter(e => e.type === 'addtocart').length,
      purchases: mockEvents.filter(e => e.type === 'purchase').length,
      leads: mockEvents.filter(e => e.type === 'lead').length,
    });
  }, []);

  const eventIcons: Record<PixelEvent['type'], React.ReactNode> = {
    pageview: <Eye className="w-4 h-4" />,
    viewcontent: <MousePointer className="w-4 h-4" />,
    addtocart: <ShoppingCart className="w-4 h-4" />,
    checkout: <CreditCard className="w-4 h-4" />,
    purchase: <CheckCircle className="w-4 h-4" />,
    lead: <Users className="w-4 h-4" />,
    custom: <Activity className="w-4 h-4" />,
  };

  const eventColors: Record<PixelEvent['type'], string> = {
    pageview: 'bg-blue-100 text-blue-600',
    viewcontent: 'bg-purple-100 text-purple-600',
    addtocart: 'bg-orange-100 text-orange-600',
    checkout: 'bg-yellow-100 text-yellow-600',
    purchase: 'bg-green-100 text-green-600',
    lead: 'bg-pink-100 text-pink-600',
    custom: 'bg-gray-100 text-gray-600',
  };

  const platformBadges: Record<PixelEvent['platform'], { color: string; text: string }> = {
    facebook: { color: 'bg-blue-500', text: 'FB' },
    google: { color: 'bg-red-500', text: 'G' },
    both: { color: 'bg-purple-500', text: 'FB+G' },
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <h3 className="font-bold">
              {language === 'fr' && 'Pixel Tracking'}
              {language === 'en' && 'Pixel Tracking'}
              {language === 'es' && 'Pixel Tracking'}
              {language === 'it' && 'Pixel Tracking'}
            </h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="w-6 h-6 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-xl font-bold">{stats.totalEvents}</div>
            <div className="text-xs opacity-90">Events</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-xl font-bold">{stats.pageViews}</div>
            <div className="text-xs opacity-90">Views</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-xl font-bold">{stats.addToCarts}</div>
            <div className="text-xs opacity-90">Carts</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
            <div className="text-xl font-bold">{stats.purchases}</div>
            <div className="text-xs opacity-90">Sales</div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
        <AnimatePresence>
          {events.slice().reverse().map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 ${eventColors[event.type]} rounded-full flex items-center justify-center flex-shrink-0`}>
                  {eventIcons[event.type]}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {event.name}
                    </div>
                    <div className={`${platformBadges[event.platform].color} text-white text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0`}>
                      {platformBadges[event.platform].text}
                    </div>
                  </div>
                  
                  {event.data && (
                    <div className="text-xs text-gray-600 mb-1">
                      {Object.entries(event.data).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: <span className="font-semibold">{value}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    {formatTimestamp(event.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>
              {language === 'fr' && 'Tracking actif'}
              {language === 'en' && 'Tracking active'}
              {language === 'es' && 'Tracking activo'}
              {language === 'it' && 'Tracking attivo'}
            </span>
          </div>
          <button
            onClick={() => setEvents([])}
            className="text-[#6B1E3E] font-semibold hover:underline"
          >
            {language === 'fr' && 'Effacer'}
            {language === 'en' && 'Clear'}
            {language === 'es' && 'Borrar'}
            {language === 'it' && 'Cancella'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Development-only component to visualize pixel events
export function PixelDebugger() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment) return null;
  
  return <PixelManager />;
}
