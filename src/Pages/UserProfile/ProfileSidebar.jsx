import React from 'react'
import './userProfile.scss'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProfileSidebar = () => {
  return (
    <div className='profile-sidebar'>
      <div className="bg-secondary rounded-3 h-100 menu">
        <Nav>
          <Nav.Link as={Link} to='order-history'>Order History</Nav.Link>
          <Nav.Link>Order History</Nav.Link>
          <Nav.Link>Order History</Nav.Link>
          <Nav.Link>Profile Settings</Nav.Link>
        </Nav>
      </div>
    </div>
  )
}

export default ProfileSidebar