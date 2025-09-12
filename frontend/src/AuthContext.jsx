import React, { createContext, useState, useEffect } from 'react';
import API from './api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.defaults.headers.common['x-auth-token'] = token;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      API.defaults.headers.common['x-auth-token'] = res.data.token;
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        throw new Error(err.response.data.msg);
      } else {
        throw new Error('Login failed. Please try again.');
      }

    }
  };

  const register = async (email, password) => {
    try {
      const res = await API.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      API.defaults.headers.common['x-auth-token'] = res.data.token;
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        throw new Error(err.response.data.msg);
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['x-auth-token'];
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
