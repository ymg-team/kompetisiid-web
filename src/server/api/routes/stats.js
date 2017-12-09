import express from 'express'
import * as controller from '../controllers/stats'
import apiCaller from '../middlewares/apiCaller'
const router = express.Router()

router.get('/', controller.getStats, apiCaller)

module.exports = router
