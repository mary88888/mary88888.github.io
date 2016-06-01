
window.addEventListener('load', function() {

var _API_KEY="AIzaSyBWOyG2WTttRhUh8l5IDpkGudRiQJ0bFpE";

     // var outputElement = document.getElementById('output');
if ('serviceWorker' in navigator) {
               
  navigator.serviceWorker.register('sw.js', {
    scope: '/git/'
  }).then(function(r) {
      //console.log(r);
   console.log("Registeration successful");
    /*r.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('Subscription successful');
            console.log('endpoint:', sub.endpoint);
            console.log('subscriptionID:', sub.subscriptionId);
                    sendSub(sub);

        }).catch(function(r){
            console.log('UnSubscription successful');
        });*/
  //new
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
    console.warn('Notifications aren\'t supported.');  
    return;  
  }

  // Check the current Notification permission.  
  // If its denied, it's a permanent block until the  
  // user changes the permission  
  if (Notification.permission === 'denied') {  
    console.warn('The user has blocked notifications.');  
    return;  
  }

  // Check if push messaging is supported  
  if (!('PushManager' in window)) {  
    console.warn('Push messaging isn\'t supported.');  
    return;  
  }
          r.pushManager.subscribe({userVisibleOnly: true})
            .then(function(subscription) {
                if(subscription.endpoint.startsWith("https://android.googleapis.com/gcm/send")){
                    var parts = subscription.endpoint.split("/");
                    var registrationId = parts[parts.length -1];
                    console.log("RegistrationId:");
                    console.log(registrationId);
                    
                    sendPushMessage(subscription);
                }
            })
            .catch(function(e) {
                console.log('Something unfortunate happened: ' + e);
            });

  /////
  function sendPushMessage(subscription) {
 if (subscription.endpoint.indexOf(
 'https://android.googleapis.com/gcm/send') === 0) {
 useGCMProtocol(subscription);
 } else {
 useWebPushProtocol(subscription);
 }
 }

 function useGCMProtocol(subscription) {
 console.log('Sending XHR to GCM Protocol endpoint');

 var headers = new Headers();
 headers.append('Content-Type', 'application/json');
 headers.append('Authorization', 'key=' + _API_KEY);

 var endpointSections = subscription.endpoint.split('/');
 var subscriptionId = endpointSections[endpointSections.length - 1];

 fetch('https://android.googleapis.com/gcm/send', {
 method: 'post',
 headers: headers,
 body: JSON.stringify({
 registration_ids: [subscriptionId] // eslint-disable-line camelcase
 })
 })
 .then(function(response) {
 return response.json();
 })
 .then(function(responseObj)  {
 if (responseObj.failure !== 0) {
 console.log('Failed GCM response: ', responseObj);
 throw new Error('Failed to send push message via GCM');
 }
 })
 .catch(function(err) {
 console.log(err);});
 }

 function useWebPushProtocol(subscription) {
 console.log('Sending XHR to Web Push Protocol endpoint');

 fetch(subscription.endpoint, {
 method: 'post',
 headers: {
 TTL: '60'
 }
 })
 .then(function(response) {
 if (response.status >= 400 && response.status < 500) {
 console.log('Failed web push response: ', response, response.status);
 throw new Error('Failed to send push message via web push protocol');
 }
 })
 .catch(function(err) {
 console.log(err);
 });
 }

 function produceGCMProprietaryCURLCommand(subscription) {
 var curlEndpoint = 'https://android.googleapis.com/gcm/send';
 var endpointSections = subscription.endpoint.split('/');
 var subscriptionId = endpointSections[endpointSections.length - 1];
 var curlCommand = 'curl --header "Authorization: key=' +
 this._API_KEY + '" --header Content-Type:"application/json" ' +
 curlEndpoint + ' -d "{\\"registration_ids\\":[\\"' +
 subscriptionId + '\\"]}"';
 return curlCommand;
 }

 function produceWebPushProtocolCURLCommand(subscription) {
 var curlEndpoint = subscription.endpoint;
 var curlCommand = 'curl -H "TTL: 60" --request POST ' + curlEndpoint;
 return curlCommand;
 }

 /*function showErrorMessage(title, message) {
 var errorContainer = document.querySelector('.js-error-message-container');

 var titleElement = errorContainer.querySelector('.js-error-title');
 var messageElement = errorContainer.querySelector('.js-error-message');
 titleElement.textContent = title;
 messageElement.innerHTML = message;
 errorContainer.style.opacity = 1;

 var pushOptionsContainer = document.querySelector('.js-send-push-options');
 pushOptionsContainer.style.display = 'none';
 }*/






  /////
  
  }).catch(function(r) {
       console.log(r);
    console.log("Registeration unsuccessful");

});
}
});


/*
function sendSub(pushSubscription) {
  console.log(pushSubscription);
  //get endpoint
  var endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
   fetch("https://mobiforge.com/subscribe/"+endPoint).then(function(res) {
      res.json().then(function(data) {
        console.log(data);
      }).catch(function(e) {
          console.error('Error sending subscription to server:', e);
        }); 
    });
}
});

  if ('Notification' in window) {
    // Notifications supported! Yay!
    
        // Check for permission
    if(Notification.permission=='granted') {
        // Get service worker to show notification
         self.registration.showNotification(notificationData.data.title, {  
            body: notificationData.data.body,
            icon: 'favicon.ico' 
        }); 
    }
    else {
      //We need to ask permission
      Notification.requestPermission(function(permission) {
        if(permission=='granted') {
          self.registration.showNotification(notificationData.data.title, {  
            body: notificationData.data.body,
            icon: 'favicon.ico' 
          });  
        }          
      });
    }
    
    
  } 
  
      self.addEventListener('notificationclick', function(e) {
      if (clients.openWindow) {
        clients.openWindow(notificationData.data.url);
      }
    });
    
    */
   //end 

/*
 * 
 if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
}


 

      navigator.serviceWorker.register('service-worker.js', { scope: './' })
        .then(function(r) {
          console.log('registered service worker');
        })
        .catch(function(whut) {
          console.error('uh oh... ');
          console.error(whut);
        });
  */     
      
    
