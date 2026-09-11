/* One Thing — service worker.
   Strategy: stale-while-revalidate. The app opens instantly from cache
   and offline, and any edit you push shows up the next time it's opened.
   Bump CACHE if you ever need to force everyone onto a clean copy. */

var CACHE = 'one-thing-v2';
var SHELL = [
  './',
  './index.html',
  './app.js',
  './tasks.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () {}); // one bad path shouldn't fail install
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(req).then(function (cached) {
        var network = fetch(req).then(function (res) {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(function () {
          // offline: fall back to the cached shell for page loads
          return cached || (req.mode === 'navigate' ? cache.match('./index.html') : undefined);
        });
        return cached || network;
      });
    })
  );
});
