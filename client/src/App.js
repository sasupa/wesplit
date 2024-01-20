import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import GroupPage from "./pages/GroupPage/GroupPage.js";
import SettingsPage from "./pages/SettingsPage/SettingsPage.js";
import GroupsPage from "./pages/GroupsPage/GroupsPage.js";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import { ContextProvider } from "./Context.js";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/expenses/:groupId" element={<GroupPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
