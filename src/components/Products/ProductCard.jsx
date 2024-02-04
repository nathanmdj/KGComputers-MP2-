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
       
       if (itemIndex !== -1) {
         existingCart[itemIndex].qty += 1;
         localStorage.setItem('cart', JSON.stringify(existingCart));
        
         if(button === 'add'){
          props.showAlert('Success')
          props.variant('success')
         } else if(button === 'buy'){
          props.showOffcanvas()
         }
         return
       }
       
       const newItem = {
         pID: props.pID,
         qty: 1
       };

       if(props.stocks < 1 || props.stocks == undefined) {
         props.showAlert('Error! Item is out of stock')
         props.variant('danger')
         
       } else {
         setUpdateCartContext(!updateCartContext)
         existingCart.push(newItem);

       // Save the updated cart back to localStorage
         localStorage.setItem('cart', JSON.stringify(existingCart));
         console.log('Item added to cart:', newItem);
         if(button === 'add'){
          props.showAlert('Success')
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
              to={'/products/description'}
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
