import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { getRequest, postRequest } from '../../../utils/apiRequest'
import './ordersTable.scss'
import { EyeFill } from 'react-bootstrap-icons'

const NewOrdersTable = () => {
  const [newOrders, setNewOrders] = useState([])
  const [update, setUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [order, setOrder] = useState({})
  const [buyerInfo, setBuyerInfo] = useState({})


  useEffect(() => {
    getRequest('admin-newOrders')
      .then((data)=>{
        setNewOrders(data)
      })

  },[update])

  const handleSelectChange = (e, id) => {
    const item = {
      id: id,
      status: e.target.value
    }
    postRequest('status-update', item)
      .then((data)=>{
        setUpdate(!update)
        console.log(data);
      })
  }

  const handleDetailsShow = (id) => {
    setShowModal(true)

    getRequest(`order-details/${id}`)
      .then((data)=>{
        setOrder(data.order)
        setBuyerInfo(data.buyerInfo)
      })
  }

  const handleClose = () => setShowModal(false);
  return (
    <div className='newOrders-table'>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th className='col-1'>Date</th>
            <th>Items</th>
            <th className='col-xl-1'>Total</th>
            <th className='col-3 col-xl-2'>Status</th>
            <th className='col-1'>Details</th>
          </tr>
        </thead>
        <tbody>
          {newOrders.map((item,i)=>
            <tr key={i}>
              <td>{new Date(item.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
              <td>{item.items.join(', ')}</td>
              <td><p className='d-flex justify-content-between'>₱ <span>{item.total}</span></p></td>
              <td>
                <Form>
                  <Form.Select defaultValue={item.status}
                  onChange={(e)=>handleSelectChange(e, item._id)}>
                    <option value='Order placed'>Order Placed</option>
                    <option value='Preparing'>Preparing</option>
                    <option value='On delivery'>On Delivery</option>
                    <option value='Complete'>Complete</option>
                  </Form.Select>
                </Form>
              </td>
              <td>
                <div className="table-btn d-flex justify-content-center ">
                  <Button
                  onClick={()=>handleDetailsShow(item._id)}><EyeFill className='text-white'/></Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal 
        show={showModal} 
        onHide={handleClose}
        backdrop='static'
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          {order && order.items_id ? (
            <>
          <div className="item-details d-flex px-0 px-md-3 px-lg-5 justify-content-evenly  justify-content-md-between">
            <div className="product-id">
              <p className='fs-5'>ID</p>
              {order.items_id.map((item, i) =>
                 <p key={i}
                className='pb-2'>{item}</p>
              )}
            </div>
            <div className="order-items">
              <p className='fs-5'>Items</p>
              {order.items.map((item, i) =>
                <p key={i}
                className='pb-2'>{item}</p>
              )}
            </div>
            <div className="quantity">
              <p className='fs-5 '>Qty</p>
              {order.qty.map((item, i) =>
                <p key={i}
                className='pb-2 text-end'>x {item}</p>
              )}
            </div>
            
          </div>
          </>) : 
              (<p>asdas</p>)}
          <p className='fw-bold'>Total : ₱ {order.total}</p>

          <div className="buyer-info">
            <h5>Customer Info</h5>
            <p>Name: {buyerInfo.firstname} {buyerInfo.lastname}</p>
            <p>Delivery Address: {buyerInfo.address}</p>
            <p>Contact Number: {buyerInfo.phone}</p>
            <p>Email: {buyerInfo.email}</p>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center '>
          <Button className='text-white'
          onClick={handleClose}>Close</Button>
        </Modal.Footer>
        
      </Modal>
    </div>
  )
}

export default NewOrdersTable