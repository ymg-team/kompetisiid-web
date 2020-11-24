// important: only call this helper on client side
// ref: https://firebase.google.com/docs/cloud-messaging/js/client?authuser=0

// ref : initial https://firebase.google.com/docs/web/setup?authuser=0
// ref: https://firebase.google.com/docs/web/setup?authuser=0#config-objecst
const firebaseConfig = {
  apiKey: "AIzaSyC7DM0vdupZNvrP47dfrIHimuWoXOKSAyw",
  authDomain: "kompetisi-id.firebaseapp.com",
  databaseURL: "https://kompetisi-id.firebaseio.com",
  projectId: "kompetisi-id",
  storageBucket: "kompetisi-id.appspot.com",
  messagingSenderId: "825189798997",
  appId: "1:825189798997:web:69ec4256ec092acf5bf0dc",
  measurementId: "G-6SDWQ9RSGC"
}

let messaging

firebase.initializeApp(firebaseConfig)
firebase.analytics()

try {
  // fcm initial
  messaging = firebase.messaging()
} catch (err) {
  console.error("Firebase Messaging: ", err)
}

export function initFirebase() {
  // only execute if notification support and granted
  if (
    "Notification" in window &&
    Notification.permission === "granted" &&
    window.firebase
  ) {
    return getFirebaseToken()
  }
}

/**
 * @description function to get and reload firebase token
 * @see https://firebase.google.com/docs/cloud-messaging/js/client
 */
function getFirebaseToken() {
  if (messaging) {
    // Add the public key generated from the console here.
    // ref: https://firebase.google.com/docs/cloud-messaging/js/client
    messaging.usePublicVapidKey(
      "BIC9HdnInlZTEmNITAQX4Uq8CiQCnRSsaaZZM5gj4xOpkaiq0XXRJd7LpKulc4IXZUoE_LKdtOASjzGG1B0amwI"
    )

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
          console.log("fcm token is refreshed...")
          if (process.env.NODE_ENV == "development")
            console.log("currentToken", currentToken)
        })
        .catch(err => {
          console.error("An error occurred while retrieving token. ", err)
        })
    })

    /**
     * @description function to handle incoming message
     * - the message is receive when app is focus
     * -
     */
    messaging.onMessage(payload => {
      console.log("Message received. ", payload)
    })
  }
}
