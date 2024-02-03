import React from 'react'
import { Card } from 'react-bootstrap'
import image1 from './payment-options/cod.webp'
import image2 from './payment-options/gcash.png'
import image3 from './payment-options/maya.png'
import image4 from './payment-options/visa.png'
import image5 from './payment-options/mastercard.png'
import image6 from './payment-options/7-11.png'
import image7 from './payment-options/billease.svg'
import image8 from './payment-options/homecredit.png'
import './description.scss'

const DescriptionSidebar = () => {
  const imagePaths = [image1, image2, image3, image4, image5, image6, image7, image8];

  return (
    <div className=''>
      <div className="delivery">
        <Card>
          <Card.Header>Deliver Options</Card.Header>
          <Card.Body className='px-1 pe-3'>
            <ul>
              <li>Nationwide Delivery</li>
              <li>Express Delivery - Cavite</li>
              <li>Same Day Delivery - Cavite and nearby areas</li>
            </ul>
          </Card.Body>
        </Card>
      </div>
      <div className="payment mt-4">
        <Card>
          <Card.Header>Payment Options</Card.Header>
          <Card.Body className='px-0 d-flex flex-wrap align-items-center gap-2 justify-content-center'>
              {imagePaths.map((path, i) => (
                <div className="payment-img">
                <img key={i} src={path} alt={`Image ${i + 1}`} />
                </div>
              ))}
            
          </Card.Body>
        </Card>
      </div>
      <div className="warranty mt-4">
        <Card>
          <Card.Header>Warranty</Card.Header>
          <Card.Body className='px-0'>
            <ul className='px-3'>
              <p><span className="bi bi-check2 bg-success"></span> 7 Days Outright Replacement</p>
              <p><span className="bi bi-check2 bg-success"></span> 1 Year Warranty</p>
            </ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default DescriptionSidebar