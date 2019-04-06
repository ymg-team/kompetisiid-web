import express from "express"
import * as controller from "../../controllers/news"
import apiCaller from "../../middlewares/apiCaller"
import sealMiddleware from "../../middlewares/seal"
import * as requestMiddleware from "../../middlewares/handleRequest"

const router = express.Router()

router.get("/:seal", sealMiddleware, controller.getNews, apiCaller)
router.post(
  "/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.createNews,
  apiCaller
)
router.put(
  "/:id/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.udpateNewsById,
  apiCaller
)
router.get("/:id/:seal", sealMiddleware, controller.getNewsDetail, apiCaller)

module.exports = router
