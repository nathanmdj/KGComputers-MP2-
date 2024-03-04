import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import './dashboardLayout.scss';
import { Col, Row } from 'react-bootstrap';
import { useAuthContext } from '../Context/AuthContext';
import AdminLogin from './Pages/AdminLogin/AdminLogin';

function DashboardLayout() {
    const {adminAuth} = useAuthContext()

    if (!adminAuth) {
      return <AdminLogin/>
    }
  return (
    
    <div>
      <Row>
        <Col md={2} className='sidebar-menu d-none d-md-block'>
          <SidebarMenu/>
        </Col>
        
        <Col className='main-content'>
          <DashboardHeader/>
          <Outlet />
        </Col>
      

      </Row>

    </div>
    
    
  );
}

export default DashboardLayout;
