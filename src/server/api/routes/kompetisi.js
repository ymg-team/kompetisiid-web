import express from 'express'
import * as controller from '../controllers/kompetisi'
import apiCaller from '../middlewares/apiCaller'
const router = express.Router()

router.get('/related/:id', controller.getRelated)
router.get('/kategori', controller.getCategories)
router.get('/pengumuman/:id', controller.getPengumuman)
router.get('/favoritedtags', controller.getFavoritedtag)
router.get('/:id', controller.getDetail)

module.exports = router
