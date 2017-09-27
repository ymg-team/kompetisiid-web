import express from 'express'
import * as controller from '../controllers/kompetisi'
import apiCaller from '../middlewares/apiCaller'
const router = express.Router()

router.get('/', controller.getJelajah, apiCaller)
router.get('/kategori', controller.getCategories)

module.exports = router
