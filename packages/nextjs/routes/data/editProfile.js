'use server'

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, ...updateFields } = req.body;
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
     const dbName = `Accounts`;
     const collectionName = `Accounts_001`;
    
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      const result = await collection.updateOne(
        { email: email },
        { $set: updateFields }
      );

      if (result.matchedCount === 0) {
        throw new Error("No document found with the provided email.");
      }

      res.status(200).json({ message: "Profile updated", result });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to update profile. " + err.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
