import React, { useContext, useState, useEffect } from 'react';
import ProductContextProvider, { ProductContext } from '../Context/ProductContext';
import { Card, Col, Row, Alert } from 'react-bootstrap';
import ProductCard from '../components/Products/ProductCard';
import './productCategory.scss'

import CartOffcanvas from '../components/CartOffcanvas/CartOffcanvas';
import Sort from '../components/Sort/Sort';
import { sortProduct } from '../utils/sort';
import FilterSidebar from '../components/Sidebar/FilterSidebar';


const ProductCategory = (props) => {
  const products = useContext(ProductContext);
  const [sortValue, setSortValue] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStyle, setAlertStyle] = useState('');
  
  
  const sortedProducts = sortProduct(products, sortValue)
  
  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 1500);

    // Clear timeout on component unmount or if duration changes
    return () => clearTimeout(timeout);
  
  };

  

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  // Update the title when page page changes
  useEffect(() => {
      
      document.title = `KG Computers | ${props.category}`;
  
      
      return () => {
        // Cleanup logic
        document.title = 'KG Computers';
      };
  }, [props.category]); 

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
          <FilterSidebar/>
        </Col>
        <Col md={9} lg={10}>
          <div className='sort'>
            <p>{(products.length < 1) ? 'No result found' : `Showing 1 - ${products.length} out of ${products.length} products`}</p>
            <Sort setSortValue={setSortValue}/>
          </div>
          
          <Row className='g-2'>
            {sortedProducts.map((item, i) => (
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
