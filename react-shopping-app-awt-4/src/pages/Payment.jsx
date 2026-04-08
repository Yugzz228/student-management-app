import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Payment() {
  const { cart, getTotal, clearCart, setOrderDetails } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address || !formData.cardNumber) {
      alert('Please fill all required fields')
      return
    }

    const orderData = {
      ...formData,
      items: cart,
      total: (getTotal() * 1.1).toFixed(2),
      orderDate: new Date().toLocaleString()
    }

    // Save purchase to database
    savePurchase(orderData)

    setOrderDetails(orderData)
    clearCart()
    navigate('/success')
  }

  const savePurchase = async (orderData) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.userId
    if (!userId) return

    const purchaseData = {
      userId,
      products: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalPrice: parseFloat(orderData.total),
      shippingAddress: `${orderData.address}, ${orderData.city} ${orderData.zipCode}`,
      paymentStatus: 'completed'
    }

    await fetch('http://localhost:5001/api/purchases/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData)
    })
  }

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="page">
      <div className="container">
        <h1>💳 Payment Details</h1>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-section">
            <h2>Shipping Address</h2>
            <input
              type="text"
              name="address"
              placeholder="Street Address *"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Payment Information</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number *"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="16"
              required
            />
            <input
              type="text"
              name="cardName"
              placeholder="Cardholder Name"
              value={formData.cardName}
              onChange={handleChange}
            />
            <div className="form-row">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength="5"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
              />
            </div>
          </div>

          <div className="order-items">
            <h2>Order Items</h2>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span><img src={item.image} alt={item.name} style={{width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', verticalAlign: 'middle', marginRight: '8px'}} />{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/cart')} className="btn-secondary">
              Back to Cart
            </button>
            <button type="submit" className="btn-primary">
              Complete Payment ${(getTotal() * 1.1).toFixed(2)}
            </button>
          </div>
        </form>
      </div>

      <div className="summary">
        <h3>📊 Order Summary</h3>
        {cart.map(item => (
          <p key={item.id}>{item.name} x{item.quantity}: ${(item.price * item.quantity).toFixed(2)}</p>
        ))}
        <hr />
        <p>Subtotal: ${getTotal().toFixed(2)}</p>
        <p>Tax: ${(getTotal() * 0.1).toFixed(2)}</p>
        <p className="total">Total: ${(getTotal() * 1.1).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Payment
