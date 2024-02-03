import React from 'react'
import './spinner.scss'

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center spinner">
      <div className="loadingspinner">
      <div id="square1"></div>
      <div id="square2"></div>
      <div id="square3"></div>
      <div id="square4"></div>
      <div id="square5"></div>
      </div>
    </div>
    
  )
}

export default Spinner