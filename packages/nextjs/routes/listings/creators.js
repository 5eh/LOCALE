// src/routes/listings/listings.js
"use server";

import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

import {
  MONGODB_ACCOUNTS_COLLECTION,
  MONGODB_ACCOUNTS_DATABASE,
} from '~~/marketplaceVariables/index.js'

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
    const database = client.db(`${MONGODB_ACCOUNTS_DATABASE}`);
    const collection = database.collection(`${MONGODB_ACCOUNTS_COLLECTION}`);
    const creators = await collection.find({}).toArray();
    console.log(creators)
    return creators;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (client) {
      await client.close();
    }
  }
}
