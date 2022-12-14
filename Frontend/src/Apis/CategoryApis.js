import axios from 'axios';


//get all categories 
export const getCategories = (page=1 , limit=10) => axios.get(`/category?page=${page}&limit=${limit}`);
//create new category 
export const CreateCategory = (formdata) => axios.post('/category/create',formdata);
// update category 
export const updateCategory = (id , formdata) => axios.put(`/category/${id}`,formdata);
//Delete CAtegory 
export const DeleteCategoryApi = (id) => axios.delete(`/category/${id}`)
//get categories list used in categories dropdown
export const CategoriesListApi = () => axios.get('/category/list');
//fillter Categories 
export const FilterCategories = (params) => axios.get('/category',{params:{...params}});