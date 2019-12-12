'use strict';
const CACHE_NAME = 'cache-ki-v1';
const URLS_TO_CACHE = [];

// init
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(URLS_TO_CACHE)
        })
    )
})

// fetch request and response
self.addEventListener('fetch', function(event)
{
    // intercept fetch Request
    event.respondWith(
        // match and serve cached assets, if it exists
        caches.match(event.request).then(function(response)
        {
            return response || fetch(event.request)
        })
    )
})

// cache busting
self.addEventListener('activate', function(event)
{
    event.waitUntil(
        // open apps cache and delete any old cache items
        caches.open(CACHE_NAME).then(function(cacheNames){
            cacheNames.keys().then(function(cache){
                cache.forEach(function(element, index, array)
                {
                    if(URLS_TO_CACHE.indexOf(element) === -1)
                    {
                        caches.delete(element);
                    }
                })
            })
        })

    );
    // end of event waitUntil
})

self.addEventListener('beforeinstallprompt', function(event){
   // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update UI notify the user they can add to home screen
  showInstallPromotion();
})

// btnAdd.addEventListener('click', (e) => {
//     // hide our user interface that shows our A2HS button
//     btnAdd.style.display = 'none';
//     // Show the prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice
//       .then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the A2HS prompt');
//         } else {
//           console.log('User dismissed the A2HS prompt');
//         }
//         deferredPrompt = null;
//       });
//   });