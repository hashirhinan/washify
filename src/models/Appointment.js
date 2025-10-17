// src/models/Appointment.js
import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  washerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Washer', required: true },
  scheduledDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  carType: { type: String, default: 'Sedan' },
  carNumber: { type: String },
  specialInstructions: { type: String },
  washType: { type: String, enum: ['basic', 'premium', 'deluxe'], default: 'basic' },
  price: { type: Number, default: 299 },
  washPhotos: [{ type: String }], // URLs to before/after photos
  customerFeedback: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  startTime: { type: Date },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
