const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI

let database = null

const connect = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await client.connect()
    const db = await client.db('project_1')
    database = db

    return db
  } catch (error) {
    console.log(error); 
  }
}

const getDatabase = () => {
  return database
}

module.exports = { connect, getDatabase }