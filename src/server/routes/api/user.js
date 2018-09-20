/**
 * Created by yussan on 13/11/16.
 */
import express from 'express'
import * as controller from '../../controllers/user'
import * as requestMiddleware from '../../middlewares/handleRequest'
import apiCaller from '../../middlewares/apiCaller'
const router = express.Router()

router.get('/:username', controller.getProfile, apiCaller)
router.post('/login', requestMiddleware.post, controller.postLogin, apiCaller)
router.post('/register', requestMiddleware.post, controller.postRegister, apiCaller)
router.post('/logout', requestMiddleware.post, controller.postLogout, apiCaller)
router.post('/emailverification', requestMiddleware.post, controller.postEmailVerification, apiCaller)

module.exports = router
