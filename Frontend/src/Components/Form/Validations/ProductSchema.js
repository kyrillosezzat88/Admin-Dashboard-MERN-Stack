import * as yup from 'yup';

export const ProductSchema = yup.object().shape({
    gallery:yup.array().required('Images Required'),
    title:yup.string().required('Product Name Required!'),
    sku:yup.number().required("SKU Required!"),
    description:yup.string().required('Description Required'),
    category:yup.string().required("Category Required "),
    unit:yup.string().required("Unit Required"),
    Stock:yup.number().min(1).required("Quantity Required"),
    basePrice:yup.number().min(1).required("Price Required"),
    salePrice:yup.number().min(1).moreThan(yup.ref('basePrice')).required("Sale Price Required"),
    product_tag:yup.string()
});

export const ProductInitValue = {
    title:"",
    gallery:[],
    description:"",
    category:"",
    unit:"",
    Stock:0,
    basePrice:0,
    salePrice:0,
    product_tag:""
}