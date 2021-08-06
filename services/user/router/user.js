const Controller = require('../controller/userController')
const router = require('express').Router()

router
  .post('/register', Controller.register)
  .post('/login', Controller.login)

module.exports = router