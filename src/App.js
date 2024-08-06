import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import UploadReportPage from './pages/UploadReportPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/dashboard" component={PatientDashboard} />
        <Route path="/upload-report" component={UploadReportPage} />
        <Route path="/results" component={ResultsPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
