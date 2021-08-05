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

  static postBarang (req, res) {
    const { nama } = req.body
    const access_token = req.headers.access_token
    console.log('--------------------------------', nama ,'------------------------------------------ini nama di gatway');

    axios({
      url: process.env.BARANG_API + '/barang/createBarang',
      method: 'post',
      headers: { access_token },
      body: { nama }
    })
      .then((result) => {
        console.log('--------------------------------', result ,'------------------------------------------');
      })
      .catch((error) => {
        // console.log(error, `ini error`);
        res
          .status(400)
          .json(error.message)
      })
  }

  static putBarang (req, res) {
    res.send('kabom barang')
  }

  static deleteBarang (req, res) {
    res.send('kabom barang')
  }
}

module.exports = BarangController