import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import axios from 'axios';
import CartLayout from './CartLayout';
import { CartContextProvider } from '../../Context/CartContext';

const backend_url = 'http://localhost:5000';

const CartOffcanvas = ({ show, handleClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [total, setTotal] = useState('Cart Empty');
  const [quantity, setQuantity] = useState([]);
  
  
  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Update cartItems with the latest value
    setCartItems((prevCartItems) => {
      if (JSON.stringify(prevCartItems) !== JSON.stringify(storedCartItems)) {
        sendCartToBackend(storedCartItems); 
      }
      return storedCartItems; // Set the state to the latest value
    });
  
    setQuantity(storedCartItems.map((item) => item.qty));
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

  // calculating Total, had a hard time adding subtotal from cartlayout component. 
  // created an array of prices then multiply each values to the array of quantity
  // assign those values into an array of subTotal then get the sum of all items inside the array
  useEffect(()=>{
    if (cartDetails && cartDetails.length > 0) {
      const prices = cartDetails.map((item) => parseFloat(item.price.replace(/,/g, '')));
      
      let subTotal = [];
      for(let i = 0; i < prices.length; i++){
        subTotal.push(prices[i] * quantity[i])
      }
      const formattedValue = subTotal.reduce((acc, price) => acc + price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      
      setTotal(formattedValue)
      
    }
  },[cartDetails, cartItems, quantity])
  
  
  return (
    <>
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
          <p></p>
        )}
          <p>{(quantity.length < 1) ? 'Cart Empty' : `Total: ${total}`}</p>
        </Offcanvas.Body>
      </Offcanvas>

          
    </>

   

    
  );
};

export default CartOffcanvas;
