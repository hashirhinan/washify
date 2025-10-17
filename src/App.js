import { db } from './firebase'; // This connects to your Firebase config
import { collection, addDoc, getDocs } from 'firebase/firestore';
import React from "react";
import SubscriptionManager from "./SubscriptionManager";
import ScheduleManager from "./ScheduleManager";
import PhotoUpload from "./PhotoUpload";
import './App.css';

function App() {
  return (
    <div>
      <h1>Washify Admin Panel</h1>
      <SubscriptionManager />
      <ScheduleManager />
      <PhotoUpload />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function SchedulerPage() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: '', mobile: '', address: '', category: '', rating: '' });

  useEffect(() => {
    async function fetchBookings() {
      const querySnapshot = await getDocs(collection(db, "BOOKINGS"));
      setBookings(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    fetchBookings();
  }, []);

  const addBooking = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "BOOKINGS"), { ...newBooking, rating: Number(newBooking.rating) || 0 });
    setNewBooking({ name: '', mobile: '', address: '', category: '', rating: '' });
    const querySnapshot = await getDocs(collection(db, "BOOKINGS"));
    setBookings(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleChange = (e) => setNewBooking({ ...newBooking, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Car Wash Scheduler & Subscription Manager</h2>
      <form onSubmit={addBooking}>
        <input name="name" placeholder="Customer Name" value={newBooking.name} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" value={newBooking.mobile} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={newBooking.address} onChange={handleChange} required />
        <select name="category" value={newBooking.category} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <input name="rating" type="number" placeholder="Customer Rating" value={newBooking.rating} onChange={handleChange} />
        <button type="submit">Add Booking</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Mobile</th><th>Address</th><th>Type</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.name}</td><td>{b.mobile}</td><td>{b.address}</td>
              <td>{b.category}</td><td>{b.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulerPage;
