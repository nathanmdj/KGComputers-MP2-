import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import axios from 'axios';
import CartLayout from './CartLayout';

const backend_url = 'http://localhost:5000';

const CartOffcanvas = ({ show, handleClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Update cartItems with the latest value
    setCartItems((prevCartItems) => {
      if (JSON.stringify(prevCartItems) !== JSON.stringify(storedCartItems)) {
        sendCartToBackend(storedCartItems); // Call the backend API with the latest cartItems
      }
      return storedCartItems; // Set the state to the latest value
    });
  }, [show, cartUpdated]);
  
  const sendCartToBackend = async (cartItemsToSend) => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post(`${backend_url}/cart`, { cartItems: cartItemsToSend });
      setCartDetails(response.data);
    } catch (error) {
      console.error('Error sending cart to backend:', error);
    }
  };
 
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      {cartDetails ? (
        cartDetails.map((item, i) => 
          <div key={i}>
            <CartLayout
              imageUrl={item.imageUrl}
              name={item.name}
              description={item.description}
              price={item.price}
              index={i}
              setCartUpdated={setCartUpdated}
              cartUpdated={cartUpdated}
              
            />
          </div>
        )
      ) : (
        <p>Loading cart details...</p>
      )}
        
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
