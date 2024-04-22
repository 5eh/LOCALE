// pages/api/auth/Test.js
import { MongoClient } from "mongodb";
import {
  MONGODB_ACCOUNTS_DATABASE,
  MONGODB_ACCOUNTS_COLLECTION,
} from "../../../marketplaceVariables/index";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
  const dbName = `${MONGODB_ACCOUNTS_DATABASE}`;
  const collectionName = `${MONGODB_ACCOUNTS_COLLECTION}`;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email } = req.query;  // Getting email from query parameters

    try {
      await client.connect();
      const database = client.db(dbName);
      const accounts = database.collection(collectionName);

      const account = await accounts.findOne({ email: email });

      if (account) {
        console.log("User found");
        // Exclude password field from the result
        const { password, ...userWithoutPassword } = account;
        res.status(200).json({ user: userWithoutPassword });
      } else {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error in API Handler:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
