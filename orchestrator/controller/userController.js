const axios = require('axios')

class UserController {
  static register (req, res) {
    const { email, password } = req.body

    axios({
      url: process.env.USER_API + '/user/register',
      method: 'post',
      data: { email, password }
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

  static login (req, res) {
    const { email, password } = req.body

    axios({
      url: process.env.USER_API + '/user/login',
      method: 'post',
      data: { email, password }
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
}

module.exports = UserController