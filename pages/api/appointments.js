import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('washify');
  const collection = db.collection('appointments');

  if (req.method === 'GET') {
    const appointments = await collection.find({}).toArray();
    res.json({ success: true, data: appointments });
  } else if (req.method === 'POST') {
    const newAppointment = req.body;
    const result = await collection.insertOne(newAppointment);
    res.json({ success: true, data: result });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const result = await collection.deleteOne({ id });
    res.json({ success: true, data: result });
  } else if (req.method === 'PUT') {
    const updatedAppointment = req.body;
    const filter = { id: updatedAppointment.id };
    const updateDoc = { $set: updatedAppointment };
    const result = await collection.updateOne(filter, updateDoc);
    res.json({ success: true, data: result });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
