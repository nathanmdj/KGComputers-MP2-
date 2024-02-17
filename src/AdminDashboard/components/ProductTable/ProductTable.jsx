import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import {getRequest } from '../../../utils/apiRequest'
import { Trash } from 'react-bootstrap-icons'
import './productTable.scss'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal'

const ProductTable = () => {
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [update, setUpdate] = useState(false)
  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [modalOk, setModalOk] = useState('Ok')
  const [modalClose, setModalClose] = useState('Close')
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [selectedID, setSelectedID] = useState('')

  useEffect(()=>{
    getRequest('all-products')
    .then((data)=> {
      setFilteredProducts(data)
    })
  },[update])
 
  const handleItemDelete = (id) => {
    setConfirmModalShow(true)
    setModalMessage(`Are you sure you want to delete the product with ID ${id}?`)
    setModalTitle('Confirm Delete')
    setModalOk('Yes')
    setModalClose('Cancel')
    setSelectedID(id)
  }
 
  return (
    <div>
      <Button as={Link} to='add-product'
      className='mb-3'>Add Product</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stocks</th>
            <th className='fit'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item, i) => 
            <tr key={i}>
              <td className='text-end col-1' >{item.pID}</td>
              <td>{item.name}</td>
              <td>{item.category.toUpperCase()}</td>
              <td className='text-end'><span>&#8369;</span>{`${item.price}`}</td>
              <td className='text-end col-1'>{item.stocks || 0} </td>
              <td className='fit col-2 text-nowrap'>
              <Button variant='info' className='me-1'
              as={Link} to={`update-product/${item.pID}`}
              >Update</Button> 
              <Button variant='danger'
                onClick={()=>{handleItemDelete(item.pID)}}
              ><Trash/></Button> 
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ConfirmModal
      show = {confirmModalShow}
      setShow = {setConfirmModalShow}
      modalMessage={modalMessage}
      buttonOk={modalOk}
      buttonClose={modalClose}
      modalTitle={modalTitle}
      mode={'itemDelete'}
      id={selectedID}
      update={update}
      setUpdate={setUpdate}
      />
    </div>
  )
}

export default ProductTable