import React from 'react'
import SalesChart from '../../../components/Chart/Sales'
import StocksAlert from '../../../components/StockAlert/StocksAlert'

const Main = () => {
  return (
    <div className='p-3 ps-md-5 '>
      <SalesChart/>
      <StocksAlert/>
    </div>
  )
}

export default Main