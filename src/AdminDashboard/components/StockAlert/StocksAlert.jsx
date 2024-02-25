import React, { useEffect, useState  } from 'react'
import { getRequest } from '../../../utils/apiRequest'
import { Table } from 'react-bootstrap'

const StocksAlert = () => {
  const [lowStocks, setLowStocks] = useState([])

  useEffect(()=>{
    getRequest('stocks-alert')
      .then((data)=>{
        const sortedData = [...data].sort((a,b)=>a.stocks - b.stocks)
        setLowStocks(sortedData)
      })
  },[])
  
  if (lowStocks.length === 0){
    return <div></div>
  }

  return (
    <div className='mt-4 text-danger '>
      <h4>Low Stocks Alert</h4>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Stocks</th>
          </tr>
        </thead>
        <tbody>
          {lowStocks.map((item,i)=>
            <tr key={i}>
              <td>{item.pID}</td>
              <td>{item.name}</td>
              <td>{item.stocks}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default StocksAlert