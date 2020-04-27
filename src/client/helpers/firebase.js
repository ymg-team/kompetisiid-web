// important: only call this helper on client side
// ref: https://firebase.google.com/docs/cloud-messaging/js/client?authuser=0

// ref : initial https://firebase.google.com/docs/web/setup?authuser=0
// ref: https://firebase.google.com/docs/web/setup?authuser=0#config-objecst
const firebaseConfig = {
  apiKey: "AIzaSyDRolGwjZIqhuEb6hwjPWrmFfzBW383bfU",
  authDomain: "kompetisi-id-263004.firebaseapp.com",
  databaseURL: "https://kompetisi-id-263004.firebaseio.com",
  projectId: "kompetisi-id-263004",
  storageBucket: "kompetisi-id-263004.appspot.com",
  messagingSenderId: "953225201303",
  appId: "1:953225201303:web:4552380fcd4d398efd4bd2",
  measurementId: "G-CP0MSKK5FF"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

// fcm initial
const messaging = firebase.messaging()

// Add the public key generated from the console here.
// ref: https://firebase.google.com/docs/cloud-messaging/js/client
messaging.usePublicVapidKey(
  "BKi6dYYkevF7pSVucQRYYTaH2-s4Rwn0Wx7qkO8XbYjvfpD1eLKIXE_D7djqL_3AHj8LLmUhjxcj7RDW-JNz3OY"
)

export function initFirebase() {
  // only execute if notification support and granted
  if ("Notification" in window && Notification.permission === "granted") {
    return getFirebaseToken()
  }
}

/**
 * @description function to get and reload firebase token
 * @see https://firebase.google.com/docs/cloud-messaging/js/client
 */
function getFirebaseToken() {
  // get current fcm token
  messaging
    .getToken()
    .then(currentToken => {
      if (process.env.NODE_ENV == "development")
        console.log("currentToken", currentToken)
    })
    .catch(err => {
      console.error("An error occurred while retrieving token. ", err)
    })

  // token refresh listener
  messaging.onTokenRefresh(() => {
    MessageChannel.getToken()
      .then(currentToken => {
        console.log("fcn token is refreshed...")
        if (process.env.NODE_ENV == "development")
          console.log("currentToken", currentToken)
      })
      .catch(err => {
        console.error("An error occurred while retrieving token. ", err)
      })
  })
}

/**
 * @description function to handle incoming message
 * - the message is receive when app is focus
 * -
 */
messaging.onMessage(payload => {
  console.log("Message received. ", payload)
})
