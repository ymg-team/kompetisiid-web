import express from 'express'
import * as controller from '../controllers/kompetisi'
import apiCaller from '../middlewares/apiCaller'
const router = express.Router()

router.get('/related/:id', controller.getRelated, apiCaller)
router.get('/pengumuman/:id', controller.getPengumuman, apiCaller)
router.get('/favoritedtags', controller.getFavoritedtag)
router.get('/kategori', controller.getCategories, apiCaller)
router.get('/:id', controller.getDetail, apiCaller)

module.exports = router
