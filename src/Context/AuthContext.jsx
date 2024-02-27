import React, { useContext, useState, createContext, useEffect} from 'react'
import { postRequest } from '../utils/apiRequest'


const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginUser, setLoginUser] = useState('')
  const [update, setUpdate] = useState(false)
  
  useEffect(()=> {
    const user = localStorage.getItem('User') || '';
    const checkUser = {
      username: user
    }
    postRequest('loginUser', checkUser)
      .then((data)=>{
        setLoginUser(data.formattedUser)
      })

    if(user !== ''){
      setIsAuthenticated(true)
    }
  },[update])
 

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, loginUser, setUpdate, update}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
