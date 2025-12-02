import { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../servicios/usuarioService';

const AuthContext = createContext();

// --- CONFIGURACIÓN DE SEGURIDAD ---
// CAMBIA ESTE CORREO POR EL TUYO PARA SER ADMINISTRADOR
const ADMIN_EMAIL = "luis.manuel.nt@gmail.com"; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Al iniciar, revisamos si hay usuario guardado en el navegador
  useEffect(() => {
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Calculamos si es admin automáticamente
  const isAdmin = user && user.email === ADMIN_EMAIL;

  const login = async (email, password) => {
    try {
      const userData = await userService.login({ email, password });
      setUser(userData);
      localStorage.setItem('user_session', JSON.stringify(userData));
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      await userService.register(formData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  return (
    // Pasamos 'isAdmin' a toda la app para que NavBar y Admin lo usen
    <AuthContext.Provider value={{ user, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
