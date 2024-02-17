import React, { useEffect } from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import ProfileSidebar from './ProfileSidebar'

const UserProfile = () => {
  const {isAuthenticated} = useAuthContext()
  const navigate = useNavigate()

  useEffect(()=> {
    if (!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated])
  

  return (
    <div className='container-md p-0 rounded-3 user-profile d-flex gap-3'>
      <div>
        <ProfileSidebar/>
      </div>
      <div className="p-3 w-100 ">
        <Outlet/>
      </div>
    </div>
  )
}

export default UserProfile