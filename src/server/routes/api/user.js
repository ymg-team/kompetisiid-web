/**
 * Created by yussan on 13/11/16.
 */
import express from 'express'
import * as controller from '../../controllers/user'
import * as requestMiddleware from '../../middlewares/handleRequest'
import sealMiddleware from '../../middlewares/seal'
import apiCaller from '../../middlewares/apiCaller'
const router = express.Router()

router.get('/:username', controller.getProfile, apiCaller)

// endpoint of authentication
router.post('/login/:seal', sealMiddleware, requestMiddleware.post, controller.postLogin, apiCaller)
router.post('/register/:seal', sealMiddleware, requestMiddleware.post, controller.postRegister, apiCaller)
router.post('/oauth/login', requestMiddleware.post, controller.postOauthLogin, apiCaller)
router.post('/logout', requestMiddleware.post, controller.postLogout, apiCaller)

// endpoint of verification
router.post('/emailverification', requestMiddleware.post, controller.postEmailVerification, apiCaller)

module.exports = router
