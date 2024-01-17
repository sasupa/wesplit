// apiUtils.js
const BASE_URL = "http://localhost:5100/wesplit/api/v1";

// Function to test API
export const testAPI = async () => {
  try {
    const response = await fetch(`http://localhost:5100/`, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;  // Return the list of groups
  } catch (error) {
    console.error("Test failed", error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

// Function to fetch groups
export const fetchGroups = async () => {
  try {
    const response = await fetch(`${BASE_URL}/group/user/65a7f98cf94114267cda436e`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;  // Return the list of groups
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};

// Function to fetch groups
export const fetchGroupTransactions = async (groupID) => {
  try {
    const response = await fetch(`${BASE_URL}/groups/${groupID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;  // Return the list of groups
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    // You might want to handle the error differently depending on your app's needs
    throw error;
  }
};