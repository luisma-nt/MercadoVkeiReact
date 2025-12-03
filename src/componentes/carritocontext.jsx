
import React, { createContext, useContext, useReducer } from 'react';


const CartContext = createContext();


const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
       
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + action.payload.cantidad }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: state.total + (action.payload.precio * action.payload.cantidad),
          itemCount: state.itemCount + action.payload.cantidad
        };
      } else {
      
        return {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + (action.payload.precio * action.payload.cantidad),
          itemCount: state.itemCount + action.payload.cantidad
        };
      }

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        total: state.total - (itemToRemove.precio * itemToRemove.cantidad),
        itemCount: state.itemCount - itemToRemove.cantidad
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          const quantityDiff = action.payload.cantidad - item.cantidad;
          return { ...item, cantidad: action.payload.cantidad };
        }
        return item;
      });

      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      const quantityDiff = action.payload.cantidad - itemToUpdate.cantidad;

      return {
        ...state,
        items: updatedItems,
        total: state.total + (itemToUpdate.precio * quantityDiff),
        itemCount: state.itemCount + quantityDiff
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}


export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (producto) => {
    dispatch({ type: 'ADD_TO_CART', payload: producto });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, cantidad: nuevaCantidad } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}