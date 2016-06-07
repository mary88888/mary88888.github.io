
     
     
     


    
    
  
   
     
     
     
    var CACHE_VERSION = 7;
          var CURRENT_CACHES1 = {
           prefetch: 'prefetch-cache-v' + CACHE_VERSION
                                };
                                var cacheName=CURRENT_CACHES1;

var urlstocache1=[
    
    'index.html',
   '1459441392_Hamburger.png',
//'1459441524_Hamburger.png',
    'chrome-touch-icon-192x192.png',
    'icon-128x128.png',
    'apple-touch-icon.png',
    'ms-touch-icon-144x144-precomposed.png',
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


//push event
self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);
  

var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/icon-192x192.png';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  

  });  

//////////////////////////////////////////////////////////////////////////////////////
/*
//new
    var httpHeaders = new Headers();
    httpHeaders.append('pragma', 'no-cache');
    httpHeaders.append('cache-control', 'no-cache');

    var fetchInit = {
      method: 'GET',
      headers: httpHeaders
    };

    //fetch("http://localhost:8080/git/notification.json", fetchInit).then(function(res) {
     // res.json().then(function(data) {
        //show notifications
       // console.log(data);
        
        var notificationOptions = {
    title: "hello"
    //icon: './images/hipstercat.jpg',
    //url: "gmhgj,j"
  };    
        
        
    //});
  //});

//over
  

  return self.registration.Notification('Important message', notificationOptions);
}); 
 */
//////////////////////////////////////////////////////////////////////////////////////////

//end

 /*var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      fetch(PUSH_SERVER_URL + '/send_web_push', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(subscription)
      }).then(function(response) {
        return response.json();
      })
      .then(function(responseObj) {
        if (!responseObj.success) {
          throw new Error('Unsuccessful attempt to send push message');
        }
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
      
      'use strict';

var YAHOO_WEATHER_API_ENDPOINT = 'https://query.yahooapis.com/' +
  'v1/public/yql?q=select%20*%20from%20weather.forecast%20where%' +
  '20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where' +
  '%20text%3D%22london%2C%20uk%22)&format=json&env=store%3A%2F%2' +
  'Fdatatables.org%2Falltableswithkeys';

function showNotification(title, body, icon, data) {
  console.log('showNotification');
  // Firefox has an issue with showing a notification with the icon from
  // the Yaho API
  // (i.e. http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif)
  // HTTP, CORs or Size issue.
  var notificationOptions = {
    body: body,
    icon: icon ? icon : '/images/touch/chrome-touch-icon-192x192.png',
    tag: 'simple-push-demo-notification',
    data: data
  };
  return self.registration.showNotification(title, notificationOptions);
}

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  if (event.data) {
    console.log('message data', event.data);
    console.log('message data', event.data.text);
    var output = event.data.text();
    console.log(output);
  }

  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(
    fetch(YAHOO_WEATHER_API_ENDPOINT)
      .then(function(response) {
        if (response.status !== 200) {
          // Throw an error so the promise is rejected and catch() is executed
          throw new Error('Invalid status code from weather API: ' +
            response.status);
        }

        // Examine the text in the response
        return response.json();
      })
      .then(function(data) {
        console.log('Weather API data: ', data);
        if (data.query.count === 0) {
          // Throw an error so the promise is rejected and catch() is executed
          throw new Error();
        }

        var title = 'What\'s the weather like in London?';
        var message = data.query.results.channel.item.condition.text;
        var icon = data.query.results.channel.image.url ||
          'images/touch/chrome-touch-icon-192x192.png';

        // Add this to the data of the notification
        var urlToOpen = data.query.results.channel.link;

        var notificationFilter = {
          tag: 'simple-push-demo-notification'
        };

        var notificationData = {
          url: urlToOpen
        };

        if (!self.registration.getNotifications) {
          return showNotification(title, message, icon, notificationData);
        }

        // Check if a notification is already displayed
        return self.registration.getNotifications(notificationFilter)
          .then(function(notifications) {
            if (notifications && notifications.length > 0) {
              // Start with one to account for the new notification
              // we are adding
              var notificationCount = 1;
              for (var i = 0; i < notifications.length; i++) {
                var existingNotification = notifications[i];
                if (existingNotification.data &&
                  existingNotification.data.notificationCount) {
                  notificationCount +=
                    existingNotification.data.notificationCount;
                } else {
                  notificationCount++;
                }
                existingNotification.close();
              }
              message = 'You have ' + notificationCount +
                ' weather updates.';
              notificationData.notificationCount = notificationCount;
            }

            return showNotification(title, message, icon, notificationData);
          });
      })
      .catch(function(err) {
        console.error('A Problem occured with handling the push msg', err);

        var title = 'An error occured';
        var message = 'We were unable to get the information for this ' +
          'push message';

        return showNotification(title, message);
      })
  );
});

self.addEventListener('notificationclick', function(event) {
  var url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
*/
  
  
