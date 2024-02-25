import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import axios from 'axios';
import CartLayout from './CartLayout';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';
import { postRequest } from '../../utils/apiRequest';



const CartOffcanvas = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const {setCheckoutCart, setCheckoutTotal, setCheckoutQty} = useCartContext()
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
    postRequest('cart', cartItemsToSend)
      .then((data)=>{
        setCartDetails(data)
      })
      .catch((error)=>{
        console.log(error);
      })
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
  
  const handleCheckout = () => {
    setCheckoutQty(quantity)
    console.log(quantity);
    setCheckoutCart(cartDetails)
    setCheckoutTotal(total)
    navigate('/checkout')
    handleClose()
  }

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
          <h5 className='py-3'>{(quantity.length < 1) ? 'Cart Empty' : `Total: ₱ ${total}`}</h5>
          <div className={`offcanvas-btn d-flex justify-content-end gap-2 ${(quantity.length < 1) ? 'd-none' : ''}`}>
            <Button className='bg-info text-white border-0 '
            onClick={handleClose}>Continue Shopping</Button>
            <Button className='text-white'
            onClick={()=>handleCheckout()}>Checkout</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

          
    </>

   

    
  );
};

export default CartOffcanvas;
