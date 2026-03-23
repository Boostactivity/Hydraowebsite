import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, X } from 'lucide-react';

export function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Service Worker désactivé - pas de fichier service-worker.js dans ce projet
    // Si nécessaire plus tard, créer /public/service-worker.js
    // if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    //   registerServiceWorker();
    // }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      setRegistration(reg);
      console.log('[SW] Service Worker registered:', reg.scope);

      // Vérifier les mises à jour toutes les heures
      setInterval(() => {
        reg.update();
      }, 60 * 60 * 1000);

      // Détecter les mises à jour
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nouvelle version disponible
              setShowUpdatePrompt(true);
            }
          });
        }
      });

    } catch (error) {
      console.error('[SW] Registration failed:', error);
    }
  };

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Dire au SW d'activer immédiatement
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Recharger la page quand le nouveau SW prend le contrôle
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  };

  return (
    <>
      {children}
      
      {/* Prompt de mise à jour */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-[100] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#6B1E3E] p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6B1E3E] flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Nouvelle version disponible
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Une mise à jour de l'application est prête. Rechargez pour profiter des dernières améliorations.
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 px-4 py-2 bg-[#6B1E3E] text-white rounded-xl hover:bg-[#8B2E4E] transition-colors font-medium text-sm"
                    >
                      Mettre à jour
                    </button>
                    <button
                      onClick={() => setShowUpdatePrompt(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                    >
                      Plus tard
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowUpdatePrompt(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook pour vérifier le statut offline/online
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Composant pour afficher le statut offline
export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="font-medium text-sm">
          Mode hors ligne - Certaines fonctionnalités peuvent être limitées
        </span>
      </div>
    </motion.div>
  );
}

// Hook pour mettre en cache des données pour usage offline
export function useCacheData(key: string, data: any) {
  useEffect(() => {
    if ('caches' in window && data) {
      caches.open('hydrao-data').then(cache => {
        const response = new Response(JSON.stringify(data));
        cache.put(key, response);
      });
    }
  }, [key, data]);
}

// Hook pour récupérer des données du cache
export async function getCachedData(key: string) {
  if (!('caches' in window)) return null;

  try {
    const cache = await caches.open('hydrao-data');
    const response = await cache.match(key);
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  
  return null;
}