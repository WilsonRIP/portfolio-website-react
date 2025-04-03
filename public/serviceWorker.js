// Service worker for offline support and caching
const CACHE_NAME = 'portfolio-cache-v1';
const HOMEPAGE_CACHE = 'homepage-cache-v1';
const ASSETS_CACHE = 'assets-cache-v1';

// Critical resources that should be cached immediately
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/animations.css'
];

// Home page specific resources
const HOMEPAGE_ASSETS = [
  '/src/components/Hero.tsx',
  '/src/components/Skills.tsx',
  '/src/pages/HomePage.tsx',
  '/src/assets/background-tiny.png'
];

// Assets that can be cached as they are used
const ASSET_URLS = [
  '/src/assets/react.svg',
  '/src/assets/github.png',
  '/src/assets/twitch.png',
  '/src/assets/background.png'
];

// Install service worker and cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache critical assets
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Caching critical assets');
          return cache.addAll(CRITICAL_ASSETS);
        }),
      
      // Cache home page assets
      caches.open(HOMEPAGE_CACHE)
        .then(cache => {
          console.log('Caching homepage assets');
          return cache.addAll(HOMEPAGE_ASSETS);
        })
    ])
  );
});

// Optimized fetch strategy with network-first for API and cache-first for assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle API requests (network-first)
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Handle asset requests (cache-first)
  if (ASSET_URLS.some(asset => url.pathname.includes(asset)) || 
      url.pathname.endsWith('.svg') || 
      url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.webp')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached response if found
          if (response) {
            return response;
          }
          
          // Otherwise fetch from network
          return fetch(event.request)
            .then(response => {
              // Clone the response to store in cache
              const responseToCache = response.clone();
              
              caches.open(ASSETS_CACHE)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
    );
    return;
  }
  
  // Default strategy (cache-first with network fallback)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        // Fetch from network
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// Clean up old caches when a new service worker is activated
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, HOMEPAGE_CACHE, ASSETS_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 