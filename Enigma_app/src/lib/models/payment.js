import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  addr: {type: String, required: true},
  cartId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Cart",
    required: true 
  },
  phone: {type: String, required: true},
}, {
  timestamps: true,
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
