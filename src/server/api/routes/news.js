import express from 'express'
import * as controller from '../controllers/news'
import apiCaller from '../middlewares/apiCaller'
const router = express.Router()

router.get('/', controller.getNews, apiCaller)
router.get('/related/:id', controller.getRelated, apiCaller)
router.get('/:id', controller.getNewsDetail, apiCaller)

module.exports = router
