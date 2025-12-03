import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../componentes/autentificador';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    aceptaTerminos: false,
    avatar: '' // <--- NUEVO CAMPO
  });
  
  // Estado para la previsualización de la imagen
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // --- NUEVA FUNCIÓN: Manejar subida de imagen ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño (ej: máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es muy pesada (Máx 2MB)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result })); // Guardamos el Base64
        setPreview(reader.result); // Para mostrarla ahí mismo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      // Enviamos el avatar junto con los otros datos
      await register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono,
        avatar: formData.avatar // <--- ENVIAMOS EL AVATAR
      });
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Crear Cuenta</h2>
            <p>Únete a la comunidad MercadoVkei</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            
            {/* --- NUEVO INPUT DE IMAGEN --- */}
            <div className="text-center mb-4">
              <div 
                className="mx-auto d-flex align-items-center justify-content-center overflow-hidden mb-2"
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  backgroundColor: '#e9ecef',
                  border: '2px solid #925f99'
                }}
              >
                {preview ? (
                  <img src={preview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <i className="fas fa-camera text-muted fa-2x"></i>
                )}
              </div>
              <label className="btn btn-sm btn-outline-primary">
                Subir Foto
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  hidden 
                />
              </label>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Apellido *</label>
                  <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="form-control" required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control" />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Contraseña *</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required minLength="6" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Confirmar *</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" required />
                </div>
              </div>
            </div>

            <div className="form-check mb-4">
              <input type="checkbox" id="aceptaTerminos" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleChange} className="form-check-input" required />
              <label htmlFor="aceptaTerminos" className="form-check-label">
                Acepto los términos y condiciones
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 auth-btn" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="auth-footer">
            <p>¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesión aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;