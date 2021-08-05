const Controller = require('../controller/authorizationController')
const router = require('express').Router()

router.post('/authorized', Controller.authorization)

module.exports = router