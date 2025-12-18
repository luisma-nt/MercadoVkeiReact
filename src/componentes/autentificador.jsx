import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUserApi, registerUserApi } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginUserApi(email, password); 
      

      const isAdmin = userData.role === 'ADMIN';
      
      const userToSave = {
        id: userData.id,
        nombre: userData.firstName,
        apellido: userData.lastName,
        email: userData.email,
        avatar: userData.avatar, 
        createdAt: userData.dateOfBirth, 
        role: userData.role,
        isAdmin: isAdmin
      };
      
      setUser(userToSave);
      localStorage.setItem('user', JSON.stringify(userToSave));
      return userToSave;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await registerUserApi(userData);
      

      const isAdmin = newUser.role === 'ADMIN';
   
      const userToSave = {
        id: newUser.id,
        nombre: newUser.firstName,
        apellido: newUser.lastName,
        email: newUser.email,
        avatar: newUser.avatar, 
        createdAt: new Date().toISOString(),
        role: newUser.role, 
        isAdmin: isAdmin   
      };

      setUser(userToSave);
      localStorage.setItem('user', JSON.stringify(userToSave));
      return userToSave;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}