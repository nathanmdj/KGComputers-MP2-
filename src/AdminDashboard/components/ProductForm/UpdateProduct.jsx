import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './productForm.scss'
import { getRequest, postRequest, putRequest } from '../../../utils/apiRequest';
import { useNavigate, useParams } from 'react-router-dom';
import TextEditor from '../MCETextEditor/MCETextEditor';
import Spinner from '../../../components/Spinner/Spinner';
import { useProductUpdateContext } from '../../../Context/ProductUpdateContext';
// import { DescriptionContext } from '../../../Context/DescriptionContext';

const InputField = ({label, type, isInput, xValue, setErrorAlert, setXValue} ) => {
  const [isValid, setIsValid] = useState(true);
  

  const handleChange = (e) => {
    setIsValid(e.target.validity.valid)
    setXValue(e.target.value)
    setErrorAlert('')
  }

  useEffect(() => {
    if (xValue === '') {
      setIsValid(false)
    }
  }, [xValue])

  
  return (
  <Form.Group className='input-field'>
    <Form.Control 
      type={type}
      className={`input ${isValid ? 'valid-input': ''} ${isInput ? '' : 'd-none'}`}
      onChange={handleChange}
      isValid={isValid}
      value={xValue}/>
    <Form.Select className={`input ${isValid ? 'valid-input': ''} ${isInput ? 'd-none' : ''}`}
      value={xValue}
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
  const {productToUpdate, update} = useProductUpdateContext()
  const navigate = useNavigate();
  const [product, setProduct] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stocks, setStocks] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [specs, setSpecs] = useState('');
  const [erroAlert, setErrorAlert] = useState('');
  

  useEffect(()=>{
    setProduct(productToUpdate)
  },[update])


  useEffect(()=>{
    setProductName(product.name)
    setCategory(product.category)
    setPrice(()=>{
      if(product.price){
        return Number(product.price.replace(/,/g, ""))
      }
    })
    setDescription(product.description)
    setStocks(product.stocks)
    setImageUrl(product.imageUrl)
    setTags(product.tags)
    setSpecs(product.specs)
  },[product])

  

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
    console.log('specs',specs);
    if(isEmpty || specs === undefined){
      setErrorAlert('Some fields are empty!')
      return
    }

    putRequest(`update-product/${pID}`, updatedProduct)
      .then((data) => {       
        navigate('/dashboard/product-list')
      })  
      .catch((error) => {
        console.error('Error updating product:', error);
        setErrorAlert(error)
      });
    
     
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
   while(isEmpty(product)){
    return <Spinner/>
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
            setXValue={setProductName}
            xValue={productName}
            isInput={true}
            setErrorAlert={setErrorAlert}
            />
            
            <InputField
            label={'Category'}
            type={'text'}
            setXValue={setCategory}
            xValue={category}
            isInput={false}
            setErrorAlert={setErrorAlert}
            />
          </div>
        
          <InputField
          label={'Description'}
          type={'text'}
          setXValue={setDescription}
          xValue={description}
          isInput={true}
          setErrorAlert={setErrorAlert}/>

          <div className="d-flex gap-2">
            <InputField
            label={'Price'}
            type={'number'}
            setXValue={setPrice}
            xValue={price}
            isInput={true}
            setErrorAlert={setErrorAlert}/>

            <InputField
            label={'Stocks'}
            type={'number'}
            setXValue={setStocks}
            xValue={stocks}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
          </div>
          
          <div className="d-flex gap-2">
            <InputField
            label={'Image Url'}
            type={'text'}
            setXValue={setImageUrl}
            xValue={imageUrl}
            isInput={true}
            setErrorAlert={setErrorAlert}/>
            
            <InputField
            label={'Tags'}
            type={'text'}
            setXValue={setTags}
            xValue={tags}
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