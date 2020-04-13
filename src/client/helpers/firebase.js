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

export function initFirebase() {
  // only execute if notification support and granted
  if ("Notification" in window && Notification.permission === "granted") {
    return getFirebaseToken()
  }
}

/**
 * @description function to get and reload firebase token
 */
function getFirebaseToken() {
  const messaging = firebase.messaging()
  messaging.getToken().then(currentToken => {
    // console.log("currentToken", currentToken)
  })
}
