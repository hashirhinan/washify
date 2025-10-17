import React, { useState } from "react";

const initialPlans = [
  { id: 1, name: "Weekly Plan", washesPerWeek: 3, interiorPerWeek: 1 },
  { id: 2, name: "Monthly Plan", washesPerMonth: 12, interiorPerMonth: 4 },
];

export default function SubscriptionManager() {
  const [plans, setPlans] = useState(initialPlans);
  const [newPlanName, setNewPlanName] = useState("");
  const [washes, setWashes] = useState("");
  const [interior, setInterior] = useState("");

  const addPlan = () => {
    if (!newPlanName || !washes) {
      alert("Please enter plan name and number of washes");
      return;
    }
    const newPlan = {
      id: Date.now(),
      name: newPlanName,
      washesPerWeek: washes,
      interiorPerWeek: interior || 0
    };
    setPlans([...plans, newPlan]);
    setNewPlanName("");
    setWashes("");
    setInterior("");
  };

  return (
    <div>
      <h2>Subscription Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            {plan.name}: {plan.washesPerWeek || plan.washesPerMonth} washes, {plan.interiorPerWeek || plan.interiorPerMonth} interior washes
          </li>
        ))}
      </ul>
      <h3>Add New Plan</h3>
      <input
        type="text"
        placeholder="Plan Name"
        value={newPlanName}
        onChange={e => setNewPlanName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Washes Per Week"
        value={washes}
        onChange={e => setWashes(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interior Washes Per Week (optional)"
        value={interior}
        onChange={e => setInterior(e.target.value)}
      />
      <button onClick={addPlan}>Add Plan</button>
    </div>
  );
}
