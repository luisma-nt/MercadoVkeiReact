import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductDetail from '../componentes/ProductDetail';
import { getProductById } from '../services/api';

function Producto() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!product) return <div className="text-center mt-5">Producto no encontrado</div>;

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}

export default Producto;