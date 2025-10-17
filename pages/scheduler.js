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
      alert('Sample data added!')
    } catch (err) {
      console.error(err)
      alert('Failed to add sample data')
    }
  }

  if (loading) {
    return <div style={{ padding: 20, fontFamily:'Arial' }}>Loading...</div>
  }

  return (
    <div style={{ fontFamily: 'Arial', padding: 20, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ color: '#2563eb', marginBottom: 30 }}>🚗 Washify Dashboard</h1>
      
      {customers.length === 0 && (
        <div style={{ margin: '20px 0', backgroundColor: '#fef3c7', padding: 20, borderRadius: 8, border: '1px solid #f59e0b' }}>
          <p><strong>🎯 Add Sample Data</strong></p>
          <button
            onClick={addSampleData}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >
            Add Data
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gap: 30, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <section>
          <h2 style={{ color: '#059669' }}>👥 Customers ({customers.length})</h2>
          {customers.map(c => (
            <div key={c._id} style={{ backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, marginBottom: 10, border: '1px solid #10b981' }}>
              <strong>{c.name}</strong> — {c.mobile}<br/>
              <small>{c.address}</small>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ color: '#2563eb' }}>🧽 Washers ({washers.length})</h2>
          {washers.map(w => (
            <div key={w._id} style={{ backgroundColor: '#eff6ff', padding: 15, borderRadius: 8, marginBottom: 10, border: '1px solid #3b82f6' }}>
              <strong>{w.name}</strong> — {w.mobile}<br/>
              <small>{w.assignedArea}</small>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ color: '#f59e0b' }}>📅 Appointments ({appointments.length})</h2>
          {appointments.map(a => (
            <div key={a._id} style={{ backgroundColor: '#fffbeb', padding: 15, borderRadius: 8, marginBottom: 10, border: '1px solid #f59e0b' }}>
              Status: {a.status}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
