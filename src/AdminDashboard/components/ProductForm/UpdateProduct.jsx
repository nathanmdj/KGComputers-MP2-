import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './productForm.scss'
import { getRequest, postRequest, putRequest } from '../../../utils/apiRequest';
import { useNavigate, useParams } from 'react-router-dom';
import TextEditor from '../MCETextEditor/MCETextEditor';
import { DescriptionContext } from '../../../Context/DescriptionContext';

const InputField = ({label, type, isInput, setValue, value, setErrorAlert} ) => {
  const [isValid, setIsValid] = useState(true);
  
  const handleChange = (e) => {
    setIsValid(e.target.validity.valid)
    setValue(e.target.value)
    setErrorAlert('')
  }

  useEffect(() => {
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
      <option value='components'>Component</option>
    </Form.Select>
    <Form.Label className={`label ${isValid ? 'valid-label' : ''}`} htmlFor='input'>{label}</Form.Label>
  </Form.Group>

  )
}

const UpdateProduct = () => {
  const {pID} = useParams()
  const products = useContext(DescriptionContext)
  
  const navigate = useNavigate();
  const [product, setProduct] = useState(products[0]);
  const [productName, setProductName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(Number(product.price.replace(/,/g, "")));
  const [stocks, setStocks] = useState(product.stocks || 0);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [tags, setTags] = useState(product.tags || '');
  const [erroAlert, setErrorAlert] = useState('');
  const [specs, setSpecs] = useState(product.specs || '');
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedProduct = {
      pID: pID,
      name: productName,
      description: description,
      category: category,
      price: Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      stocks: Number(stocks),
      imageUrl: imageUrl,
      tags: tags,
      specs: specs
    }
    
    const isEmpty = Object.values(updatedProduct).some(value => value === '');

    if(isEmpty){
      setErrorAlert('Some fields are empty!')
      return
    }

    putRequest(`update-product/${pID}`, updatedProduct)
      .then((data) => {
        console.log(data);
      })

    
    navigate('/dashboard/product-list')
  }

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className="w-75 product-form-container">
        <Form className='p-3 border rounded-3 form-controls'>
          <Form.Text className='title'>Update Product</Form.Text>
          <div className="d-flex gap-2">
            <InputField
            label={'Product Name'}
            type={'text'}
            setValue={setProductName}
            value={productName}
            isInput={true}
            setErrorAlert={setErrorAlert}
            />
            
            <InputField
            label={'Category'}
            type={'text'}
            setValue={setCategory}
            value={category}
            isInput={false}
            setErrorAlert={setErrorAlert}
            />
          </div>
        
          <InputField
          label={'Description'}
          type={'text'}
          setValue={setDescription}
          value={description}
          isInput={true}
          setErrorAlert={setErrorAlert}/>

          <div className="d-flex gap-2">
            <InputField
            label={'Price'}
            type={'number'}
            setValue={setPrice}
            value={price}
            isInput={true}
            setErrorAlert={setErrorAlert}/>

            <InputField
            label={'Stocks'}
            type={'number'}
            setValue={setStocks}
            value={stocks}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
          </div>
          
          <div className="d-flex gap-2">
            <InputField
            label={'Image Url'}
            type={'text'}
            setValue={setImageUrl}
            value={imageUrl}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
            
            <InputField
            label={'Tags'}
            type={'text'}
            setValue={setTags}
            value={tags}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
          </div>

          <TextEditor
          specs={specs}
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

export default UpdateProduct