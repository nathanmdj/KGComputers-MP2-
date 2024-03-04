import React, { useContext, useState, createContext, useEffect} from 'react'
import { postRequest } from '../utils/apiRequest'


const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginUser, setLoginUser] = useState('')
  const [update, setUpdate] = useState(false)
  const [adminAuth, setAdminAuth] = useState(false)
  
  useEffect(()=> {
    const user = localStorage.getItem('User') || '';
    const checkUser = {
      username: user
    }
    postRequest('loginUser', checkUser)
      .then((data)=>{
        if(data.formattedUser === ''){
          setIsAuthenticated(false)
          localStorage.removeItem('User')
          return
        }
        setLoginUser(data.formattedUser)
        setIsAuthenticated(true)
      })
      .catch((error)=>{
        setIsAuthenticated(false)
      })

    if(user !== ''){
      
    }
  },[update])
 

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, loginUser, setUpdate, update, adminAuth, setAdminAuth}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
