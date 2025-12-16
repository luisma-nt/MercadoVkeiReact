import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../componentes/autentificador';
import { createProductApi, updateProductApi, deleteProductApi, getProducts } from '../services/api';

function AdminPanel() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); 
  
  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });
  
  const [sizes, setSizes] = useState([{ name: 'S', stock: 0 }]);
  const [images, setImages] = useState([]);

  // --- SEGURIDAD ACTUALIZADA ---
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      // Si no está logueado, mandar al login
      navigate('/ingresar');
    } else if (!user.isAdmin) { 
      // Si está logueado pero NO es admin (verifica el rol de la BD)
      alert("Acceso denegado: Se requieren permisos de administrador.");
      navigate('/');
    } else {
      // Si es admin, cargar todo
      loadProducts(); 
    }
  }, [user, isAuthenticated, authLoading, navigate]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  // --- MANEJADORES DE FORMULARIO ---

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSize = () => setSizes([...sizes, { name: '', stock: 0 }]);
  
  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // --- LÓGICA DE EDICIÓN Y BORRADO ---

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    
    setFormData({
      nombre: product.name,
      descripcion: product.description[0] || '',
      precio: product.priceValue, 
      categoria: product.categories && product.categories.length > 0 ? product.categories[0] : ''
    });

    if (product.rawSizes && product.rawSizes.length > 0) {
      setSizes(product.rawSizes);
    } else {
      setSizes([{ name: 'S', stock: 0 }]);
    }

    setImages(product.images || []);
    
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ nombre: '', descripcion: '', precio: '', categoria: '' });
    setSizes([{ name: 'S', stock: 0 }]);
    setImages([]);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProductApi(id);
        alert("Producto eliminado");
        loadProducts(); 
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      categories: formData.categoria ? [{ name: formData.categoria }] : [],
      sizes: sizes.map(s => ({ name: s.name, stock: parseInt(s.stock) })),
      images: images.map(imgBase64 => ({ imageBase64: imgBase64 }))
    };

    try {
      if (isEditing) {
        await updateProductApi(editingId, payload);
        alert('¡Producto actualizado correctamente!');
      } else {
        await createProductApi(payload);
        alert('¡Producto creado exitosamente!');
      }
      
      handleCancelEdit(); 
      loadProducts();

    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Protección de renderizado: Si está cargando o no es admin, no mostrar nada
  if (authLoading || !user || !user.isAdmin) return null;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Administración</h1>
        <span className="badge bg-danger">Modo Administrador</span>
      </div>

      {/* FORMULARIO DE CREACIÓN / EDICIÓN */}
      <div className="card mb-5 shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Nombre */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Precio */}
              <div className="col-md-3 mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Categoría */}
              <div className="col-md-3 mb-3">
                <label className="form-label">Categoría</label>
                <select 
                  className="form-select"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Música">Música</option>
                  <option value="Calzado">Calzado</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Tallas y Stock */}
            <div className="mb-3">
              <label className="form-label">Tallas y Stock</label>
              {sizes.map((size, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Talla (ej. M)"
                    className="form-control"
                    style={{ width: '100px' }}
                    value={size.name}
                    onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    className="form-control"
                    style={{ width: '100px' }}
                    value={size.stock}
                    onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
                  />
                  {sizes.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-outline-danger"
                      onClick={() => removeSize(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-secondary" onClick={addSize}>
                + Agregar Talla
              </button>
            </div>

            {/* Imágenes */}
            <div className="mb-4">
              <label className="form-label">Imágenes</label>
              <input 
                type="file" 
                className="form-control mb-2" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload} 
              />
              <div className="d-flex gap-2 flex-wrap">
                {images.map((img, index) => (
                  <div key={index} className="position-relative">
                    <img 
                      src={img} 
                      alt={`preview ${index}`} 
                      className="img-thumbnail" 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                      style={{ padding: '0px 6px' }}
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
              </button>
              
              {isEditing && (
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* LISTA DE PRODUCTOS EXISTENTES */}
      <h3 className="mb-3">Inventario Actual</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.images[0] || "https://via.placeholder.com/50"} 
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    className="rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  {product.categories && product.categories.length > 0 
                    ? <span className="badge bg-info text-dark">{product.categories[0]}</span> 
                    : <span className="text-muted">Sin cat.</span>}
                </td>
                <td>
                  {product.rawSizes 
                    ? product.rawSizes.reduce((acc, s) => acc + s.stock, 0) 
                    : 0}
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditClick(product)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Eliminar
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

export default AdminPanel;