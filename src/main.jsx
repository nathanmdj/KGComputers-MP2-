import React from 'react'
import ReactDOM from 'react-dom/client'
import './SASS/styles.scss'
// import './dist/styles.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Desktop from './components/Desktop/Desktop'
import Laptop from './components/Laptop/Laptop'
import Peripherals from './components/Peripherals/Peripherals'
import Components from './components/Components/Components'
import Login from './components/Login/Login'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
     <Route path='' element={<Home/>}/>
     <Route path='desktop' element={<Desktop/>}/>
     <Route path='laptop' element={<Laptop/>}/>
     <Route path='peripherals' element={<Peripherals/>}/>
     <Route path='components' element={<Components/>}/>
     <Route path='login' element={<Login/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
