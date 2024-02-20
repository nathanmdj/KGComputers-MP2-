import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './carousel.scss';
import Spinner from '../../components/Spinner/Spinner';
import { getRequest } from '../../utils/apiRequest';

const MyCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // const fetchImages = async () => {
    //   try {
    //     const response = await axios.get(`${backend_url}/carousel-img`);
    //     setImages(response.data);
    //   } catch (error) {
    //     console.error('Error fetching images:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchImages();
    getRequest('carousel-img')
      .then((data)=>{
        setImages(data)
      })
      .catch((error)=>{
        console.error('Error fetching data:', error);
      })
      .finally(()=>setLoading(false))
  }, []);

  return (
    <div>
      {loading ? (
      
        <Spinner/>
       
      ) : (
        <Carousel className='c-item'>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.imageUrl}
                alt={`Carousel Image ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MyCarousel;
