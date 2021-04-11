importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
);

// workbox.skipWaiting();
// workbox.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
  prefix: "My-awesome-cache",
  precache: "precache",
  runtime: "runtime",
});

// runtime cache
// 1. stylesheet
workbox.routing.registerRoute(
  new RegExp(".css$"),
  new workbox.strategies.CacheFirst({
    cacheName: "My-awesome-cache-Stylesheets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true,
      }),
    ],
  })
);
// 2. images
workbox.routing.registerRoute(
  new RegExp(".(png|svg|jpg|jpeg|json)$"),
  new workbox.strategies.CacheFirst({
    cacheName: "My-awesome-cache-Images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// 3. cache news articles result
workbox.routing.registerRoute(
  new RegExp(".(js)$"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "My-awesome-cache-js",
    cacheExpiration: {
      maxAgeSeconds: 60 * 30, //cache the news content for 30mn
    },
  })
);

workbox.routing.registerRoute(
  new RegExp(
    "https://react.microfrontends.app/navbar/c1a777c770ee187cebedd0724653c771495f2af9/react-mf-navbar.js"
  ),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "My-awesome-cache-navbar",
    cacheExpiration: {
      maxAgeSeconds: 60 * 30, //cache the news content for 30mn
    },
  })
);

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
