// src/services/userService.js
// Asumiendo que el User Service corre en 8081
const API_URL = "http://localhost:8081/api/users";

export const userService = {
  // REGISTRO
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Error al registrar");
    }
    return await response.json();
  },

  // LOGIN
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error("Credenciales inválidas");
    }
    return await response.json(); // Devuelve el objeto User completo
  }
};