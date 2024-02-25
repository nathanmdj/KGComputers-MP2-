import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getRequest } from '../../../utils/apiRequest'

const NewOrdersTable = () => {
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    getRequest('admin-newOrders')
      .then((data)=>{
        setNewOrders(data)
      })
  },[])
  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th className='col-1'>ID</th>
            <th className='col-1'>Date</th>
            <th>Items</th>
            <th className='col-2'>Total</th>
            <th className='col-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {newOrders.map((item,i)=>
            <tr key={i}>
              <td>{item._id.slice(0,3)}...{item._id.slice(-5)}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.items.join(', ')}</td>
              <td>₱ {item.total}</td>
              <td>{item.status}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default NewOrdersTable