import React, { createContext, useContext } from "react";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const isAdmin = (user) => {
    return user?.role === "admin";
  };

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
