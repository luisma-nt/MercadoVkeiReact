
import { Link } from 'react-router-dom';

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <Link to={`/producto/${product.id}`}>
              <img src={product.images[0]} alt={product.name} className="product-image" />
              <img src={product.images[1]} alt={`${product.name} - Vista alternativa`} className="product-image-alternative" />
            </Link>

          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;