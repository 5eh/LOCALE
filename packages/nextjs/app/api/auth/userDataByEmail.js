// src/app/api/auth/userDataByEmail
'use server';

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
    }

    const email = req.query.email; // Retrieve the email from the query parameters

    if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const dbName = "Accounts";
    const collectionName = "Accounts_001";

    try {
        await client.connect();
        const database = client.db(dbName);
        const accounts = database.collection(collectionName);

        let query = { email: email };
        const results = await accounts.find(query).toArray();

        if (results && results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "User data not found" });
        }
    } catch (error) {
        console.error("Error in API:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
        await client.close();
    }
}
