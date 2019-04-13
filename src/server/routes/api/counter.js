import express from "express"
import * as controller from "../../controllers/counter"
import apiCaller from '../../middlewares/apiCaller'
import sealMiddleware from '../../middlewares/seal'

const router = express.Router() 

// route of: /api/counter/super-sidebar
router.get("/super-sidebar/:seal", sealMiddleware, controller.fetchSuperSidebar, apiCaller)

module.exports = router