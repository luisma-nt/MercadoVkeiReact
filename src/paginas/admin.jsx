import { useEffect, useState } from "react";
import { productService } from "../servicios/productoService";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID del producto en edición

  const initialForm = {
    nombre: "", descripcion: "", precio: "", stock: "",
    category: "", size: "", image: ""
  };
  const [formData, setFormData] = useState(initialForm);

  // Cargar productos al montar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      alert("Error cargando inventario");
    } finally {
      setLoading(false);
    }
  };

  // Manejar inputs de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar imagen (Base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
         alert("Imagen muy pesada (Max 5MB)");
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Enviar Formulario (Crear o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm(editingId ? "¿Guardar cambios?" : "¿Crear producto?")) return;

    setLoading(true);
    const payload = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock, 10)
    };

    try {
      if (editingId) {
        await productService.update(editingId, payload);
        alert("Producto actualizado");
      } else {
        await productService.create(payload);
        alert("Producto creado");
      }
      resetForm();
      loadProducts();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Borrar Producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de ELIMINAR este producto?")) return;
    try {
      await productService.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (prod) => {
    setEditingId(prod.id);
    setFormData({
      nombre: prod.nombre,
      descripcion: prod.descripcion || "",
      precio: prod.precio,
      stock: prod.stock,
      category: prod.category || "",
      size: prod.size || "",
      image: prod.image || ""
    });
    // Scroll hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(initialForm);
    // Limpiar input file visualmente
    const fileInput = document.getElementById("adminFileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Panel de Administración</h1>

      {/* FORMULARIO */}
      <div className="card p-4 mb-5 shadow-sm bg-light">
        <h3 className="card-title mb-3">{editingId ? "Editar Producto" : "Nuevo Producto"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Precio</label>
              <input type="number" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Stock</label>
              <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
            </div>
            
            <div className="col-md-12">
               <label className="form-label">Descripción</label>
               <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleChange} rows="2" />
            </div>

            <div className="col-md-4">
              <label className="form-label">Categoría</label>
              <input name="category" className="form-control" value={formData.category} onChange={handleChange} placeholder="Ej: Vestidos" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Talla</label>
              <input name="size" className="form-control" value={formData.size} onChange={handleChange} placeholder="Ej: M" />
            </div>
            
            <div className="col-md-4">
               <label className="form-label">Imagen</label>
               <input id="adminFileInput" type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
               {formData.image && <small className="text-success">Imagen cargada (Base64)</small>}
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button type="submit" disabled={loading} className={`btn ${editingId ? "btn-warning" : "btn-primary"} px-4`}>
              {loading ? "Procesando..." : (editingId ? "Actualizar Producto" : "Crear Producto")}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="table-responsive">
        <table className="table table-hover align-middle border">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>
                  {prod.image ? (
                     <img src={prod.image} alt="mini" style={{width: 50, height: 50, objectFit: 'cover', borderRadius: 4}} />
                  ) : (
                     <span className="text-muted small">Sin img</span>
                  )}
                </td>
                <td>
                  <div className="fw-bold">{prod.nombre}</div>
                  <small className="text-muted">{prod.category}</small>
                </td>
                <td>${prod.precio?.toLocaleString('es-CL')}</td>
                <td>
                   <span className={`badge ${prod.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                     {prod.stock}
                   </span>
                </td>
                <td>
                  <button onClick={() => handleEdit(prod)} className="btn btn-sm btn-outline-primary me-2">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(prod.id)} className="btn btn-sm btn-outline-danger">
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}