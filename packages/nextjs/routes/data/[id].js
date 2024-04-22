import { MongoClient, ObjectId } from "mongodb";
import {
  MONGODB_ACCOUNTS_COLLECTION,
  MONGODB_ACCOUNTS_DATABASE,
} from "../../../marketplaceVariables/index";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const dbName = `${MONGODB_ACCOUNTS_DATABASE}`;
  const collectionName = `${MONGODB_ACCOUNTS_COLLECTION}`;

  try {
    await client.connect();
    const database = client.db(dbName);
    const listings = database.collection(collectionName);

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

    const result = await listings.findOne(query);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Listing not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    await client.close();
  }
}
