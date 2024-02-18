import axios from 'axios';

const backend_url = 'http://localhost:5000';

export const postRequest = (route, body) => {  
  console.log(body);
  const fetchData = async () => {
    try {
      const response = await axios.post(`${backend_url}/${route}`, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  
  return fetchData(); // Return the promise returned by fetchData
};

export const getRequest = (route) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${backend_url}/${route}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  
  return fetchData(); // Return the promise returned by fetchData
};

export const deleteRequest = (route) => {
  const fetchData = async () => {
    try {
      const response = await axios.delete(`${backend_url}/${route}`);
      console.log('Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error:', error.response.data);
      return error.response.data;
    }
  };
  
  return fetchData(); // Return the promise returned by fetchData
};

export const putRequest = (route, body) => {
  const fetchData = async () => {
    try {
      const response = await axios.put(`${backend_url}/${route}`, body);
      console.log('Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error:', error.response.data);
      return error.response.data;
    }
  };
  
  return fetchData(); // Return the promise returned by fetchData
};
