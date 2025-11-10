
import ProductGrid from '../componentes/productosgrid';
import { products } from '../assets/data';

function Productos() {
  return (
    <div>
      <div className="page-header">
        <h1>Nuestros Productos</h1>
        <p className="lead">Descubre la mejor selección de moda Visual Kei y J-Rock</p>
      </div>
      
      <div className="container">
        <ProductGrid products={products} />
      </div>
    </div>
  );
} export default Productos;