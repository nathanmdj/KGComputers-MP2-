// CartContext.js
import React, { createContext, useContext, useState, useEffect} from 'react';
import CartLayout from '../components/CartOffcanvas/CartLayout';

const CartContext = createContext();

export const CartContextProvider = (props) => {
 
  const [cartItemsQty, setCartItemsQty] = useState(null);
  const [updateCartContext, setUpdateCartContext] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemQty = existingCart.map((item) => item.qty)
        setCartItemsQty(itemQty.reduce((acc, val) => acc + val, 0))
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } 
    };
    console.log('context');
    fetchData();
  }, [updateCartContext]);

  return (
    <CartContext.Provider value={{cartItemsQty, updateCartContext, setUpdateCartContext}}>
      {props.children}
    </CartContext.Provider>

  );
};

export const useCartContext = () => useContext(CartContext);
