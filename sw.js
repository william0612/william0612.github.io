self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app')
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          './about.html',
          './blog.html',
          './contact.html',
          './portfolio-example01.html',
          './style.css',
          './images/about-header.jpg',
          './images/contact-image.jpg',
          './images/example-blog01.jpg',
          './images/example-blog02.jpg',
          './images/example-blog03.jpg',
          './images/example-blog04.jpg',
          './images/example-blog05.jpg',
          './images/example-blog06.jpg',
          './images/example-blog07.jpg',
          './images/example-work01.jpg'
        ])
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        return res;
      })
  );
});
  