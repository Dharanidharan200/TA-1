/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
} from "react";

export const AuthContext =
  createContext();

export const useAuth = () =>
  useContext(AuthContext);

export const AuthProvider = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const [auth, setAuth] =
    useState(() => {
      const stored =
        localStorage.getItem("auth");

      return stored
        ? JSON.parse(stored)
        : null;
    });

  const login = (data) => {
    localStorage.setItem(
      "auth",
      JSON.stringify(data)
    );

    localStorage.setItem(
      "token",
      data.token
    );

    setAuth(data);
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user: auth?.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};