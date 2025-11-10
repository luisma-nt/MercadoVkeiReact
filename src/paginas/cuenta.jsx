
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../componentes/autentificador';

function MiCuenta() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
       
        <div className="container text-center py-5">
          <h2>Debes iniciar sesión</h2>
          <p>Para ver tu cuenta, primero debes iniciar sesión.</p>
          <Link to="/ingresar" className="btn btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      
      </div>
    );
  }

  const getInitials = () => {
    return `${user.nombre?.charAt(0) || ''}${user.apellido?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
           
            <div className="card account-sidebar">
              <div className="card-body text-center">
                <div className="account-avatar-large mb-3">
                  {getInitials() || <i className="fas fa-user"></i>}
                </div>
                <h5 className="card-title">{user.nombre} {user.apellido}</h5>
                <p className="text-muted">{user.email}</p>
                <p className="small text-muted">
                  Miembro desde {new Date(user.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>


            </div>
          </div>

          <div className="col-lg-8">
           
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Mi Perfil</h4>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Nombre</label>
                    <p>{user.nombre}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Apellido</label>
                    <p>{user.apellido}</p>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Teléfono</label>
                    <p>{user.telefono || 'No especificado'}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label className="form-label fw-bold">Miembro desde</label>
                    <p>{new Date(user.createdAt).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>


              </div>
            </div>


          </div>
        </div>
      </div>
   
    </div>
  );
}

export default MiCuenta;