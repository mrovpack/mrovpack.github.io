self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('site').then(function(cache) {
     return cache.addAll([
      './',
      './index.html',
      './index.js',
      './stats/index.html',
      './stats/index.js',
      './stats/player/index.html',
      './stats/player/index.js',
      './wiki/index.html',
      './wiki/index.js',
      './wiki/index.json',
      'https://mrov.dev/mrovpack-scoreboardData/scoreboard.json',
      'https://mrovtest.github.io/sd/statbuttons.json',
      'https://andreymrovol.github.io/resources/style.css',
      'https://mrovpack.github.io/assets/icon.png'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
