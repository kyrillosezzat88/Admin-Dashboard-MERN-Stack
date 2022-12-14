/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import Input from '../Form/Input/Input';
import { Formik, Form, Field } from 'formik'
import { AddTagerProps, PropsType } from './AddTaget.types';
import './AddTager.scss'
import { TagerInitState, TagerSchema } from '../Form/Validations/TagerValidation';
function AddTager({ AnimateAddTager, HandleAddTagerAnimate }: PropsType) {
  const [TagerData, setTagerData] = useState<AddTagerProps>({
    name: "",
    phone:"",
    address:""
  });
  return (
    <div className="AddTager" >
      <div className={`content  ${AnimateAddTager && 'animate_content'}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="PageTitle">Add Tager</h2>
        <p className='mb-[40px]'>Add Tager information from here</p>
        <Formik
          initialValues={TagerInitState}
          validationSchema={TagerSchema}
          onSubmit={(values, { setFieldError }) => {
            console.log({ values });
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Field name='name'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Tager Name'
                    placeHolder='Tager Name'
                    onChange={(e) => { setTagerData({ ...TagerData, name: e.target.value }); console.log(e.target.value) }}
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='phone'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Tager Phone'
                    placeHolder='Tager Phone'
                    onChange={(e) => { setTagerData({ ...TagerData, phone: e.target.value }); console.log(e.target.value) }}
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <Field name='address'>
                {({ field, meta }: any) =>
                  <Input
                    type='text'
                    labeltext='Tager address'
                    placeHolder='Tager address'
                    onChange={(e) => { setTagerData({ ...TagerData, name: e.target.value }); console.log(e.target.value) }}
                    className="w-full md:w-2/3"
                    field={field}
                    error={meta.touched && meta.error && meta.error}
                  />
                }
              </Field>
              <div className='flex justify-between flex-wrap md:flex-nowrap items-end'>
                <button type='button' className='btn btn-secondary w-full md:w-1/2 ' onClick={() => HandleAddTagerAnimate()} >Cancle</button>
                <button type='submit' className='btn btn-primary w-full md:w-1/2 ' >Create Tager</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddTager