import React, { useContext } from 'react'
import { DescriptionContext } from '../../Context/DescriptionContext'
import { Row, Col } from 'react-bootstrap'
import './description.scss'
import Specification from './Specification'
import DescriptionSidebar from './DescripSidebar'

const Description = () => {
  const product = useContext(DescriptionContext)
  const item = product[0] || [];
  const availabilitStyle = {
    color: item.stocks < 1 || item.stocks === undefined ? 'red' : 'green',
  }
  
  return (
    <div className='container-md'>
      <Row>
        <Col lg={9} className=''>
          <Row>
            <Col sm={6} md={4}>
              <div className="img-container border ">
                <img src={item.imageUrl} alt="" />
              </div>
            </Col>
            <Col >
              <div className="ms-3">
                <div className="border-bottom">
                  <h5>{item.description}</h5>
                  <p>Availability: 
                    <span style={availabilitStyle}>
                      {(item.stocks < 1 || item.stocks === undefined) ? ' Out of stock' : ' In Stock'}
                    </span>
                  </p>
                </div>
                <div className="price mt-3 mb-auto ">
                  <p className="fs-3 mt-3 mb-0">&#8369; {item.price}</p>
                </div>
                <p className='mb-1 mt-3'>Quantity</p>
                  <div className="row  description-quantity gap-2 flex-sm-wrap">
                    <input type="number" className="rounded-pill form-control w-25 " min="1" placeholder="1"/>
                    <a href="" className="btn btn-primary rounded-pill col-md-4 description-addcart"><i className="bi bi-cart-plus pe-2"></i>Add to Cart</a>
                    <a href="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" className="btn btn-info rounded-pill col-md-3">Buy Now</a>
                  </div>
              </div>
            </Col>
            
          </Row>
          
        </Col>
        <Col lg={3} className='mt-3 mt-lg-0 '>
          <DescriptionSidebar/>
        </Col>
        
      </Row>
      <div className="specs-container">
        <div className="specification border p-3 my-4 rounded-4 col-lg-9">
          <Specification
          specs={item.specs}
          />
        </div>
      </div>
      
     
    </div>
  )
}

export default Description