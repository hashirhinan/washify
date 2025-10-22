// Step 4.1: Import MongoDB client
import { MongoClient } from 'mongodb';

// Step 4.2: Get MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Step 4.3: Set database name (change if needed)
const MONGODB_DB = process.env.MONGODB_DB || 'washify';

// Step 4.4: Check if connection string exists
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local or Vercel');
}

// Step 4.5: Create variables to cache connection
let cachedClient = null;
let cachedDb = null;

// Step 4.6: Export connection function
export async function connectToDatabase() {
  
  // Step 4.7: If already connected, return cached connection
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Step 4.8: Create new connection to MongoDB
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Step 4.9: Select database
  const db = client.db(MONGODB_DB);

  // Step 4.10: Cache the connection for reuse
  cachedClient = client;
  cachedDb = db;

  // Step 4.11: Return connection
  return { client, db };
}
