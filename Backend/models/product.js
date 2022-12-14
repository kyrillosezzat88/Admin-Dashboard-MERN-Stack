const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  description: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mainImage: {
    type: String,
    required: true,
  },
  gallery: [
    {
      type: String,
      default: "",
    },
  ],
  Stock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  sku: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  published:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("product", productSchema);
