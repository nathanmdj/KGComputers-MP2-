// CartContext.js
import React, { createContext, useContext, useState, useEffect} from 'react';
const CartContext = createContext();

export const CartContextProvider = (props) => {
 
  const [cartItemsQty, setCartItemsQty] = useState(null);
  const [updateCartContext, setUpdateCartContext] = useState(false)
  const [checkoutCart, setCheckoutCart] = useState([])
  const [checkoutTotal, setCheckoutTotal] = useState(0)

  // cart counter
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
    
    fetchData();
  }, [updateCartContext]);

  useEffect(()=> {
    console.log(checkoutCart);
    console.log(checkoutTotal);
  },[checkoutCart, updateCartContext])

  return (
    <CartContext.Provider value={{cartItemsQty, updateCartContext, setUpdateCartContext, checkoutCart, setCheckoutCart, checkoutTotal, setCheckoutTotal}}>
      {props.children}
    </CartContext.Provider>

  );
};

export const useCartContext = () => useContext(CartContext);
