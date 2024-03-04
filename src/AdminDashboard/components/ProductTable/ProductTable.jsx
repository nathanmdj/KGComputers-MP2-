import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip, Pagination } from 'react-bootstrap'
import {getRequest } from '../../../utils/apiRequest'
import { PenFill, TrashFill } from 'react-bootstrap-icons'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(()=>{
    getRequest(`all-products/${currentPage}`)
    .then((data)=> {
      setFilteredProducts(data.products)
      setTotalCount(data.totalCount)
      setTotalPage(data.totalPages)
    })
  },[update, currentPage])
 
  const handleItemDelete = (id) => {
    setConfirmModalShow(true)
    setModalMessage(`Are you sure you want to delete the product with ID ${id}?`)
    setModalTitle('Confirm Delete')
    setModalOk('Yes')
    setModalClose('Cancel')
    setSelectedID(id)
  }
  
  const paginationItems = [];

  for (let i = 1; i <= totalPage; i++) {
    paginationItems.push(
      <Pagination.Item 
        key={i}
        active={currentPage === i}
        onClick={()=>setCurrentPage(i)}
      >{i}</Pagination.Item>
    );
  }

  const displayedItems = () => {
    if (currentPage === totalPage) {
      const lastPageItems = totalCount % 10;
      const startCount = totalCount - lastPageItems + 1

      return <span>{startCount}-{totalCount}</span>
    } else {
      return <span>{(currentPage * 10) - 9}-{currentPage * 10}</span>
    }
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
              <td className='fit col-2 col-lg-1 text-nowrap'>
                <div className="action-btns">
                    
                  <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip>
                        update
                      </Tooltip>
                    }>
                    <Button variant='info' className='me-1'
                  as={Link} to={`update-product/${item.pID}`}
                  ><PenFill/></Button> 

                  </OverlayTrigger>
                  <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip>
                        delete?
                      </Tooltip>
                    }>
                    <Button variant='danger'
                      onClick={()=>{handleItemDelete(item.pID)}}
                    ><TrashFill/></Button> 

                  </OverlayTrigger>
                </div>
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

      <div className="pagination d-flex justify-content-between ">
        <p>Showing {displayedItems()} of {totalCount}</p>
        <Pagination>
          <Pagination.Prev 
            onClick={()=>setCurrentPage((prev)=> prev > 1 ? prev - 1 : prev)}/>
            {paginationItems}
          <Pagination.Next onClick={()=>setCurrentPage((prev)=>prev < totalPage ? prev + 1 : prev)}/>
        </Pagination>
      </div>   

    </div>
  )
}

export default ProductTable