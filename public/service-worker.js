const CACHE_NAME = "cache-ki-2.0.0"
const urlsToCache = ["/assets/4.2/css/grid.css"]

self.addEventListener("activate", async () => {
  // this block only called once when service worker is activate
  // try {
  //   const options = {}
  //   // get push manager subscription
  //   const subscription = await self.registration.pushManager.subscribe(options)
  //   console.log(JSON.stringify("subscription", subscription))
  // } catch (e) {
  //   console.error("[Error Service Worker Activation]", e)
  // }
})

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

self.addEventListener("fetch", function(event) {
  const request = event.request
  // disabled service worker fetch on /api and /super

  // only cache /assets
  if (request.url.indexOf("/assets") !== -1) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response
        }

        return fetch(event.request).then(function(response) {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone()

          caches.open(STATIC_CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      })
    )
  }
})
