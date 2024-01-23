import React, { useState, createContext } from "react";

// Create Context
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState([
    // BASIC APP GLOBAL VARIABLES
    { name: "WeSplit", developer: "Jani&Sasu", year: "2024", darkMode: false },
    // USER PLACEHOLDER
    { name: "undefined"},
    // GROUP PLACEHOLDER
    {name: null, members:[], transactions: []},
  ]);

  // Function to update context
  const updateContextValue = (newValue) => {
    setContextValue(newValue);
  };

  return (
    <Context.Provider value={{ contextValue, updateContextValue }}>
      {children}
    </Context.Provider>
  );
};
