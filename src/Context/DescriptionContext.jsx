import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

export const DescriptionContext = createContext(null);
const backend_url = 'http://localhost:5000';

const DescriptionContextProvider = (props) => {
  const {pID} = useParams()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/description/${pID}`);
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pID]);
  
  if (loading) {
    // Data is still loading
    return <Spinner/>;
  }

  if (error) {
    // Error occurred while fetching data
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <DescriptionContext.Provider value={products}>
      {props.children}
    </DescriptionContext.Provider>
  );
};

export default DescriptionContextProvider;
