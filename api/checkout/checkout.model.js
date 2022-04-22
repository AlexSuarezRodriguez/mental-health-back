const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
  {
    refId: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      uppercase: true,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Checkout', PaymentSchema);
