importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉Service Worker is working!`);
} else {
  console.log(`Boo! Workbox didn't load 😬Service Worker won't work properly...`);
}

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute, matchPrecache } = workbox.precaching;

precacheAndRoute([{"revision":"51b1c635de81aaf49c1b674eb91971fa","url":"favicon.ico"},{"revision":"dc9988c1a41dfd1df195974f4e63a144","url":"images/devMode.gif"},{"revision":"51b1c635de81aaf49c1b674eb91971fa","url":"images/favicon.ico"},{"revision":"713f708b9b2662da54cd38bc98a6483f","url":"images/TiddlyWikiIconBlack.png"},{"revision":"f8172c5535c1564ba88be5d2e0c52788","url":"index.html"},{"revision":"df5773ae8914c7ccc92abc4e613c82dc","url":"offline.html"},{"revision":"7de86bd84f30fe35a5166630a7ae6f19","url":"tiddlywikicore-5.2.2.js"},{"revision":"713f708b9b2662da54cd38bc98a6483f","url":"TiddlyWikiIconBlack.png"}]);

registerRoute(
  /\.css$/,
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|woff2?|ttf)$/,
  // Use the cache if it's available.
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Cache only a few images.
        maxEntries: 100,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(/\.js$/, new StaleWhileRevalidate());
registerRoute(/(^\/$|index.html)/, new StaleWhileRevalidate());
