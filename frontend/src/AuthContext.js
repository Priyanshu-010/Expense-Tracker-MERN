import React, { createContext, useState, useEffect } from 'react';
import API from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (email, password) => {
    try {
      const res = await API.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};