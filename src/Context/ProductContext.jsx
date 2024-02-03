import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';

export const ProductContext = createContext(null);
const backend_url = 'http://localhost:5000';

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/products/${props.category}`);
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
