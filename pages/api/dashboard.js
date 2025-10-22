// Step 2.1: Import MongoDB connection
import { connectToDatabase } from '@/lib/mongodb';

// Step 2.2: Export default handler function
export default async function handler(req, res) {
  
  // Step 2.3: Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Step 2.4: Connect to MongoDB database
    const { db } = await connectToDatabase();

    // Step 2.5: Fetch all customers from database
    const customers = await db.collection('customers').find({}).toArray();
    
    // Step 2.6: Fetch all washers from database
    const washers = await db.collection('washers').find({}).toArray();
    
    // Step 2.7: Fetch all appointments from database
    const appointments = await db.collection('appointments').find({}).toArray();

    // Step 2.8: Send data back to frontend
    res.status(200).json({
      customers,
      washers,
      appointments
    });
    
  } catch (error) {
    // Step 2.9: If error occurs, send error response
    console.error('Dashboard API error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}
