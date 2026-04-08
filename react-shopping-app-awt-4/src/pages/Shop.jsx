import { useState } from 'react'
import { useCart } from '../context/CartContext'

const products = [
  { id: 1, name: 'Laptop', price: 999, image: '/laptop.jpeg', category: 'Electronics' },
  { id: 2, name: 'Phone', price: 599, image: '/phone.jpeg', category: 'Electronics' },
  { id: 3, name: 'Headphones', price: 199, image: '/headphones.jpeg', category: 'Audio' },
  { id: 4, name: 'Keyboard', price: 79, image: '/keyboard.jpeg', category: 'Accessories' },
  { id: 5, name: 'Mouse', price: 49, image: '/mouse.jpg', category: 'Accessories' },
  { id: 6, name: 'Monitor', price: 399, image: '/monitor.jpeg', category: 'Electronics' },
  { id: 7, name: 'Webcam', price: 129, image: '/webcam.jpeg', category: 'Accessories' },
  { id: 8, name: 'Speaker', price: 159, image: '/speaker.jpg', category: 'Audio' },
  { id: 9, name: 'Tablet', price: 449, image: '/tablet.jpeg', category: 'Electronics' },
  { id: 10, name: 'Smartwatch', price: 299, image: '/smartwatch.jpeg', category: 'Wearables' },
  { id: 11, name: 'Charger', price: 29, image: '/charger.jpeg', category: 'Accessories' },
  { id: 12, name: 'USB Cable', price: 19, image: '/usbcable.jpeg', category: 'Accessories' }
]

function Shop() {
  const { addToCart } = useCart()
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(products.map(p => p.category))]
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter)

  return (
    <div className="page">
      <div className="container">
        <h1>Shop Products</h1>
        
        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">${product.price}</p>
              <button onClick={() => addToCart(product)} className="btn-primary">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="summary">
        <h3>📊 Summary</h3>
        <p>Total Products: {filtered.length}</p>
        <p>Categories: {categories.length - 1}</p>
      </div>
    </div>
  )
}

export default Shop
