import React, {useState, useEffect} from 'react'
import { getRequest } from '../../utils/apiRequest'
import { Alert, Card, Col, Row } from 'react-bootstrap'
import './topsellers.scss'
import ProductCard from '../Products/ProductCard'
import CartOffcanvas from '../CartOffcanvas/CartOffcanvas'

const TopSellers = () => {
  const [topProducts, setTopProducts] = useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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


  useEffect(()=>{
    getRequest('top-seller')
      .then((data)=>{
        setTopProducts(data)
      })
  },[])

  return (
    <div className='top-seller mt-3 container-lg mb-3'>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999, width: '50%' }}>
        <Alert variant={alertStyle} show={showAlert} onClose={handleHideAlert} dismissible style={{height: '100px'}}>
          {alertMessage}
        </Alert>
      </div>
      <CartOffcanvas show={showOffcanvas} handleClose={handleCloseOffcanvas} />
      <h3>Top Sellers</h3>
      <Row className='g-2'>
        {topProducts.map((item, i)=>
          <Col key={i} xs={6} lg={3}
          className=''>
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
        )}
      </Row>
    </div>
  )
}

export default TopSellers