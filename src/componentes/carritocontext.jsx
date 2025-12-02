import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'cart_v9_final'; // Cambiamos la key para forzar limpieza

const initialCartState = { items: [], total: 0, itemCount: 0 };

// --- FUNCIÓN HELPER SEGURA ---
const sanitizeItem = (item) => {
  try {
    if (!item) return null;

    // 1. ID
    const rawId = item.id || item.productId || item.product_id || item._id;
    if (!rawId) return null;

    // 2. PRECIO (Lógica robusta)
    let rawPrice = item.precio;
    if (rawPrice === undefined || rawPrice === null) rawPrice = item.price;
    if (rawPrice === undefined || rawPrice === null) rawPrice = item.unitPrice;
    
    // Si viene dentro de un objeto 'product' (caso común en JPA)
    if ((rawPrice === undefined || rawPrice === null) && item.product) {
        rawPrice = item.product.price || item.product.precio;
    }
    
    // Valor por defecto si todo falla
    if (rawPrice === undefined || rawPrice === null) rawPrice = 0;

    let finalPrice = 0;

    if (typeof rawPrice === 'number') {
      finalPrice = rawPrice;
    } else if (typeof rawPrice === 'string') {
      // Quitamos todo lo que no sea número
      const cleanString = rawPrice.replace(/[^0-9]/g, '');
      finalPrice = parseInt(cleanString, 10);
    }

    if (isNaN(finalPrice)) finalPrice = 0;

    return {
      id: Number(rawId),
      nombre: item.nombre || item.productName || item.name || "Producto",
      precio: finalPrice,
      imagen: item.imagen || item.image || "https://placehold.co/100",
      cantidad: Number(item.cantidad) || 1,
      originalData: item
    };
  } catch (error) {
    console.error("Error sanitizando item:", error);
    return null;
  }
};

// --- REDUCER ---
function cartReducer(state, action) {
  try {
    switch (action.type) {
      case 'ADD_TO_CART': {
        const productToAdd = sanitizeItem(action.payload);
        if (!productToAdd) return state;

        const existingIndex = state.items.findIndex(i => i.id === productToAdd.id);
        let updatedItems;

        if (existingIndex >= 0) {
          updatedItems = [...state.items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            cantidad: updatedItems[existingIndex].cantidad + 1
          };
        } else {
          updatedItems = [...state.items, productToAdd];
        }
        return recalculateTotals(updatedItems);
      }

      case 'REMOVE_FROM_CART': {
        const filteredItems = state.items.filter(i => i.id !== action.payload);
        return recalculateTotals(filteredItems);
      }

      case 'UPDATE_QUANTITY': {
        const { id, cantidad } = action.payload;
        const updatedItems = state.items.map(i => {
          if (i.id === id) return { ...i, cantidad: Number(cantidad) };
          return i;
        });
        return recalculateTotals(updatedItems);
      }

      case 'CLEAR_CART':
        return initialCartState;

      case 'LOAD_CART':
        if (!action.payload || !Array.isArray(action.payload.items)) {
            return initialCartState;
        }
        // Sanitizamos lo que viene de memoria por si acaso
        const safeItems = action.payload.items
            .map(sanitizeItem)
            .filter(i => i !== null);
        return recalculateTotals(safeItems);

      default:
        return state;
    }
  } catch (e) {
    console.error("Error crítico en reducer:", e);
    return state; // En caso de error, devolvemos el estado anterior para no romper todo
  }
}

const recalculateTotals = (items) => {
    return {
        items,
        total: items.reduce((sum, i) => sum + (i.precio * i.cantidad), 0),
        itemCount: items.reduce((sum, i) => sum + i.cantidad, 0)
    };
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Cargar localStorage con manejo de errores
  useEffect(() => {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            dispatch({ type: 'LOAD_CART', payload: parsed });
        }
    } catch (e) {
        console.warn("LocalStorage corrupto, reseteando carrito...");
        localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Guardar localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = (prod) => dispatch({ type: 'ADD_TO_CART', payload: prod });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, cant) => {
    if (cant < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, cantidad: cant } });
  };
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart error');
  return context;
}