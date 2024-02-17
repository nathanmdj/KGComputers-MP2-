import React from 'react'
import { useCartContext } from '../../Context/CartContext'
import './checkout.scss'

const Checkout = () => {
  const {checkoutCart, checkoutTotal} = useCartContext()
  
  return (
    <div className='d-flex justify-content-center pt-5'>
      <div className="bg-body-tertiary w-75 checkout-container p-5">
        {checkoutCart.map((item,i)=>
          <div key={i}>
            <img src={item.imageUrl} alt="" />
            {item.name}
            <p>{item.price}</p>
          </div>
        )}
        <div className="total">
          <h4>Total ₱ {checkoutTotal}</h4>
        </div>

      </div>
    </div>
  )
}

export default Checkout