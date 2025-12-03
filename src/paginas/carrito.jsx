import React, { useState } from 'react'; // Agregamos useState
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../componentes/carritocontext';
import { useAuth } from '../componentes/autentificador'; // Necesitamos el usuario
import { createSaleApi } from '../services/api';

function Carrito() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth(); // Obtener usuario logueado
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // ... (El código de renderizado cuando está vacío se mantiene igual) ...
  if (items.length === 0) {
      // ... tu código existente para carrito vacío ...
      return (
        <div>
          <div className="container py-5">
            <div className="text-center">
              <h2>Tu carrito está vacío</h2>
              <Link to="/productos" className="btn btn-primary">Ver productos</Link>
            </div>
          </div>
        </div>
      );
  }

  const handleSubmit = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar");
      navigate('/ingresar');
      return;
    }

    setProcessing(true);

    // 1. Preparar el objeto Sale para el backend
    // El backend espera: { userId, total, items: [{ productId, quantity, size, price }] }
    const saleData = {
      userId: user.id,
      total: total,
      items: items.map(item => ({
        productId: item.productId, // Asegúrate que en productDetail guardas esto
        productName: item.nombre,
        quantity: item.cantidad,
        size: item.talla,
        price: item.precioValue || item.precio // Necesitamos el numero, no el string formateado
      }))
    };

    try {
      await createSaleApi(saleData);
      alert('¡Compra realizada con éxito!');
      clearCart();
      navigate('/'); // O redirigir a un historial de compras
    } catch (error) {
      alert('Error al procesar la compra: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <div className="container py-5">
        <h1 className="mb-4">Tu Carrito de Compras</h1>
        
        <div className="row">
          <div className="col-lg-8">
            {/* ... Tu código de mapeo de items existente ... */}
            {items.map((item) => (
              <div key={item.id} className="card mb-3">
                 {/* ... Contenido de la tarjeta del producto ... */}
                 {/* Asegúrate de usar item.imagen, item.nombre, etc. */}
                 <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-2">
                            {/* Nota: si la imagen es base64 muy larga, esto puede ser lento */}
                            <img src={item.imagen} alt={item.nombre} className="img-fluid rounded" style={{width:'80px'}}/>
                        </div>
                        <div className="col-md-4">
                             <h5>{item.nombre}</h5>
                             <p className="text-muted">Talla: {item.talla}</p>
                        </div>
                        {/* ... Resto de columnas (botones cantidad, precio, eliminar) ... */}
                        <div className="col-md-3">
                             <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
                             <span className="mx-2">{item.cantidad}</span>
                             <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                        </div>
                        <div className="col-md-2">${(item.precio * item.cantidad).toLocaleString()}</div>
                        <div className="col-md-1">
                             <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>X</button>
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
                
                {/* Botón Comprar modificado */}
                <button 
                  className="btn btn-success w-100 mb-2"
                  onClick={handleSubmit}
                  disabled={processing}
                >
                  {processing ? 'Procesando...' : 'Comprar'}
                </button>

                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={clearCart}
                  disabled={processing}
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