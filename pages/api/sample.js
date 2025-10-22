// Step 3.1: Import MongoDB connection
import { connectToDatabase } from '@/lib/mongodb';

// Step 3.2: Export default handler function
export default async function handler(req, res) {
  
  // Step 3.3: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Step 3.4: Connect to MongoDB database
    const { db } = await connectToDatabase();

    // Step 3.5: Create sample customer data
    const sampleCustomer = {
      name: 'John Doe',
      phone: '9876543210',
      address: 'Sahakarnagar, Bangalore',
      plan: 'Monthly',
      status: 'Active',
      createdAt: new Date()
    };

    // Step 3.6: Create sample washer data
    const sampleWasher = {
      name: 'Raj Kumar',
      phone: '9123456789',
      experience: '3 years',
      available: true,
      rating: 4.5,
      createdAt: new Date()
    };

    // Step 3.7: Create sample appointment data
    const sampleAppointment = {
      customerName: 'John Doe',
      washerName: 'Raj Kumar',
      date: new Date(),
      time: '10:00 AM',
      status: 'Scheduled',
      address: 'Sahakarnagar, Bangalore',
      createdAt: new Date()
    };

    // Step 3.8: Insert sample customer into database
    await db.collection('customers').insertOne(sampleCustomer);
    
    // Step 3.9: Insert sample washer into database
    await db.collection('washers').insertOne(sampleWasher);
    
    // Step 3.10: Insert sample appointment into database
    await db.collection('appointments').insertOne(sampleAppointment);

    // Step 3.11: Send success response
    res.status(200).json({ 
      message: 'Sample data added successfully',
      success: true 
    });
    
  } catch (error) {
    // Step 3.12: If error occurs, send error response
    console.error('Sample API error:', error);
    res.status(500).json({ 
      message: 'Failed to add sample data', 
      error: error.message 
    });
  }
}
