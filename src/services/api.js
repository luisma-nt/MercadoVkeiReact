
const USER_API_URL = "https://marisa-shop-user-service.onrender.com/api/users";
const PRODUCT_API_URL = "https://marisa-shop-product-service.onrender.com/api/products";
const SALE_API_URL = "https://marisa-shop.onrender.com/api/sales";
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
    

    sizes: backendProduct.sizes ? backendProduct.sizes.map(s => s.name) : [],


    rawSizes: backendProduct.sizes ? backendProduct.sizes.map(s => ({ 
      name: s.name, 
      stock: s.stock 
    })) : [],

    categories: backendProduct.categories 
      ? backendProduct.categories.map(c => c.name ? c.name.trim() : 'Sin Categoría') 
      : [],
      
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

  const payload = {
    username: userData.email.split('@')[0], 
    email: userData.email,
    password: userData.password,
    firstName: userData.nombre,
    lastName: userData.apellido,
    phone: userData.telefono,
    avatar: userData.avatar,
    role: userData.role
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


export const createProductApi = async (productData) => {

  const response = await fetch(`${PRODUCT_API_URL}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 

    },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Error al crear el producto');
  }
  return await response.json();
};



export const getSalesByUserId = async (userId) => {

  const SALE_API_URL = "https://marisa-shop.onrender.com/api/sales"; 
  
  const response = await fetch(`${SALE_API_URL}/user/${userId}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener el historial de compras');
  }
  return await response.json();
};



export const updateProductApi = async (id, productData) => {
  const response = await fetch(`${PRODUCT_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el producto');
  }
  return await response.json();
};

export const deleteProductApi = async (id) => {
  const response = await fetch(`${PRODUCT_API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
  return true; 
};