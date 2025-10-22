import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('washify');
  const collection = db.collection('customers');

  if (req.method === 'GET') {
    const customers = await collection.find({}).toArray();
    res.json({ success: true, data: customers });
  } else if (req.method === 'POST') {
    const newCustomer = req.body;
    const result = await collection.insertOne(newCustomer);
    res.json({ success: true, data: result });
  } else if (req.method === 'DELETE') {
    const { mobile, address } = req.body;
    const result = await collection.deleteOne({ mobile, address });
    res.json({ success: true, data: result });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
