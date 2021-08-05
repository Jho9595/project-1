const router = require('express').Router()
const userRouter = require('./userRouter')
const barangRouter = require('./barangRouter')
const permisionRouter = require('./permisionRouter')

router
  .use('/user', userRouter)
  .use('/barang', barangRouter)
  .use('/permision', permisionRouter)

module.exports = router