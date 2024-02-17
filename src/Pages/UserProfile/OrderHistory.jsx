import React from 'react'
import { Table } from 'react-bootstrap'

const OrderHistory = () => {
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

        </tbody>
        
      </Table>
    </div>
  )
}

export default OrderHistory