     var CACHE_VERSION = 6;
          var CURRENT_CACHES1 = {
           prefetch: 'prefetch-cache-v' + CACHE_VERSION
                                };
                                var cacheName=CURRENT_CACHES1;

var urlstocache1=[
    
    'index.html',
   '1459441392_Hamburger.png',
    '1459441524_Hamburger.png',
    'chrome-touch-icon-192x192',
    'icon-128x128',
    'apple-touch-icon',
    'ms-touch-icon-144x144-precomposed',
        '1457957246_shopping-cart.png',
        '1458040129_iPad.png'];

self.addEventListener('install', function(event) {
    console.log('Installing:');
  event.waitUntil(
    caches.open('CURRENT_CACHES1').then(function(cache) {
         console.log('Added to cache:');
      return cache.addAll(urlstocache1);
       
    })
    
    );
});


self.addEventListener('activate', function(event) {
     var expectedCacheNames1 = Object.keys(CURRENT_CACHES1).map(function(key) {
    return CURRENT_CACHES1[key];
  });
    });
    
    
    self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
   
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);

        return response;
      }
      
      return fetch(event.request,{ mode: 'no-cors' }).then(function(response) {
        console.log('Response from network is:', response.url);

       return caches.open('CURRENT_CACHES1').then(function(cache) {
            cache.put(event.request.url, response.clone());
            console.log('[ServiceWorker] Fetched&Cached Data');
            return response;
        });
      }).catch(function(error) {
        
        console.error('Fetching failed:', error);

        throw error;
      });
  })
  );
});
  
  
