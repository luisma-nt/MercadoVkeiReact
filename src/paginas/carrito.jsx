
import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../componentes/carritocontext';

function Carrito() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div>
        
        <div className="container py-5">
          <div className="text-center">
            <h2>Tu carrito está vacío</h2>
            <p>¡Descubre nuestros productos y añade algo especial!</p>
            <Link to="/productos" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </div>
      
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('ha comprao xd');
    alert('¡Gracias por su compra pe!');
    
  };

  return (
    <div>
      
      <div className="container py-5">
        <h1 className="mb-4">Tu Carrito de Compras</h1>
        
        <div className="row">
          <div className="col-lg-8">
            {items.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre}
                        className="img-fluid rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-4">
                      <h5 className="card-title">{item.nombre}</h5>
                      <p className="text-muted">Talla: {item.talla}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex align-items-center">
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <span className="mx-3">{item.cantidad}</span>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p className="card-text fw-bold">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-md-1">
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Resumen del Pedido</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total ({items.reduce((sum, item) => sum + item.cantidad, 0)} productos):</span>
                  <span className="fw-bold">${total.toLocaleString()}</span>
                </div>
                <button 
                  className="btn btn-success w-100 mb-2"
                  onClick={() => {
                    clearCart();
                    alert('¡Gracias por su compra!');
                  }}
                >
                  Comprar
                </button>

                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Carrito;