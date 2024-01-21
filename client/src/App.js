// import React from "react";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Error from './pages/ErrorPage.jsx';
import Login from './pages/LoginPage/LoginPage.jsx';
import GroupPageLayout from './pages/GroupPageLayout.jsx';
import Register from './pages/RegisterPage.jsx';

import { loader as groupsPageLoader } from './pages/GroupPageLayout.jsx';

import GroupPage from './pages/GroupPage/GroupPage.js';
import SettingsPage from './pages/SettingsPage/SettingsPage.js';
import GroupsPage from './pages/GroupsPage/GroupsPage.js';
import './App.css';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import { ContextProvider } from './Context.js';
import HomeLayout from './pages/HomeLayout.jsx';

//Routes

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'groups',
        element: <GroupPageLayout />,
        loader: groupsPageLoader,
        children: [
          {
            index: true,
            element: <GroupsPage />,
          },
          {
            path: ':groupId',
            element: <GroupPage />,
          },
        ],
      },
    ],
  },
]);

//APP INIT

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

//TALTEEN

// <ContextProvider>
//   <Router>
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/expenses/:groupId" element={<GroupPage />} />
//       <Route path="/settings" element={<SettingsPage />} />
//       <Route path="/groups" element={<GroupsPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignUpPage />} />
//     </Routes>
//   </Router>
// </ContextProvider>
