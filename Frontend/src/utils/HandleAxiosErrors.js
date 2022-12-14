import {toast} from 'react-toastify'
import { LogoutUser } from '../Context/Actions/AuthActions/AuthActions';

//Handle all axios errors 
export const HandleAxiosError = (err,dispatch,navigate) => {
    console.log(err.response.data)
    if(err.response.status === 401){
        dispatch(LogoutUser());
        return toast("Please Login" , {type:"error"});
    }
    if(err.response.status === 404){
        navigate('/404')
    }
    return toast(err.response.data.message , {type:'error'})
}