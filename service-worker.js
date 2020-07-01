importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
}
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/favicon.ico', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/index.js', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/team.html', revision: '1' },
  { url: '/team.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/assets/icons/android-icon-192x192.png', revision: '1' },
  { url: '/assets/icons/apple-icon-180x180.png', revision: '1' },
  { url: '/assets/icons/apple-icon-152x152.png', revision: '1' },
  { url: '/assets/icons/apple-icon-144x144.png', revision: '1' },
  { url: '/assets/icons/apple-icon-120x120.png', revision: '1' },
  { url: '/assets/icons/apple-icon-114x114.png', revision: '1' },
  { url: '/assets/icons/apple-icon-76x76.png', revision: '1' },
  { url: '/assets/icons/apple-icon-72x72.png', revision: '1' },
  { url: '/assets/icons/apple-icon-60x60.png', revision: '1' },
  { url: '/assets/icons/apple-icon-57x57.png', revision: '1' },
  { url: '/assets/icons/favicon-96x96.png', revision: '1' },
  { url: '/assets/icons/favicon-32x32.png', revision: '1' },
  { url: '/assets/icons/favicon-16x16.png', revision: '1' },
  { url: '/assets/icons/icon.png', revision: '1' },
  { url: '/assets/css/materialize.min.css', revision: '1' },
  { url: '/assets/js/materialize.min.js', revision: '1' },
  { url: '/assets/js/indexedDB.js', revision: '1' },
  { url: '/assets/js/nav.js', revision: '1' },
  { url: '/assets/js/dom.js', revision: '1' },
  { url: '/assets/js/api.js', revision: '1' },
  { url: '/assets/js/idb.js', revision: '1' },
  { url: '/assets/js/db.js', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/favorite.html', revision: '1' },
  { url: '/pages/matches.html', revision: '1' },
  { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 30,
      }),
    ]
  })
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('/assets/css/materialize.min.css'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.png'),
  workbox.strategies.cacheFirst()
);

self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push Message no payload";
  }

  let option = {
    body: body,
    icon: "./assets/icon/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", option)
  );
});