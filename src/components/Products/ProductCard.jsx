// ProductCard.js
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './productCard.scss';
import DesktopSidebar from '../Sidebar/FilterSidebar';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      <Col className='d-none d-md-block '><DesktopSidebar/></Col>
    {products.map((product) => (
      <Col key={product.pID}>
        <Card className='h-100'>
          <div className="card-img-container">
            <Card.Img variant="top" src={product.imageUrl} />
          </div>
          <Card.Body className="d-flex flex-column">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            
            <div className='mt-auto'>
              <Card.Text>₱{product.price}</Card.Text>
              <div className="btn-container gap-1">
                <button className='btn buy-btn btn-info'>Buy Now</button>
                <button className='btn buy-btn btn-info'><span className="bi-cart-plus"></span></button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
  );
};

export default ProductCard;
