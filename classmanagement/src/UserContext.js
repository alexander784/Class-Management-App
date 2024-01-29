
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
    
//     setCurrentUser({ username: 'testUser' });
//   }, []);

  const loginUser = (user) => {
   
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
