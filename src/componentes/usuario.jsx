import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './autentificador';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) {
    return (
      <div className="d-flex align-items-center">
        <Link to="/ingresar" className="btn btn-outline-success me-2 btn-sign-in">
          <i className="fas fa-sign-in-alt me-2"></i>Ingresar
        </Link>
        <Link to="/registrar" className="btn btn-outline-primary btn-register">
          <i className="fas fa-user-plus me-2"></i>Registrar
        </Link>
      </div>
    );
  }

  const getInitials = () => {
    return `${user.nombre?.charAt(0) || ''}${user.apellido?.charAt(0) || ''}`.toUpperCase();
  };

  // Función auxiliar para renderizar el avatar o las iniciales
  const renderAvatar = (width, height, fontSize) => {
    if (user.avatar) {
      return (
        <img 
          src={user.avatar} 
          alt="Avatar" 
          style={{ 
            width: `${width}px`, 
            height: `${height}px`, 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '2px solid white'
          }} 
        />
      );
    }
    return getInitials() || <i className="fas fa-user"></i>;
  };

  return (
    <div className="user-menu-container position-relative" ref={dropdownRef}>
      
      <button
        className="user-toggle-btn d-flex align-items-center gap-2 bg-transparent border-0 p-2 rounded-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar pequeño para el botón del menú */}
        <div className="user-avatar" style={{ background: user.avatar ? 'transparent' : undefined }}>
          {renderAvatar(32, 32, '0.8rem')}
        </div>
        
        <span className="user-name d-none d-md-block">
          Hola {user.nombre}
        </span>
        
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-muted`}></i>
      </button>

      {isOpen && (
        <div className="user-dropdown-menu show">
          
          <div className="user-dropdown-header">
            <div className="user-info">
              {/* Avatar grande para el encabezado del dropdown */}
              <div className="user-avatar-large" style={{ background: user.avatar ? 'transparent' : undefined }}>
                {renderAvatar(48, 48, '1.1rem')}
              </div>
              <div className="user-details">
                <div className="user-fullname">{user.nombre} {user.apellido}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
          </div>

          

          <div className="dropdown-divider"></div>


          <Link 
            to="/mi-cuenta" 
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-user-circle me-2"></i>
            Mi Cuenta
          </Link>

          {/* --- NUEVO LINK --- */}
          <Link 
            to="/mis-compras" 
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-shopping-bag me-2"></i>
            Mis Compras
          </Link>

          <div className="dropdown-divider"></div>

          <button 
            className="dropdown-item logout-item"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;