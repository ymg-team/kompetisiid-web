import express from 'express'
import * as controller from '../controllers/stats'
import apiCaller from '../middlewares/apiCaller'
import sealMiddleware from '../middlewares/seal'

const router = express.Router()

router.get('/:seal', sealMiddleware, controller.getStats, apiCaller)

module.exports = router
