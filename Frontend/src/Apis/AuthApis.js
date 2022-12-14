import axios from 'axios';
// Login 
export const LoginApi = (email,password) => axios.post('/auth/login',{email,password});