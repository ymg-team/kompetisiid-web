import express from 'express'
import routes from './routes'

const router = express.Router()

router.use('/', routes)
router.use('*', (req, res) => {
  res.json({
    meta: {
      code: 404,
      message: 'page not found'
    }
  })
})

export default router
