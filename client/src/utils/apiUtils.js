import axios from 'axios';

// apiUtils.js
const BASE_URL = 'http://localhost:5100/wesplit/api/v1';

// Function to fetch groups
// !!! TÄSSÄ KOVAKOODATTUNA VIELÄ ETTÄ HAKEE SASUN RYHMÄT, KOSKA EI VIELÄ LOG IN FUKTIOO JOSTA SAIS KÄYTTÄJÄN ID:N
export const fetchGroups = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/group/user/65aaf7caa582eea1a7947db8`
    );
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
  console.log(values);

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, values, {
      withCredentials: true,
    });

    // Log only necessary information (e.g., status and a part of the data)
    console.log({ status: response.status, responseData: response.data });

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
