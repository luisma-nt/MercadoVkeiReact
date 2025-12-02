const API_URL = "http://localhost:8083/api/sales";

export const saleService = {
  createSale: async (saleData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

      const contentType = response.headers.get("content-type");
      
      // Si la respuesta no es OK (200-299)
      if (!response.ok) {
          let errorMessage = "Error desconocido al procesar la venta";
          
          // Intentamos leer el mensaje de error del backend
          if (contentType && contentType.includes("application/json")) {
              const errorData = await response.json();
              // Spring Boot suele mandar el error en .message o como string directo
              errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          } else {
              errorMessage = await response.text();
          }
          
          throw new Error(errorMessage);
      }

      // Si todo sale bien
      return await response.json();

    } catch (error) {
      console.error("Error en saleService:", error);
      throw error; // Re-lanzamos para que el componente lo capture
    }
  }
};