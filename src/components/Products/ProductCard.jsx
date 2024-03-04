import { Card} from 'react-bootstrap';
import './productCard.scss';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useCartContext } from '../../Context/CartContext';

const ProductCard = (props) => {
    const {updateCartContext, setUpdateCartContext} = useCartContext()

    const addToCart = (button) => {
       // Retrieve existing cart from localStorage or create a new one if it doesn't exist
       const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
                  
       // Create the new item to add to the cart
       const itemIndex = existingCart.findIndex((item) => props.pID === item.pID)
       
      //  if item is already in the cart, it will not create a new item on array
      // instead it will update the quantity property if the item
       if (itemIndex !== -1) {
         existingCart[itemIndex].qty += 1;
         localStorage.setItem('cart', JSON.stringify(existingCart));
         setUpdateCartContext(!updateCartContext)

      // if the button clicked is cart icon, it will display a succes notif
      // if it is the buy button it will open the cart offcanvas
         if(button === 'add'){
          props.showAlert('Item added to cart successfully!')
          props.variant('success')
         } else if(button === 'buy'){
          props.showOffcanvas()
         }
         return
       }
       
      // object for new item to be added on the localStorage array
       const newItem = {
         pID: props.pID,
         qty: 1
       };
      
      //  checks if the item is in stock
       if(props.stocks < 1 || props.stocks == undefined) {
         props.showAlert('Item is out of stock! Please Try again later.')
         props.variant('danger')
         
       } else {
         setUpdateCartContext(!updateCartContext)
         existingCart.push(newItem);

       // Save the updated cart back to localStorage
         localStorage.setItem('cart', JSON.stringify(existingCart));
         console.log('Item added to cart:', newItem);
         if(button === 'add'){
          props.showAlert('Item added to cart successfully!')
          props.variant('success')
         } else if(button === 'buy'){
          props.showOffcanvas()
         }
       }
    }
  return (

        <Card className='h-100 product-card'>
          <Link
            to={`/products/description/${props.pID}`}
          >
            <div className="card-img-container">
              <Card.Img variant="top" src={props.imageUrl} alt='product image'/>
            </div>  
          </Link>
          
          <Card.Body className="d-flex flex-column">
            <Link
              to={`/products/description/${props.pID}`}
            >
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>{props.description}</Card.Text>
            </Link>
            
            <div className='mt-auto'>
              <Card.Text className='price'>₱{props.price}</Card.Text>
              <div className="btn-container gap-1">
                <button 
                className='btn buy-btn btn-info'
                onClick={() => {
                  addToCart('buy')
                 
                }}
                >Buy Now</button>
                <button 
                className='btn buy-btn btn-info'
                value={props.pID}
                onClick={() => {
                    addToCart('add')
                }}
                ><span className="bi-cart-plus"></span></button>
                 
              </div>
            </div>
          </Card.Body>
        </Card>
  );
};

export default ProductCard;
