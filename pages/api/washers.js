// pages/api/washers.js
import dbConnect from '../../src/mongodb';
import Washer from '../../src/models/Washer';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const washers = await Washer.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: washers });
      } catch (error) {
        console.error('GET washers error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const washer = await Washer.create(req.body);
        res.status(201).json({ success: true, data: washer });
      } catch (error) {
        console.error('POST washer error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
