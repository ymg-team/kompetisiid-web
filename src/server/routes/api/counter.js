import express from "express"
import * as controller from "../../controllers/counter"
import apiCaller from '../../middlewares/apiCaller'
import sealMiddleware from '../../middlewares/seal'

const router = express.Router() 

// route of: /api/counter/_super-sidebar
router.get("/_super-sidebar/:seal", sealMiddleware, controller.fetchSuperSidebar, apiCaller)
router.get("/_dashboard-sidebar/:seal", sealMiddleware, controller.fetchDashboardSidebar, apiCaller)

module.exports = router
