import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import { useSeachContext } from './SearchContext';
import { getRequest } from '../utils/apiRequest';

export const ProductContext = createContext(null);
// const backend_url = 'https://kgcomputers.onrender.com';

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    getRequest(`products/${props.category}`)
      .then((data)=>{
        setProducts(data)
      })
      .catch((error)=>{
        console.error('Error fetching data:', error);
        setError(error);
      })
      .finally(()=>setLoading(false))
  }, [props.category]);
  
 

  if (loading) {
    // Data is still loading
    return  <Spinner/>
    
  }

  if (error) {
    // Error occurred while fetching data
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <ProductContext.Provider value={products}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
