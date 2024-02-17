// SeachContext.js
import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';


const SeachContext = createContext();
const backend_url = 'http://localhost:5000';

export const SeachContextProvider = (props) => {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/search?query=${query}`);
        setSearchResult(response.data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
