import React from "react";
import SubscriptionManager from "./SubscriptionManager";
import ScheduleManager from "./ScheduleManager";
import PhotoUpload from "./PhotoUpload";
import SchedulerPage from "./SchedulerPage";
import './App.css';

function App() {
  return (
    <div>
      <h1>Washify Admin Panel</h1>
      <SubscriptionManager />
      <ScheduleManager />
      <SchedulerPage />
      <PhotoUpload />
    </div>
  );
}

export default App;
