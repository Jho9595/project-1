'use strict'

const Barang = require('../model/barang')
const { verify } = require('../helpers/jwt')

class Controller {
  static authorization (req, res) {
    const id = req.body.id
    const token = req.headers.access_token
    
    // disini headers = token nnti di decode id nya cocokin dgn userId
    // kalow cocok boleh edit delete == return ke client oke 200
    console.log('--------------------------------', id ,'------------------------------------------ini di permision service');
    const decoded = verify(token)

    Barang.findById(id)
    .then(result => {
      if (result) {
        if (result.userId === decoded.id) {
          res
            .status(200)
            .json({ message: 'access granted' })
        }
        else {                
          throw { status: 401, message: `You are not authorized` }
        }            
      }
      else {
        throw { status: 404, message: `Barang is not found` }
      }
    })
    .catch(err => {
      const status = err.status || 500
      const message = err.message || "Internal Server Error"
          
      res
        .status(status)
        .json({ message })
    }) 
  }
}

module.exports = Controller