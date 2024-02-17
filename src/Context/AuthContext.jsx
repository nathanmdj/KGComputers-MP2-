import React, { useContext, useState, createContext, useEffect} from 'react'


const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=> {
    const user = localStorage.getItem('User') || '';
    if(user !== ''){
      setIsAuthenticated(true)
    }
  })
 

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
