import React, { useContext, useState, createContext} from 'react'


const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  
  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
