const cacheName = 'static-cache';

const version = 1;

const cachedAssets = [
  '/',
  '/index.html',
  '/css/fireworks.css',
  '/js/fireworks.js',
  '/js/requestanimframe.js',
  '/images/big-glow.png',
  '/images/nightsky.png',
  '/images/small-glow.png'
];

// install
self.addEventListener('install', (evt) => {
  console.log(`Service Worker Installed Version: ${version}`);
  evt.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      console.log('caching assts...')
      cache.addAll(cachedAssets)
    })
  );
  
});

// activate
self.addEventListener('activate', (evt) => {
  console.log(`Service Worker Activated Version: ${version}`);
});

// fetch event 
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then((cacheRes) => {
        return cacheRes || fetch(evt.request);
      })
  )
  console.log('Service Worker Fetching', evt);
});