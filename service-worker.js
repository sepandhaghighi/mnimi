const version = "0.0.1";
const cacheName = 'mnimi-${version}';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/css/awsome/scss/font-awesome.scss',
        '/css/awsome/css/font-awesome.min.css',
        '/css/style.css',
        '/css/themes/google/google.css',
        '/css/sweetalert.css',
        '/images/favicon/6.png',
        '/images/favicon/5.png',
        '/images/favicon/4.png',
        '/images/favicon/3.png',
        '/images/favicon/2.png',
        '/images/favicon/1.png',
        '/images/donate.jpg',
        '/images/star.png',
        '/images/sun.png',
        '/images/gameover.png',
        '/images/og-icon.png',
        '/manifest.json',
        '/fonts/JuliusSansOne-Regular.ttf',
        '/fonts/Sacramento-Regular.ttf',
        '/fonts/Inconsolata.otf',
        '/css/awsome/fonts/FontAwesome.otf',
        '/css/awsome/fonts/fontawesome-webfont.eot',
        '/css/awsome/fonts/fontawesome-webfont.svg',
        '/css/awsome/fonts/fontawesome-webfont.ttf',
        '/css/awsome/fonts/fontawesome-webfont.woff',
        '/css/awsome/fonts/fontawesome-webfont.woff2',
        '/js/sweetalert.min.js',
        '/js/shortcut.js',
        '/js/script.js',
        '/js/particles.min.js',
        '/js/app.js',
        '/favicon.ico'
          
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});