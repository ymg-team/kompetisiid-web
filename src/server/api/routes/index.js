import express from 'express'

const router = express.Router()

router.use('/kompetisi', require('./kompetisi'))
router.use('/jelajah', require('./jelajah'))
router.use('/news', require('./news'))
router.use('/pasang', require('./pasang'))
router.use('/user', require('./user'))
router.use('/stats', require('./stats'))

module.exports = router
