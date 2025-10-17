// pages/scheduler.js
import React, { useState, useEffect } from 'react'

export default function SchedulerPage() {
  const [customers, setCustomers] = useState([])
  const [washers, setWashers] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [cRes, wRes, aRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/washers'),
        fetch('/api/appointments')
      ])
      const cData = await cRes.json()
      const wData = await wRes.json()
      const aData = await aRes.json()
      if (cData.success) setCustomers(cData.data)
      if (wData.success) setWashers(wData.data)
      if (aData.success) setAppointments(aData.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function addSampleData() {
    try {
      await Promise.all([
        fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Sample Customer',
            mobile: '9999999999',
            address: 'Sample Apartments',
            subscriptionType: 'weekly',
            subscriptionStart: new Date()
          })
        }),
        fetch('/api/washers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Sample Washer',
            mobile: '8888888888',
            assignedArea: 'Sample Area'
          })
        })
      ])
      fetchData()
      alert('Sample data added!')
    } catch (err) {
      console.error(err)
      alert('Failed to add sample data')
    }
  }

  if (loading) {
    return <div style={{ padding: '20px', fontFamily:'Arial' }}>Loading...</div>
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ color: '#2563eb' }}>🚗 Washify Scheduler</h1>
      {customers.length === 0 && (
        <div style={{ margin: '20px 0', backgroundColor: '#ffedd5', padding: '15px', borderRadius: '8px' }}>
          <p>No data yet. Click below to seed sample data into MongoDB:</p>
          <button
            onClick={addSampleData}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Add Sample Data
          </button>
        </div>
      )}

      <section style={{ marginBottom: '30px' }}>
        <h2>👥 Customers ({customers.length})</h2>
        {customers.map(c => (
          <div key={c._id} style={{
            backgroundColor: '#f9fafb',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '10px',
            borderLeft: '4px solid #10b981'
          }}>
            <strong>{c.name}</strong> — {c.mobile}
            <div style={{ color: '#6b7280' }}>{c.address}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>🧽 Washers ({washers.length})</h2>
        {washers.map(w => (
          <div key={w._id} style={{
            backgroundColor: w.isAvailable ? '#f0f9ff' : '#fef2f2',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '10px',
            borderLeft: w.isAvailable ? '4px solid #3b82f6' : '4px solid #ef4444'
          }}>
            <strong>{w.name}</strong> — {w.mobile}
            <div style={{ color: '#6b7280' }}>{w.assignedArea}</div>
          </div>
        ))}
      </section>

      <section>
        <h2>📅 Appointments ({appointments.length})</h2>
        {appointments.map(a => (
          <div key={a._id} style={{
            backgroundColor: '#fef3c7',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '10px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <strong>Status:</strong> {a.status}<br/>
            <strong>Date:</strong> {new Date(a.scheduledDate).toLocaleString()}
          </div>
        ))}
      </section>
    </div>
  )
}
