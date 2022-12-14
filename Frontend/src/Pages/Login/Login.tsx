import './Login.scss';
import LoginImg from '../../Assets/Img/login-office.jpeg';
import { Formik, Field, Form } from 'formik';
import { initLogin, LoginSchema } from '../../Components/Form/Validations/LoginSchema';
import Input from '../../Components/Form/Input/Input';
import { LoginApi } from '../../Apis/AuthApis';
import { toast } from 'react-toastify';
import { useDashboard } from '../../Context/AppContext';
import { LoginUser } from '../../Context/Actions/AuthActions/AuthActions';
const Login = () => {
    const {authDispatch}:any = useDashboard()
    return (
        <section className="Login">
            <div className="content">
                <div className='content_inner'>
                    <img src={LoginImg} alt="LoginImage" className='content_inner_image' />
                    <div className='content_inner_form'>
                        <h2 className='PageTitle'>Login</h2>
                        <Formik
                            initialValues={initLogin}
                            validationSchema={LoginSchema}
                            onSubmit={async(values , {setSubmitting , resetForm}) => {
                                await LoginApi(values.email,values.password)
                                        .then(res => {
                                            if(res.data.isAdmin){
                                                localStorage.setItem("AccessToken",res.data.Token);
                                                authDispatch(LoginUser(res.data))
                                                window.location.href = '/'
                                            }else{
                                                toast("You Don`t Have Permitions !" , {type:"error"})
                                            }
                                        })
                                        .catch(err => toast(err.response.data.message , {type:"error"}))
                            }}
                        >
                            {({ errors, touched, values , isSubmitting }) =>
                                <Form>
                                    <Field name='email'>
                                        {({ field, meta }: any) =>
                                            <Input
                                                type='email'
                                                placeHolder='Email'
                                                className="w-full "
                                                field={field}
                                                error={meta.touched && meta.error && meta.error}
                                            />
                                        }
                                    </Field>
                                    <Field name='password'>
                                        {({ field, meta }: any) =>
                                            <Input
                                                type='password'
                                                placeHolder='Password'
                                                className="w-full "
                                                field={field}
                                                error={meta.touched && meta.error && meta.error}
                                            />
                                        }
                                    </Field>
                                    <button type='submit' disabled={isSubmitting} className='btn btn-primary w-full'>Login</button>
                                </Form>
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login