import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../componentes/autentificador';
import { createProductApi, updateProductApi, deleteProductApi, getProducts } from '../services/api';

const ADMIN_EMAIL = "luis.manuel.nt@gmail.com";

function AdminPanel() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); 
  
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });
  
  const [sizes, setSizes] = useState([{ name: 'S', stock: 0 }]);
  const [images, setImages] = useState([]);

  
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      navigate('/ingresar');
    } else if (user.email !== ADMIN_EMAIL) {
      alert("Acceso denegado");
      navigate('/');
    } else {
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

  if (authLoading || (!user || user.email !== ADMIN_EMAIL)) return null;

  return (
    <div className="container py-5">
      <div className="row">
        
        
        <div className="col-lg-5 mb-5">
          <div className="card shadow sticky-top" style={{ top: '20px', zIndex: 1 }}>
            <div className={`card-header text-white ${isEditing ? 'bg-warning' : 'bg-primary'}`}>
              <h3 className="mb-0 h5">
                {isEditing ? `Editar Producto #${editingId}` : 'Crear Nuevo Producto'}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </div>
                
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">Precio ($)</label>
                    <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleInputChange} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Categoría</label>
                    <input type="text" className="form-control" name="categoria" value={formData.categoria} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" name="descripcion" rows="3" value={formData.descripcion} onChange={handleInputChange}></textarea>
                </div>

           
                <h6 className="border-bottom pb-2">Tallas y Stock</h6>
                {sizes.map((size, index) => (
                  <div key={index} className="d-flex gap-2 mb-2">
                    <input type="text" className="form-control" placeholder="Talla" value={size.name} onChange={(e) => handleSizeChange(index, 'name', e.target.value)} required />
                    <input type="number" className="form-control" placeholder="Stock" value={size.stock} onChange={(e) => handleSizeChange(index, 'stock', e.target.value)} required />
                    {sizes.length > 1 && (
                      <button type="button" className="btn btn-outline-danger" onClick={() => removeSize(index)}>×</button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-link mb-3" onClick={addSize}>+ Agregar talla</button>

          
                <h6 className="border-bottom pb-2">Imágenes</h6>
                <input type="file" className="form-control mb-2" multiple accept="image/*" onChange={handleImageUpload} />
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {images.map((img, index) => (
                    <div key={index} className="position-relative">
                      <img src={img} alt="mini" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <button type="button" className="btn btn-danger btn-sm p-0 position-absolute top-0 end-0" 
                        style={{ width: '15px', height: '15px', fontSize: '10px', lineHeight: 1 }}
                        onClick={() => removeImage(index)}>×</button>
                    </div>
                  ))}
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'}`} disabled={loading}>
                    {loading ? 'Procesando...' : (isEditing ? 'Guardar Cambios' : 'Crear Producto')}
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
        </div>

    
        <div className="col-lg-7">
          <div className="card shadow">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0 h5">Inventario Actual</h3>
              <button className="btn btn-sm btn-light" onClick={loadProducts}><i className="fas fa-sync"></i></button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th style={{ width: '60px' }}>Img</th>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className={editingId === p.id ? 'table-warning' : ''}>
                        <td>
                          <img src={p.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        </td>
                        <td>
                          <div className="fw-bold">{p.name}</div>
                          <small className="text-muted">ID: {p.id} | Cat: {p.categories.join(', ')}</small>
                        </td>
                        <td>{p.price}</td>
                        <td className="text-end">
                          <div className="btn-group">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEditClick(p)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteClick(p.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-muted">No hay productos registrados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;