import mongoose from 'mongoose'

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  shippingAddress: String,
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('Purchase', purchaseSchema)
