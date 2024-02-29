import React, { useEffect } from 'react'
import { useCartContext } from '../../Context/CartContext'
import './checkout.scss'
import { Button } from 'react-bootstrap'
import {postRequest} from '../../utils/apiRequest'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import gcash from '../Description/payment-options/gcash.png'
import maya from '../Description/payment-options/maya.png'
import billease from '../Description/payment-options/billease.svg'

const Checkout = () => {
  const {checkoutCart, checkoutTotal, checkoutQty, updateCartContext, setUpdateCartContext} = useCartContext()
  const {isAuthenticated} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if (checkoutCart.length === 0){
      navigate('/')
    }
  }, [checkoutCart])
  
  useEffect(()=> {
    if (!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated])


  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const user = localStorage.getItem('User') || '';
    const newOrder = {
      items: checkoutCart.map((item)=> item.name),
      items_id: checkoutCart.map((item)=> item.pID),
      qty: checkoutQty,
      total: checkoutTotal,
      status: "Order placed",
      buyer: user
    }
    
    postRequest('place-order', newOrder)
      .then((data)=>{
        localStorage.removeItem('cart')
        navigate('/purchase-success')
        setUpdateCartContext(!updateCartContext)
      })
      .catch((error)=>{
        console.log(error);
      })
    
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100  checkout container-lg p-0">
      
      <div className='d-flex justify-content-center align-items-center p-4 p-lg-5 flex-wrap gap-3 bg-body-tertiary w-100 rounded-5 '>
        <div className=" checkout-container p-4 col-xs-12 col-sm-5">
          <h5>Order Summary</h5>
          {checkoutCart.map((item,i)=>
            <div key={i} className='d-flex flex-wrap'>
              <div className="img-container">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="description ms-3">
                <p className='fw-medium m-1'>{item.name} </p>
                <div className="quantity w-100">
                  <p>₱ {item.price} x {checkoutQty[i]}</p>
                </div>
              </div>
            </div>
          )}
          <div className="total mt-5">
            <h5>Total ₱ {checkoutTotal}</h5>
          </div>     
        </div>


        <div className="payment">
          <div className="modals">
            <form className="form">
              <div className="payment--options">
                <button name="paypal" type="button">
                  <img src={gcash} alt="" />
                </button>
                <button name="apple-pay" type="button">
                  <img src={maya} alt="" />
                </button>
                <button name="google-pay" type="button">
                  <img src={billease} alt="" />
                </button>
              </div>
              <div className="separator">
                <hr className="line" />
                <p>or pay using credit card</p>
                <hr className="line" />
              </div>
              <div className="credit-card-info--form">
                <div className="input_container">
                  <label htmlFor="password_field" className="input_label">Card holder full name</label>
                  <input id="password_field" className="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter your full name" />
                </div>
                <div className="input_container">
                  <label htmlFor="password_field" className="input_label">Card Number</label>
                  <input id="password_field" className="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="input_container">
                  <label htmlFor="password_field" className="input_label">Expiry Date / CVV</label>
                  <div className="split">
                    <input id="password_field" className="input_field" type="text" name="input-name" title="Expiry Date" placeholder="01/23" />
                    <input id="password_field" className="input_field" type="number" name="cvv" title="CVV" placeholder="CVV" />
                  </div>
                </div>
              </div>
              <button className="purchase--btn"
              onClick={(e)=>handlePlaceOrder(e)}>Checkout</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout