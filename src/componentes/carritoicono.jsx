
import { Link } from 'react-router-dom';
import { useCart } from './carritocontext';

function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link to="/carrito" className="cart-icon position-relative">
      <i className="fas fa-shopping-cart fa-lg"></i>
      {itemCount > 0 && (
        <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;