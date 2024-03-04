import React from 'react'
import '../../dashboardLayout.scss'
import { Link, NavLink} from 'react-router-dom'
import { Button, Nav} from 'react-bootstrap'
import './sidebarMenu.scss'
import { useAuthContext } from '../../../Context/AuthContext'

const SidebarMenu = () => {
  const {setAdminAuth} = useAuthContext()

  const handleLogout = () => {
    setAdminAuth(false)
  }

  return (
    <div className='text-white p-1 sidebar-nav'>
      <div className="brand">

      </div>
      <Nav className="flex-column nav-menu mb-5 align-items-center ">
        
        <NavLink  to={'/dashboard'}>Main</NavLink>
        <NavLink to={'/dashboard/product-list'}
        className={({isActive}) =>
        `${isActive ? "text-primary" : "text-white" }`
        }>Product List</NavLink>
        <NavLink to={'orders'}
        className={({isActive}) =>
        `${isActive ? "text-primary" : "text-white" }`
        }>Orders</NavLink>
      </Nav>
      
      <div className="logout-btn d-flex justify-content-center pt-5">
        <Button 
        className='text-white mt-5'
        onClick={()=>handleLogout()}>Logout</Button>
      </div>
    </div>
  )
}

export default SidebarMenu