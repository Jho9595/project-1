const Controller = require('../controller/barangController')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router
  .get('/getAllBarang', Controller.getAllBarang)
  .use(authentication)
  .post('/createBarang', Controller.postBarang)
  .put('/editBarang/:id', Controller.putBarang)
  .delete('/deleteBarang/:id', Controller.deleteBarang)

module.exports = router