import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await axios.get('/api/customers');
        setCustomers(res.data.data);
      } catch (err) {
        console.error('Failed to fetch customers', err);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(c => (
          <li key={c._id}>
            <strong>{c.name}</strong> - {c.mobile} - {c.address} - {c.subscriptionType}
          </li>
        ))}
      </ul>
    </div>
  );
}
