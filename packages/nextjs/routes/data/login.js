// src/routes/data/login.js
'use server';

const bcrypt = require('bcrypt');
const mongodb = require('mongodb');

async function login(loginData) {
  const { emailOrUsername, password } = loginData;
  const uri = process.env.MONGODB_URI;
  const client = new mongodb.MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('Accounts');
    const collection = database.collection('Accounts_001');

    // Check if the email or username exists
    const user = await collection.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user) {
      return { ok: false, error: 'Invalid email/username or password' };
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { ok: false, error: 'Invalid email/username or password' };
    }

    // Login successful, return the redirectUrl
    return { ok: true, redirectUrl: '/profile' };
  } catch (err) {
    console.error('Error:', err);
    return { ok: false, error: 'Failed to login' };
  } finally {
    await client.close();
  }
}

module.exports = login;
