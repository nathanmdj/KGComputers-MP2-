import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useSeachContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'

const SearchBar = (props) => {
  const {setQuery} = useSeachContext()
  const [keyword,setKeyword] = useState('')
  const navigate = useNavigate()


const handleSearch = (e) => {
  e.preventDefault()
  setQuery(keyword)
  navigate('/search')
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    setQuery(keyword)
    navigate('/search')
  }
}
  return (
    <div className=''>
      <Form className='d-flex align-items-center '> 
        <Form.Control
        className='me-1'
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        onKeyDown={(e)=>handleKeyPress(e)}
        />
        <Button className=''
        onClick={(e)=>handleSearch(e)}
        >Search</Button>
      </Form>
    </div>
  )
}

export default SearchBar