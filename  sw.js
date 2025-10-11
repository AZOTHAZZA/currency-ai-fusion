const CACHE_NAME = 'currency-ai-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './app/offline.js',
  './ai/generator.js',
  './core/module.js',
  './core/foundation.js',
  './core/silence_theory.js',
  './core/mathematical_silence.js',
  './economy/token.js',
  './fusion/fusionUI.js'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('キャッシュ中:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// フェッチイベント：キャッシュ優先
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('古いキャッシュ削除:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});