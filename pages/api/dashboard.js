import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db('washify');
    const customers = await db.collection('customers').find({}).toArray();
    const washers = await db.collection('washers').find({}).toArray();
    const appointments = await db.collection('appointments').find({}).toArray();
    res.status(200).json({ customers, washers, appointments });
  } catch (error) {
    res.status(500).json({ error: error.message, customers: [], washers: [], appointments: [] });
  } finally {
    if (client) await client.close();
  }
}
