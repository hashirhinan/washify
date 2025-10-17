// pages/api/appointments.js
import dbConnect from '../../src/mongodb';
import Appointment from '../../src/models/Appointment';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const appointments = await Appointment.find({})
          .populate('customerId', 'name mobile address')
          .populate('washerId', 'name mobile assignedArea')
          .sort({ scheduledDate: -1 });
        res.status(200).json({ success: true, data: appointments });
      } catch (error) {
        console.error('GET appointments error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, data: appointment });
      } catch (error) {
        console.error('POST appointment error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
