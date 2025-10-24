'use client';
import { useState, useEffect } from 'react';

export default function Scheduler() {
  const [data, setData] = useState({
    customers: [],
    washers: [],
    appointments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to fetch data');
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAddSampleData = async () => {
    try {
      const response = await fetch('/api/sample', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to add sample data');
      alert('Sample data added!');
      await loadData();
    } catch (err) {
      alert('Error adding data: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '40px', marginRight: '10px' }}>🚗</span>
        <h1 style={{ margin: 0, color: '#2196F3' }}>Washify Dashboard</h1>
      </div>
      <div style={{ backgroundColor: '#fff3cd', padding: '20px', margin: '20px 0', borderRadius: '8px', border: '2px solid #ffc107' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>🔧</span>
          <h3 style={{ margin: 0 }}>Add Sample Data</h3>
        </div>
        <button onClick={handleAddSampleData} style={{ backgroundColor: '#ff9800', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Add Data</button>
      </div>
      {loading && (<p style={{ fontSize: '18px', color: '#666' }}>⏳ Loading data...</p>)}
      {error && (<p style={{ color: 'white', backgroundColor: '#f44336', padding: '15px', borderRadius: '5px' }}>❌ Error: {error}</p>)}
      {!loading && !error && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ border: '3px solid #4CAF50', padding: '30px', borderRadius: '10px', flex: '1', minWidth: '250px', backgroundColor: '#f1f8f4', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
            <h2 style={{ margin: '10px 0', color: '#4CAF50' }}>Customers</h2>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>{data.customers.length}</p>
          </div>
          <div style={{ border: '3px solid #2196F3', padding: '30px', borderRadius: '10px', flex: '1', minWidth: '250px', backgroundColor: '#f1f7fc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🧽</div>
            <h2 style={{ margin: '10px 0', color: '#2196F3' }}>Washers</h2>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>{data.washers.length}</p>
          </div>
          <div style={{ border: '3px solid #FF9800', padding: '30px', borderRadius: '10px', flex: '1', minWidth: '250px', backgroundColor: '#fff8f1', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📅</div>
            <h2 style={{ margin: '10px 0', color: '#FF9800' }}>Appointments</h2>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>{data.appointments.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
