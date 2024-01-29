import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import './carousel.scss';


const MyCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/carousel-img');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <Carousel className='c-item'>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.img_link}
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
