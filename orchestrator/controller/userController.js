class UserController {
  static register (req, res) {
    res.send('kabom user')
  }

  static login (req, res) {
    res.send('kabom user login')
  }
}

module.exports = UserController