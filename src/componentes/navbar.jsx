import { Link } from 'react-router-dom';
import CartIcon from './carritoicono';
import UserMenu from './usuario';
import { useAuth } from './autentificador'; 

function NavBar() {
  // Obtenemos la variable isAdmin directamente del contexto
  // (definida en el AuthProvider que seleccionaste)
  const { isAdmin } = useAuth(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to='/' className="navbar-brand d-flex align-items-center">
          <img 
            src="https://cdnx.jumpseller.com/yumestore/image/16583786/resize/610/610?1656871342.jpg" 
            width="30" height="30" alt="Logo" className="me-2"
          />
          MercadoVkei
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to='/' className='nav-link'>Home</Link></li>
            <li className="nav-item"><Link to='/productos' className='nav-link'>Productos</Link></li>

            {/* BOTÓN ADMIN PROTEGIDO: Solo se renderiza si isAdmin es true */}
            {isAdmin && (
              <li className="nav-item">
                <Link to='/admin' className='nav-link text-warning fw-bold'>⚙️ Admin</Link>
              </li>
            )}

            <li className="nav-item"><Link to='/nosotros' className='nav-link'>Nosotros</Link></li>
            <li className="nav-item"><Link to='/blogs' className='nav-link'>Blogs</Link></li>
          </ul>
          
          <div className="d-flex align-items-center">
            <CartIcon />
            <UserMenu /> 
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;