if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()  
}

const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const router = require('./router')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(port, () => {
  console.log('connected to port ' + port);
})
