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




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
     <Route path='' element={<Home/>}/>
     
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
  ) 
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductContextProvider>
      <RouterProvider router={router}/>
    </ProductContextProvider>
    
  </React.StrictMode>,
)
