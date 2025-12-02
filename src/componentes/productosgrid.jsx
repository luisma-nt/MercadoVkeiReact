import { Link } from 'react-router-dom';

export default function ProductGrid({ products }) {
  
  if (!products || !Array.isArray(products)) {
    return <div className="p-4 text-center">No hay productos para mostrar.</div>;
  }

  // Lógica de imagen: Prioridad al Base64
  const getImage = (product) => {
    if (product.image) return product.image;

    const nombre = product.nombre || "Producto";
    const text = encodeURIComponent(nombre);
    return `https://placehold.co/400x500/333/fff?text=${text}`;
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <Link to={`/producto/${product.id}`}>
              <img 
                src={getImage(product)} 
                alt={product.nombre || "Producto"} 
                className="product-image" 
              />
            </Link>
          </div>
          
          <div className="product-info">
            {/* Ahora el título también es un Link para mejor UX */}
            <h3 className="product-name">
              <Link to={`/producto/${product.id}`} className="text-decoration-none text-dark">
                {product.nombre || "Sin Nombre"}
              </Link>
            </h3>
            
            <p className="product-price">
              ${product.precio?.toLocaleString('es-CL') || "0"}
            </p>
            {product.category && <span className="text-xs text-gray-500 block">{product.category}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}