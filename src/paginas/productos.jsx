import { useEffect, useState } from 'react';
import ProductGrid from '../componentes/productosgrid';
import CategoryFilter from '../componentes/CategoryFilter'; 
import { getProducts } from '../services/api';

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      

      const allCats = data.flatMap(p => p.categories || []);

      const uniqueCats = [...new Set(allCats)];
      setAvailableCategories(uniqueCats);
      
      setLoading(false);
    };
    fetchProducts();
  }, []);


  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter(product => 
        product.categories && product.categories.includes(selectedCategory)
      );

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
          <>

            <CategoryFilter 
              categories={availableCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-5">
                <p className="text-muted">No se encontraron productos en la categoría "{selectedCategory}".</p>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setSelectedCategory('Todas')}
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 

export default Productos;