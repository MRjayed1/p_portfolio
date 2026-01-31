import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (token && email) {
      setUser({ email, token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.email);
      setUser({ email: data.email, token: data.token });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
