import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const registerUser = async (userData) => {
    setUser(userData);
  };
  const loginUser = async (userData) => {
    setUser(userData);
  };
  const logoutUser = async () => {};

  const value = {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
