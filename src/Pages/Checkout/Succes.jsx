import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './checkout.scss'
import { Check, CheckCircle, CheckCircleFill } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const Succes = () => {
  const navigate = useNavigate()
  const [timer, setTimer] = useState(10)
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          navigate('/');
          return prevTimer;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, [navigate]);
  

  return (
    <div className='d-flex justify-content-center flex-column vh-100 align-items-center '>
      
      <div className="success-page bg-body-tertiary text-center rounded-5">
        <p className='text-center'><CheckCircleFill color='green' size={100}/></p>
        <h4>Purchase Success!</h4>
        <p>Thank you for completing your payment.</p>
        <p>Item will be delivered within 3 days.</p>
        <Button className='btn btn-info mb-3'
        as={Link} to={'/'}>Go back Home</Button>

        <p>Auto close in ({timer})</p>
      </div>
    </div>
  )
}

export default Succes