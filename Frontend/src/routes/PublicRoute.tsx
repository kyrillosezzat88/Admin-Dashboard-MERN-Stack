import {Outlet , Navigate} from 'react-router-dom'

const PublicRoute = () => {
    if(localStorage.getItem('AccessToken')) return <Navigate to={'/dashboard'} />
    return <Outlet />
}

export default PublicRoute