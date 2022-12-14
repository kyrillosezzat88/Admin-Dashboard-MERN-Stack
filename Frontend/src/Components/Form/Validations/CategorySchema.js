import * as yup from 'yup';

export const CategorySchema = yup.object().shape({
    mainImage:yup.string(),
    title:yup.string().required('Category Name Required!'),
});

export const CategoryInitValues = {
    title:"",
    mainImage:null,
}