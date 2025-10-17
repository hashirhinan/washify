// src/models/Washer.js
import mongoose from 'mongoose';

const WasherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  isAvailable: { type: Boolean, default: true },
  assignedArea: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  totalWashes: { type: Number, default: 0 },
  joinedDate: { type: Date, default: Date.now },
  dailyEarnings: { type: Number, default: 0 },
  monthlyEarnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Washer || mongoose.model('Washer', WasherSchema);
