import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useCartContext } from '../../Context/CartContext'
import './cartLayout.scss'

const CartButton = ({onCartButtonClick, updateQty}) => {
  const {cartItemsQty} = useCartContext()
  const [quantity, setQuantity] = useState(cartItemsQty)
  
  useEffect(() => {
    setQuantity(cartItemsQty)
  },[cartItemsQty])

  return (
    <div className='cart-icon-container'>
      <Button 
      className='bg-secondary border-0 '
      onClick={onCartButtonClick}
      ><span className='bi bi-cart4'></span></Button>
      <span className='text-white cart-counter'>{quantity || 0}</span>
    </div>
    
  )
}

export default CartButton