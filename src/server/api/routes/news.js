import express from 'express'
import * as controller from '../controllers/news'
import apiCaller from '../middlewares/apiCaller'
import sealMiddleware from '../middlewares/seal'

const router = express.Router()

router.get('/:seal', sealMiddleware, controller.getNews, apiCaller)
router.get('/related/:id/:seal', sealMiddleware, controller.getRelated, apiCaller)
router.get('/:id/:seal', sealMiddleware, controller.getNewsDetail, apiCaller)

module.exports = router
