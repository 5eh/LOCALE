// src/routes/listings/listings.js
"use server";

import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_LISTINGS_COLLECTION, MONGODB_LISTINGS_DATABASE } from "~~/marketplaceVariables/index";

// src/routes/listings/listings.js

dotenv.config();

export default async function listings() {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    const database = client.db(`${MONGODB_LISTINGS_DATABASE}`);
    const collection = database.collection(`${MONGODB_LISTINGS_COLLECTION}`);
    const listings = await collection.find({}).toArray();
    
    return listings;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (client) {
      await client.close();
    }
  }
}
