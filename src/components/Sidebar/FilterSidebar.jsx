// DesktopSidebar.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './sidebar.scss';

const FilterSidebar = ({ onFilterChange }) => {
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
    <div className="product-filter-sidebar sidebar">
      <Form onSubmit={handleFilterChange}>
        {/* Add filter options as needed */}
        <Form.Group controlId="categories">
          <Form.Label>Categories</Form.Label>
          <Form.Control as="select" multiple>
            <option>Category 1</option>
            <option>Category 2</option>
            {/* Add more categories */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="priceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control as="select">
            <option>Any</option>
            <option>Under $50</option>
            <option>$50 - $100</option>
            <option>Over $100</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Apply Filters
        </Button>
      </Form>
    </div>
  );
};

export default FilterSidebar;
