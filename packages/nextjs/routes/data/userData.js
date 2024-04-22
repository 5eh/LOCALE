'use server'

import { MongoClient, ObjectId } from "mongodb";

// import {
//   MONGODB_ACCOUNTS_COLLECTION,
//   MONGODB_ACCOUNTS_DATABASE,
// } from "@/marketplaceVariables/index";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const dbName = `Accounts`;
  const collectionName = `Accounts_001`;

  try {
    await client.connect();
    const database = client.db(dbName);
    const accounts = database.collection(collectionName);

    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
    }

    const { creator } = req.body;

    let query = {};
    if (ObjectId.isValid(creator)) {
      query = { _id: new ObjectId(creator) };
    } else {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const results = await accounts.find(query).toArray();

    // Log the results in JSON format
    console.log("Fetched Accounts Data:", JSON.stringify(results, null, 2));

    if (results && results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "User data not found" });
    }
  } catch (error) {
    console.error("Error in API:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    await client.close();
  }
}
