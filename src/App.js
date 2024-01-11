import React from "react";
import {
  HashRouter as Router, Route, Routes
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/expenses/:groupId" element={<GroupPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/groups" element={<GroupsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
