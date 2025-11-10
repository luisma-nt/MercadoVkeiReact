
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userInfo = { ...user };
          delete userInfo.password;
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
          resolve(userInfo);
        } else {
          reject(new Error('Email o contraseña incorrectos'));
        }
      }, 1000);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
   
        if (users.find(u => u.email === userData.email)) {
          reject(new Error('El email ya está registrado'));
          return;
        }

        const newUser = {
          id: Date.now(),
          ...userData,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const userInfo = { ...newUser };
        delete userInfo.password;
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        resolve(userInfo);
      }, 1000);
    });
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