import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  const register = (dataUser) => {
    setUser(dataUser); // Otomatis login setelah register
    localStorage.setItem("user", JSON.stringify(dataUser));
  };

  const login = (dataUser) => {
    setUser(dataUser);
    localStorage.setItem("user", JSON.stringify(dataUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);