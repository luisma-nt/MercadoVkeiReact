import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../componentes/carritocontext';
import { useAuth } from '../componentes/autentificador';
import { saleService } from '../servicios/ventasService';

function Carrito() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('es-CL', { 
        style: 'currency', 
        currency: 'CLP' 
    });
  };

// En tu archivo Carrito.js, dentro de handleCheckout:

  const handleCheckout = async () => {
    // ... validación de carrito vacío ...

    console.log("🧐 Revisando items antes de calcular total:", items);

    // 1. Recálculo final de seguridad
    const finalTotal = items.reduce((sum, item) => {
      const precio = Number(item.precio);
      const cantidad = Number(item.cantidad);
      console.log(`Item: ${item.nombre} | Precio: ${precio} | Cant: ${cantidad} | Sub: ${precio*cantidad}`);
      return sum + (precio * cantidad);
    }, 0);

    console.log("💰 Total calculado:", finalTotal);

    if (finalTotal <= 0) {
      alert(`Error: El total es $0. Revisa la consola (F12) para ver qué producto tiene precio 0.`);
      return;
    }

    // ... resto del código ...

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Tu carrito está vacío 🛒</h2>
        <p className="text-muted">Parece que no has añadido nada aún.</p>
        <Link to="/productos" className="btn btn-primary mt-3">Ver productos</Link>
      </div>
    );
  }
}

  return (
    <div className="container py-5">
       <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Tu Carrito</h1>
          <button className="btn btn-outline-danger btn-sm" onClick={clearCart} disabled={processing}>
            Vaciar Todo
          </button>
       </div>
       
       <div className="row">
          <div className="col-lg-8">
             {items.map((item) => (
                <div key={item.id} className="card mb-3 shadow-sm border-0">
                   <div className="card-body row align-items-center">
                      {/* Imagen */}
                      <div className="col-3 col-md-2">
                         <img 
                           src={item.imagen} 
                           className="img-fluid rounded" 
                           alt={item.nombre} 
                           style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                           onError={(e) => e.target.src = 'https://placehold.co/100?text=No+Img'}
                         />
                      </div>
                      
                      {/* Detalles */}
                      <div className="col-9 col-md-4">
                         <h5 className="card-title h6 mb-1">{item.nombre}</h5>
                         <small className="text-muted">Unitario: {formatCurrency(item.precio)}</small>
                      </div>

                      {/* Controles Cantidad */}
                      <div className="col-6 col-md-3 mt-3 mt-md-0">
                        <div className="input-group input-group-sm">
                           <button className="btn btn-outline-secondary" onClick={()=>updateQuantity(item.id, item.cantidad-1)}>-</button>
                           <span className="form-control text-center bg-white">{item.cantidad}</span>
                           <button className="btn btn-outline-secondary" onClick={()=>updateQuantity(item.id, item.cantidad+1)}>+</button>
                        </div>
                      </div>

                      {/* Subtotal y Borrar */}
                      <div className="col-6 col-md-3 mt-3 mt-md-0 text-end">
                        <p className="fw-bold mb-0">{formatCurrency(item.precio * item.cantidad)}</p>
                        <button className="btn btn-link text-danger p-0 text-decoration-none" onClick={()=>removeFromCart(item.id)}>
                            <small>Eliminar</small>
                        </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* Resumen de Compra */}
          <div className="col-lg-4">
             <div className="card shadow border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title">Resumen</h5>
                  <hr/>
                  <div className="d-flex justify-content-between mb-2">
                     <span>Subtotal</span>
                     <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                     <span className="fw-bold">Total a Pagar</span>
                     <span className="fw-bold fs-4 text-primary">{formatCurrency(total)}</span>
                  </div>
                  
                  <button 
                    onClick={handleCheckout} 
                    disabled={processing} 
                    className="btn btn-success w-100 py-2 fw-bold shadow-sm"
                  >
                     {processing ? (
                         <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Procesando...
                         </>
                     ) : "Pagar Ahora"}
                  </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

export default Carrito;