import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from the new location
import App from './App';
import './index.css'; // Your global CSS file

// Create a root for your app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
