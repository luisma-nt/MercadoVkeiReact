import { Link } from 'react-router-dom';
import { useAuth } from './autentificador';

export default function UserMenu() {
  const { user, logout } = useAuth(); // Importamos estado y función del contexto

  // Si NO hay usuario, mostramos botón "Ingresar"
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

  // Si HAY usuario, mostramos menú desplegable
  return (
    <div className="dropdown ms-3">
      <button 
        className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" 
        type="button" 
        data-bs-toggle="dropdown"
      >
        {/* Avatar pequeño si existe, sino icono genérico */}
        {user.avatar ? (
           <img src={user.avatar} alt="Avatar" className="rounded-circle" style={{width:24, height:24}} />
        ) : (
           <span>👤</span>
        )}
        <span>{user.username || user.firstName || "Usuario"}</span>
      </button>
      
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
            <Link className="dropdown-item" to="/mi-cuenta">Mi Cuenta</Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
            <button 
                onClick={logout} 
                className="dropdown-item text-danger"
            >
                Cerrar Sesión
            </button>
        </li>
      </ul>
    </div>
  );
}