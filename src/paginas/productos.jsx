import { useEffect, useState } from "react";
import ProductGrid from '../componentes/productosgrid'; // Tu componente actual
import { productService } from "../servicios/productoService";

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      // Reutilizamos el servicio para traer todo el catálogo desde la API
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar catálogo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Nuestros Productos</h1>
        <p className="lead">Descubre la mejor selección de moda Visual Kei y J-Rock</p>
      </div>
      
      <div className="container">
        {loading ? (
          <div className="text-center p-5">Cargando catálogo...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
} 

export default Productos;