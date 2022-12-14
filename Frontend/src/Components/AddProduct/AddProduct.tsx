/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import UploadFile from '../Form/UploadFile/UploadFile';
import './AddProduct.scss';
import { FiUploadCloud, FiXCircle } from 'react-icons/fi'
import Input from '../Form/Input/Input';
import TextArea from '../Form/TextArea/TextArea';
import { Formik, Form, Field } from 'formik'
import { ProductInitValue, ProductSchema } from '../Form/Validations/ProductSchema';
import { PropsType } from './AddProduct.types';
import Select from '../Form/Select/Select';
import { createProductApi, updateProduct } from '../../Apis/productApis';
import { HandleAxiosError } from '../../utils/HandleAxiosErrors';
import { useDashboard } from '../../Context/AppContext';
import { createProductAction, isLoadingAction, updateProductAction } from '../../Context/Actions/ProductActions/ProductActions';
import { toast } from 'react-toastify';
import Loading from '../Spinner/Loading';
function AddProduct({ AnimateAddProduct, HandleAddProductAnimi, data }: PropsType) {
  const { authDispatch, productDispatch  , category}: any = useDashboard();
  const [mainImage, setMainImage] = useState<File | string>("");
  const initValues = data ? data : ProductInitValue;
  return (
    <div className="AddProduct" >
      <div className={`content  ${AnimateAddProduct && 'animate_content'}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="PageTitle">{data ? "Update Product" : "Add Product"}</h2>
        <p className='mb-[40px]'> {data ? "Update your product and necessary information from here" : " Add your product and necessary information from here"}</p>
        <Formik
          initialValues={initValues}
          validationSchema={ProductSchema}
          onSubmit={async (values: any, { setFieldError }) => {
            if (!values.gallery.length) return setFieldError('gallery', "Images Required")
            productDispatch(isLoadingAction(true))
            let formData = new FormData();
            for (let key in values) {
              if (key === 'gallery') {
                for (let img of values.gallery) {
                  formData.append('gallery', img)
                }
              } else {
                formData.append(key, values[key])
              }
            }
            formData.append('mainImage', mainImage)
            try {
              let newProduct: any;
              //update product depend on the data 
              if (data) {
                newProduct = await updateProduct(data._id, formData);
                productDispatch(updateProductAction(newProduct.data.data))
                console.log({ newProduct })
              } else {
                // create new product 
                newProduct = await createProductApi(formData);
                productDispatch(createProductAction(newProduct.data.data));
              }
              toast(newProduct.data.message, { type: "success" });
              HandleAddProductAnimi()
              productDispatch(isLoadingAction(false))
            } catch (error) {
              HandleAxiosError(error, authDispatch);
              productDispatch(isLoadingAction(false))
            }
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form >
              <Field name='gallery'>
                {({ field, meta }: any) =>
                  <>
                    <UploadFile
                      multi={true}
                      field={field}
                      title='Drag your images here'
                      className="w-full md:w-2/3"
                      icon={<FiUploadCloud size='30px' />}
                      subtitle='(Only *.jpeg and *.png images will be accepted)'
                      onChange={(e) => setFieldValue('gallery', [...e.target.files])}
                      error={meta.touched && meta.error && meta.error}
                      value={undefined}
                      label="Product Images"
                    />
                    <div className='Selected_Images'>
                      {values.gallery && values.gallery.map((image: string | File, index: number) => (
                        <div className={`Selected_Images_Single ${image === mainImage && "Selected_MainImage"}`} key={index} onClick={() => setMainImage(image)}>
                          <img src={typeof image === "string" ? image : URL.createObjectURL(image)} />
                          <FiXCircle onClick={() => setFieldValue('gallery', values.gallery.filter((img: string | File, indx: number) => indx !== index))} />
                        </div>
                      ))
                      }
                    </div>
                  </>
                }
              </Field>
              <Field name='sku'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Product Sku'
                    placeHolder='Product SKU'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='title'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Product Name'
                    placeHolder='Product Name'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='description' >
                {({ field, meta }: any) =>
                  <TextArea
                    rows={5}
                    cols={40}
                    className="w-full md:w-2/3 h-auto "
                    Placeholder='Product Details'
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='category' >
                {({ field, meta }: any) =>
                  <Select
                    options={category.categoriesList}
                    title="Category"
                    label="Category"
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='unit' >
                {({ field, meta }: any) =>
                  <Select
                    options={category.categoriesList}
                    title="unit"
                    label="unit"
                    className="w-full md:w-2/3"
                    error={meta.touched && meta.error && meta.error}
                    field={field}
                  />
                }
              </Field>
              <Field name='Stock'>
                {({ field, meta }: any) =>
                  <Input
                    type='number'
                    labeltext='Quantity'
                    placeHolder='Quantity'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='basePrice'>
                {({ field, meta }: any) =>
                  <Input
                    type='number'
                    labeltext='Base Price'
                    placeHolder='Base Price'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='salePrice'>
                {({ field, meta }: any) =>
                  <Input
                    type='number'
                    labeltext='Sale Price'
                    placeHolder='Sale Price'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='product_tag'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Product Tag'
                    placeHolder='Product Tag'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <div className='flex justify-between flex-wrap md:flex-nowrap'>
                <button type='button' className='btn btn-secondary w-full md:w-1/2 ' onClick={() => HandleAddProductAnimi()}>Cancle</button>
                <button type='submit' className='btn btn-primary w-full md:w-1/2 ' disabled={isSubmitting} > {isSubmitting ? <Loading /> : data ? "Update Product" : "Create Product"}  </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddProduct