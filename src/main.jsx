import React from 'react'
import ReactDOM from 'react-dom/client'
import './SASS/styles.scss'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home/Home'
import ProductCategory from './Pages/ProductCategory'
import ProductContextProvider, { ProductContext } from './Context/ProductContext'
import ProductList from './Pages/ProductList/Productlist'
import Description from './Pages/Description/Description'
import DescriptionContextProvider from './Context/DescriptionContext'
import { SeachContextProvider } from './Context/SearchContext'
import Search from './Pages/Search/Search'
import Login from './Pages/Login/Login'
import { AuthContextProvider } from './Context/AuthContext'
import Register from './Pages/Login/Register'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      

      <Route path='' element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        
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
        <Route path='product-list' element={<ProductList/>}/>
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
        <ProductContextProvider>
          <RouterProvider router={router}/>
        </ProductContextProvider>
      </SeachContextProvider>    
    </AuthContextProvider>
  </React.StrictMode>,
)
