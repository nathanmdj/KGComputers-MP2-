import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Bell, BellFill, Gear, GearFill } from 'react-bootstrap-icons'

const DashboardHeader = () => {
  return (
    <div className='d-flex justify-content-end dashboard-header'>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container className=''>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-md-none">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Button className='bg-body-tertiary border-0 p-0 '>
              <BellFill size={22} className='text-primary'/>
            </Button>
            <Button className='bg-body-tertiary border-0'>
              <GearFill size={22} className='text-primary'/>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default DashboardHeader