import express from "express"
import * as controller from "../../controllers/kompetisi"
import apiCaller from "../../middlewares/apiCaller"
import * as requestMiddleware from "../../middlewares/handleRequest"
import sealMiddleware from "../../middlewares/seal"

const router = express.Router()

// route for [post] /api/kompetisi/subscribe
router.post(
  "/competition-subscription/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.competitionSubscribeAction,
  apiCaller
)

// route for [get] /api/kompetisi/subscribe
router.get(
  "/competition-subscription/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.competitionSubscribeList,
  apiCaller
)

// route for [post] /api/kompetisi/announcement
router.post(
  "/announcement/:id/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.addAnnouncement,
  apiCaller
)

// route for [post] /api/kompetisi/announcement
router.delete(
  "/announcement/:id/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.deleteAnnouncement,
  apiCaller
)

// route for [post] /api/kompetisi
router.post(
  "/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.create,
  apiCaller
)
router.put(
  "/:id/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.update,
  apiCaller
)
router.get(
  "/related/:id/:seal",
  sealMiddleware,
  controller.getRelated,
  apiCaller
)
// router.get('/pengumuman/:id/:seal', sealMiddleware, controller.getPengumuman, apiCaller)
// router.get("/favoritedtags/:seal", sealMiddleware, controller.getFavoritedtag)
router.get("/kategori", controller.getCategories, apiCaller)
router.get(
  "/liked/:seal",
  sealMiddleware,
  controller.getLikedCompetition,
  apiCaller
)
router.get("/:id/:seal", sealMiddleware, controller.getDetail, apiCaller)
router.post(
  "/like/:id/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.likeCompetition,
  apiCaller
)

module.exports = router
