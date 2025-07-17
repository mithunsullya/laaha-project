const CACHE_NAME = "laaha-cache-v" + getWeekNumber(new Date());

// Helper function to get week number
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key.startsWith("laaha-cache-")) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - COMPLETELY BYPASS SERVICE WORKER FOR HTML DOCUMENTS
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Bypass Service Worker entirely for document requests
  if (request.mode === 'navigate' || 
      request.headers.get('accept').includes('text/html')) {
    return; // Let browser handle normally without Service Worker interception
  }

  // Skip non-GET requests and API requests
  if (request.method !== 'GET' || 
      request.url.includes('/api/') || 
      request.url.includes('/jsonapi/')) {
    event.respondWith(fetch(request));
    return;
  }

  // For all other requests (static assets): cache-first strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((response) => {
        if (response.ok) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
