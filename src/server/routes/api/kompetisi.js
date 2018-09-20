import express from 'express'
import * as controller from '../../controllers/kompetisi'
import apiCaller from '../../middlewares/apiCaller'
import sealMiddleware from '../../middlewares/seal'

const router = express.Router()

router.get('/related/:id/:seal', sealMiddleware, controller.getRelated, apiCaller)
// router.get('/pengumuman/:id/:seal', sealMiddleware, controller.getPengumuman, apiCaller)
router.get('/favoritedtags/:seal', sealMiddleware, controller.getFavoritedtag)
router.get('/kategori', controller.getCategories, apiCaller)
router.get('/:id/:seal', sealMiddleware, controller.getDetail, apiCaller)

module.exports = router
