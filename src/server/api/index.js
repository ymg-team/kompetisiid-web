import express from 'express'

const router = express.Router()

router.use('/', require('./routes'))
router.use('*', (req, res) => {
  res.json({
    meta: {
      code: 404,
      message: 'page not found'
    }
  })
})

export default router
