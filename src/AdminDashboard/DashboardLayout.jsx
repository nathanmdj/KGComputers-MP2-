import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import './dashboardLayout.scss';
import { Col, Row } from 'react-bootstrap';

function DashboardLayout() {
  
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
