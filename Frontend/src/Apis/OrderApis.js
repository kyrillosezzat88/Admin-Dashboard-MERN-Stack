import axios from 'axios';

// get all orders 
export const OrdersApi = (page=1 , limit=10) => axios.get(`/order?page=${page}&limit=${limit}`);
//update order 
export const updateOrderApi = (id , data) => axios.put(`/order/${id}`, data);
//Filter Orders 
export const FilterOrders = (params) => axios.get('/order',{params:{...params}});
// get order details 
export const OrderDetailsApi  = (id) => axios.get(`/order/${id}`)
// get Orders Report 
export const OrderReports = () => axios.get('/order/report');
//get RecentOrders 
export const RecentOrderApi = () => axios.get('/order/recent')