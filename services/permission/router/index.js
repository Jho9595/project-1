const router = require('express').Router()
const permisionRouter = require('./permissionRouter')

router.use('/permision', permisionRouter)

module.exports = router