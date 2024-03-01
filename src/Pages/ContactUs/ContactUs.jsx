import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './contactUs.scss'

const ContactUs = () => {
  return (
    <div className='container-md p-0 mb-3'>
      <h3 className='text-center'>Contact Us</h3>
      <div className="contact-us  d-flex justify-content-center mt-4">
        <Form className='bg-body-tertiary p-4 rounded-3'> 
          <Form.Group className='mb-3 '>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email'/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control type='text'/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control as='textarea' rows={10}/>
          </Form.Group>
          <Form.Group className='d-flex justify-content-center '>
            <Button className='text-white mt-4 px-3'>Send</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default ContactUs