/* eslint-disable jsx-a11y/alt-text */
import UploadFile from '../Form/UploadFile/UploadFile';
import { FiUploadCloud, FiXCircle } from 'react-icons/fi'
import Input from '../Form/Input/Input';
import { Formik, Form, Field } from 'formik'
import { PropsType } from './AddCategory.types';
import { CategoryInitValues, CategorySchema } from '../Form/Validations/CategorySchema';
import './AddCategory.scss'
import { CreateCategory, updateCategory } from '../../Apis/CategoryApis';
import { HandleAxiosError } from '../../utils/HandleAxiosErrors';
import { useDashboard } from '../../Context/AppContext';
import { createNewCategory, updateCategoryAction } from '../../Context/Actions/CategoryActions/CategoryActions';
import { toast } from 'react-toastify';

function AddCategory({ AnimateAddPCategory, HandleAddCategoryAnimi, data }: PropsType) {
  const { authDispatch, categoryDispatch }: any = useDashboard();
  const initValues = data ? data : CategoryInitValues;

  return (
    <div className="AddCategory" >
      <div className={`content  ${AnimateAddPCategory && 'animate_content'}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="PageTitle">Add Category</h2>
        <p className='mb-[40px]'>Add your Product category and necessary information from here</p>
        <Formik
          initialValues={initValues}
          validationSchema={CategorySchema}
          onSubmit={async (values: any, { setFieldError }) => {
            console.log({ values });
            let formData = new FormData();
            for (let key in values) {
              formData.append(key, values[key])
            }
            // if there are data passed as props to update categorty if not will create new category
            if (data) {
              try {
                let updatedCategory = await updateCategory(data._id, formData);
                categoryDispatch(updateCategoryAction(updatedCategory.data.data));
                toast(updatedCategory.data.message, { type: "success" });
                HandleAddCategoryAnimi();
                return;
              } catch (error) {
                  return HandleAxiosError(error ,authDispatch)
              }
            }
            return await CreateCategory(formData).then(res => {
              toast(res.data.message, { type: 'success' })
              categoryDispatch(createNewCategory(res.data.data));
              HandleAddCategoryAnimi();
            }).catch(err => HandleAxiosError(err, authDispatch));
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form>
              <Field name='mainImage'>
                {({ field, meta }: any) =>
                  <>
                    <UploadFile
                      field={field}
                      title='Drag your image here'
                      className="w-full md:w-2/3"
                      icon={<FiUploadCloud size='30px' />}
                      subtitle='(Only *.jpeg and *.png images will be accepted)'
                      onChange={(e) => setFieldValue('mainImage', e.target.files[0])}
                      error={meta.touched && meta.error && meta.error}
                      value={undefined}
                      label="Product Images"
                    />
                    <div className='Selected_Images'>
                      {values.mainImage &&
                        <div className='Selected_Images_Single'>
                          <img src={typeof values.mainImage === "string" ? values.mainImage : URL.createObjectURL(values.mainImage)} />
                          <FiXCircle onClick={() => setFieldValue('mainImage', null)} />
                        </div>
                      }
                    </div>
                  </>
                }
              </Field>
              <Field name='title'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Category Name'
                    placeHolder='Category Name'
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <div className='flex justify-between flex-wrap md:flex-nowrap items-end'>
                <button type='button' className='btn btn-secondary w-full md:w-1/2 ' onClick={() => HandleAddCategoryAnimi()} >Cancle</button>
                <button type='submit' disabled={isSubmitting} className='btn btn-primary w-full md:w-1/2 ' >{data ? "Update" : "Create"} Category</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddCategory