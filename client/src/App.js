import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Error from './pages/Error';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/auth/Forgot';
import AdminDashboard from './pages/admin/Dashboard';
import PrivateAdminRoute from './components/routes/Admin';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Order';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import CartBag from './pages/CartBag';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/category/:id' element={<CategoryProduct />} />
      <Route path='/cart' element={<CartBag />} />
      <Route path='/dashboard' element={<PrivateRoute />}>
      <Route path='' element={<Dashboard />} />
      <Route path='/dashboard/profile' element={<Profile />} />
      <Route path='/dashboard/orders' element={<Orders />} />
      </Route>
      <Route path='/admin-dashboard' element={<PrivateAdminRoute />}>
      <Route path='' element={<AdminDashboard />} />
      <Route path='/admin-dashboard/create-category' element={<CreateCategory />} />
      <Route path='/admin-dashboard/create-product' element={<CreateProduct />} />
      <Route path='/admin-dashboard/product/:id' element={<UpdateProduct />} />
      <Route path='/admin-dashboard/products' element={<Products />} />
      <Route path='/admin-dashboard/users' element={<Users />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/privacy-policy' element={<Privacy />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </>
  );
}

export default App;
