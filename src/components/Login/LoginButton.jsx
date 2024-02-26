import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
import { useAuthContext } from '../../Context/AuthContext';


const LoginButton = () => {
const {isAuthenticated, setIsAuthenticated, loginUser} = useAuthContext()
const navigate = useNavigate()



const handleLogin = () => {
  navigate('/login')
}

const handleLogout = () => {
  setIsAuthenticated(false)
  localStorage.removeItem('User')
}

  return (
    <div>
      
      <div 
      className={isAuthenticated ? 'd-none': 'd-block'}>
        <Button variant="" 
        onClick={handleLogin}>
          <div className='d-flex align-items-center'>
            <Icon.Person size={21}/>
            <span>Login</span>
          </div>
        </Button>
      </div>

      <div
      className={isAuthenticated ? 'd-block': 'd-none'}>
        <Dropdown
        align={{align: 'start'}}>
          <Dropdown.Toggle variant="success" className='bg-transparent border-0'
          >
            <Icon.PersonCircle color='white' size={25}/>
          </Dropdown.Toggle>

          <Dropdown.Menu className='text-black'>
            <Dropdown.Item disabled>Hi, {loginUser}! </Dropdown.Item>
            <Dropdown.Item 
            onClick={()=>navigate('/user-profile')}>Profile</Dropdown.Item>
            <Dropdown.Item 
            onClick={handleLogout}
            className='a border-top'>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default LoginButton;
