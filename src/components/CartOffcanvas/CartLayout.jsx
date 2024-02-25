import React, { useEffect, useState } from 'react';
import './cartLayout.scss';
import DeleteFromCart from './DeleteFromCart';
import { useCartContext } from '../../Context/CartContext';

const CartLayout = (props) => {
  const {updateCartContext, setUpdateCartContext} = useCartContext()
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [quantity, setQuantity] = useState(existingCart[props.index]?.qty || 0);
  const [subtotal, setSubtotal] = useState('');
  const [numericPrice, setNumericPrice] = useState(parseFloat(props.price.replace(/,/g, '')));
  
  
  const updateQuantity = (cart) => {
    const updatedQuantity = cart[props.index]?.qty || 0;
    setQuantity(updatedQuantity);
  };

  const handleItemDelete = (i) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    if(i !== -1) {
      existingCart.splice(i,1)
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      props.setCartUpdated(!props.cartUpdated) //dependecy to re-render off-canvas after delete
      setUpdateCartContext(!updateCartContext) //this one is to update cart counter after delete
      updateQuantity(existingCart); //get the lates quantity from localStorage
    }
  }
  
  useEffect(() => {

    const newSubtotal = isNaN(quantity) ? 0 : quantity * numericPrice;
    const formattedValue = newSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setSubtotal(formattedValue);
    setUpdateCartContext(!updateCartContext)
    props.setCartUpdated(!props.cartUpdated)
  }, [quantity, numericPrice]);
  
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(isNaN(newQuantity) ? '' : newQuantity);
  };

  useEffect(() => {
    const updatedCart = existingCart.map((item, index) => {
      if (index === props.index) {
        return { ...item, qty: quantity };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setNumericPrice(parseFloat(props.price.replace(/,/g, '')))
  }, [quantity, handleItemDelete]);

  
  return (
    <div className='cart-offcanvas border-bottom'>
      <div className="cart-img me-3">
        <img src={props.imageUrl} alt="" />
      </div>
      <div className="cart-description">
        <div className="cart-title">
          <p className='fw-bold m-0 '>{props.name}</p>
        </div>
        <div className='offcanvas-price'> 
          <p>&#8369; {props.price}</p>
        </div>
        <div className="quantity d-flex gap-3">
          <input 
            className='form-control'
            type="number" 
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />

          <DeleteFromCart
            itemRemove={() => handleItemDelete(props.index)}
          />
        </div>
        <div className="sub-total">
          <p className='fw-bold'>&#8369; {subtotal}</p>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
