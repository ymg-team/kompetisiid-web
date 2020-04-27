const CACHE_NAME = "cache-ki-0.0.2"
const urlsToCache = []

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
  if (
    request.url.indexOf("/api") !== 0 &&
    request.url.indexOf("/super") !== 0
  ) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // return from cache, otherwise fetch from network
        return response || fetch(request)
      })
    )
  }
})
