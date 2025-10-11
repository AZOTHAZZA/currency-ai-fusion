// currency-ai-fusion/sw.js

const CACHE_NAME = 'currency-ai-cache-v1';
const urlsToCache = [
  '/currency-ai-fusion/',
  '/currency-ai-fusion/index.html',
  '/currency-ai-fusion/manifest.json',
  '/currency-ai-fusion/icons/icon-192.png',
  '/currency-ai-fusion/icons/icon-512.png',
  '/currency-ai-fusion/app/offline.js',
  '/currency-ai-fusion/ai/generator.js',
  '/currency-ai-fusion/core/module.js',
  '/currency-ai-fusion/core/foundation.js',
  '/currency-ai-fusion/core/silence_theory.js',
  '/currency-ai-fusion/core/mathematical_silence.js',
  '/currency-ai-fusion/economy/token.js',
  '/currency-ai-fusion/fusion/fusionUI.js'
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
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // オフライン時のフォールバック
        if (event.request.destination === 'document') {
          return caches.match('/currency-ai-fusion/index.html');
        }
      });
    })
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