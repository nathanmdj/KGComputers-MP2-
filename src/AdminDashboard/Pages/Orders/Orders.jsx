import React from 'react'
import NewOrdersTable from '../../components/OrdersTable/NewOrdersTable'

const Orders = () => {
  return (
    <div className='p-3 ps-md-5'>
      <h4>Recent Orders</h4>
      <NewOrdersTable/>
    </div>
  )
}

export default Orders