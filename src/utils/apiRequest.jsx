import axios from 'axios';

const backend_url = 'http://localhost:5000';

export const postRequest = (path, body) => {
  const fetchData = async () => {
    try {
      const response = await axios.post(`${backend_url}/${path}`, body);
      console.log('Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error:', error.response.data);
      return error.response.data;
    }
  };
  
  return fetchData(); // Return the promise returned by fetchData
};
