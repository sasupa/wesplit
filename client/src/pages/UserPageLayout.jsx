import React from 'react';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';

import axios from 'axios';

export const loader = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:5100/wesplit/api/v1/users/get-current-user',
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    // back to landing page if not logged in.
    return redirect('/');
  }
};

const UserPageLayout = () => {
  const data = useLoaderData();

  return (
    <>
      <Outlet context={data.user} />
    </>
  );
};

export default UserPageLayout;
