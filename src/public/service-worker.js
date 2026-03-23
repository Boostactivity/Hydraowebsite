// Service Worker pour cache et offline support
const CACHE_NAME = 'hydral-v1';
const RUNTIME_CACHE = 'hydral-runtime';

// Assets à mettre en cache au premier chargement
const PRECACHE_URLS = [
  '/',
  '/styles/globals.css',
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-SemiBold.woff2',
  '/fonts/Inter-Bold.woff2'
];

// Installation du Service Worker
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching app shell');
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Force le nouveau SW à devenir actif immédiatement
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Supprimer les anciens caches
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Prendre le contrôle immédiatement
  return self.clients.claim();
});

// Stratégies de cache
self.addEventListener('fetch', (event: any) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin && !url.href.includes('unsplash.com')) {
    return;
  }

  // Images: Cache First (tombe en cache d'abord, puis réseau si absent)
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // API/Dynamic content: Network First (réseau d'abord, cache si offline)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets: Cache First
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML pages: Network First
  event.respondWith(networkFirst(request));
});

// Stratégie Cache First
async function cacheFirst(request: Request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    // Ne cache que les réponses réussies
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Offline fallback
    return new Response('Offline - Resource not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stratégie Network First
async function networkFirst(request: Request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    // Cache la réponse pour usage futur
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Si offline, utilise le cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // Fallback page si rien en cache
    return new Response('Offline - Please check your connection', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Background sync pour formulaires offline
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'sync-form-data') {
    event.waitUntil(syncFormData());
  }
});

async function syncFormData() {
  // Récupérer les données du formulaire en attente
  const pendingData = await getPendingFormData();
  
  for (const data of pendingData) {
    try {
      await fetch(data.url, {
        method: data.method,
        body: JSON.stringify(data.body),
        headers: data.headers
      });
      // Supprimer après envoi réussi
      await deletePendingFormData(data.id);
    } catch (error) {
      console.error('[SW] Failed to sync:', error);
    }
  }
}

async function getPendingFormData() {
  // Implémenter avec IndexedDB dans une vraie app
  return [];
}

async function deletePendingFormData(id: string) {
  // Implémenter avec IndexedDB dans une vraie app
}

// Push notifications (future feature)
self.addEventListener('push', (event: any) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'HYDRAL';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Click sur notification
self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data)
  );
});

export {};