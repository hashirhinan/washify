// src/models/Customer.js
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  apartmentComplex: { type: String },
  subscriptionType: { type: String, enum: ['weekly', 'monthly'], default: 'weekly' },
  subscriptionStart: { type: Date },
  subscriptionEnd: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
