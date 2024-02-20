import React, { useContext, useState, createContext, useEffect} from 'react'
import { getRequest } from '../utils/apiRequest'
import { useParams } from 'react-router-dom'


const ProductUpdateContext = createContext()

export const ProductUpdateContextProvider = (props) => {
  const {pID} = useParams()
  // console.log('ghhrhr',pID);
  const [productToUpdate, setProductToUpdate] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(()=> {
    getRequest(`itemToUpdate/${pID}`)
      .then((data)=>{
        setProductToUpdate(data)
      })
  },[])
 
  useEffect(()=>{
    setUpdate(!update)
  },[productToUpdate])
  return (
    <ProductUpdateContext.Provider value={{productToUpdate, update}}>
      {props.children}
    </ProductUpdateContext.Provider>
  )
}

export const useProductUpdateContext = () => useContext(ProductUpdateContext)
