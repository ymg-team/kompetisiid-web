/**
 * Created by yussan on 13/11/16.
 */
import express from 'express'
import * as controller from '../controllers/request'
import * as requestMiddleware from '../middlewares/handleRequest'
import apiCaller from '../middlewares/apiCaller'
const router = express.Router()

router.post('/send-competition', requestMiddleware.post, controller.sendCompetition, apiCaller)

module.exports = router
