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
      <Nav className="flex-column nav-menu">
        
        <NavLink  to={'/dashboard'}>Main</NavLink>
        <NavLink to={'/dashboard/product-list'}
        className={({isActive}) =>
        `${isActive ? "text-primary" : "text-white" }`
        }>Product List</NavLink>
        <NavLink to={'orders'}>Orders</NavLink>
      </Nav>

      <Button 
      onClick={()=>handleLogout()}>Logout</Button>
    </div>
  )
}

export default SidebarMenu