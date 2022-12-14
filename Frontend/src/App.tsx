import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Categories from './Pages/Categories/Categories';
import Dashbaord from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Orders from './Pages/Orders/Orders';
import Products from './Pages/Products/Products';
import Users from './Pages/Users/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './Context/AppContext';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import NotFound from './Pages/404/NotFound';
import Invoice from './Pages/Invoice/Invoice';
function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <ToastContainer />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Dashbaord />} />
              <Route path='/dashboard' element={<Dashbaord />} />
              <Route path='/products' element={<Products />} />
              <Route path='/category' element={<Categories />} />
              {/* <Route path='/togar' element={<Togar />} /> */}
              <Route path='/users' element={<Users />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/orders/invoice/:id' element={<Invoice />} />
            </Route>
            {/* <Route path='/coupons' element={<Coupons />} /> */}
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </AppProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
