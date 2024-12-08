import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PatientPage from './components/PatientPage';
import DoctorPage from './components/DoctorPage';
import OfficerPage from './components/OfficerPage';
import TrainerPage from './components/TrainerPage';
import AdminPage from './components/AdminPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/patient" component={PatientPage} />
        <Route path="/doctor" component={DoctorPage} />
        <Route path="/officer" component={OfficerPage} />
        <Route path="/trainer" component={TrainerPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
