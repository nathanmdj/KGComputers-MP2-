import React from 'react'
import ReactDOM from 'react-dom/client'
import './SASS/styles.scss'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home/Home'
import ProductCategory from './Pages/ProductCategory'
import ProductContextProvider, { ProductContext } from './Context/ProductContext'
import Description from './Pages/Description/Description'
import DescriptionContextProvider from './Context/DescriptionContext'
import { SeachContextProvider } from './Context/SearchContext'
import Search from './Pages/Search/Search'
import Login from './Pages/Login/Login'
import { AuthContextProvider } from './Context/AuthContext'
import Register from './Pages/Login/Register'
import ProductList from './AdminDashboard/Pages/ProductList/Productlist'
import AddProduct from './AdminDashboard/Pages/ProductList/AddProduct'
import DashboardLayout from './AdminDashboard/DashboardLayout'
import UpdateProduct from './AdminDashboard/components/ProductForm/UpdateProduct'
import Checkout from './Pages/Checkout/Checkout'
import UserProfile from './Pages/UserProfile/UserProfile'
import OrderHistory from './Pages/UserProfile/OrderHistory'
import { CartContextProvider } from './Context/CartContext'
import Succes from './Pages/Checkout/Succes'
import { ProductUpdateContextProvider } from './Context/ProductUpdateContext'
import Main from './AdminDashboard/Pages/Main/Main'
import Orders from './AdminDashboard/Pages/Orders/Orders'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='purchase-success' element={<Succes/>}/>

      <Route path='dashboard' element={<DashboardLayout/>}>
        <Route path='' element={<Main/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='product-list' element={<ProductList/>}/>
        <Route path='product-list/add-product' element={<AddProduct/>}/>
        <Route path='product-list/update-product' element={
            <ProductUpdateContextProvider>
              <UpdateProduct/>
            </ProductUpdateContextProvider>
            }>7
         <Route path=':pID' element={<UpdateProduct/>}/>
        </Route>
      </Route>

      <Route path='' element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='user-profile' element={<UserProfile/>}>
          <Route path='order-history' element={<OrderHistory/>}/>

        </Route>
        
        <Route path='desktop' element={
            <ProductContextProvider category='desktop'>
              <ProductCategory category='Desktop'/>
            </ProductContextProvider>
        }/>
        <Route path='laptop' element={
            <ProductContextProvider category='laptop'>
              <ProductCategory category='Laptop'/>
            </ProductContextProvider>
        }/>
        <Route path='peripherals' element={
            <ProductContextProvider category='peripherals'>
              <ProductCategory category='Peripherals'/>
            </ProductContextProvider>
          }/>
        <Route path='components' element={
            <ProductContextProvider category='components'>
              <ProductCategory category='Components'/>
            </ProductContextProvider>
          }/>
        
        <Route path='products/description' element={ 
              <DescriptionContextProvider>
                <Description/>
              </DescriptionContextProvider>}>
            <Route path=':pID' element={<Description/>}/>
        </Route>
       
      </Route>
    </Route>
    
  ) 
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SeachContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <DescriptionContextProvider>
                <RouterProvider router={router}/>
            </DescriptionContextProvider>
          </ProductContextProvider>
        </CartContextProvider>
      </SeachContextProvider>    
    </AuthContextProvider>
  </React.StrictMode>,
)
