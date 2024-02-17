import React from 'react'
import '../../dashboardLayout.scss'
import { Link, NavLink} from 'react-router-dom'
import { Nav} from 'react-bootstrap'
import './sidebarMenu.scss'

const SidebarMenu = () => {
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
        <NavLink to={'/dashboard'}>Orders</NavLink>
      </Nav>
    </div>
  )
}

export default SidebarMenu