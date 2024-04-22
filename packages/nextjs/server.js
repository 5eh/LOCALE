// nextjs/server.js
const dotenv = require('dotenv');
const mongodb = require('mongodb');

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new mongodb.MongoClient(uri, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to the database");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
