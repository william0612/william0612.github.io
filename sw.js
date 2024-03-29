var CACHE_NAME = 'portfolio-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/blog.html',
  '/contact.html',
  '/portfolio-example01.html',
  '/styles.css',
  '/images/about-header.jpg',
  '/images/contact-image.jpg',
  '/images/example-blog01.jpg',
  '/images/example-blog02.jpg',
  '/images/example-blog03.jpg',
  '/images/example-blog04.jpg',
  '/images/example-blog05.jpg',
  '/images/example-blog06.jpg',
  '/images/example-blog07.jpg',
  '/images/example-work01.jpg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://code.getmdl.io/1.3.0/material.grey-pink.min.css',
  'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en',
  'https://code.getmdl.io/1.3.0/material.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
   
            var responseToCache = response.clone();
   
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
   
            return response;
          })
          .catch(function(error) {
            console.error('Error fetching from network:', error);
          });
        })
    );
  });   