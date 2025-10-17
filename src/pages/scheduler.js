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
            name: 'Rajesh Kumar',
            mobile: '9876543210',
            address: 'Brigade Harmony, Sahakarnagar',
            subscriptionType: 'weekly',
            subscriptionStart: new Date()
          })
        }),
        fetch('/api/washers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Suresh Washer',
            mobile: '8765432109',
            assignedArea: 'Sahakarnagar North',
            isAvailable: true
          })
        })
      ])
      fetchData()
      alert('✅ Sample data added to MongoDB!')
    } catch (err) {
      console.error(err)
      alert('❌ Failed to add sample data')
    }
  }

  if (loading) {
    return <div style={{ padding: '20px', fontFamily:'Arial' }}>Loading Washify data...</div>
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '30px' }}>🚗 Washify Scheduler Dashboard</h1>
      
      {customers.length === 0 && (
        <div style={{ margin: '20px 0', backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px', border: '1px solid #f59e0b' }}>
          <p><strong>🎯 Ready to test your MongoDB integration!</strong></p>
          <p>Click below to add sample customer and washer data:</p>
          <button
            onClick={addSampleData}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🎯 Add Sample Data to MongoDB
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        <section>
          <h2 style={{ color: '#059669' }}>👥 Customers ({customers.length})</h2>
          {customers.map(c => (
            <div key={c._id} style={{
              backgroundColor: '#f0fdf4',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #10b981'
            }}>
              <strong style={{ color: '#065f46' }}>{c.name}</strong> — {c.mobile}
              <div style={{ color: '#6b7280', fontSize: '14px' }}>{c.address}</div>
              <div style={{ color: '#059669', fontSize: '12px' }}>📋 {c.subscriptionType} plan</div>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ color: '#2563eb' }}>🧽 Washers ({washers.length})</h2>
          {washers.map(w => (
            <div key={w._id} style={{
              backgroundColor: w.isAvailable ? '#eff6ff' : '#fef2f2',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: w.isAvailable ? '1px solid #3b82f6' : '1px solid #ef4444'
            }}>
              <strong style={{ color: w.isAvailable ? '#1d4ed8' : '#dc2626' }}>{w.name}</strong> — {w.mobile}
              <div style={{ color: '#6b7280', fontSize: '14px' }}>{w.assignedArea}</div>
              <div style={{ 
                color: w.isAvailable ? '#059669' : '#dc2626', 
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {w.isAvailable ? '✅ Available' : '🔴 Busy'}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ color: '#f59e0b' }}>📅 Appointments ({appointments.length})</h2>
          {appointments.map(a => (
            <div key={a._id} style={{
              backgroundColor: '#fffbeb',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #f59e0b'
            }}>
              <strong style={{ color: '#d97706' }}>Status: {a.status}</strong><br/>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                📅 {new Date(a.scheduledDate).toLocaleDateString('en-IN')} at {new Date(a.scheduledDate).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}