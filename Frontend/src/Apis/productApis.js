import axios from 'axios';


// get all product 
export const allProductApi =  (page=1 , limit=10) => axios.get(`/product?page=${page}&limit=${limit}`);
//create new product
export const createProductApi = (formData) => axios.post('/product/create',formData)
// update category 
export const updateProduct = (id , formdata) => axios.put(`/product/${id}`,formdata);
//Delete product 
export const DeleteProductApi = (id) => axios.delete(`/product/${id}`);
//Read Single Product
export const ReadProductApi = (id) => axios.get(`/product/${id}`);
//fillter products 
export const FilterProducts = (params) => axios.get('/product',{params:{...params}});