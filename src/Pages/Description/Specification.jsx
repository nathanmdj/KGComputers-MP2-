import React from 'react'
import './description.scss'
const Specification = (props) => {
  return (
    <div 
    className=''
    dangerouslySetInnerHTML={{ __html: props.specs }}></div>
  )
}

export default Specification