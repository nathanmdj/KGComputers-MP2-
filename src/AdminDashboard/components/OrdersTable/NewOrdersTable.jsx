import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { getRequest } from '../../../utils/apiRequest'
import './ordersTable.scss'

const NewOrdersTable = () => {
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    getRequest('admin-newOrders')
      .then((data)=>{
        setNewOrders(data)
      })
  },[])
  return (
    <div className='newOrders-table'>
      <Table striped hover responsive>
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
              <td>{new Date(item.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
              <td>{item.items.join(', ')}</td>
              <td><p>₱ {item.total}</p></td>
              <td>
                <Form>
                  <Form.Select defaultValue='default'>
                    <option value='default'>{item.status}</option>
                    <option value='preparing'>Preparing</option>
                  </Form.Select>
                </Form>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default NewOrdersTable