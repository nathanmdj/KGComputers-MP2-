// SeachContext.js
import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { getRequest } from '../utils/apiRequest';
import Spinner from '../components/Spinner/Spinner';


const SeachContext = createContext();

export const SeachContextProvider = (props) => {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  
  useEffect(() => {
    getRequest(`search?query=${query}`)
      .then((data)=>{
        setSearchResult(data)
      })
      .catch((error)=>{
        console.error('Error fetching data:', error);
        setError(error);
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [query]);
  
  if (loading) {
    // Data is still loading
    return  <Spinner/>
    
  }

  if (error) {
    // Error occurred while fetching data
    return <div>Error fetching data: {error.message}</div>;
  }


  return (
    <SeachContext.Provider value={{searchResult, setQuery}}>
      {props.children}
    </SeachContext.Provider>

  );
};

export const useSeachContext = () => useContext(SeachContext);
