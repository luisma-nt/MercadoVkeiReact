import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../componentes/ProductDetail';
import { productService } from '../servicios/productoService'; 

function Producto() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await productService.getById(id);
        
        // --- 1. Manejo de Imagen ---
        // Si hay imagen Base64 válida, úsala. Si no, placeholder.
        const finalImage = (data.image && data.image.length > 50) 
            ? data.image 
            : `https://placehold.co/600x800/333/fff?text=${encodeURIComponent(data.nombre)}`;

        // --- 2. Limpieza de Datos ---
        // Convertimos Strings a Arrays solo si es necesario para tu componente visual
        const descArray = data.descripcion ? [data.descripcion] : [];
        const sizesArray = data.size ? [data.size] : ["Única"];

        // Objeto final LIMPIO (Sin datos inventados)
        const productWithDetails = {
            ...data,
            description: descArray, 
            sizes: sizesArray,      
            images: [finalImage], // Solo pasamos la imagen real
            
            // "specs" solo tendrá lo que hay en la DB
            specs: {
                category: data.category || "General",
                // Eliminado 'material'
                // Eliminado 'color'
                availability: data.stock > 0 ? "En Stock" : "Agotado"
            }
        };
        
        setProduct(productWithDetails);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-5 text-center">Cargando detalles...</div>;
  if (error) return <div className="p-5 text-center text-danger">{error}</div>;
  if (!product) return <div className="p-5 text-center">Producto no encontrado</div>;

  return <ProductDetail product={product} />;
}

export default Producto;