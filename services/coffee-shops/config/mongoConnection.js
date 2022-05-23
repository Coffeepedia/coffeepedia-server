const { MongoClient } = require('mongodb');

let uri = 'mongodb://localhost:27017'

// if(process.env.NODE_ENV !== 'test') {
//   uri = process.env.MONGO_DB_URI
// } else {
//   uri = 'mongodb://localhost:27017'
// }

const client = new MongoClient(uri);

let db
async function connection() {
  try {
    
    await client.connect()
    db = client.db("coffeepedia");
  } catch (err) {
    console.log(err)
  }
}

function getDb() {
  return db
}

module.exports = {
  connection,
  getDb,
  client
}