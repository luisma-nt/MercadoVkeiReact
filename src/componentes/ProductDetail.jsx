import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from './carritocontext';

function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };


  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla antes de añadir al carrito.');
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      nombre: product.name,
      precio: product.priceValue,
      imagen: product.images[0],
      cantidad: quantity,
      talla: selectedSize,
      precioFormateado: product.price
    };

    addToCart(cartItem);
    alert(`¡Producto añadido al carrito! ${quantity} x ${product.name} Talla ${selectedSize}`);
    
    setQuantity(1);
    setSelectedSize('');
  };

  return (
    <div className="product-detail-container">
      <Link to="/productos" className="back-link">
        <i className="fas fa-arrow-left"></i> Volver a productos
      </Link>
      
      <div className="product-detail-card">
        <div className="product-detail-main">
    
          <div className="product-detail-image">
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="carousel-inner">
                {product.images.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img 
                      src={image} 
                      className="d-block w-100" 
                      alt={`${product.name} - Vista ${index + 1}`} 
                    />
                  </div>
                ))}
              </div>
              
              <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>

      
          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-price">{product.price}</p>
            
            <div className="product-detail-description">
              {product.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="product-detail-specs">
              <div className="spec-item">
                <span className="spec-label">Talla:</span>
                <span className="spec-value">
                  <select 
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="form-select"
                    style={{ width: '200px' }}
                  >
                    <option value="">Selecciona tu talla</option>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{product.specs.material}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Color:</span>
                <span className="spec-value">{product.specs.color}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Disponibilidad:</span>
                <span className="spec-value" style={{ color: '#28a745' }}>
                  {product.specs.availability}
                </span>
              </div>
            </div>
            
            <div className="quantity-selector">
              <span style={{ marginRight: '15px', fontWeight: '600' }}>Cantidad:</span>
              <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
              <input 
                type="number" 
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input" 
                min="1" 
                max="10"
              />
              <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
            
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i> Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;