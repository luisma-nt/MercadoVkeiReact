const API_URL = "http://localhost:8082/api/products";

export const productService = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      return response.ok ? await response.json() : [];
    } catch (e) {
      console.error("Error fetching products", e);
      return [];
    }
  },
  getById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Producto no encontrado");
    return await response.json();
  },
  create: async (data) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear");
    return await response.json();
  },
  update: async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar");
    return await response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar");
    return true;
  }
};