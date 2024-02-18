import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getRequest } from '../../utils/apiRequest'
import { useAuthContext } from '../../Context/AuthContext'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  
  useEffect(()=> {
    const user = localStorage.getItem('User') || ''
    getRequest(`user-order/${user}`)
      .then((data)=>{
        console.log(data);
        setOrders(data)
      })
  },[])

  return (
    <div>
      <Table hover striped responsive
      className='user-order-table'>
        <thead>
          <tr className='bg-info'>
            <th className='col-2'>Order #</th>
            <th className='col-2'>Date</th>
            <th>Description</th>
            <th className='col-2'>Total</th>
            <th className='col-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i)=>
            <tr key={i}>
              <td>{order.order_id}</td>
              <td>{order.date}</td>
              <td>{order.items.join(', ')}</td>
              <td>₱ {order.total}</td>
              <td>{order.status}</td>
            </tr>
            
          
          )}
        </tbody>
        
      </Table>
    </div>
  )
}

export default OrderHistory