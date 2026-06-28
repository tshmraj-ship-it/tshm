/* sw.js — Service Worker
   Ta'limus Sunnah Hafizia Madrasa
   Cache-first strategy with network fallback
   Version bump CACHE_NAME to force update on deploy
*/

const CACHE_NAME    = 'madrasa-v1.0.0';
const OFFLINE_URL   = '/404.html';

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/about.html',
  '/teachers.html',
  '/admission.html',
  '/notice.html',
  '/results.html',
  '/gallery.html',
  '/donate.html',
  '/contact.html',
  '/404.html',
  '/assets/css/style.css',
  '/assets/js/translations.js',
  '/assets/js/app.js',
  '/assets/js/prayer-times.js',
  '/assets/js/gallery.js',
  '/manifest.json',
];

// ===== INSTALL =====
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets');
      // Use individual requests to avoid failing if one asset is missing
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE =====
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH =====
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (except Google Fonts & APIs)
  const isGoogleFonts = url.hostname.includes('fonts.googleapis.com') ||
                        url.hostname.includes('fonts.gstatic.com');
  const isAladhan     = url.hostname.includes('api.aladhan.com');
  const isSameOrigin  = url.origin === self.location.origin;

  if (!isSameOrigin && !isGoogleFonts && !isAladhan) return;

  // Strategy: Cache-first for static assets, Network-first for HTML & APIs
  if (request.destination === 'document') {
    // HTML pages: network-first, fallback to cache, then 404.html
    event.respondWith(networkFirst(request));
  } else if (isAladhan) {
    // Prayer API: network-first, no fallback (handled by JS)
    event.respondWith(networkFirst(request));
  } else {
    // CSS, JS, fonts, images: cache-first
    event.respondWith(cacheFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match(OFFLINE_URL) || new Response('<h1>Offline</h1>', {
        headers: { 'Content-Type': 'text/html' },
      });
    }
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

// ===== BACKGROUND SYNC (future use) =====
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    // Handle queued form submissions when back online
    console.log('[SW] Background sync: contact-form-sync');
  }
});

// ===== PUSH NOTIFICATIONS (future use) =====
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'তা\'লিমুস সুন্নাহ্ মাদ্রাসা', {
      body:    data.body  || '',
      icon:    '/assets/images/icon-192.png',
      badge:   '/assets/images/icon-96.png',
      data:    { url: data.url || '/' },
      dir:     'auto',
      lang:    'bn',
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
