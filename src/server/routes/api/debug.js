import express from "express"
import request from "request"

const router = express.Router()

router.post("/fcm-debug", (req, res) => {
  const { clientToken } = req.query
  const message = {
    data: {
      score: "850",
      time: "2:45"
    },
    token: clientToken
  }

  // Send a message to the device corresponding to the provided
  // registration token.
  // @see https://firebase.google.com/docs/cloud-messaging/migrate-v1
  const Endpoint =
    "https://fcm.googleapis.com/v1/projects/kompetisi-id-263004/messages:send"
  const Authorization = "Bearer "
  admin
    .messaging()
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response)
    })
    .catch(error => {
      console.log("Error sending message:", error)
    })
})

module.exports = router
