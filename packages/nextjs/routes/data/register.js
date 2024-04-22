// src/routes/data/register.js
"use server";

import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

// src/routes/data/register.js

const SALT_ROUNDS = 10;

export default async function register(userData) {
  const { email, username, password } = userData;
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("Accounts");
    const collection = database.collection("Accounts_001");

    // Check if the email or username already exists
    const existingUser = await collection.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return { ok: false, error: "Email or username already exists, please log in instead or try again" };
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = { email, username, password: hashedPassword };
    const result = await collection.insertOne(newUser);

    if (result.acknowledged) {
      return { ok: true, redirectUrl: "/profile/createProfile" };
    } else {
      return { ok: false, error: "Failed to register user" };
    }
  } catch (err) {
    console.error("Error:", err);
    return { ok: false, error: "Failed to register user" };
  } finally {
    await client.close();
  }
}
