const axios = require('axios')

class BarangController {
  static getAllBarang (req, res) {
    axios({
      url: process.env.BARANG_API + '/barang/getAllBarang',
      method: 'get'
    })
      .then((result) => {
        res
          .status(200)
          .json(result.data)
      })
  }

  static getOneBarang (req, res) {
    const { id } = req.params;
    
    axios({
      url: process.env.BARANG_API + '/barang/getOneBarang/' + id,
      method: 'get'
    })
      .then((result) => {
        res
          .status(200)
          .json(result.data)
      })
  }

  static postBarang (req, res) {
    const { nama } = req.body
    const access_token = req.headers.access_token

    axios({
      url: process.env.BARANG_API + '/barang/createBarang',
      method: 'post',
      headers: { access_token },
      data: { nama }
    })
      .then((result) => {
        res
          .status(201)
          .json(result.data)
      })
      .catch((error) => {
        res
          .status(400)
          .json(error.response.data)
      })
  }

  static putBarang (req, res) {
    const id = req.params.id;
    const { nama } = req.body;
    const access_token = req.headers.access_token;

    axios({
      url: process.env.PERMISION_API +'/permision/authorized',
      method: 'post',
      data: { id },
      headers: { access_token }
    })
      .then(({ data }) => {
        if (data.message === 'access granted') {
          axios({
            url: process.env.BARANG_API + '/barang/editBarang/' + id,
            method: 'put',
            headers: { access_token },
            data: { nama }
          })
            .then(({ data }) => {
              res
                .status(200)
                .json(data)
            })
            .catch((error) => {
              res
                .status(error.response.status)
                .json(error.response.data)
            })
          
        } else {
          res
            .status(400)
            .json(data)
        }
      })
      .catch((error) => {
        res
          .status(error.response.status)
          .json(error.response.data)
      })
  }

  static deleteBarang (req, res) {
    const id = req.params.id;
    const access_token = req.headers.access_token;

    axios({
      url: process.env.PERMISION_API +'/permision/authorized',
      method: 'post',
      data: { id },
      headers: { access_token }
    })
      .then(({ data }) => {
        if (data.message === 'access granted') {
          axios({
            url: process.env.BARANG_API + '/barang/deleteBarang/' + id,
            method: 'delete',
            headers: { access_token }
          })
            .then(({ data }) => {
              res
                .status(200)
                .json(data)
            })
            .catch((error) => {
              res
                .status(error.response.status)
                .json(error.response.data)
            })
          
        } else {
          res
            .status(400)
            .json(data)
        }
      })
      .catch((error) => {
        res
          .status(error.response.status)
          .json(error.response.data)
      })
  }
}

module.exports = BarangController