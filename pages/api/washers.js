import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('washify');
  const collection = db.collection('washers');

  if (req.method === 'GET') {
    const washers = await collection.find({}).toArray();
    res.json({ success: true, data: washers });
  } else if (req.method === 'POST') {
    const newWasher = req.body;
    const result = await collection.insertOne(newWasher);
    res.json({ success: true, data: result });
  } else if (req.method === 'DELETE') {
    const { mobile } = req.body;
    const result = await collection.deleteOne({ mobile });
    res.json({ success: true, data: result });
  } else if (req.method === 'PUT') {
    const updatedWasher = req.body;
    const filter = { mobile: updatedWasher.mobile };
    const updateDoc = { $set: updatedWasher };
    const result = await collection.updateOne(filter, updateDoc);
    res.json({ success: true, data: result });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
