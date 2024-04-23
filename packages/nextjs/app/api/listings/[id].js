import { MongoClient, ObjectId } from "mongodb";
import {
  MONGODB_LISTINGS_COLLECTION,
  MONGODB_LISTINGS_DATABASE,
} from "~~/marketplaceVariables";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const dbName = `${MONGODB_LISTINGS_DATABASE}`;
  const collectionName = `${MONGODB_LISTINGS_COLLECTION}`;
  const { id } = req.query;

  try {
    await client.connect();
    console.log("Connected to database:", dbName);
    const database = client.db(dbName);
    const listings = database.collection(collectionName);

    if (req.method !== "GET") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
    }

    if (!id || !ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    console.log("Fetching listing with ID:", id);
    const result = await listings.findOne({ _id: new ObjectId(id) });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Listing not feafea found" });
      alert("Listing not found")
    }
  } catch (error) {
    console.error("Error in API Handler:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    await client.close();
  }
}
