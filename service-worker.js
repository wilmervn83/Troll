const CACHE_NAME = 'troll-adventure-v1';
// Lista de todos los archivos que tu juego necesita para funcionar offline.
const urlsToCache = [
  '/',
  'index1.html',
  // --- IMÁGENES ---
  'images/troll.png',
  'images/troll1.png',
  'images/$Troll.png',
  'images/troll_sunglasses.png',
  'images/Coin.png',
  'images/icon-192x192.png',
  'images/icon-512x512.png',
  // --- SONIDOS ---
  'images/troll-laugh-sound-effect.mp3',
  'images/evil.mp3',
  'images/oh-no.mp3',
  'images/intro_Troll.mp3',
  'images/trololo.mp3',
  'https://www.myinstants.com/media/sounds/coin.mp3',
  // --- LIBRERÍAS EXTERNAS ---
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// Evento de Instalación: Se dispara cuando el Service Worker se instala.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Se dispara cada vez que la página solicita un recurso (imagen, script, etc.).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devuelve desde ahí.
        if (response) {
          return response;
        }
        // Si no, lo busca en la red.
        return fetch(event.request);
      }
    )
  );
});

// Evento de Activación: Limpia cachés antiguas si es necesario.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
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