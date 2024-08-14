import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="card-container">
        <div className="card">User Info</div>
        <div className="card">Upload History</div>
        <div className="card">Settings</div>
        <div className="card">Reports</div>
      </div>
    </div>
  );
};

export default Dashboard;
