import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../componentes/autentificador';
import { getSalesByUserId } from '../services/api';

function MisCompras() {
  const { user, isAuthenticated } = useAuth();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      if (user && user.id) {
        try {
          const data = await getSalesByUserId(user.id);

          const sortedData = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          setSales(sortedData);
        } catch (err) {
          setError('No pudimos cargar tu historial de compras.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchSales();
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h3>Debes iniciar sesión para ver tus compras</h3>
        <Link to="/ingresar" className="btn btn-primary mt-3">Iniciar Sesión</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4"><i className="fas fa-shopping-bag me-2"></i>Mis Compras</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {sales.length === 0 ? (
        <div className="card shadow-sm p-5 text-center">
          <div className="mb-3">
            <i className="fas fa-box-open fa-3x text-muted"></i>
          </div>
          <h4>Aún no has realizado compras</h4>
          <p className="text-muted">¡Explora nuestro catálogo y encuentra algo único!</p>
          <div className="mt-3">
            <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {sales.map((sale) => (
            <div key={sale.id} className="col-12 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Pedido #{sale.id}</strong>
                    <span className="text-muted mx-2">|</span>
                    <span className="text-muted">
                      {new Date(sale.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="badge bg-success">Completado</div>
                </div>
                
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0">
                      <thead className="text-muted small border-bottom">
                        <tr>
                          <th>Producto</th>
                          <th>Talla</th>
                          <th className="text-center">Cant.</th>
                          <th className="text-end">Precio Unit.</th>
                          <th className="text-end">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.items.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <span className="fw-medium">{item.productName}</span>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{item.size || 'N/A'}</span>
                            </td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-end">${item.price.toLocaleString()}</td>
                            <td className="text-end fw-bold">${item.subtotal.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="card-footer bg-white border-top-0 d-flex justify-content-end py-3">
                  <div className="text-end">
                    <span className="text-muted me-2">Total Pagado:</span>
                    <span className="h4 text-primary mb-0">${sale.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisCompras;