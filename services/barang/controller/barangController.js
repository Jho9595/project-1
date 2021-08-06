'use strict'
const Barang = require('../model/barang')

class Controller {
  static async getAllBarang (req, res) {
    const allBarang = await Barang.findAll()

    res
      .status(200)
      .json(allBarang)
  }

  static async getOneBarang (req, res) {
    const { id } = req.params;
    const product = await Barang.findById(id);

    res
      .status(200)
      .json(product);
  }

  static async postBarang (req, res) {
    const nama = req.body.nama
    let user = req.currentUser.email;
    user = user.split('@')[0];

    const newBarang = {
      nama,
      userId: req.currentUser.id,
      user
    };
    console.log('--------------------------------', req ,'------------------------------------------');

    console.log('--------------------------------', req.currentUser ,'------------------------------------------curent user di api barang');

    console.log('--------------------------------', nama ,'------------------------------------------ini nama di api barang');

    if (!newBarang.nama || typeof newBarang.nama !== 'string') {
      res
        .status(400)
        .json({ message: 'nama is required and must a string'});
    } else {
      Barang.create(newBarang);
      res
        .status(201)
        .json({ message: `Successfully created a Barang` });
    }
  }

  static async putBarang (req, res) {
    const id = req.params.id;

    const updatedBarang = {
      nama: req.body.nama
    };
    const checkBarang = await Barang.findById(id);

    if (!updatedBarang.nama || typeof updatedBarang.nama !== 'string') {
      res
        .status(400)
        .json({ message: 'nama is required and must a string'});
    } else {
      if (!checkBarang) {
        res
          .status(404)
          .json({ message: 'Barang is not found'})
      } else {
        await Barang.update(id, updatedBarang);
    
        res
          .status(200)
          .json({ message: `Successfully edited a Barang` });
      } 
    }
  }

  static async deleteBarang (req, res) {
    const id = req.params.id;
    const checkBarang = await Barang.findById(id);

    if (!checkBarang) {
      res
      .status(404)
      .json({ message: 'Barang not found'});
    } else {
      Barang.destroy(id);

      res
        .status(200)
        .json({ message: 'Successfully delete a Barang'});
    }
  }
}

module.exports = Controller