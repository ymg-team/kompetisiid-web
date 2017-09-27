/**
 * Created by yussan on 13/11/16.
 */
import express from 'express'
import * as controller from '../controllers/pasang'
import * as requestMiddleware from '../middlewares/handleRequest'
const router = express.Router()

router.post('/cepat', requestMiddleware.post, controller.postCepat)

module.exports = router
