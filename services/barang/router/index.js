const router = require('express').Router()
const barangRouter = require('./barangRouter.js')

router.use('/barang', barangRouter)

module.exports = router