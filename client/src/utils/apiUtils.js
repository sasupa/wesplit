import axios from 'axios';

// apiUtils.js, for deploying 'http://hatemyshit.com:5100/wesplit/api/v1'
const BASE_URL = 'http://localhost:5100/wesplit/api/v1';

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

// Functions to add member to a group
export const addUserToGroup = async (groupId, userId) => {
  try {
    // Prepare the request options including method, headers, and body
    const requestOptions = {
      method: 'POST', // Using POST method to send data
      headers: {
        'Content-Type': 'application/json', // Indicating the type of content being sent
      },
      body: JSON.stringify({ groupId, userId }), // Stringify your payload
    };

    // Include requestOptions with fetch call
    const response = await fetch(`${BASE_URL}/group/add`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Failed to add user to group:', error);
    throw error; // Rethrowing the error might be useful if you want to handle it further up the call chain
  }
};

// Functions to remove member to a group
export const RemoveMemberFromGroup = async (groupId, userId) => {
  try {
    // Prepare the request options including method, headers, and body
    const requestOptions = {
      method: 'POST', // Using POST method to send data
      headers: {
        'Content-Type': 'application/json', // Indicating the type of content being sent
      },
      body: JSON.stringify({ groupId, userId }), // Stringify your payload
    };

    // Include requestOptions with fetch call
    const response = await fetch(`${BASE_URL}/group/remove`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // Return the response data
  } catch (error) {
    console.error('Failed to remove user to group:', error);
    throw error; // Rethrowing the error might be useful if you want to handle it further up the call chain
  }
};


// Function to test API
export const testAPI = async () => {
  try {
    const response = await fetch(BASE_URL, { method: 'GET' });
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
