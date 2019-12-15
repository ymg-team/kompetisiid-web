"use strict"
const CACHE_NAME = "cache-ki-v2"
const urlsToCache = []

self.addEventListener("beforeinstallprompt", function(event) {
  // Stash the event so it can be triggered later.
  deferredPrompt = event
  // Update UI notify the user they can add to home screen
  showInstallPromotion()
})

// https://developers.google.com/web/fundamentals/primers/service-workers#install_a_service_worker
self.addEventListener("install", function(event) {
  // peform install steps
  event.waitUntil(
    // open a cache
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache")
      // Cache our files.
      // Confirm whether all the required assets are cached or not.
      return cache.addAll(urlsToCache)
    })
  )
})

// https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // cache hit - return response
      if (response) {
        return response
      }

      // create new cache
      return fetch(event.request).then(function(response) {
        // check if we received a valid response
        // Make sure the response type is basic, which indicates that it's a request from our origin. This means that requests to third party assets aren't cached as well.
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})
