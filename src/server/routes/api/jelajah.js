import express from 'express'
import * as controller from '../../controllers/kompetisi'
import apiCaller from '../../middlewares/apiCaller'
import sealMiddleware from '../../middlewares/seal'

const router = express.Router()

// router.get('/:seal', (req, res) => {
//   res.json({
//     result: 'test completed'
//   })
// })
router.get('/:seal', sealMiddleware, controller.getJelajah, apiCaller)
router.get('/kategori', controller.getCategories, apiCaller)

module.exports = router
