import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { getRequest } from '../utils/apiRequest';

export const DescriptionContext = createContext(null);
// const backend_url = 'https://kgcomputers.onrender.com';

const DescriptionContextProvider = (props) => {
  const {pID} = useParams()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`${backend_url}/description/${pID}`);
    //     setProducts(response.data)
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();

    getRequest(`description/${pID}`)
      .then((data)=>{
        setProducts(data)
        console.log(data)
      })
      .catch((error)=>{
        console.error('Error fetching data:', error)
        setError(error)
      })
  }, [pID]);

  return (
    <DescriptionContext.Provider value={products}>
      {props.children}
    </DescriptionContext.Provider>
  );
};

export default DescriptionContextProvider;
