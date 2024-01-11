import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import GroupPage from './pages/GroupPage/GroupPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/expenses/:groupId' element={<GroupPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/groups' element={<GroupsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
