// DesktopSidebar.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './sidebar.scss';
import { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  const handleFilterChange = (event) => {
    // Handle filter changes and pass them to the parent component
    const selectedFilters = {
      // Extract selected filters from event or any other source
      // For example, if you have checkboxes for categories and price range
      // selectedCategories: event.target.categories.value,
      // selectedPriceRange: event.target.priceRange.value,
    };

    onFilterChange(selectedFilters);
  };

  return (
    <div className="product-filter-sidebar sidebar p-1">
      <Form onSubmit={handleFilterChange}>
        <Form.Group controlId="priceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control as="select">
            <option value={0}>Any</option>
            <option value={1}>Below ₱ 1,000.00</option>
            <option value={2}>₱ 1,001.00 - ₱ 5,000.00</option>
            <option value={3}>₱ 5,001.00 - ₱ 10,000.00</option>
            <option value={4}>₱ 10,001.00 - ₱ 20,000.00</option>
            <option value={5}>₱ 20,001.00 - ₱ 50,000.00</option>
            <option value={6}>₱ 50,000.00+</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Brand</Form.Label>
          <Form.Check 
            type="radio"
            label="Acer"
            name="brand"
            id="option1"
            value="acer"
            checked={selectedOption === 'acer'}
            onChange={(e)=>handleOptionChange(e)}
          />
          <Form.Check 
            type="radio"
            label="Asus"
            name="brand"
            id="option2"
            value="asus"
            checked={selectedOption === 'asus'}
            onChange={(e)=>handleOptionChange(e)}
          />
          <Form.Check 
            type="radio"
            label="HP"
            name="brand"
            id="option2"
            value="hp"
            checked={selectedOption === 'hp'}
            onChange={(e)=>handleOptionChange(e)}
          />
          <Form.Check 
            type="radio"
            label="Lenovo"
            name="brand"
            id="option2"
            value="lenovo"
            checked={selectedOption === 'lenovo'}
            onChange={(e)=>handleOptionChange(e)}
          />
          <Form.Check 
            type="radio"
            label="MSI"
            name="brand"
            id="option2"
            value="msi"
            checked={selectedOption === 'msi'}
            onChange={(e)=>handleOptionChange(e)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default FilterSidebar;
