import { useEffect, useState } from 'react';
import ProductGrid from '../componentes/productosgrid';
import { getProducts } from '../services/api'; // Importamos el servicio

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Nuestros Productos</h1>
        <p className="lead">Descubre la mejor selección de moda Visual Kei y J-Rock</p>
      </div>
      
      <div className="container">
        {loading ? (
          <div className="text-center py-5">
             <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
             </div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
} 
export default Productos;