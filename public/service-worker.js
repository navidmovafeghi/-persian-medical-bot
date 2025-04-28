/**
 * Service Worker for the Persian Medical Bot application
 * Provides offline capabilities and caching for improved performance
 */

const CACHE_NAME = 'persian-medical-bot-cache-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/static/css/main.css',
  '/static/js/main.js',
  // Add other important assets here
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate caching strategy
const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  
  // Try to get the resource from the cache
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in the background and update cache
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      // Clone the response before consuming it
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.error('Fetch failed:', error);
      return null;
    });
  
  // Return the cached response immediately or wait for the network
  return cachedResponse || fetchPromise;
};

// Network-first caching strategy for API requests
const networkFirst = async (request) => {
  try {
    // Try getting from network first
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    
    // Cache the response for future use
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If network fetch fails, try the cache
    console.log('Network request failed, using cache for:', request.url);
    const cache = await caches.open(CACHE_NAME);
    return cache.match(request);
  }
};

// Fetch event - intercept network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different fetch strategies based on URL
  if (url.origin === self.location.origin) {
    // For same-origin assets, use stale-while-revalidate
    if (request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'image') {
      event.respondWith(staleWhileRevalidate(request));
      return;
    }
    
    // For HTML pages, use network-first
    if (request.destination === 'document') {
      event.respondWith(networkFirst(request));
      return;
    }
  }
  
  // For API calls, use network-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Default: fetch from network
  event.respondWith(fetch(request));
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'submit-form') {
    event.waitUntil(syncForms());
  }
});

// Process cached form submissions
async function syncForms() {
  try {
    // Get cached submissions
    const cache = await caches.open('form-submissions');
    const keys = await cache.keys();
    
    for (const key of keys) {
      const formData = await cache.match(key).then(res => res.json());
      
      // Try to submit the form
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // If successful, remove from cache
        await cache.delete(key);
      }
    }
  } catch (error) {
    console.error('Error syncing forms:', error);
  }
} 