import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { getRequest } from '../../../utils/apiRequest';

const SalesChart = () => {
  const [dailySales, setDailySales] = useState([])

  function getLast7Days() {
    const dates = [];
    const today = new Date(); // Get today's date
    for (let i = 0; i < 7; i++) {
      const date = new Date(today); // Create a new date object
      date.setDate(today.getDate() - i); // Subtract 'i' days from today's date
      dates.push(date.toISOString().split('T')[0].slice(-5)); 
    }
    return dates;
  }
  
  useEffect(()=>{
    getRequest('daily-sales')
      .then((data)=>{
        setDailySales(data)
      })
  },[])

  const last7Days = getLast7Days().reverse();
  console.log(last7Days);
  return (
    <div className='p-3 ps-md-5'>
      <h3>Sales in last 7 days</h3>
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
  );
};

export default SalesChart;
