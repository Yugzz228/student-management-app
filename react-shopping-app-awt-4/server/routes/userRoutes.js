import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, phone, address, password: hashedPassword })
    await user.save()
    res.json({ success: true, userId: user._id })
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.json({ success: false, error: 'User not found' })
    
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.json({ success: false, error: 'Invalid password' })
    
    res.json({ success: true, userId: user._id, name: user.name, email: user.email })
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
})

export default router
