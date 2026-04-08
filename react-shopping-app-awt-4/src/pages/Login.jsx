import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isRegister) {
      const result = await register(formData)
      if (result.success) {
        alert('Registration successful! Please login.')
        setIsRegister(false)
      } else {
        alert(result.error)
      }
    } else {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        navigate('/')
      } else {
        alert(result.error)
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>🛒 Gadget Mania</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isRegister ? 'Register' : 'Login'}</h2>

          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">
            {isRegister ? 'Register' : 'Login'}
          </button>

          <p className="toggle-text">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? ' Login' : ' Register'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
