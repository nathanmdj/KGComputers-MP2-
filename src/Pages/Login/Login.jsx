import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { postRequest } from '../../utils/apiRequest'
import { useAuthContext } from '../../Context/AuthContext'


const Login = () => {
  const {setIsAuthenticated, setUpdate, update} = useAuthContext()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorAlert, setErrorAlert] = useState('')


  const handleLogin = (e) => {
    e.preventDefault()
    if(username === '' || password === ''){
      setErrorAlert("Fields can't be empty!")
      return
    }
    
    const credentials = {
      username: username,
      password: password
    }
    
    postRequest('login', credentials)
      .then(data=>{
        if(data.code === 'success'){
          setIsAuthenticated(true)
          localStorage.setItem('User', data.loginUser)
          setUpdate(!update)
          navigate('/')
        } else {
          setErrorAlert(data.error)
        }
      })
      .catch((error)=>{
        console.error('Error:', error);
      })
  }

  console.log();
  
  return (
    <div className="d-flex justify-content-center">
      <div className='login-form-container'>
        <form className="form-controls">
          <p className="title">Login</p>
          <div className="input-field">
            <input required className="input" type="text" 
            value={username}
            onChange={(e)=>{
              setErrorAlert('')
              setUsername(e.target.value)}}/>
            <label className="label text-primary" htmlFor="input">Enter username</label>
          </div>
          <div className="input-field">
            <input required className="input" type="password" 
            value={password}
            onChange={(e)=>{
              setErrorAlert('')
              setPassword(e.target.value)}}/>
            <label className="label text-primary" htmlFor="input">Enter Password</label>
          </div>
          <a className='text-secondary'>Forgot your password?</a>
          <p className='text-danger'>{errorAlert}</p>
          <button className="submit-btn" type="submit"
          onClick={(e)=>handleLogin(e)}>Sign In</button>
          <Link to={'/register'}>Don't have an account? Signup</Link>
        </form>
  
      </div>
    </div>
  )
}

export default Login