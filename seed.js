const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

const customer = {
  name: 'Sample Customer',
  email: 'customer@example.com',
  phone: '9876543210',
  address: '123 Sample Street, Bangalore',
  mobile: '9876543210',
};

const washer = {
  name: 'Sample Washer',
  phone: '9123456789',
  workHours: '9 AM - 6 PM',
};

async function seed() {
  try {
    console.log('Creating customer...');
    const customerRes = await axios.post(`${API_BASE}/customers`, customer);
    console.log('Customer created:', customerRes.data);

    console.log('Creating washer...');
    const washerRes = await axios.post(`${API_BASE}/washers`, washer);
    console.log('Washer created:', washerRes.data);

    const appointment = {
      customerId: customerRes.data._id,
      washerId: washerRes.data._id,
      date: new Date().toISOString(),
    };

    console.log('Creating appointment...');
    const appRes = await axios.post(`${API_BASE}/appointments`, appointment);
    console.log('Appointment created:', appRes.data);

  } catch (error) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

seed();
