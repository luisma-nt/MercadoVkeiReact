import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../componentes/autentificador';

function Registro() {
  // Tu estado visual (en español, como lo diseñaste)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    aceptaTerminos: false
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      // ADAPTACIÓN IMPORTANTE: 
      // Mapeamos tus campos (nombre/apellido) a los que Java espera (firstName/lastName)
      await register({
        firstName: formData.nombre,
        lastName: formData.apellido,
        // Usamos el email como username temporal ya que es requerido
        username: formData.email.split("@")[0], 
        email: formData.email,
        password: formData.password,
        phone: formData.telefono
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

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text" id="nombre" name="nombre"
                    value={formData.nombre} onChange={handleChange}
                    className="form-control" required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="apellido">Apellido *</label>
                  <input
                    type="text" id="apellido" name="apellido"
                    value={formData.apellido} onChange={handleChange}
                    className="form-control" required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                className="form-control" required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel" id="telefono" name="telefono"
                value={formData.telefono} onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="password">Contraseña *</label>
                  <input
                    type="password" id="password" name="password"
                    value={formData.password} onChange={handleChange}
                    className="form-control" required minLength="6"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
                  <input
                    type="password" id="confirmPassword" name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange}
                    className="form-control" required
                  />
                </div>
              </div>
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox" id="aceptaTerminos" name="aceptaTerminos"
                checked={formData.aceptaTerminos} onChange={handleChange}
                className="form-check-input" required
              />
              <label htmlFor="aceptaTerminos" className="form-check-label">
                Acepto los <Link to="/terminos">términos y condiciones</Link> y la <Link to="/privacidad">política de privacidad</Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 auth-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              ¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
