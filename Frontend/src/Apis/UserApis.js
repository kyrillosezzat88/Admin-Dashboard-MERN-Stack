import axios from 'axios';

//get all users 
export const allUsersApi =  (page=1 , limit=10) => axios.get(`/users?page=${page}&limit=${limit}`);
//delete user 
export const deleteUserApi = (id) => axios.delete(`/users/${id}`);
//Filter usres 
export const FilterUsers = (params) => axios.get('/users',{params:{...params}});