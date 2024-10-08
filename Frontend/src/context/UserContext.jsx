import React, { createContext, useState } from "react";

// Create UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    user: null, // Change to null for clearer default state
    token: null, // Change to null for clearer default state
  });

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};
