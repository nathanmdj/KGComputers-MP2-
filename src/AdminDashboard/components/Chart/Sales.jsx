import React, { useState, useEffect } from 'react';
import {Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { getRequest } from '../../../utils/apiRequest';

const SalesChart = () => {
  const [dailySales, setDailySales] = useState([])
  const [last7Days, setLast7Days] = useState([])

  useEffect(()=>{
    getRequest('daily-sales')
      .then((data)=>{
        const dates = data.date.map((item)=>{
          return item.slice(-5)
        })

        console.log(dates);
        setDailySales(data.sales)
        setLast7Days(dates)
      })
  },[])

  // const last7Days = getLast7Days().reverse();
  
  return (
    <div className='d-flex justify-content-center flex-wrap'>
      <h4 className='w-100'>Sales in last 7 days</h4>
      <div className="chart-container w-75">
        
        <Line data={{
          labels: last7Days,
          datasets: [
            {
              label: "Sales in ₱",
              data: dailySales,
            }
          ]
        }}/>
      </div>
    </div>
  );
};

export default SalesChart;
