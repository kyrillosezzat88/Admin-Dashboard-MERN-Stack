import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email:yup.string().email("Please Enter Valid Email").required("Email Required!"),
    password:yup.string().required('Password Required!')
});

export const initLogin = {
    email:"kyrillos417@gmail.com",
    password:"123456"
}