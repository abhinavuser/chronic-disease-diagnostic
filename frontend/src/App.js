import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Diseases from './pages/Diseases';
import Diabetes from './pages/diseases/Diabetes';
import Alzheimer from './pages/diseases/Alzheimer';
import Tuberculosis from './pages/diseases/Tuberculosis';
import HIV from './pages/diseases/HIV';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Diseases" element={<Diseases />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/diseases/Diabetes" element={<Diabetes />} />
        <Route path="/diseases/Alzheimer" element={<Alzheimer />} />
        <Route path="/diseases/Tuberculosis" element={<Tuberculosis />} />
        <Route path="/diseases/HIV" element={<HIV />} />
      </Routes>
    </Router>
  );
}

export default App;
