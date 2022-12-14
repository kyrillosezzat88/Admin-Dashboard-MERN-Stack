const mongoose = require('mongoose');
const orderItemSchema = mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    }
});

module.exports = mongoose.model('orderItem' , orderItemSchema);