import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

function Success() {
  const { orderDetails } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!orderDetails) {
      navigate('/')
    }
  }, [orderDetails, navigate])

  if (!orderDetails) return null

  return (
    <div className="page">
      <div className="container success-container">
        <div className="success-icon">✅</div>
        <h1>Payment Successful!</h1>
        <p className="success-message">Thank you for your purchase. Your order has been confirmed.</p>

        <div className="order-details">
          <h2>Order Details</h2>
          <div className="detail-row">
            <span>Order Date:</span>
            <span>{orderDetails.orderDate}</span>
          </div>
          <div className="detail-row">
            <span>Name:</span>
            <span>{orderDetails.name}</span>
          </div>
          <div className="detail-row">
            <span>Email:</span>
            <span>{orderDetails.email || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span>Phone:</span>
            <span>{orderDetails.phone}</span>
          </div>
          <div className="detail-row">
            <span>Address:</span>
            <span>{orderDetails.address}, {orderDetails.city} {orderDetails.zipCode}</span>
          </div>
        </div>

        <div className="order-items-success">
          <h2>Purchased Items</h2>
          {orderDetails.items.map(item => (
            <div key={item.id} className="success-item">
              <span><img src={item.image} alt={item.name} style={{width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', verticalAlign: 'middle', marginRight: '8px'}} />{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="success-total">
            <strong>Total Paid:</strong>
            <strong>${orderDetails.total}</strong>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="btn-primary">
          Continue Shopping
        </button>
      </div>

      <div className="summary">
        <h3>📊 Transaction Summary</h3>
        <p>Status: ✅ Completed</p>
        <p>Items: {orderDetails.items.length}</p>
        <p>Total: ${orderDetails.total}</p>
        <p>Date: {orderDetails.orderDate}</p>
      </div>
    </div>
  )
}

export default Success
