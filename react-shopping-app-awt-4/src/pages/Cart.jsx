import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="container empty-state">
          <h1>🛒 Your Cart</h1>
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <h1>🛒 Your Cart</h1>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-actions">
          <button onClick={() => navigate('/')} className="btn-secondary">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/payment')} className="btn-primary">
            Proceed to Payment
          </button>
        </div>
      </div>

      <div className="summary">
        <h3>📊 Cart Summary</h3>
        <p>Items: {getItemCount()}</p>
        <p>Subtotal: ${getTotal().toFixed(2)}</p>
        <p>Tax (10%): ${(getTotal() * 0.1).toFixed(2)}</p>
        <p className="total">Total: ${(getTotal() * 1.1).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Cart
