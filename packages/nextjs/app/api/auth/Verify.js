// pages/api/auth/verify.js
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import {
  MONGODB_ACCOUNTS_DATABASE,
  MONGODB_ACCOUNTS_COLLECTION,
} from "../../../marketplaceVariables/index";


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
  const dbName = `${MONGODB_ACCOUNTS_DATABASE}`;
  const collectionName = `${MONGODB_ACCOUNTS_COLLECTION}`;

function generateSessionToken(user) {
  const payload = { userId: user._id };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}



export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await client.connect();
      const database = client.db(dbName);
      const accounts = database.collection(collectionName);

      const account = await accounts.findOne({ email: email });
      if (account) {
        const match = await bcrypt.compare(password, account.password);
        if (match) {
          const sessionToken = generateSessionToken(account);

          res.setHeader('Set-Cookie', cookie.serialize(process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            path: '/',
            maxAge: 3600, 
          }));

          res.status(200).json({ message: "Verification successful" });
        } else {
          res.status(401).json({ message: "Verification failed" });
        }
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    } catch (error) {
      console.error("Error in API Handler:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
