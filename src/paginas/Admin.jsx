import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../componentes/autentificador';
import { createProductApi } from '../services/api';

const ADMIN_EMAIL = "luis.manuel.nt@gmail.com";

function AdminPanel() {
  // 1. Extraemos 'loading' del contexto para esperar la verificación
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false); // Renombramos para no confundir con authLoading

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });
  
  const [sizes, setSizes] = useState([{ name: 'S', stock: 0 }]);
  const [images, setImages] = useState([]);

  // 2. PROTECCIÓN CORREGIDA:
  useEffect(() => {
    // Si todavía está cargando la sesión, NO hacemos nada (esperamos)
    if (authLoading) return;

    // Una vez que terminó de cargar, verificamos:
    if (!isAuthenticated) {
      navigate('/ingresar'); // No logueado -> Login
    } else if (user.email !== ADMIN_EMAIL) {
      alert("Acceso denegado");
      navigate('/'); // No es admin -> Home
    }
  }, [user, isAuthenticated, authLoading, navigate]); // Agregamos authLoading a las dependencias

  // ... (Resto de las funciones: handleInputChange, handleSizeChange, etc. IGUAL QUE ANTES) ...
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, { name: '', stock: 0 }]);
  };

  const removeSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      categories: formData.categoria ? [{ name: formData.categoria }] : [],
      sizes: sizes.map(s => ({ 
        name: s.name, 
        stock: parseInt(s.stock) 
      })),
      images: images.map(imgBase64 => ({ 
        imageBase64: imgBase64 
      }))
    };

    try {
      await createProductApi(payload);
      alert('¡Producto creado exitosamente!');
      setFormData({ nombre: '', descripcion: '', precio: '', categoria: '' });
      setSizes([{ name: 'S', stock: 0 }]);
      setImages([]);
    } catch (error) {
      console.error(error);
      alert('Error al crear producto: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 3. PANTALLA DE CARGA (Mientras verifica si eres admin)
  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando permisos...</span>
        </div>
      </div>
    );
  }

  // Si pasó la carga pero no es el admin (o no hay user), no mostramos nada mientras redirige
  if (!user || user.email !== ADMIN_EMAIL) return null;

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white">
          <h2 className="mb-0">Panel de Administración - Crear Producto</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            {/* Datos Básicos */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre del Producto</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Precio ($)</label>
                <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Categoría</label>
                <input type="text" className="form-control" name="categoria" placeholder="Ej: Ropa" value={formData.categoria} onChange={handleInputChange} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" rows="3" value={formData.descripcion} onChange={handleInputChange}></textarea>
            </div>

            <hr />

            <h4 className="mb-3">Tallas y Stock</h4>
            {sizes.map((size, index) => (
              <div key={index} className="row mb-2 align-items-end">
                <div className="col-4">
                  <label className="form-label text-muted">Talla</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="S, M..." 
                    value={size.name}
                    onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="col-4">
                  <label className="form-label text-muted">Stock</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={size.stock}
                    onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
                    required
                  />
                </div>
                <div className="col-2">
                  {sizes.length > 1 && (
                    <button type="button" className="btn btn-danger" onClick={() => removeSize(index)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-outline-secondary btn-sm mb-4" onClick={addSize}>
              + Agregar otra talla
            </button>

            <hr />

            <h4 className="mb-3">Imágenes</h4>
            <div className="mb-3">
              <input type="file" className="form-control" multiple accept="image/*" onChange={handleImageUpload} />
            </div>
            
            <div className="row mb-4">
              {images.map((img, index) => (
                <div key={index} className="col-md-2 position-relative">
                  <img src={img} alt="Preview" className="img-thumbnail" style={{ height: '100px', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => removeImage(index)}
                    style={{ transform: 'translate(20%, -20%)', borderRadius: '50%' }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                {submitting ? 'Guardando...' : 'Crear Producto'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;