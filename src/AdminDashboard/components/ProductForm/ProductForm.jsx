import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './productForm.scss'
import { postRequest } from '../../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../MCETextEditor/MCETextEditor';

const InputField = ({label, type, isInput, getValue, setErrorAlert} ) => {
  const [isValid, setIsValid] = useState(false);
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setIsValid(e.target.validity.valid)
    setValue(e.target.value)
    setErrorAlert('')
  }

  useEffect(() => {
    getValue(value)
    if (value === '') {
      setIsValid(false)
    }
  }, [value])

  return (
  <Form.Group className='input-field'>
    <Form.Control 
      type={type}
      className={`input ${isValid ? 'valid-input': ''} ${isInput ? '' : 'd-none'}`}
      onChange={handleChange}
      isValid={isValid}
      value={value}/>
    <Form.Select className={`input ${isValid ? 'valid-input': ''} ${isInput ? 'd-none' : ''}`}
      value={value}
      isValid={isValid}
      onChange={handleChange}>
      <option value=''></option>
      <option value='desktop'>Desktop</option>
      <option value='laptop'>Laptop</option>
      <option value='peripherals'>Peripherals</option>
      <option value='component'>Component</option>
    </Form.Select>
    <Form.Label className={`label ${isValid ? 'valid-label' : ''}`} htmlFor='input'>{label}</Form.Label>
  </Form.Group>

  )
}

const ProductForm = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stocks, setStocks] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [erroAlert, setErrorAlert] = useState('');
  const [specs, setSpecs] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      name: productName,
      description: description,
      category: category,
      price: Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      stocks: Number(stocks),
      imageUrl: imageUrl,
      tags: tags,
      specs: specs
    }

    const isEmpty = Object.values(newProduct).some(value => value === '');

    if(isEmpty){
      setErrorAlert('Some fields are empty!')
      return
    }

    postRequest('add-product', newProduct)
      .then((data) => {
        console.log(data);
      })

    
    navigate('/dashboard/product-list')
  }

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className="w-75 product-form-container">
        <Form className='p-3 border rounded-3 form-controls'>
          <Form.Text className='title'>Add Product</Form.Text>
          <div className="d-flex gap-2">
            <InputField
            label={'Product Name'}
            type={'text'}
            getValue={setProductName}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
            
            <InputField
            label={'Category'}
            type={'text'}
            getValue={setCategory}
            isInput={false}
            setErrorAlert={setErrorAlert}/>
          </div>
        
          <InputField
          label={'Description'}
          type={'text'}
          getValue={setDescription}
          isInput={true}
          setErrorAlert={setErrorAlert}/>

          <div className="d-flex gap-2">
            <InputField
            label={'Price'}
            type={'number'}
            getValue={setPrice}
            isInput={true}
            setErrorAlert={setErrorAlert}/>

            <InputField
            label={'Stocks'}
            type={'number'}
            getValue={setStocks}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
          </div>
          
          <div className="d-flex gap-2">
            <InputField
            label={'Image Url'}
            type={'text'}
            getValue={setImageUrl}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
            
            <InputField
            label={'Tags'}
            type={'text'}
            getValue={setTags}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
          </div>

          <TextEditor
          setSpecs={setSpecs}
          setErrorAlert={setErrorAlert}/>
          <Form.Text className='text-danger fs-6'>{erroAlert}</Form.Text>
          <Button className='text-white '
          onClick={(e)=>handleSubmit(e)}>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default ProductForm