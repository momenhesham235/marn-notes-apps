import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser(token);
    }
  }, []);

  const registerUser = async (userData) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();

    if (data.success) {
      setUser(data.token);
      // save to local storage
      localStorage.setItem("token", data.token);
      toast.success("Registration successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }

    if (!data.success) {
      console.log(data.error);
      toast.error(data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const loginUser = async (userData) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();

    if (data.success) {
      setUser(data.token);
      // save to local storage
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
    }

    if (!data.success) {
      toast.error(data.error);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");
  };

  const value = {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
