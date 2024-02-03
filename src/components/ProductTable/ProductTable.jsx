import React, { useContext, useState } from 'react';
import { useTable } from 'react-table';
import { ProductContext } from '../../Context/ProductContext';

const ProductTable = () => {
  const products = useContext(ProductContext);
  const [editedProduct, setEditedProduct] = useState(null);

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Stocks', accessor: 'stocks' },
      { Header: 'Actions', Cell: ActionsCell },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: products,
  });

  function ActionsCell({ row }) {
    return (
      <div>
        <button onClick={() => handleEdit(row.original)}>Edit</button>
        <button onClick={() => handleDelete(row.original.id)}>Delete</button>
      </div>
    );
  }

  const handleEdit = (product) => {
    setEditedProduct(product);
    // Handle the edit operation, e.g., show a modal with a form to edit the product
  };

  const handleDelete = (productId) => {
    // Handle the delete operation, e.g., show a confirmation modal and call a delete API
    console.log(`Deleting product with ID: ${productId}`);
  };

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {editedProduct && (
        <div>
          {/* Add a modal or form for editing the product */}
          <h2>Edit Product</h2>
          <p>Name: {editedProduct.name}</p>
          {/* Add form fields for other properties */}
          <button onClick={() => setEditedProduct(null)}>Cancel</button>
          {/* Add a button to save changes */}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
