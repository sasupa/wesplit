import axios from 'axios';

// apiUtils.js
const BASE_URL = 'http://hatemyshit.com:5100/wesplit/api/v1';

// Function to fetch groups with userId
export const fetchGroups = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/group/user/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the list of groups
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

export const fetchGroupWithGroupId = async (groupID) => {
  try {
    const response = await fetch(`${BASE_URL}/group/group/${groupID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the list of groups
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

// Function to fetch group transactions
export const fetchGroupTransactions = async (groupID) => {
  try {
    const response = await fetch(`${BASE_URL}/groups/${groupID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the list of groups
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

// Function to test API
export const testAPI = async () => {
  try {
    const response = await fetch(`http://localhost:5100/`, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the list of groups
  } catch (error) {
    console.error('Test failed', error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

// Function to test API
export const login = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, values, {
      withCredentials: true,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data; // You might want to return specific data from the response
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Something failed', error.message);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

export const register = async (values) => {
  console.log(values);
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, values, {
      withCredentials: true,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data; // You might want to return specific data from the response
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Something failed', error.message);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data; // You might want to return specific data from the response
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Something failed', error.message);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};
