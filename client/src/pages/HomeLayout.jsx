import React from 'react';
//Outlet: shows children
import { Outlet } from 'react-router-dom';
import { ContextProvider } from '../Context.js';
import axios from 'axios';

const HomeLayout = () => {
  return (
    <>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </>
  );
};

export default HomeLayout;
