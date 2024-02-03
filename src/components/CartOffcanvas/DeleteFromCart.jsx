import React from 'react'
import  Button  from 'react-bootstrap/Button'

const DeleteFromCart = ({itemRemove}) => {
  return (
    <div>
      <Button
      onClick={itemRemove}><span className='bi bi-trash'></span></Button>
    </div>
  )
}

export default DeleteFromCart