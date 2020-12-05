import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const { Consumer, Provider } = AuthContext;

const useData = () => {
  const [userDetails, setUserDetails] = useState({
    isAuthenticated: false,
  });
  const [sessionLoading, setSessionLoading] = useState(false);

  const logout = () => {
    setUserDetails({ isAuhtenticated: false });
  };

  const onLoginSuccess = (details) => {
    setSessionLoading(true);
    setUserDetails({ ...details, isAuthenticated: true });
    setSessionLoading(false);
  };

  return { userDetails, sessionLoading, onLoginSuccess, logout };
};

// export const useAuthContext = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const data = useData();
  return <Provider value={data}>{children}</Provider>;
};
