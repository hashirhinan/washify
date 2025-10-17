import React, { useState } from "react";

const initialSchedules = [
  { id: 1, carOwner: "Ravi Kumar", carModel: "Swift", date: "2025-10-18", time: "10:00 AM" },
  { id: 2, carOwner: "Meena", carModel: "Innova", date: "2025-10-19", time: "3:00 PM" },
];

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [carOwner, setCarOwner] = useState("");
  const [carModel, setCarModel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addSchedule = () => {
    if (!carOwner || !carModel || !date || !time) {
      alert("Please fill all fields");
      return;
    }
    const newSchedule = { id: Date.now(), carOwner, carModel, date, time };
    setSchedules([...schedules, newSchedule]);
    setCarOwner("");
    setCarModel("");
    setDate("");
    setTime("");
  };

  return (
    <div>
      <h2>Car Wash Schedules</h2>
      <ul>
        {schedules.map((s) => (
          <li key={s.id}>
            {s.carOwner} - {s.carModel} on {s.date} at {s.time}
          </li>
        ))}
      </ul>

      <h3>New Schedule</h3>
      <input
        type="text"
        placeholder="Car Owner"
        value={carOwner}
        onChange={(e) => setCarOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Car Model"
        value={carModel}
        onChange={(e) => setCarModel(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={addSchedule}>Add Schedule</button>
    </div>
  );
}
