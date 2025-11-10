// paginas/Producto.jsx
import { useParams } from 'react-router-dom';

import ProductDetail from '../componentes/ProductDetail';

import { products } from '../assets/data';

function Producto() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  return (
    <div>
      
      <ProductDetail product={product} />
    
    </div>
  );
}

export default Producto;