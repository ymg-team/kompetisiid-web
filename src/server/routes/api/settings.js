import express from "express"
import apiCaller from "../../middlewares/apiCaller"
import sealMiddleware from "../../middlewares/seal"
import * as controller from "../../controllers/settings"
import * as requestMiddleware from "../../middlewares/handleRequest"

const router = express.Router()

router.put(
  "/profile/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.settingProfile,
  apiCaller
)

router.put(
  "/account/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.settingAccount,
  apiCaller
)

module.exports = router
