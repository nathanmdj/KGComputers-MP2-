import React, { useContext, useState, useEffect } from 'react';
import ProductContextProvider, { ProductContext } from '../Context/ProductContext';
import { Card, Col, Row, Alert } from 'react-bootstrap';
import ProductCard from '../components/Products/ProductCard';
import './productCategory.scss'
import {Dropdown} from 'react-bootstrap';
import CartOffcanvas from '../components/CartOffcanvas/CartOffcanvas';


const ProductCategory = (props) => {
  const products = useContext(ProductContext);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStyle, setAlertStyle] = useState('');

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
   
    <div className='container-md mb-3'>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999, width: '50%' }}>
        <Alert variant={alertStyle} show={showAlert} onClose={handleHideAlert} dismissible style={{height: '100px'}}>
          {alertMessage}
        </Alert>
      </div>
      <CartOffcanvas show={showOffcanvas} handleClose={handleCloseOffcanvas} />
      <h1>{props.category}</h1>
      <Row>
        <Col className='border d-none d-md-block side-bar' md={3} lg={2}>
          Filter Sidebar
        </Col>
        <Col md={9}>
          <div className='sort'>
            <p>{(products.length < 1) ? 'No result found' : `Showing 1 - ${products.length} out of ${products.length} products`}</p>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  Sort by 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/name-ascending">Name: A-Z</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Name: Z-A</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Price: Lowest to Highest</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">Price: Highest to Lowest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
          
          <Row className='g-2'>
            {products.map((item, i) => (
              <Col key={i} xs={12} sm={6}  lg={4}>
                <ProductCard
                  pID={item.pID}
                  name={item.name}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  stocks={item.stocks}
                  showAlert={handleShowAlert}
                  variant={setAlertStyle}
                  showOffcanvas={handleShowOffcanvas}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      
    </div>
            
  );
};

export default ProductCategory;
