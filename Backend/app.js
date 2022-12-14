const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan');
const dotenv = require('dotenv');
const AuthRouter = require('./routes/Auth');
const UserRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const ProductRouter = require('./routes/product');
const OrderRouter = require('./routes/Order');
const pdfRouter = require('./routes/Pdf');
const csvRouter = require('./routes/csv');


const app = express();
app.use(cors());
dotenv.config()
app.use(morgan('tiny'));
app.use(express.json({limit:"100mb"}));
app.use('/public/uploads' , express.static(__dirname + '/public/uploads'))

// All App Routes 
const BaseURL = '/api/v1';
app.use(`${BaseURL}/auth` , AuthRouter);
app.use(`${BaseURL}/users` , UserRouter);
app.use(`${BaseURL}/category` , categoryRouter);
app.use(`${BaseURL}/product` , ProductRouter);
app.use(`${BaseURL}/order` , OrderRouter);
app.use(`${BaseURL}/invoice/pdf` , pdfRouter);
app.use(`${BaseURL}/csv` , csvRouter);

const Port = process.env.PORT || 5000;
// connect to the mongodb 
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true , useUnifiedTopology:true})
        .then(() => app.listen(Port , () => console.log(`Server Connected Successfully on port ${Port}`)))
        .catch(err => console.log(err.message));