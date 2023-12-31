// apiUtils.js
const BASE_URL = "https://wesplit-backend.glitch.me/api";

// Function to fetch groups
export const fetchGroups = async () => {
  try {
    const response = await fetch(`${BASE_URL}/groups/`);
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