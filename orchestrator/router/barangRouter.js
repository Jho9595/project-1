const router = require('express').Router()
const BarangController = require('../controller/barangController')

router
  .get('/getAll', BarangController.getAllBarang)
  .post('/createBarang', BarangController.postBarang)
  .put('/editBarang/:id', BarangController.putBarang)
  .delete('/deleteBarang/:id', BarangController.deleteBarang)

module.exports = router