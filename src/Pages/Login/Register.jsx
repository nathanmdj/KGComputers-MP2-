import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { postRequest } from '../../utils/apiRequest'
import { useAuthContext } from '../../Context/AuthContext'


const Register = () => {
  const {setIsAuthenticated} = useAuthContext()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [errorAlert, setErrorAlert] = useState('')


  const handleSignup = (e) => {
    e.preventDefault()
    const credentials = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      username: username,
      password: password
    }
    const isEmpty = Object.values(credentials).some(value => value === '');

    if(isEmpty){
      setErrorAlert('Some fields are empty!')
      return
    }

    if(password !== confirmPassword){
      setErrorAlert('Password does not match!')
      return
    }

    postRequest('register', credentials)
      .then(data=>{
        if(data.code === 'success'){
          navigate('/login')
        } else {
          setErrorAlert(data.error)
        }
      })
      .catch((error)=>{
        console.error('Error:', error);
      })
  }

  
  
  return (
    <div className="d-flex justify-content-center">
      <div className='login-form-container'>
        <form className="form-controls">
          <p className="title">Register</p>
          <div className="d-flex gap-2">
            <div className="input-field">
              <input required className="input" type="text" 
              value={firstname}
              onChange={(e)=>{
                setErrorAlert('')
                setFirstname(e.target.value)}}/>
              <label className="label text-primary" htmlFor="input">Firstname</label>
            </div>
            <div className="input-field">
              <input required className="input" type="text" 
              value={lastname}
              onChange={(e)=>{
                setErrorAlert('')
                setLastname(e.target.value)}}/>
              <label className="label text-primary" htmlFor="input">Lastname</label>
          </div>
          </div>
          <div className="input-field">
            <input required className="input" type="text" 
            value={address}
            onChange={(e)=>{
              setErrorAlert('')
              setAddress(e.target.value)}}/>
            <label className="label text-primary" htmlFor="input">Complete Delivery address</label>
          </div>
          <div className="input-field">
            <input required className="input" type="text" 
            value={email}
            onChange={(e)=>{
              setErrorAlert('')
              setEmail(e.target.value)}}/>
            <label className="label text-primary" htmlFor="input">Email</label>
          </div>
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
          <div className="input-field">
            <input required className="input" type="password" 
            value={confirmPassword}
            onChange={(e)=>{
              setErrorAlert('')
              setConfirmPassword(e.target.value)}}/>
            <label className="label text-primary" htmlFor="input">Confirm Password</label>
          </div>
          <a className='text-secondary'>Forgot your password?</a>
          <p className='text-danger'>{errorAlert}</p>
          <button className="submit-btn" type="submit"
          onClick={(e)=>handleSignup(e)}>Sign Up</button>
          <Link to={'/login'}>Already have an account? Login</Link>
        </form>
  
      </div>
    </div>
  )
}

export default Register