const {MongoClient} = require('mongodb')

const url = "mongodb://localhost:27017"

const client = new MongoClient(url)

const dbName = 'burger-queen'

const connectDB = async() => {
  await client.connect()
  const db = client.db(dbName)

  return db
}

const disconnectDB = async () => {
  await client.close()
}

module.exports = {
  connectDB,
  disconnectDB
}