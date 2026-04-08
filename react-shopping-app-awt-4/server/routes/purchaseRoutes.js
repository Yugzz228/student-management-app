import express from 'express'
import Purchase from '../models/Purchase.js'

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const { userId, products, totalPrice, shippingAddress, paymentStatus } = req.body
    const purchase = new Purchase({ userId, products, totalPrice, shippingAddress, paymentStatus })
    await purchase.save()
    res.json({ success: true, purchaseId: purchase._id })
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
})

router.get('/user/:userId', async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.params.userId }).sort({ orderDate: -1 })
    res.json({ success: true, purchases })
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
})

export default router
