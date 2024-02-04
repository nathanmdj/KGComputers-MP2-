import React, { useEffect, useState } from 'react';
import './cartLayout.scss';
import DeleteFromCart from './deleteFromCart';
import { useCartContext } from '../../Context/CartContext';
const CartLayout = (props) => {
  const {updateCartContext, setUpdateCartContext} = useCartContext()
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [quantity, setQuantity] = useState(existingCart[props.index]?.qty || 0);
  const [subtotal, setSubtotal] = useState('');
  const numericPrice = parseFloat(props.price.replace(/,/g, ''));
  
  const updateQuantity = (cart) => {
    const updatedQuantity = cart[props.index]?.qty || 0;
    setQuantity(updatedQuantity);
  };

  const handleItemDelete = (i) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    if(i !== -1) {
      existingCart.splice(i,1)
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      props.setCartUpdated(!props.cartUpdated)
      setUpdateCartContext(!updateCartContext)
      updateQuantity(existingCart);
    }
  }
  
  useEffect(() => {
    const newSubtotal = isNaN(quantity) ? 0 : quantity * numericPrice;
    const formattedValue = newSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setSubtotal(formattedValue);

    props.setCartUpdated(!props.cartUpdated)
    
  }, [quantity]);
  
  
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
  }, [quantity, handleItemDelete]);

  
  return (
    <div className='cart-offcanvas border-bottom'>
      <div className="cart-img">
        <img src={props.imageUrl} alt="" />
      </div>
      <div className="cart-description">
        <div className="cart-title">
          <h5>{props.name}</h5>
        </div>
        <div className='price'> 
          <p>&#8369; {props.price}</p>
        </div>
        <div className="quantity">
          <input 
            type="number" 
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
          />
        </div>
        <div className="sub-total">
          <p>&#8369; {subtotal}</p>
          <DeleteFromCart
          itemRemove={() => handleItemDelete(props.index)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
