import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
//private route
import PrivateRout from './components/PrivateRout.jsx'
import Profile from './pages/User/Profile.jsx'

import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllPRoduct from './pages/Admin/AllPRoduct.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/products/Favorites.jsx'
import ProductDetails from './pages/products/ProductDetails.jsx'
import MyCart from './pages/MyCart.jsx'
import Shop from './pages/Shop.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import Order from './pages/Orders/Order.jsx'
import UserOrder from './pages/User/UserOrder.jsx'
import OrderList from './pages/Admin/OrderList.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' index={true} element={<Home/>}/>
      <Route path='/favorite' element={<Favorites/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<MyCart/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/user-orders' element={<UserOrder/>}/>

      <Route path='' element={<PrivateRout/>}>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/order/:id' element={<Order/>} />
      </Route>

      
      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoutes/>}>
        <Route path='dashboard' element={<AdminDashboard/>} />
        <Route path='userlist' element={<UserList/>} />
        <Route path='categorylist' element={<CategoryList/>}/>
        <Route path='productlist' element={<ProductList/>}/>
        <Route path='allproductlist' element={<AllPRoduct/>}/>
        <Route path='product/update/:_id' element={<ProductUpdate/>}/>
        <Route path='dashboard' element={<AdminDashboard/>}/>
        <Route path='orderlist' element={<OrderList/>}/>
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
      <PayPalScriptProvider>
      <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
)
