import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { getItemCount } = useCart()
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">🛒 Gadget Mania</Link>
        <div className="nav-links">
          <span className="user-name">Hi, {user?.name}</span>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Shop
          </Link>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
            Cart {getItemCount() > 0 && <span className="badge">{getItemCount()}</span>}
          </Link>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
