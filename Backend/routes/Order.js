const express = require('express');
const { PlaceOrder, getAllOrders, update, OrderDetails, OrdersReport, RecentOrders } = require('../controllers/OrderController');
const OrderRouter = express.Router();
const AdminJwt = require("../middlewares/AdminJwt");
const Pagination = require('../middlewares/Pagination');
const { OrderValidation, OrderValidationResult } = require('../middlewares/validations/OrderValidation');
const OrderModel = require('../models/order')

// place order 
OrderRouter.post('/placeorder',AdminJwt,OrderValidation,OrderValidationResult , PlaceOrder);
//get all orders 
OrderRouter.get('/', AdminJwt , Pagination(OrderModel) , getAllOrders);
//orders report 
OrderRouter.get('/report' , AdminJwt , OrdersReport);
//Recent Orders
OrderRouter.get('/recent' , AdminJwt , RecentOrders);
//update order 
OrderRouter.put('/:id' , AdminJwt ,update);
// get order details 
OrderRouter.get('/:id' , AdminJwt , OrderDetails);

module.exports = OrderRouter;