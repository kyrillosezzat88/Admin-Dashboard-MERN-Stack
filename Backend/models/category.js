const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
    lowercase:true
  },
  mainImage: {
    type: String,
    default:""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  published:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model('category',categorySchema)
