const CACHE_NAME = 'calculador-de-comidas-v3.0';  // Cambia este nombre con cada actualización
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './favicon.ico',
    './manifest.webmanifest'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log(`Eliminando caché antigua: ${cacheName}`);
                        return caches.delete(cacheName);  // Elimina cachés antiguas
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();  // Toma control inmediato de los clientes
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
