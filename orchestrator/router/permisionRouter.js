const router = require('express').Router()
const PermisionController = require('../controller/permisionController')

router
  .post('/', PermisionController.checkAuthorization)

module.exports = router