import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    category: "", // Nuevo campo
    size: "",     // Nuevo campo
    image: ""     // Ahora guardará el String Base64
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Convertir archivo a Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // El resultado incluye 'data:image/jpeg;base64,...' listo para usar en src
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock, 10),
      category: formData.category,
      size: formData.size,
      image: formData.image // Enviamos el string gigante
    };

    try {
      await productService.create(payload);
      alert("Producto guardado con imagen");
      // Limpiar formulario
      setFormData({ 
        nombre: "", descripcion: "", precio: "", stock: "", 
        category: "", size: "", image: "" 
      });
      // Resetear input de archivo visualmente
      document.getElementById("fileInput").value = "";
      loadProducts();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Productos</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-gray-50">
        <div className="grid gap-4 mb-4">
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="border p-2 w-full" />
          <input name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="border p-2 w-full" />
          
          <div className="grid grid-cols-2 gap-4">
            <input name="category" placeholder="Categoría (ej: Vestidos)" value={formData.category} onChange={handleChange} className="border p-2" />
            <input name="size" placeholder="Talla (ej: M, 40)" value={formData.size} onChange={handleChange} className="border p-2" />
          </div>

          {/* INPUT DE IMAGEN */}
          <div className="border p-2 bg-white">
            <label className="block text-sm font-bold mb-1">Imagen del Producto:</label>
            <input 
              id="fileInput"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="w-full"
            />
            {formData.image && (
              <img src={formData.image} alt="Vista previa" className="h-20 mt-2 object-contain" />
            )}
          </div>
          
          <div className="flex gap-4">
            <input name="precio" type="number" placeholder="Precio" value={formData.precio} onChange={handleChange} required className="border p-2 w-1/2" />
            <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="border p-2 w-1/2" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Subiendo..." : "Guardar Producto"}
        </button>
      </form>
    </div>
  );
}
