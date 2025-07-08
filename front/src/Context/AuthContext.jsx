import React, { createContext, useState } from "react";
export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "https://air-back.onrender.com";
  let [loading, setLoading] = useState(false);
  let value = {
    serverUrl,
    loading,
    setLoading,
  };
  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
