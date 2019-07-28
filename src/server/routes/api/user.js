/**
 * Created by yussan on 13/11/16.
 */
import express from "express"
import * as controller from "../../controllers/user"
import * as requestMiddleware from "../../middlewares/handleRequest"
import * as authMiddleware from "../../middlewares/auth"
import sealMiddleware from "../../middlewares/seal"
import apiCaller from "../../middlewares/apiCaller"
const router = express.Router()


router.get(
  "/list/:seal",
  sealMiddleware,
  authMiddleware.superMiddleware,
  controller.fetchUsers,
  apiCaller
)


router.get("/:username", controller.getProfile, apiCaller)

// endpoint to change password via token
// [POST] /user/change-password/:seal
router.post(
  "/change-password/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.postChangePassword,
  apiCaller
)

// endpoint to request forgot password
// [POST] /user/forgot-password/:seal
router.post(
  "/forgot-password/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.postForgotPassword,
  apiCaller
)
// endpoint of authentication
router.post(
  "/login/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.postLogin,
  apiCaller
)
router.post(
  "/register/:seal",
  sealMiddleware,
  requestMiddleware.post,
  controller.postRegister,
  apiCaller
)
router.post(
  "/oauth/login",
  requestMiddleware.post,
  controller.postOauthLogin,
  apiCaller
)
router.post("/logout", requestMiddleware.post, controller.postLogout, apiCaller)

// endpoint of verification
router.post(
  "/email-verification/:token",
  controller.postEmailVerification,
  apiCaller
)
router.post(
  "/resend-email-verification/:seal",
  sealMiddleware,
  authMiddleware.dashboardMiddleware,
  requestMiddleware.post,
  controller.postResendEmailVerification,
  apiCaller
)

module.exports = router
