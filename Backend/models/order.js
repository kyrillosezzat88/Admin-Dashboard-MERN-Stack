const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
      required: true,
    },
  ],
  orderID:{
    type:String,
    unique:true,
    required:true
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippedDate: {
    type: Date,
    default: "",
  },
  dilveredDate: {
    type: Date,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logo:{
    type:String,
  }
});

module.exports = mongoose.model("order", OrderSchema);
