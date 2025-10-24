import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let client;

  try {
    // Connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db('washify'); // Your database name
    
    // Sample data
    const sampleCustomers = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        address: 'Apartment 101, Sahakarnagar',
        subscriptionPlan: 'monthly',
        createdAt: new Date()
      },
      {
        name: 'Priya Singh',
        email: 'priya@example.com',
        phone: '9876543211',
        address: 'Apartment 202, Sahakarnagar',
        subscriptionPlan: 'quarterly',
        createdAt: new Date()
      }
    ];

    const sampleWashers = [
      {
        name: 'Ravi Washer',
        email: 'ravi@example.com',
        phone: '9876543220',
        rating: 4.5,
        isAvailable: true,
        createdAt: new Date()
      },
      {
        name: 'Arjun Cleaner',
        email: 'arjun@example.com',
        phone: '9876543221',
        rating: 4.8,
        isAvailable: true,
        createdAt: new Date()
      }
    ];

    const sampleAppointments = [
      {
        customerId: 'customer_1',
        washerId: 'washer_1',
        date: new Date(Date.now() + 86400000), // Tomorrow
        time: '10:00 AM',
        status: 'scheduled',
        serviceType: 'basic',
        createdAt: new Date()
      },
      {
        customerId: 'customer_2',
        washerId: 'washer_2',
        date: new Date(Date.now() + 172800000), // Day after tomorrow
        time: '2:00 PM',
        status: 'scheduled',
        serviceType: 'premium',
        createdAt: new Date()
      }
    ];

    // Insert sample data into collections
    const customersResult = await db.collection('customers').insertMany(sampleCustomers);
    const washersResult = await db.collection('washers').insertMany(sampleWashers);
    const appointmentsResult = await db.collection('appointments').insertMany(sampleAppointments);

    res.status(200).json({
      success: true,
      message: 'Sample data added successfully!',
      insertedCustomers: customersResult.insertedCount,
      insertedWashers: washersResult.insertedCount,
      insertedAppointments: appointmentsResult.insertedCount
    });

  } catch (error) {
    console.error('Error adding sample data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
