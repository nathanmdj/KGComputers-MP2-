import React from 'react'
import { Button } from 'react-bootstrap'

const CartButton = ({onCartButtonClick}) => {
  return (
    <div>
      <Button 
      className='bg-secondary border-0 '
      onClick={onCartButtonClick}
      ><span className='bi bi-cart4'></span></Button>
    </div>
  )
}

export default CartButton