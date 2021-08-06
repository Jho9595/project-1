const router = require('express').Router()
const userRouter = require('./userRouter')
const barangRouter = require('./barangRouter')

router
  .use('/user', userRouter)
  .use('/barang', barangRouter)

module.exports = router