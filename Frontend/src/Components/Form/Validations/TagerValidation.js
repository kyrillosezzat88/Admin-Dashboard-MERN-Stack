import * as yup from 'yup';

export const TagerSchema = yup.object().shape({
    name:yup.string().required('Tager Name Required!'),
    phone:yup.string().required('Tager Phone Required!'),
    address:yup.string().required('Tager Address Required!'),
});

export const TagerInitState = {
    name:"",
    phone:"",
    address:""
}