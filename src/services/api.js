// Configura aquí los puertos donde corren tus servicios Spring Boot
const USER_API_URL = "http://localhost:8081/api/users";
const PRODUCT_API_URL = "http://localhost:8082/api/products";
const SALE_API_URL = "http://localhost:8083/api/sales";

// --- SERVICIO DE PRODUCTOS ---

const formatProduct = (backendProduct) => {
  return {
    id: backendProduct.id,
    name: backendProduct.nombre,
    description: backendProduct.descripcion ? [backendProduct.descripcion] : [],
    price: `$${backendProduct.precio.toLocaleString()}`,
    priceValue: backendProduct.precio,
    images: backendProduct.images && backendProduct.images.length > 0 
      ? backendProduct.images.map(img => img.imageBase64) 
      : ["https://via.placeholder.com/300"],
    
    // CORRECCIÓN AQUÍ:
    // Mapeamos el array de objetos para obtener solo el nombre ("name") de cada talla
    sizes: backendProduct.sizes ? backendProduct.sizes.map(sizeObj => sizeObj.name) : [],
    
    specs: {
      availability: backendProduct.stock > 0 ? "En stock" : "Agotado",
      material: "No especificado",
      color: "Varios"
    }
  };
};

export const getProducts = async () => {
  try {
    const response = await fetch(PRODUCT_API_URL);
    if (!response.ok) throw new Error("Error al cargar productos");
    const data = await response.json();
    return data.map(formatProduct);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/${id}`);
    if (!response.ok) throw new Error("Producto no encontrado");
    const data = await response.json();
    return formatProduct(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// --- SERVICIO DE USUARIOS ---

export const loginUserApi = async (email, password) => {
  const response = await fetch(`${USER_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Error en credenciales');
  }
  return await response.json();
};

export const registerUserApi = async (userData) => {
  // Adaptamos los datos del form al modelo User.java
  const payload = {
    username: userData.email.split('@')[0], // Generamos username del email
    email: userData.email,
    password: userData.password,
    firstName: userData.nombre,
    lastName: userData.apellido,
    phone: userData.telefono,
    avatar: userData.avatar // <--- AGREGAR ESTA LÍNEA
  };

  const response = await fetch(`${USER_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Error en registro');
  }
  return await response.json();
};

// --- SERVICIO DE VENTAS ---

export const createSaleApi = async (saleData) => {
  const response = await fetch(SALE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saleData)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Error al procesar la venta');
  }
  return await response.json();
};

// --- ADMIN: CREAR PRODUCTO ---
export const createProductApi = async (productData) => {
  // El backend espera el token o la sesión, asegúrate de tener CORS configurado
  const response = await fetch("http://localhost:8082/api/products", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
      // 'Authorization': `Bearer ${token}` // Si implementas seguridad más adelante
    },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Error al crear el producto');
  }
  return await response.json();
};

// --- HISTORIAL DE COMPRAS ---

export const getSalesByUserId = async (userId) => {
  // Asumiendo que sale_service corre en el puerto 8083 (ajusta si es diferente)
  const SALE_API_URL = "http://localhost:8083/api/sales"; 
  
  const response = await fetch(`${SALE_API_URL}/user/${userId}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener el historial de compras');
  }
  return await response.json();
};