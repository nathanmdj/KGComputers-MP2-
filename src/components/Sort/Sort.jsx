import React from 'react'
import { Form } from 'react-bootstrap'

const Sort = ({setSortValue}) => {
  return (
    <div>
      <Form.Select aria-label="Default select example"
      onChange={(e) => setSortValue(e.target.value)}
      defaultValue="default"
      >
        <option value="default" disabled >Sort</option>
        <option value="nameAscending">Name: A to Z</option>
        <option value="nameDescending">Name: Z to A</option>
        <option value="priceAscending">Price: Lowest to Highest</option>
        <option value="priceDescending">Price: Highest to Lowest</option>
      </Form.Select>
    </div>
  )
}

export default Sort