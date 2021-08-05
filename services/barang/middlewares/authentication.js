const { verify } = require('../helpers/jwt')
const User = require('../model/user')

async function authentication (req, res, next) {        
  try {
    const token = req.headers.access_token

    if (token) {
      const decoded = verify(token)
      const foundUser = await User.findByPk(decoded.id)

      if (foundUser) {
        req.currentUser = {
          id: decoded.id,
          email: decoded.email
        }
        next()
      }
      else {
        res
        .status(400)
        .json({ message: `Please register first` })  
      }
    }
    else {
      res
      .status(400)
      .json({ message: `Please login first` })
    }
        
  } catch (error) {
    res
      .status(400)
      .json({ message: error })
  }
}

module.exports = authentication