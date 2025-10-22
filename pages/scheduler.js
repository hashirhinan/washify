'use client'; // Add this if using Next.js 13+ app directory

import { useState, useEffect } from 'react';

export default function Scheduler() {
  // Step 1.1: Create state to store data from database
  const [data, setData] = useState({
    customers: [],
    washers: [],
    appointments: []
  });
  
  // Step 1.2: Create loading state
  const [loading, setLoading] = useState(true);
  
  // Step 1.3: Create error state
  const [error, setError] = useState(null);

  // Step 1.4: Function to load data from API
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from our API endpoint
      const response = await fetch('/api/dashboard');
      
      // Check if request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      // Parse JSON response
      const json = await response.json();
      
      // Update state with fetched data
      setData(json);
      setError(null);
      
    } catch (err) {
      // If error occurs, store error message
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Step 1.5: Load data when page first loads
  useEffect(() => {
    loadData(); // This runs once when component mounts
  }, []); // Empty array = run only once

  // Step 1.6: Function to add sample data
  const handleAddSampleData = async () => {
    try {
      // Call API to insert sample data
      const response = await fetch('/api/sample', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Check if request was successful
      if (!response.ok) {
        throw new Error('Failed to add sample data');
      }
      
      // Show success message
      alert('Sample data added!');
      
      // Reload data to show updated counts
      await loadData();
      
    } catch (err) {
      // Show error if something went wrong
      alert('Error adding data: ' + err.message);
      console.error('Error adding sample data:', err);
    }
  };

  // Step 1.7: Render the page
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '40px', marginRight: '10px' }}>🚗</span>
        <h1 style={{ margin: 0, color: '#2196F3' }}>Washify Dashboard</h1>
      </div>

      {/* Add Sample Data Section */}
      <div style={{ 
        backgroundColor: '#fff3cd', 
        padding: '20px', 
        margin: '20px 0',
        borderRadius: '8px',
        border: '2px solid #ffc107'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>🔧</span>
          <h3 style={{ margin: 0 }}>Add Sample Data</h3>
        </div>
        <button 
          onClick={handleAddSampleData}
          style={{
            backgroundColor: '#ff9800',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f57c00'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff9800'}
        >
          Add Data
        </button>
      </div>

      {/* Show loading spinner while fetching data */}
      {loading && (
        <p style={{ fontSize: '18px', color: '#666' }}>⏳ Loading data...</p>
      )}

      {/* Show error message if something went wrong */}
      {error && (
        <p style={{ 
          color: 'white', 
          backgroundColor: '#f44336', 
          padding: '15px',
          borderRadius: '5px'
        }}>
          ❌ Error: {error}
        </p>
      )}

      {/* Dashboard Stats - only show when not loading and no errors */}
      {!loading && !error && (
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          
          {/* Customers Card */}
          <div style={{
            border: '3px solid #4CAF50',
            padding: '30px',
            borderRadius: '10px',
            flex: '1',
            minWidth: '250px',
            backgroundColor: '#f1f8f4',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
            <h2 style={{ margin: '10px 0', color: '#4CAF50' }}>Customers</h2>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>
              {data.customers.length}
            </p>
          </div>

          {/* Washers Card */}
          <div style={{
            border: '3px solid #2196F3',
            padding: '30px',
            borderRadius: '10px',
            flex: '1',
            minWidth: '250px',
            backgroundColor: '#f1f7fc',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🧽</div>
            <h2 style={{ margin: '10px 0', color: '#2196F3' }}>Washers</h2>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>
              {data.washers.length}
            </p>
          </div>

          {/* Appointments Card */}
          <div style={{
            border: '3px solid #FF9800',
            padding: '30px',
            borderRadius: '10px',
            flex: '1',
            minWidth: '250px',
            backgroundColor: '#fff8f1',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📅</div>
            <h2 style={{ margin: '10px 0', color: '#FF9800' }}>Appointments</h2>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>
              {data.appointments.length}
            </p>
          </div>
          
        </div>
      )}
    </div>
  );
}
