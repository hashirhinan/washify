// pages/api/customers.js
import dbConnect from '../../src/mongodb';
import Customer from '../../src/models/Customer';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const customers = await Customer.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: customers });
      } catch (error) {
        console.error('GET customers error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ success: true, data: customer });
      } catch (error) {
        console.error('POST customer error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
