import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    if(localStorage.getItem('AccessToken')) return <Outlet/>
    return <Navigate to={'/login'} />
}

export default PrivateRoute