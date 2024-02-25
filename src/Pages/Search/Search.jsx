import React, { useContext, useState, useEffect } from 'react';
import { Card, Col, Row, Alert } from 'react-bootstrap';
import Sort from '../../components/Sort/Sort'
import { sortProduct } from '../../utils/sort';
import ProductCard from '../../components/Products/ProductCard';
import CartOffcanvas from '../../components/CartOffcanvas/CartOffcanvas';
import { useSeachContext } from '../../Context/SearchContext';

const Search = () => {
  const {searchResult} = useSeachContext([])
  const [sortValue, setSortValue] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStyle, setAlertStyle] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);
  
 
  useEffect(()=>{
    if(searchResult.code === 0){
      setSortedProducts([])
    } else{
      setSortedProducts(sortProduct(searchResult, sortValue))
    }
  },[searchResult, sortValue])
  

  
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

  // Update the title when page page changes
  useEffect(() => {
      
      document.title = `KG Computers | Search`;
  
      
      return () => {
        // Cleanup logic
        document.title = 'KG Computers';
      };
  }, []); 

  if (sortedProducts === undefined) {
    return <h1>No Items Found</h1>
  }
  return (
    
    <div className='container-md mb-3'>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999, width: '50%' }}>
        <Alert variant={alertStyle} show={showAlert} onClose={handleHideAlert} dismissible style={{height: '100px'}}>
          {alertMessage}
        </Alert>
      </div>
      <CartOffcanvas show={showOffcanvas} handleClose={handleCloseOffcanvas} />
      <h1>Search</h1>
      <Row>
        <Col className='border d-none d-md-block side-bar' md={3} lg={2}>
          Filter Sidebar
        </Col>
        <Col md={9}>
          <div className='sort'>
            <p>{(searchResult.code === 0) ? 'No result found' : `Showing 1 - ${searchResult.length} out of ${searchResult.length} products`}</p>
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
  )
}

export default Search