import React from 'react'
import './userProfile.scss'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProfileSidebar = () => {
  return (
    <div className='profile-sidebar d-none d-md-block '>
      <div className="bg-secondary rounded-3 h-100 menu">
        <Nav>
          <Nav.Link as={Link} to='order-history'>Order History</Nav.Link>
          <Nav.Link as={Link} to='settings'>Profile Settings</Nav.Link>
        </Nav>
      </div>
    </div>
  )
}

export default ProfileSidebar