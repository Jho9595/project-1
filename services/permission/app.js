'use strict'

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()  
}

const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 4002
const app = express()
const { connect } = require('./config')
const router = require('./router')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router)

connect()
.then(() => {
  console.log(`connected to DB`);
  app.listen(port, () => {
    console.log('connected to port ', port);
  })
})
.catch((err) => {
  console.log(err,`ini error di app.js`);
})