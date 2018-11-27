let staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./js/sw_register.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function (response) { // check cache for requested file
      return response || fetch(event.request).then(function (responseToFetch) { // if in cache return, else if possible fetch from network
        return caches.open(cacheName).then(function (cache) { // if network is available put file in cache and return request
          cache.put(event.request, responseToFetch.clone());
          return responseToFetch;
        });
      });
    }).catch(function (error) {
      console.log('files not cached & no network connection', error); // if file is not in cache and network is'nt available 
    })
  );
});

self.addEventListener('activate', function(event){
    event.waitUntil(
    caches.keys().then(function(allCaches) {
      return Promise.all(allCaches.map(function (thisCache){
        if(thisCache !== cacheName) {
          return caches.delete(thisCache);
        }
      }));
    })
  );
});

 
